import { getItemFromLocalStorage } from "../utils/utils";
import { State } from "../types/types";

export const state: State = {
  name: getItemFromLocalStorage<string>("user"),
  refreshToken: getItemFromLocalStorage<string>("refreshToken"),
  customerId: getItemFromLocalStorage<string>("customerId"),
  apiRoot: null,
  cartId: getItemFromLocalStorage<string>("cart-id"),
};

export default state;
