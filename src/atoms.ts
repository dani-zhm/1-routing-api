import { atom } from "jotai";

export type LngLat = [number, number];

export enum Selections {
  ORIGIN = 0,
  DESTINATION = 1,
}

export const lngLatAtom = atom<LngLat>([0, 0]);

export const originLngLatAtom = atom<LngLat>([0, 0]);

export const destLngLatAtom = atom<LngLat>([0, 0]);

export const selectionAtom = atom<Selections>(Selections.ORIGIN);