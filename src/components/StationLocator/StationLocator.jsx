import React, { useEffect, useState, useRef } from "react";
import GoogleMapReact from "google-map-react";

import MarkerClusterer from "@google/markerclusterer";
import useGeoposition from "../../hooks/useGeoposition";

import africanCountries from "../../lib/africanCountries";

const StationLocator = ({ stations }) => {
  const { latitude, longitude, error } = useGeoposition();
  const [centerPosition, setCenterPosition] = useState({ lat: -26.19, lng: 28.03 });
  const mapRef = useRef(null);
  const clusterRef = useRef(null);

  useEffect(() => {
    if (latitude && longitude) {
      setCenterPosition({ lat: +latitude.toFixed(2), lng: +longitude.toFixed(2) });
    } else {
      setCenterPosition({ lat: -26.19, lng: 28.03 });
    }
  }, [latitude, longitude]);

  const getUserCountry = (map, maps) => {
    const geocoder = new maps.Geocoder();
    const southAfricaShortName = "ZA";

    if (error) {
      geocoder.geocode({ address: southAfricaShortName }, (results, status) => {
        if (status === "OK") {
          map.setCenter(results[0].geometry.location);
        }
      });
    } else {
      const location = new maps.LatLng(latitude, longitude);

      geocoder.geocode({ location }, (results, status) => {
        if (status === "OK") {
          const userCountry = results.find(result => result.types.includes("country"));
          const countryShortName = userCountry.address_components[0].short_name;

          if (africanCountries.find(({ id }) => id === countryShortName)) {
            map.setCenter(userCountry.geometry.location);
          } else {
            geocoder.geocode({ address: southAfricaShortName }, (results, status) => {
              if (status === "OK") {
                map.setCenter(results[0].geometry.location);
              }
            });
          }
        }
      });
    }
  };
  const renderMarkerClusters = (map, maps) => {
    console.log(stations);
    const infoWindow = new maps.InfoWindow();

    const markers = stations.map(station => {
      const contentString = `
        <div class="infoWrapper">
          <div class="sslInfoCompanyName">${station.company_name}</div>
          <div class="info-field">
            <span class="field-title">Address:</span>
            <span class="field-value">${station.street_name}</span>
          </div>
          <div class="info-field">
            <span class="field-title"></span>
            <span class="field-value">${station.street_postal_code}</span>
          </div>
          <div class="info-field">
            <span class="field-title">Tel:</span>
            <span class="field-value"><a href="tel:${station.mobile}">${station.mobile}</a></span>
          </div>
          <div class="info-field">
            <span class="field-title">Fax:</span>
            <span class="field-value">${station.fax}</span>
          </div>
          <div class="info-field">
            <span class="field-title">Email:</span>
            <span class="field-value">
              <a href="mailto:${station.email}">${station.email}</a>
            </span>
          </div>
        </div>
      `;

      const marker = new maps.Marker({
        position: { lat: +station.latitude, lng: +station.longitude },
      });

      maps.event.addListener(marker, "click", () => {
        infoWindow.setContent(contentString);
        infoWindow.open(map, marker);
      });

      return marker;
    });

    clusterRef.current = new MarkerClusterer(map, markers, {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    });

    return clusterRef.current;
  };

  // const updateMarkers = useCallback(() => {
  //   if (clusterRef.current) {
  //     clusterRef.current.clearMarkers();
  //   }
  //   return renderMarkerClusters(mapRef.current.map_, mapRef.current.maps_);
  // });

  // useEffect(() => {
  //   if (mapRef.current) {
  //     updateMarkers();
  //   }
  // }, [stations]);

  return (
    <>
      <div style={{ height: "100vh", width: "100vw" }}>
        <GoogleMapReact
          ref={mapRef}
          bootstrapURLKeys={{ key: process.env.REACT_APP_GMAPS_API_KEY }}
          defaultZoom={5}
          defaultCenter={centerPosition}
          onGoogleApiLoaded={({ map, maps }) => {
            getUserCountry(map, maps);
            renderMarkerClusters(map, maps);
          }}
          yesIWantToUseGoogleMapApiInternals></GoogleMapReact>
      </div>
    </>
  );
};

export default StationLocator;
