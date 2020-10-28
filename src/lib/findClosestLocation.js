const findClosesLocation = (locations, place, googleMaps) => {
  const closestStation = locations.sort(
    (a, b) =>
      googleMaps.geometry.spherical.computeDistanceBetween(
        new googleMaps.LatLng(parseFloat(a.latitude), parseFloat(a.longitude)),
        new googleMaps.LatLng(place.lat, place.lng)
      ) -
      googleMaps.geometry.spherical.computeDistanceBetween(
        new googleMaps.LatLng(parseFloat(b.latitude), parseFloat(b.longitude)),
        new googleMaps.LatLng(place.lat, place.lng)
      )
  );
  const closestStationPosition = {
    lat: parseFloat(closestStation[0].latitude),
    lng: parseFloat(closestStation[0].longitude),
  };

  return closestStationPosition;
};

export default findClosesLocation;
