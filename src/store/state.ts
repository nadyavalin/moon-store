import { getItemFromLocalStorage } from "src/utils/utils";
import { State } from "../types/types";

export const state: State = {
  name: getItemFromLocalStorage("user"),
  refreshToken: getItemFromLocalStorage("refreshToken"),
};

export default state;
