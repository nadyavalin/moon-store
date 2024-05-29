import { Customer } from "@commercetools/platform-sdk";
import { getUserData } from "../../api/api";
import { createElement, createSnackbar } from "../../components/elements";
import "./profile.css";
import "../../index.css";
import { SnackbarType } from "../../types/types";
import state from "../../store/state";
import { createAccountView } from "./profileAccountView";
import { createAddressesView } from "./profileAddressesView";

export const renderCustomerDataFromApi = () =>
  getUserData(state.customerId as string)?.then((response) => {
    if (response.statusCode === 200) {
      const wrapper = document.querySelector(".profile-wrapper");
      if (wrapper) wrapper.innerHTML = "";
      renderProfileContent(response.body);
    } else {
      createSnackbar(SnackbarType.error, "Что-то пошло не так... Повторите попытку позже.");
    }
  });

export const profile = createElement({ tagName: "div", classNames: ["profile-wrapper"] });

function renderProfileContent(response: Customer): void {
  const titleMain = createElement({ tagName: "h2", classNames: ["profile__heading"], textContent: "Профиль пользователя" });
  const accountWrapper = createElement({ tagName: "div", classNames: ["profile-account-wrapper"] });
  const addressesWrapper = createElement({ tagName: "div", classNames: ["profile-addresses-wrapper"] });
  createAccountView(response, accountWrapper);
  createAddressesView(response, addressesWrapper);
  profile.append(titleMain, accountWrapper, addressesWrapper);
}
