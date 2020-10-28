import { useEffect, useMemo } from "react";

const createControlledPromise = () => {
  let resolver;
  let rejector;
  const promise = new Promise((resolve, reject) => {
    resolver = resolve;
    rejector = reject;
  });

  return { promise, resolver, rejector };
};

const useMarker = ({ lat, lng }) => {
  const { promise: apiPromise, resolver: handleGoogleApiLoaded } = useMemo(
    createControlledPromise,
    []
  ).current;

  useEffect(() => {
    let marker;

    apiPromise.then(api => {
      const { map, maps } = api;
      marker = new maps.Marker({ position: { lat, lng }, map });
    });

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [apiPromise, lat, lng]);

  return { handleGoogleApiLoaded };
};

export default useMarker;
