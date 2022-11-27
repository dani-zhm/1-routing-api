import { useAtom } from "jotai";
import mapboxgl, { Map } from "mapbox-gl";
import { useRef, useEffect, FC, PropsWithChildren } from "react";
import { lngLatAtom } from "../atoms";

const Mapbox: FC<PropsWithChildren> = ({ children }) => {
  const mapRef = useRef<Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [, setLngLat] = useAtom(lngLatAtom);

  const handleMapClick = (ev: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    setLngLat([ev.lngLat.lng, ev.lngLat.lat]);
  };

  useEffect(() => {
    // if map already instantiated or container ref isn't ready yet, don't do anything
    if (mapRef.current || !mapContainerRef.current) return;
    // otherwise:
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      // caution: it's [Longitude, Latitude] here!
      // *google maps does [Latitude, Longitude] ?!
      center: [51.366624055720855, 35.7004387316396],
      zoom: 8,
    });
    // handle clicking on map
    mapRef.current.on("click", handleMapClick);
  });

  return (
    <div className="relative h-[400px]" ref={mapContainerRef}>
      <div className="absolute z-10 h-full w-full font-sans text-base pointer-events-none">
        <div className="h-full w-full relative pointer-events-none">{children}</div>
      </div>
    </div>
  );
};

export default Mapbox;
