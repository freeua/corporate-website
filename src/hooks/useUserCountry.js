import { useState, useEffect } from "react";
import africanCountries from "../lib/africanCountries";

const useUserCountry = (googleMaps, userLocation) => {
  const [foundedUserCountry, setFoundedUserCountry] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (googleMaps) {
      (() => {
        const geocoder = new googleMaps.Geocoder();
        const southAfricaName = "South Africa";

        if (userLocation.error) {
          geocoder.geocode({ address: southAfricaName }, (results, status) => {
            if (status === "OK") {
              setFoundedUserCountry(results[0].geometry.location);
            }
          });
        } else {
          const location = new googleMaps.LatLng(userLocation.latitude, userLocation.longitude);

          geocoder.geocode({ location }, (results, status) => {
            if (status === "OK") {
              const userCountry = results.find(result => result.types.includes("country"));
              const countryShortName = userCountry.address_components[0].short_name;

              if (africanCountries.find(({ id }) => id === countryShortName)) {
                setFoundedUserCountry(results[0].geometry.location);
              } else {
                geocoder.geocode({ address: southAfricaName }, (results, status) => {
                  if (status === "OK") {
                    setFoundedUserCountry(results[0].geometry.location);
                  } else {
                    setError("user country not found ");
                  }
                });
              }
            }
          });
        }
      })();
    }
  }, [googleMaps, userLocation, userLocation.error, userLocation.latitude, userLocation.longitude]);

  return { foundedUserCountry, error };
};

export default useUserCountry;
