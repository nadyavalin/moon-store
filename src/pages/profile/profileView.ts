import { getUserData } from "../../api/api";
import { createElement } from "../../components/elements";
import "./profile.css";
import "../../index.css";
import { createAccountView } from "./profileAccountView";
import { createAddressesView } from "./profileAddressesView";

export async function renderProfileContent(): Promise<HTMLElement> {
  const response = await getUserData();
  const profile = createElement({ tagName: "div", classNames: ["profile-wrapper"] });
  const titleMain = createElement({ tagName: "h2", classNames: ["profile__heading"], textContent: "Профиль пользователя" });
  const accountWrapper = createElement({ tagName: "div", classNames: ["profile-account-wrapper"] });
  const addressesWrapper = createElement({ tagName: "div", classNames: ["profile-addresses-wrapper"] });
  createAccountView(response?.body, accountWrapper);
  createAddressesView(response?.body, addressesWrapper);
  profile.append(titleMain, accountWrapper, addressesWrapper);
  return profile;
}
