import { api } from "./index";
import { AxiosResponse } from "axios";
import { TransportLocation } from "../types";

export const getTransportLocationList = async (): Promise<
  AxiosResponse<TransportLocation[]>
> => {
  return await api.get("/transports/location/");
};
