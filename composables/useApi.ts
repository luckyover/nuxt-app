// composables/useApi.ts
import axios from 'axios';
import { useAppStore } from "@/stores/app";
import { useRuntimeConfig } from '#app';

// Create a function to set up the Axios instance
const createApi = () => {

  const config = useRuntimeConfig();
  const baseUrl = `${config.public.API_URI}${config.public.API_PATH}`; // Construct the base URL
  const timeout = parseInt(config.public.API_TIMEOUT || '60000'); // Set timeout
  const apiKey = config.public.API_KEY;

  const Api = axios.create({
    baseURL: baseUrl, // Set base URL
    timeout: timeout,  // Set request timeout
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey
    },
  });

  // Set up the response interceptor
  Api.interceptors.response.use(
    function (response) {
      return response; // Return the response directly if successful
    },
    function (error) {
      const appStore = useAppStore(); // Get the store instance
      const status = error.response.status;
      if ([401, 500, 501].includes(status)) {
      
        appStore.showToast({
          message: error.response.data.message,
          type: 'error',
          duration: 3000,
        });
      }else if([422, 201].includes(status)){

        appStore.addError(error.response.data.error)
      }
      // Return a rejected promise to propagate the error
      return Promise.reject(error);
    }
  );

  return Api; // Return the configured Axios instance
};

// Export a function to initialize the API
export  const useApi = () => {
  return createApi(); // Call the createApi function to get the configured instance
};

export default useApi; // Default export of the useApi function
