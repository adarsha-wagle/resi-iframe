import { useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

import { env } from "@/config/env";
import { useAppContext } from "@/context/app_context";

function ChooseMapLocation() {
  // Comes from typed location or previously selected location

  const { selectedMapLocation, setSelectedMapLocation } = useAppContext();

  const [position, setPosition] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: selectedMapLocation?.latitude || 0,
    lng: selectedMapLocation?.longitude || 0,
  });

  const handleMapClick = (e: any) => {
    const { lat, lng } = e.detail.latLng;
    setPosition({ lat, lng });
    setSelectedMapLocation({ longitude: lng, latitude: lat });
  };

  return (
    <APIProvider apiKey={env.GOOGLE_API_KEY}>
      <Map
        defaultCenter={position}
        defaultZoom={18}
        style={{ width: "100%", height: "40rem" }}
        onClick={handleMapClick}
      >
        <Marker position={position} />
      </Map>
    </APIProvider>
  );
}

export default ChooseMapLocation;
