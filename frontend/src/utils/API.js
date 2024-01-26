import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  withXSRFToken: true,
});

API.defaults.xsrfHeaderName = "X-CSRFToken";
API.defaults.xsrfCookieName = "csrftoken";

API.interceptors.request.use((req) => {
  req.headers.Accept = "application/json";
  return req;
});

export default API;
