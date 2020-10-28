import React, { useEffect, useState, useRef, useContext, createContext } from "react";
import GoogleMapReact from "google-map-react";
import Cookies from "js-cookie";

import { getContactList } from "../../api/contacts.api";
import findClosesLocation from "../../lib/findClosestLocation";
import useGeoposition from "../../hooks/useGeoposition";
import isUserAfrican from "../../lib/isUserAfrican";

export const Context = createContext({
  nearestOffice: null,
  setNearestOffice: () => {},
});

export const Provider = ({ children, notice: initialNotice }) => {
  const [nearestOffice, setNearestOffice] = useState(null);

  const nearestOfficeContext = {
    setNearestOffice: office => setNearestOffice(office),
    nearestOffice,
  };

  return <Context.Provider value={nearestOfficeContext}>{children}</Context.Provider>;
};

const NearestStation = ({ width, height }) => {
  const { setNearestOffice, nearestOffice } = useContext(Context);
  const [contacts, setContactList] = useState([]);
  const [googleMaps, setGoogleMaps] = useState(null);
  const [centerPosition, setCenterPosition] = useState({ lat: 33.919473, lng: 18.423386 });
  const mapRef = useRef(null);
  const userLocation = useGeoposition();

  const userCountry = Cookies.get("countryCode");

  const onMapChange = ({ center }) => {
    setCenterPosition(center);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getContactList();

        if (response.message === "success") {
          return setContactList(response.data.contacts);
        }

        return;
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (!nearestOffice) {
          if (contacts && mapRef.current && googleMaps && userLocation) {
            if (isUserAfrican(userCountry)) {
              const userPlace = { lat: userLocation.latitude, lng: userLocation.longitude };
              const closestOffice = findClosesLocation(contacts, userPlace, googleMaps);

              setNearestOffice(closestOffice);
            } else {
              setNearestOffice(contacts.find(({ slug }) => slug === "cape-town-head-office"));
            }
          }
        }
      } catch (error) {
        setNearestOffice(contacts.find(({ slug }) => slug === "cape-town-head-office"));
        console.error(error);
      }
    })();
  }, [contacts, googleMaps, nearestOffice, setNearestOffice, userCountry, userLocation]);

  useEffect(() => {
    (async () => {
      if (nearestOffice && googleMaps && mapRef.current) {
        const position = {
          lat: parseFloat(nearestOffice.latitude),
          lng: parseFloat(nearestOffice.longitude),
        };

        setCenterPosition(position);

        const marker = new googleMaps.Marker({
          position,
        });

        marker.setMap(mapRef.current);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleMaps, nearestOffice, mapRef.current]);

  return (
    <div style={{ height, width }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GMAPS_API_KEY,
          libraries: ["geometry", "places"],
        }}
        center={centerPosition}
        defaultZoom={14}
        onChange={onMapChange}
        onGoogleApiLoaded={({ maps, map }) => {
          setGoogleMaps(maps);
          mapRef.current = map;
        }}
        yesIWantToUseGoogleMapApiInternals></GoogleMapReact>
    </div>
  );
};

export default NearestStation;
export { Provider as NearestOfficeContextProvider, Context as NearestOfficeContext };
