import API from "../lib/axiosConfig";

const get = async (endpoint, data) => {
  try {
    const response = await API.get(endpoint, data);

    return response.data.response;
  } catch (error) {
    return error;
  }
};

export default get;
