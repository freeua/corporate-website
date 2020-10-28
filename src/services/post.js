import API from "../lib/axiosConfig";

const post = async (endpoint, data) => {
  try {
    const response = await API.post(endpoint, data);
    return response;
  } catch (error) {
    return error;
  }
};

export default post;
