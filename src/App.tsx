// mapbox styling for container
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

import config from "./config";
import Mapbox from "./components/Mapbox";
import { useAtom } from "jotai";
import {
  destLngLatAtom,
  lngLatAtom,
  originLngLatAtom,
  Selections,
} from "./atoms";

import Selection from "./components/Selection";

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
    <>
      <Mapbox>
        <div className="bg-slate-300 absolute rounded py-2 px-3 m-2">
          <p>Longitude: {lngLat[0]}</p>
          <p>Latitude: {lngLat[1]}</p>
        </div>
      </Mapbox>

      <div className="p-4">
        <p>Which one to set?</p>
        <Selection initialValue={Selections.ORIGIN} />
      </div>
    </>
  );
};

/* 

AXIOS SNIPPET TO USE LATER FOR ROUTING API 

EXAMPLE URL
const URL =
  "https://map.ir/routes/route/v1/driving/51.442279815673835,35.7428898051826;51.35747909545899,35.73870984488911";

axios
  .post(URL, null, {
    headers: { "x-api-key": config.MAPIR_KEY },
    params: {
      steps: false,
      alternatives: false,
      geometries: "geojson",
    },
  })
  .then((res) => {
    // on load should only do basic map stuff
    // can on click should handle
  });
}}

*/

export default App;
