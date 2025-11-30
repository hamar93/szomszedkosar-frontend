'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default marker icon
const icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface Producer {
    _id: string;
    name: string;
    city?: string;
    location?: {
        latitude: number;
        longitude: number;
    };
}

interface MapProps {
    producers: Producer[];
    center?: [number, number];
    zoom?: number;
}

const Map = ({ producers, center = [47.4979, 19.0402], zoom = 12 }: MapProps) => {
    return (
        <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%', borderRadius: '1rem' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {producers.map((producer) => (
                producer.location && (
                    <Marker
                        key={producer._id}
                        position={[producer.location.latitude, producer.location.longitude]}
                        icon={icon}
                    >
                        <Popup>
                            <div className="text-center">
                                <h3 className="font-bold text-[#1B4332]">{producer.name}</h3>
                                <p className="text-sm text-gray-600">{producer.city}</p>
                                <a href={`/shop/${producer._id}`} className="text-[#1B4332] font-bold text-xs hover:underline mt-2 block">
                                    Tovább a boltjára
                                </a>
                            </div>
                        </Popup>
                    </Marker>
                )
            ))}
        </MapContainer>
    );
};

export default Map;
