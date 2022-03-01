import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = process.env.REACT_APP_API_URL;

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || {
        errorCode: 'NETWORK',
        message: error.message
      }
    )
);

export default axiosInstance;
