"use client";
import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  Marker,           // plain old Marker works fine
  useLoadScript,
} from "@react-google-maps/api";

// Google services you want – "places" is enough for address‑autocomplete, etc.
const libraries = ["places"];

// Default centre (Colombo, LK – same as your original numbers)
const defaultCenter = { lat: 6.925187004369271, lng: 79.86128293151192 };

const containerStyle = { width: "100%", height: "100%" }; // map must have a height!

export default function GoogleMapComp({ className, mapHeight = 300 }) {
  /* Load Maps JS */
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.NEXT_PUBLIC_MAPS_API_KEY, // ⚠️ MUST start with NEXT_PUBLIC_
    libraries,
  });

  /* Marker state */
  const [markerPos, setMarkerPos] = useState(defaultCenter);

  /* When user clicks on map, move marker & lift coords up if parent passes a cb */
  const handleMapClick = useCallback((e) => {
    const newPos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setMarkerPos(newPos);
    // If parent gave you a prop like onLocationChange, call it here
    // onLocationChange?.(newPos);
  }, []);

  /* Basic loading / error handling */
  if (loadError) return <p className="text-red-500">Error loading Google Maps</p>;
  if (!isLoaded) return <p className="text-slate-400">Loading map…</p>;

  /* Render map */
  return (
    <div
      className={className}
      style={{ width: "100%", height: mapHeight }} /* default 300 px tall */
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPos}
        zoom={13}
        onClick={handleMapClick}
        options={{ streetViewControl: false, mapTypeControl: false }}
      >
        <Marker position={markerPos} />
      </GoogleMap>
    </div>
  );
}
