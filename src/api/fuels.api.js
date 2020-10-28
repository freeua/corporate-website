import { get } from "../services";

export const getFuelsByCountry = () => get("country/fuel-prices");

export const getBrentPrice = async () => {
  try {
    const response = await fetch(
      `https://www.quandl.com/api/v3/datasets/OPEC/ORB/data.json?limit=1&api_key=${process.env.REACT_APP_QUANDL_API_KEY}`
    );

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
