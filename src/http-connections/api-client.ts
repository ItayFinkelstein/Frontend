import axios, { CanceledError } from "axios";

export { CanceledError };

const apiclient = axios.create({
  baseURL: "http://localhost:3000",
});

export default apiclient;
