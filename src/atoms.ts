import { atom } from "jotai";
import { Map } from "mapbox-gl";

export type LngLat = [number, number];

export enum Selections {
  ORIGIN = 0,
  DESTINATION = 1,
}

export const lngLatAtom = atom<LngLat>([0, 0]);

export const originLngLatAtom = atom<LngLat>([0, 0]);

export const destLngLatAtom = atom<LngLat>([0, 0]);

export const selectionAtom = atom<Selections>(Selections.ORIGIN);

export const mapAtom = atom<Map | null>(null);
