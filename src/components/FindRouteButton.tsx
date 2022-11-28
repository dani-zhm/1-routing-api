import axios from "axios";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import {
  originLngLatAtom,
  destLngLatAtom,
  mapAtom,
  mapLoadedAtom,
} from "../atoms";
import config from "../config";
import genRouteApiUrl from "../utils/genRouteApiUrl";
import Button from "./ui/Button";

const FindRouteButton = () => {
  const [originLngLat] = useAtom(originLngLatAtom);
  const [destLngLat] = useAtom(destLngLatAtom);
  const [map] = useAtom(mapAtom);
  const [mapLoaded] = useAtom(mapLoadedAtom);
  const [loading, setLoading] = useState(!mapLoaded);

  // enable find route button only if map is loaded
  useEffect(() => {
    setLoading(!mapLoaded);
  }, [mapLoaded]);

  const findRoute = async () => {
    setLoading(true);
    const apiUrl = genRouteApiUrl({ originLngLat, destLngLat });

    const res = await axios.post(apiUrl, null, {
      headers: { "x-api-key": config.MAPIR_KEY },
      params: {
        steps: false,
        alternatives: false,
        geometries: "geojson",
      },
    });

    const newLine = res.data.routes[0].geometry.coordinates;

    const source = map?.getSource("some-route") as any;

    source?.setData({
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: newLine,
      },
    });

    setLoading(false);
  };

  return (
    <Button
      className="bg-green-600 relative"
      onClick={findRoute}
      disabled={loading}
    >
      {!loading && <span>Find route</span>}
      {loading && <span>Loading...</span>}
    </Button>
  );
};
export default FindRouteButton;
