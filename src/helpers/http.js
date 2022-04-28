/* eslint-disable space-before-function-paren */
import axios from "axios";
import constants from "../config/constants";

const { baseURL } = constants;

export const getData = async (uri) => {
  try {
    const { data } = await axios.get(baseURL + uri);
    if (data.success) {
      return data;
    }

    data.results = [];
    return data;
  } catch (error) {
    console.log(error);
    const data = {
      results: [],
    };
    return data;
  }
};

export const fetchSelectData = async ({ locations, types }) => {
  try {
    const location = axios.get(baseURL + locations);
    const type = axios.get(baseURL + types);

    const [locationData, typeData] = await Promise.all([location, type]);

    const data = {
      locations: locationData.data.results,
      types: typeData.data.results,
    };

    return data;
  } catch (error) {
    console.error(error.response);
    if (error.response.data) {
      return error.response.data.message;
    }
    return error.message;
  }
};

export const axiosInstance = (useToken = false, useBaseURL = true) => {
  const headers = {};

  if (useToken) {
    headers.Authorization = `Bearer ${useToken}`;
  }

  // if (useBaseURL) {
  //   return axios.create({
  //     headers
  //   });
  // }

  return axios.create({
    baseURL: useBaseURL ? baseURL : "",
    headers,
  });
};

export const axiosInstanceMultipart = (useToken = false) => {
  const headers = {};

  if (useToken) {
    headers.Authorization = `Bearer ${useToken}`;
  }

  return axios.create({
    baseURL,
    headers: {
      ...headers,
      "Content-Type": "multipart/form-data",
    },
  });
};
