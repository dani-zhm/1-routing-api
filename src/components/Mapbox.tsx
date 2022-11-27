import { useAtom } from "jotai";
import mapboxgl from "mapbox-gl";
import { FC, PropsWithChildren } from "react";
import {
  destLngLatAtom,
  LngLat,
  lngLatAtom,
  originLngLatAtom,
  selectionAtom,
  Selections,
} from "../atoms";
import useMap from "../hooks/useMap";

const Mapbox: FC<PropsWithChildren> = ({ children }) => {
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

  const handleMapLoad = (
    ev: mapboxgl.MapboxEvent<undefined> & mapboxgl.EventData
  ) => {
    ev.target.addSource("some-route", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [],
        },
      },
    });

    ev.target.addLayer({
      id: "some-route-layer",
      type: "line",
      source: "some-route",
      paint: { "line-width": 3, "line-color": "black" },
    });
  };

  const { mapContainerRef } = useMap({
    onMapClick: handleMapClick,
    onMapLoad: handleMapLoad,
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
