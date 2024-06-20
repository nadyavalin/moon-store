import { getItemFromLocalStorage } from "../utils/utils";
import { CatalogQueryArgs, State } from "../types/types";

export const state: State = {
  name: getItemFromLocalStorage<string>("user"),
  refreshToken: getItemFromLocalStorage<string>("refreshToken"),
  customerId: getItemFromLocalStorage<string>("customerId"),
  apiRoot: null,
  cartId: getItemFromLocalStorage<string>("cart-id"),
  anonymousId: getItemFromLocalStorage<string>("anonymousId"),
};

export const catalogQueryArgs: CatalogQueryArgs = {
  searchText: null,
  pageNumber: 1,
  category: null,
  filter: null,
  sort: null,
};

export default state;
