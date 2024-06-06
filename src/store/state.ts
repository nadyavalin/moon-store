import { getItemFromLocalStorage } from "../utils/utils";
import { State } from "../types/types";

export const state: State = {
  name: getItemFromLocalStorage<string>("user"),
  refreshToken: getItemFromLocalStorage<string>("refreshToken"),
  customerId: getItemFromLocalStorage<string>("customerId"),
  apiRoot: null,
};

export default state;
