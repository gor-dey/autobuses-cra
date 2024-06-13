import axios from "axios";

export const api = axios.create({
  baseURL: "http://95.59.124.162:8290/api/v1/",
});
