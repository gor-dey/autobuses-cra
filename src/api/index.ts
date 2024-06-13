import axios from "axios";

export const api = axios.create({
  baseURL: "https://3dback.kazaerospace.kz/api/v1/",
});
