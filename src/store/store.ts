import { State } from "../types/types";
import { getItemFromLocalStorage, setItemToLocalStorage } from "../utils/utils";

class AppStore {
  private _state: State = {
    name: getItemFromLocalStorage<string>("name"),
    refreshToken: getItemFromLocalStorage<string>("refreshToken"),
    customerId: getItemFromLocalStorage<string>("customerId"),
    apiRoot: null,
    cartId: getItemFromLocalStorage<string>("cartId"),
    anonymousId: getItemFromLocalStorage<string>("anonymousId"),
  };

  private localStorageItems: string[] = ["name", "refreshToken", "customerId", "cartId", "anonymousId"];

  get state(): State {
    return Object.freeze(this._state);
  }

  setState = (state: Partial<State>): void => {
    Object.entries(state).map(([key, value]) => {
      if (this.localStorageItems.includes(key)) {
        setItemToLocalStorage(key, value);
      }
    });

    this._state = { ...this._state, ...state };
  };
}

export const appStore = new AppStore();
