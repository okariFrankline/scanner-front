import axios from "axios";

const baseUrl = "http://localhost:4000/api/v1"

/**
 * Returns a preconfigured axios client that will be used to make
 * get requests to the server
 */
 const get = async (path, params) => {
    return axios({
      method: 'GET',
      url: path,
      baseURL: baseUrl,
      params: params,
    });
  };
  

/**
 * Makes a get request to the server to fetch data and returns results
 */
const performGet = async (path, params) => {

  let res = { success: true, data: null, errors: null };

  try {
    const { data } = await get(path, params);

    return { ...res, data: data };

  } catch (error) {

    if (error.code == 'ERR_NETWORK') {
      return {
        ...res,
        success: false,
        errors: 'check your internet connection and try again',
      };
    }

    if (error.response.status === 500) {
      return { ...res, success: false, errors: 'unexpected error occurred' };
    }

    return { ...res, success: false, errors: error.response.data.details };
  }
};

export { performGet };