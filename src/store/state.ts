import { State } from "../types/types";

export const state: State = {
  name: undefined,
  refreshToken: localStorage.getItem("refreshToken"),
};

export default state;
