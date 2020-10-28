import { useState, useEffect, useRef } from "react";

const useAutocompleteClosest = (googleMaps, inputRef) => {
  const [foundedPlace, setFoundedPlace] = useState(null);
  const [error, setError] = useState(null);

  const placeChangeEvent = useRef(null);

  useEffect(() => {
    if (googleMaps) {
      (() => {
        const autoComplete = new googleMaps.places.Autocomplete(inputRef.current, {
          types: ["geocode"],
        });

        placeChangeEvent.current = googleMaps.event.addListener(
          autoComplete,
          "place_changed",
          () => {
            if (autoComplete.getPlace().geometry) {
              setFoundedPlace({
                lat: autoComplete.getPlace().geometry.location.lat(),
                lng: autoComplete.getPlace().geometry.location.lng(),
              });
            } else setError("Place Not Found");
          }
        );
      })();

      return () => googleMaps.event.removeListener(placeChangeEvent.current);
    }
  }, [googleMaps, inputRef]);

  return { foundedPlace, error };
};

export default useAutocompleteClosest;
