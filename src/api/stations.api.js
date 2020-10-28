import { get } from "../services";

export const getServiceStations = () => get("service-stations/all");

export const getUserCountry = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}country`);

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getStationFilters = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}service-stations/filters`);

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
