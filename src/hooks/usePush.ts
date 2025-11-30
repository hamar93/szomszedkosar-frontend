import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useSession } from 'next-auth/react';

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || 'BL45wWzteYh93_KYUFF9UZOu9GSuK10Z2ubePP3Um23y9i9DCV6-1giYFPeX-k85jMWDhi16aOE4zA-4DtXu5Mk';

function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export function usePush() {
    const { data: session } = useSession();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker.ready.then(registration => {
                registration.pushManager.getSubscription().then(subscription => {
                    setIsSubscribed(!!subscription);
                });
            });
        }
    }, []);

    const subscribeUser = async () => {
        if (!(session?.user as any)?.id) {
            setError('Jelentkezz be az értesítések bekapcsolásához!');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            if (!('serviceWorker' in navigator)) {
                throw new Error('A böngésző nem támogatja a Service Workereket.');
            }

            const registration = await navigator.serviceWorker.register('/sw.js');
            await navigator.serviceWorker.ready;

            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
            });

            if (!session?.user) {
                throw new Error('Nincs bejelentkezve');
            }

            await api.post('/api/notifications/subscribe', {
                subscription,
                userId: (session.user as any).id
            });

            setIsSubscribed(true);
            alert('Sikeresen feliratkoztál az értesítésekre!');
        } catch (err: any) {
            console.error('Push subscription error:', err);
            setError('Nem sikerült feliratkozni az értesítésekre. Ellenőrizd a jogosultságokat.');
        } finally {
            setLoading(false);
        }
    };

    return { isSubscribed, subscribeUser, loading, error };
}
