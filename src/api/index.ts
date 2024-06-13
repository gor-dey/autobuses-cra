import axios from "axios";

export const api = axios.create({
  baseURL: "https://autobus.kazaerospace.kz/api/v1/",
});
