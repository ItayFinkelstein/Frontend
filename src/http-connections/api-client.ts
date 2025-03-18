import axios, { CanceledError } from "axios";
import { BASE_URL } from "../Utils";

export { CanceledError };

const apiclient = axios.create({
  baseURL: BASE_URL,
});

export default apiclient;
