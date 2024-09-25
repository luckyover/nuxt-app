// composables/useApi.ts
import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://192.168.5.88:2288/api', // Thay đổi URL này thành API của bạn
  timeout: 10000, // Thời gian chờ cho yêu cầu
  headers: {
    'Content-Type': 'application/json',
  },
});


// Set up the response interceptor
Api.interceptors.response.use(
  function (response) {
     return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., token expired)
      console.log("Unauthorized! Redirecting to login.");
    }
    // Return a rejected promise to propagate the error
    return Promise.reject(error);
  }
);


export default Api;
