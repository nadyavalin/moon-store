import { Pages } from "src/types/types";
import { getItemFromLocalStorage } from "src/utils/utils";
import { menuItemLogIn, menuItemLogOut, menuItemSingUp, userMenu, addUserGreetingToHeader } from "src/pages/basePage/basePage";
import { createApiBuilderFromCtpClient, MyCustomerDraft } from "@commercetools/platform-sdk";
import { state } from "src/store/state";
import generateAnonymousSessionFlow from "./anonymousClientBuilder";
import generateRefreshTokenFlow from "./refreshTokenClientBuilder";

let ctpClient;
if (!state.refreshToken) {
  ctpClient = generateAnonymousSessionFlow();
}
if (state.refreshToken) {
  window.location.hash = Pages.MAIN;
  menuItemLogIn.href = Pages.MAIN;
  menuItemSingUp.href = Pages.MAIN;
  state.name = getItemFromLocalStorage<string>("user");
  userMenu.append(menuItemLogOut);
  addUserGreetingToHeader();
  ctpClient = generateRefreshTokenFlow();
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: "steps-moon-store" });
  apiRoot.me().get().execute();
}

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: "steps-moon-store" });

const createCustomer = (requestBody: MyCustomerDraft) =>
  apiRoot
    .me()
    .signup()
    .post({
      body: requestBody,
    })
    .execute();

export default createCustomer;
