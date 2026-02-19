import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet default icon issues in React environments
const fixLeafletIcons = () => {
  // @ts-ignore
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
};

interface LocationPickerMapProps {
  latitude?: string | number;
  longitude?: string | number;
  onLocationSelect: (lat: number, lng: number) => void;
}

function LocationMarker({ position, onLocationSelect }: { position: L.LatLng | null, onLocationSelect: (lat: number, lng: number) => void }) {
  const map = useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom());
    }
  }, [position, map]);

  return position === null ? null : (
    <Marker position={position} />
  );
}

const LocationPickerMap: React.FC<LocationPickerMapProps> = ({ latitude, longitude, onLocationSelect }) => {
  useEffect(() => {
    fixLeafletIcons();
  }, []);

  const defaultCenter: [number, number] = [20.5937, 78.9629]; // Center of India
  const position = latitude && longitude 
    ? new L.LatLng(Number(latitude), Number(longitude)) 
    : null;
  const center = position ? [position.lat, position.lng] as [number, number] : defaultCenter;

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden relative z-0">
       <MapContainer 
        center={center} 
        zoom={5} 
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} onLocationSelect={onLocationSelect} />
      </MapContainer>
    </div>
  );
};

export default LocationPickerMap;
