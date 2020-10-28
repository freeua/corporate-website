import { useState, useEffect, useRef } from "react";

export const useGeoposition = () => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  const watcher = useRef(null);

  const onChange = ({ coords }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  const onError = error => {
    setError(error.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    const options = {
      enableHighAccuracy: false,
      timeout: 2000,
      maximumAge: 0,
    };

    if (!geo) {
      setError("Geolocation is not supported");
      return;
    }

    watcher.current = geo.watchPosition(onChange, onError, options);

    return () => geo.clearWatch(watcher.current);
  }, []);

  return { ...position, error };
};

export default useGeoposition;
