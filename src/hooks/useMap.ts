import { useAtom } from "jotai";
import mapboxgl, { Map } from "mapbox-gl";
import { useRef, useState, useEffect } from "react";
import { mapAtom } from "../atoms";

type MapClickEvent = mapboxgl.MapMouseEvent & mapboxgl.EventData;
type MapLoadEvent = mapboxgl.MapboxEvent<undefined> & mapboxgl.EventData;

interface UseMap {
  onMapClick?: (ev: MapClickEvent) => void;
  onMapLoad?: (ev: MapLoadEvent) => void;
}

const useMap = ({ onMapClick, onMapLoad }: UseMap) => {
  const mapRef = useRef<Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [, setMap] = useAtom(mapAtom);

  const onLoad = (ev: MapLoadEvent) => {
    onMapLoad?.(ev);
    setMapLoaded(true);
  };

  const onClick = (ev: MapClickEvent) => {
    onMapClick?.(ev);
  };

  useEffect(() => {
    setMap(mapLoaded ? mapRef.current : null);
  }, [mapLoaded]);

  useEffect(() => {
    // if map exists set up event hanlder for ...
    if (mapRef.current) {
      // clicking
      //   mapRef.current.on("click", onMapClick);
      mapRef.current.on("click", onClick);
      // load
      mapRef.current.on("load", onLoad);
    }

    // if no map and container ref not null then instantiate map
    if (!mapRef.current && mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        // caution: it's [Longitude, Latitude] here!
        // *google maps does [Latitude, Longitude] ?!
        center: [51.366624055720855, 35.7004387316396],
        zoom: 11,
      });
    }

    // cleanup
    return () => {
      // remove old callback since it could have stale state in its definition
      mapRef.current!.off("click", onClick);
      mapRef.current!.off("load", onLoad);
    };
  });

  return {
    mapContainerRef: mapContainerRef,
  };
};

export default useMap;
