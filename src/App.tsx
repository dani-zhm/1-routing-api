import mapboxgl, { Map } from "mapbox-gl";
import { useRef } from "react";
import axios from "axios";
import config from "./config";

// mapboxgl.setRTLTextPlugin(
// 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
// null,
// true // Lazy load the plugin
// );

const URL =
  "https://map.ir/routes/route/v1/driving/51.442279815673835,35.7428898051826;51.35747909545899,35.73870984488911";

function App() {
  const mapRef = useRef<Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   if (!mapRef.current && mapContainerRef.current) {
  //     mapRef.current = new mapboxgl.Map()
  //   }

  //   return () => {
  //     if (mapRef.current)
  //     {
  //       // mapRef.current.off('load')
  //     }
  //   }
  // })

  return (
    <div style={{ height: 400 }}>
      <button
        onClick={() => {
          axios.post(URL, null, {
            headers: { "x-api-key": config.MAPIR_KEY },
            params: {
              steps: false,
              alternatives: false,
              geometries: "geojson",
            },
          }).then(res => {
            // on load should only do basic map stuff

            // can on click should handle
            
          });
        }}
      >
        fetch
      </button>
    </div>
  );
}

export default App;
