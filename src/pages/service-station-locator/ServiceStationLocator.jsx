import React, { useState, useEffect, useRef, useContext } from "react";
import GoogleMapReact from "google-map-react";
import MarkerClusterer from "@google/markerclusterer";
import { CSSTransition } from "react-transition-group";
import Cookies from "js-cookie";

import styles from "./ServiceStationLocator.module.scss";

import Layout from "../../components/Layout";
import Banner from "../../components/Banner";
import Button from "../../components/buttons/Button";

import useGeoposition from "../../hooks/useGeoposition";
import { getServiceStations, getStationFilters } from "../../api/stations.api";
import { radiusTypes } from "./filtersForm";
import Loader from "../../components/Loader/Loader";
import Checkbox from "../../components/inputs/Checkbox";
import Radio from "../../components/inputs/Radio";
import { LocationIcon } from "../../components/icons";
import RefineIcon from "../../components/icons/RefineIcon";
import stationInfoWindowContent from "../../lib/stationInfoWindowContent";
import useAutocompleteClosest from "../../hooks/useAutocompleteClosest";
import AutocompleteInput from "../../components/inputs/AutocompleteInput";
import { NearestStationContext } from "../../components/StationSearch/StationSearch";
import findClosesLocation from "../../lib/findClosestLocation";
import getUserCountryPosition from "../../lib/getUserCountryPosition";
import { getB2bBySlug } from "../../api/b2b.api";

