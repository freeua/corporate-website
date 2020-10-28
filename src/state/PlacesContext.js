import { createContext } from "react";

export const AutocompletedPlace = {
  place: {},
  setAutocompletedPlace: () => {},
};

export const AutocompletedPlaceContext = createContext(AutocompletedPlace);
