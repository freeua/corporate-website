import africanCountries from "./africanCountries";

const isUserAfrican = userCountry =>
  !!africanCountries.find(({ country_code }) => country_code === userCountry);

export default isUserAfrican;

// return new Promise((resolve, reject) => {
//   const geocoder = new googleMaps.Geocoder();

//   if (userLocation.error) {
//     resolve(false);
//   } else {
//     const location = new googleMaps.LatLng(userLocation.latitude, userLocation.longitude);

//     geocoder.geocode({ location }, (results, status) => {
//       if (status === "OK") {
//         const userCountry = results.find(result => result.types.includes("country"));
//         const countryShortName = userCountry.address_components[0].short_name;

//         if (africanCountries.find(({ id }) => id === countryShortName)) {
//           resolve(true);
//         } else {
//           resolve(false);
//         }
//       } else {
//         reject(`Google maps Error: geocode ${status}`);
//       }
//     });
//   }
// });
