import africanCountries from "./africanCountries";

const getUserCountryPosition = userCountry => {
  const foundedCountry = africanCountries.find(({ country_code }) => country_code === userCountry);

  if (foundedCountry) {
    const { lat, lng } = foundedCountry;

    return {
      lat,
      lng,
    };
  }

  const southAfrica = africanCountries.find(({ country_code }) => country_code === "ZA");
  const { lat, lng } = southAfrica;

  return {
    lat,
    lng,
  };
};

export default getUserCountryPosition;

// return new Promise((resolve, reject) => {
//   const geocoder = new googleMaps.Geocoder();
//   const southAfricaName = "South Africa";

//   if (userLocation.error) {
//     geocoder.geocode({ address: southAfricaName }, (results, status) => {
//       if (status === "OK") {
//         resolve(results[0].geometry.location);
//       }
//     });
//   } else {
//     const location = new googleMaps.LatLng(userLocation.latitude, userLocation.longitude);

//     geocoder.geocode({ location }, (results, status) => {
//       if (status === "OK") {
//         const userCountry = results.find(result => result.types.includes("country"));
//         const countryShortName = userCountry.address_components[0].short_name;

//         if (africanCountries.find(({ id }) => id === countryShortName)) {
//           resolve(results[0].geometry.location);
//         } else {
//           geocoder.geocode({ address: southAfricaName }, (results, status) => {
//             if (status === "OK") {
//               resolve(results[0].geometry.location);
//             } else {
//               reject("user country not found ");
//             }
//           });
//         }
//       }
//     });
//   }
// });
