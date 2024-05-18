import { getItemFromLocalStorage } from "src/utils/utils";
import { State } from "../types/types";

export const state: State = {
  name: getItemFromLocalStorage<string>("user"),
  refreshToken: getItemFromLocalStorage<string>("refreshToken"),
};

export default state;
