import axios, { AxiosInstance } from 'axios';
import config from 'dotenv';
config.config();
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL, // Aquí puedes establecer tu URL base predeterminada
});

export default axiosInstance;
