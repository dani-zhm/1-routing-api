import { useAtom } from "jotai";
import mapboxgl, { Map } from "mapbox-gl";
import { useRef, useEffect, FC, PropsWithChildren } from "react";
import {
  destLngLatAtom,
  LngLat,
  lngLatAtom,
  originLngLatAtom,
  selectionAtom,
  Selections,
} from "../atoms";

const Mapbox: FC<PropsWithChildren> = ({ children }) => {
  const mapRef = useRef<Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [, setLngLat] = useAtom(lngLatAtom);
  const [selection] = useAtom(selectionAtom);
  const [, setOriginLngLat] = useAtom(originLngLatAtom);
  const [, setDestLngLat] = useAtom(destLngLatAtom);

  const handleMapClick = (ev: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    const newLngLat: LngLat = [ev.lngLat.lng, ev.lngLat.lat];
    setLngLat(newLngLat);
    if (selection === Selections.ORIGIN) {
      setOriginLngLat(newLngLat);
    } else {
      setDestLngLat(newLngLat);
    }
  };

  useEffect(() => {
    // handle clicking on map if map exists
    if (mapRef.current) mapRef.current!.on("click", handleMapClick);

    // if no map and container ref not null then instantiate map
    if (!mapRef.current && mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        // caution: it's [Longitude, Latitude] here!
        // *google maps does [Latitude, Longitude] ?!
        center: [51.366624055720855, 35.7004387316396],
        zoom: 8,
      });
    }

    // cleanup
    return () => {
      // remove old callback since it could have stale state in its definition
      mapRef.current!.off("click", handleMapClick);
    };
  });

  return (
    <div className="relative h-[400px]" ref={mapContainerRef}>
      <div className="absolute z-10 h-full w-full font-sans text-base pointer-events-none">
        <div className="h-full w-full relative pointer-events-none">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Mapbox;
