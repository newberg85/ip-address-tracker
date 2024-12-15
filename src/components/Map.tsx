"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import icon from "./icon";

interface LocationData {
  city: string;
  region: string;
  timezone: string;
  lat: number;
  lng: number;
}

interface AddressData {
  location: LocationData;
}

interface MapProps {
  address: AddressData | null;
}

export const Map = ({ address }: MapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstance && address?.location) {
      const map = L.map(mapRef.current, {
        center: [address.location.lat, address.location.lng],
        zoom: 13,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

      const newMarker = L.marker([address.location.lat, address.location.lng], {
        icon,
      }).addTo(map);
      newMarker.bindPopup(address.location.city || "Unknown Location");

      setMapInstance(map);
      markerRef.current = newMarker;
    }
  }, [address, mapInstance]);

  useEffect(() => {
    if (mapInstance && address?.location) {
      const { lat, lng } = address.location;

      if (markerRef.current) {
        mapInstance.setView([lat, lng], 13);
        markerRef.current.setLatLng([lat, lng]);
        markerRef.current.closePopup();
      }
    }
  }, [address, mapInstance]);

  return <div ref={mapRef} style={{ height: "700px", width: "100%" }} />;
};
