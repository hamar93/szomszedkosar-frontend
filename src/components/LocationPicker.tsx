'use client';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

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

interface LocationPickerProps {
    center?: [number, number];
    zoom?: number;
    onLocationSelect: (lat: number, lng: number) => void;
}

function LocationMarker({ onLocationSelect, initialPosition }: { onLocationSelect: (lat: number, lng: number) => void, initialPosition?: [number, number] }) {
    const [position, setPosition] = useState<[number, number] | null>(initialPosition || null);

    const map = useMapEvents({
        click(e) {
            setPosition([e.latlng.lat, e.latlng.lng]);
            onLocationSelect(e.latlng.lat, e.latlng.lng);
        },
    });

    useEffect(() => {
        if (initialPosition) {
            map.flyTo(initialPosition, map.getZoom());
        }
    }, [initialPosition, map]);

    return position === null ? null : (
        <Marker position={position} icon={icon}></Marker>
    );
}

const LocationPicker = ({ center = [47.4979, 19.0402], zoom = 13, onLocationSelect }: LocationPickerProps) => {
    return (
        <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%', borderRadius: '1rem' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker onLocationSelect={onLocationSelect} initialPosition={center} />
        </MapContainer>
    );
};

export default LocationPicker;
