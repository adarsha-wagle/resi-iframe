import { type CSSProperties } from "react";
import { env } from "@/config/env";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

type TShowMapLocationProps = {
  longitude: number;
  latitude: number;
  style?: CSSProperties;
};

function ShowMapLocation({
  longitude,
  latitude,
  style = {},
}: TShowMapLocationProps) {
  return (
    <APIProvider apiKey={env.GOOGLE_API_KEY}>
      <Map
        center={{ lat: latitude, lng: longitude }}
        defaultZoom={18}
        style={{ width: "100%", height: "20rem", ...style }}
      >
        <Marker position={{ lat: latitude, lng: longitude }} />
      </Map>
    </APIProvider>
  );
}

export default ShowMapLocation;