const ServiceStationLocator = () => {
  const { nearestStation } = useContext(NearestStationContext);

  const [currentPage, setCurrentPage] = useState(null);
  const [stations, setStations] = useState([]);
  const [filteredStations, setFilteredStations] = useState([]);
  const [centerPosition, setCenterPosition] = useState({ lat: null, lng: null });
  const [mapZoom, setMapZoom] = useState(5);
  const [markersCluster, setMarkerCluster] = useState([]);
  const [googleMaps, setMapsState] = useState(null);

  // ----- FILTERS STATE ------
  const [filters, setFilters] = useState(null);
  const [radius, setRadius] = useState("all");
  const [stationType, setStationType] = useState([]);
  const [fuelType, setFuelType] = useState([]);
  const [foodType, setFoodType] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const mapRef = useRef(null);
  const placesRef = useRef(null);

  const userLocation = useGeoposition();
  const { foundedPlace } = useAutocompleteClosest(googleMaps, placesRef);

  const userCountry = Cookies.get("countryCode");

  const setCenterMapToCountry = async (map, maps) => {
    try {
      if (!nearestStation) {
        const foundedCountryLocation = getUserCountryPosition(userCountry);

        map.setCenter(foundedCountryLocation);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setCenterUserLocation = () => () => {
    if (!userLocation.error && userLocation.latitude && userLocation.longitude) {
      const userPosition = {
        lat: userLocation.latitude,
        lng: userLocation.longitude,
      };

      const closestStationPosition = findClosesLocation(filteredStations, userPosition, googleMaps);

      setCenterPosition(closestStationPosition);
      return setMapZoom(14);
    }

    return null;
  };

  const renderMarkerClusters = (map, maps, locations) => {
    const infoWindow = new maps.InfoWindow();

    const markers = locations.map(station => {
      const marker = new maps.Marker({
        position: { lat: +station.latitude, lng: +station.longitude },
        animation: maps.Animation.DROP,
      });

      maps.event.addListener(marker, "click", () => {
        infoWindow.setContent(stationInfoWindowContent(station));
        infoWindow.open(map, marker);
      });

      return marker;
    });

    setMarkerCluster(
      new MarkerClusterer(map, markers, {
        imagePath:
          "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
      })
    );

    return markersCluster;
  };

  const handleCheckField = (field, setField) => event => {
    const { value, checked } = event.target;

    if (checked) {
      setField([...field, value]);
    } else {
      setField(field.filter(f => f !== value));
    }
  };

  const handleSetRadius = event => setRadius(event.target.value);

  const filterStation = () => {
    const filteredStationsArray = stations.filter(station => {
      let inRadius = true;
      let foundedFuels = true;
      let foundedStations = true;
      let foundedFoods = true;

      if (radius !== "all") {
        inRadius =
          googleMaps.geometry.spherical.computeDistanceBetween(
            new googleMaps.LatLng(parseFloat(station.latitude), parseFloat(station.longitude)),
            new googleMaps.LatLng(userLocation.latitude, userLocation.longitude)
          ) <
          Number(radius) * 1000;
      }

      if (!inRadius) return false;

      if (fuelType && fuelType.length) {
        foundedFuels = fuelType.some(fuel => station.fuels.includes(fuel));
      }

      if (!foundedFuels) return false;

      if (stationType && stationType.length) {
        foundedStations = stationType.some(type => station.station_types.includes(type));
      }

      if (!foundedStations) return false;

      if (foodType && foodType.length) {
        foundedFoods = foodType.some(food => station.food_types.includes(food));
      }

      if (!foundedFoods) return false;

      return true;
    });

    setFilteredStations(filteredStationsArray);

    markersCluster.clearMarkers();
    return renderMarkerClusters(mapRef.current, googleMaps, filteredStationsArray);
  };

  const handleApplyFilters = () => event => {
    event.preventDefault();
    filterStation();
  };

  const resetFilter = () => () => {
    setRadius("all");
    setStationType([]);
    setFuelType([]);
    setFoodType([]);
    setFilteredStations(stations);

    markersCluster.clearMarkers();
    return renderMarkerClusters(mapRef.current, googleMaps, stations);
  };

  const onMapChange = ({ center, zoom }) => {
    setMapZoom(zoom);
    setCenterPosition(center);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getServiceStations();

        if (response.message === "success") {
          setStations(response.data.stations);
          setFilteredStations(response.data.stations);
        }
      } catch (error) {
        console.error(error);
      }
    })();

    (async () => {
      try {
        const response = await getB2bBySlug("service-stations");

        if (response.message === "success") {
          setCurrentPage(response.data.b2b);
        }
      } catch (error) {
        console.error(error);
      }
    })();

    (async () => {
      try {
        const response = await getStationFilters();

        setFilters(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (userLocation.latitude && userLocation.longitude) {
      setCenterPosition({
        lat: +userLocation.latitude.toFixed(2),
        lng: +userLocation.longitude.toFixed(2),
      });
    } else {
      setCenterPosition({ lat: -26.19, lng: 28.03 });
    }
  }, [userLocation.latitude, userLocation.longitude]);

  useEffect(() => {
    (() => {
      if (foundedPlace && filteredStations.length) {
        const closestStationPosition = findClosesLocation(
          filteredStations,
          foundedPlace,
          googleMaps
        );

        setCenterPosition(closestStationPosition);
        setMapZoom(14);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foundedPlace, googleMaps]);

  useEffect(() => {
    (() => {
      if (googleMaps && nearestStation && filteredStations.length) {
        const closestStation = filteredStations.sort(
          (a, b) =>
            googleMaps.geometry.spherical.computeDistanceBetween(
              new googleMaps.LatLng(parseFloat(a.latitude), parseFloat(a.longitude)),
              new googleMaps.LatLng(nearestStation.lat, nearestStation.lng)
            ) -
            googleMaps.geometry.spherical.computeDistanceBetween(
              new googleMaps.LatLng(parseFloat(b.latitude), parseFloat(b.longitude)),
              new googleMaps.LatLng(nearestStation.lat, nearestStation.lng)
            )
        );
        const closestStationPosition = {
          lat: parseFloat(closestStation[0].latitude),
          lng: parseFloat(closestStation[0].longitude),
        };

        setTimeout(() => {
          setCenterPosition(closestStationPosition);
          setMapZoom(14);
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleMaps, nearestStation]);

  return (
    <Layout pageTitle="Station Locator" withBottomPadding={false}>
      <Banner
        title="Service Station Locator"
        backgroundImage={currentPage && currentPage.image ? currentPage.image.path : ""}
      />
      <div className={styles["service-wrapper"]}>
        {googleMaps && mapRef.current && (
          <div className={styles["filters-wrapper"]}>
            <div className={styles["searchbox-wrapper"]}>
              <div className={styles.searchbox}>
                <AutocompleteInput
                  ref={placesRef}
                  id="autocomplete-places"
                  placeholder="Find your nearest station">
                  <div
                    className={styles["search-icon"]}
                    title={
                      userLocation.latitude && userLocation.longitude
                        ? "Find your nearest station"
                        : "Please, share your location"
                    }
                    onClick={setCenterUserLocation()}>
                    <LocationIcon color="#002c90" />
                  </div>
                  <div
                    onClick={() => setShowFilters(!showFilters)}
                    className={styles["search-icon"]}
                    title="Open Filters">
                    <RefineIcon />
                  </div>
                </AutocompleteInput>
              </div>
            </div>
            {
              <CSSTransition
                in={showFilters}
                timeout={300}
                classNames="map-filter"
                mountOnEnter
                unmountOnExit>
                {filters && (
                  <div className={styles["form-wrapper"]}>
                    <form className={styles.form} onSubmit={handleApplyFilters()}>
                      <div className={styles.radius}>
                        <div className={styles.title}>Radius:</div>
                        <div className={styles.main}>
                          {userLocation.error ? (
                            <div className={styles.warning}>
                              Give us your location for that feature:
                            </div>
                          ) : (
                            radiusTypes.map(({ value, label }) => (
                              <Radio
                                key={`radius-${value}`}
                                name="radiusType"
                                id={`radius-${value}`}
                                color={["white"]}
                                checked={radius === value}
                                value={value}
                                label={label}
                                onChange={handleSetRadius}
                              />
                            ))
                          )}
                        </div>
                      </div>

                      <div className={styles["station-type"]}>
                        <div className={styles.title}>Station Type:</div>
                        <div className={styles.main}>
                          {filters.station_types.map(({ id, title }) => (
                            <Checkbox
                              key={id}
                              name="stationType"
                              id={title}
                              color={["white"]}
                              checked={stationType.includes(title)}
                              value={title}
                              label={title}
                              onChange={handleCheckField(stationType, setStationType)}
                            />
                          ))}
                        </div>
                      </div>

                      <div className={styles["types-wrapper"]}>
                        {/* <div className={styles["fuel-type"]}>
                          <div className={styles.title}>Fuel Type:</div>
                          <div className={styles.main}>
                            {fuelTypes.map(({ value, label }) => (
                              <Checkbox
                                key={`fuelType-${value}`}
                                name="fuelType"
                                id={`fuelType-${value}`}
                                color={["white"]}
                                checked={fuelType.includes(value)}
                                value={value}
                                label={label}
                                onChange={handleCheckField(fuelType, setFuelType)}
                              />
                            ))}
                          </div>
                        </div> */}
                        <div className={styles["food"]}>
                          <div className={styles.title}>Food & Type:</div>
                          <div className={styles.foodMain}>
                            {filters.food_types.map(({ id, title }) => (
                              <Checkbox
                                key={id}
                                name="foodType"
                                id={title}
                                color={["white"]}
                                checked={foodType.includes(title)}
                                value={title}
                                label={title}
                                onChange={handleCheckField(foodType, setFoodType)}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className={styles["btns-row"]}>
                        <Button type="submit" classes={["white"]} text={"Apply Filters"} />
                        <Button classes={["white"]} text={"Reset"} onClick={resetFilter()} />
                      </div>
                    </form>
                  </div>
                )}
              </CSSTransition>
            }
          </div>
        )}

        {stations.length ? (
          <div className={styles.map}>
            <GoogleMapReact
              ref={mapRef}
              bootstrapURLKeys={{
                key: process.env.REACT_APP_GMAPS_API_KEY,
                libraries: ["geometry", "places"],
              }}
              onChange={onMapChange}
              zoom={mapZoom}
              center={centerPosition}
              onGoogleApiLoaded={({ map, maps }) => {
                setMapsState(maps);
                mapRef.current = map;
                renderMarkerClusters(map, maps, stations);
                setCenterMapToCountry(map, maps);
              }}
              yesIWantToUseGoogleMapApiInternals></GoogleMapReact>
          </div>
        ) : (
          <div style={{ height: "100vh", width: "100vw" }}>
            <Loader />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ServiceStationLocator;
