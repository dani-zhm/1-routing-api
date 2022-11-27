import axios from "axios";
import { useAtom } from "jotai";
import { useState } from "react";
import { originLngLatAtom, destLngLatAtom, mapAtom } from "../atoms";
import config from "../config";
import genRouteApiUrl from "../utils/genRouteApiUrl";
import Button from "./ui/Button";

const FindRouteButton = () => {
  const [originLngLat] = useAtom(originLngLatAtom);
  const [destLngLat] = useAtom(destLngLatAtom);
  const [map] = useAtom(mapAtom);
  const [loading, setLoading] = useState(false);

  const findRoute = async () => {
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

    (map?.getSource("some-route") as any)?.setData({
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: newLine,
      },
    });
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
