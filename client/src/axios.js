import axios from 'axios';

// Create an instance of axios with a specified base URL
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/', // Change this to your desired domain
    timeout: 10000, // Optional: Set a timeout for requests (in milliseconds)
    headers: {
        'Content-Type': 'application/json', // Optional: Set default headers
    },
});

// Optional: Add request interceptors
axiosInstance.interceptors.request.use(
    (config) => {
        // Modify request config before sending the request
        // For example, you can add auth tokens here if needed
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

// Optional: Add response interceptors
axiosInstance.interceptors.response.use(
    (response) => {
        // Modify response data if needed
        return response;
    },
    (error) => {
        // Handle response error
        return Promise.reject(error);
    }
);

// Export the axios instance
export default axiosInstance;
