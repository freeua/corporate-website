import React, { useEffect, useState, useRef, useContext, createContext } from "react";
import { useHistory } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import styles from "./StationSearch.module.scss";

import { LocationIcon } from "../icons";
import useAutocompleteClosest from "../../hooks/useAutocompleteClosest";

export const Context = createContext({
  nearestStation: null,
  setNearestStation: () => {},
});

export const Provider = ({ children, notice: initialNotice }) => {
  const [nearestStation, setNearestStation] = useState(null);

  const nearestStationContext = {
    setNearestStation: ({ lat = null, lng = null }) => setNearestStation({ lat, lng }),
    nearestStation,
  };

  return <Context.Provider value={nearestStationContext}>{children}</Context.Provider>;
};

const StationSearch = () => {
  const { setNearestStation } = useContext(Context);
  const [googleMaps, setMapsState] = useState(null);
  const inputRef = useRef(null);

  const autocompletePlace = useAutocompleteClosest(googleMaps, inputRef);

  const history = useHistory();

  useEffect(() => {
    (() => {
      const { foundedPlace } = autocompletePlace;

      if (foundedPlace) {
        setNearestStation(foundedPlace);
        history.push("/service-station-locator");
      }
    })();
  }, [autocompletePlace, history, setNearestStation]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.icon}>
          <LocationIcon width={24.3} height={34.3} />
        </div>
        <input
          ref={inputRef}
          className={styles.input}
          name="station"
          placeholder={googleMaps ? "Find your nearest Engen" : "Loading"}
          disabled={!Boolean(googleMaps)}
        />
      </div>
      <div style={{ width: 0, height: 0, display: "none" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GMAPS_API_KEY,
            libraries: ["geometry", "places"],
          }}
          defaultCenter={{ lat: 0, lng: 0 }}
          defaultZoom={14}
          onGoogleApiLoaded={({ maps }) => {
            setMapsState(maps);
          }}
          yesIWantToUseGoogleMapApiInternals></GoogleMapReact>
      </div>
    </>
  );
};

export default StationSearch;
export { Provider as NearestStationContextProvider, Context as NearestStationContext };
