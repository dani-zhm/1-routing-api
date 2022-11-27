// mapbox styling for container
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

import config from "./config";
import Mapbox from "./components/Mapbox";
import { useAtom } from "jotai";
import {
  destLngLatAtom,
  lngLatAtom,
  mapAtom,
  originLngLatAtom,
  Selections,
} from "./atoms";

import Selection from "./components/Selection";
import Button from "./components/ui/Button";
import axios from "axios";
import genRouteApiUrl from "./utils/genRouteApiUrl";
import FindRouteButton from "./components/FindRouteButton";

// plugin to fix how rtl languages are display
mapboxgl.setRTLTextPlugin(
  "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
  null,
  true // Lazy load the plugin
);

mapboxgl.accessToken = config.MAPBOX_KEY;

const App = () => {
  const [lngLat] = useAtom(lngLatAtom);


  return (
    <div className="max-w-3xl mx-auto p-4 bg-indigo-200 h-full">
      <Mapbox>
        <div className="bg-gray-900/50 text-white absolute rounded py-2 px-3 m-2">
          <p>Longitude: {lngLat[0]}</p>
          <p>Latitude: {lngLat[1]}</p>
        </div>
      </Mapbox>

      <div className="p-4">
        <p className="uppercase my-3">Which one to set?</p>
        <Selection />
        <FindRouteButton />
      </div>
    </div>
  );
};

export default App;
