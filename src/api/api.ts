import { menuItemLogIn, menuItemLogOut, userMenu, menuItemSingUp } from "src/pages/basePage/basePage";
import { Pages } from "src/types/types";
import { createApiBuilderFromCtpClient, MyCustomerDraft } from "@commercetools/platform-sdk";
import generateAnonymousSessionFlow from "./anonymousClientBuilder";
import generateRefreshTokenFlow from "./refreshTokenClientBuilder";

let ctpClient;
if (!localStorage.getItem("refreshToken")) {
  ctpClient = generateAnonymousSessionFlow();
}
if (localStorage.getItem("refreshToken")) {
  userMenu.append(menuItemLogOut);
  menuItemLogOut.onclick = () => {
    localStorage.removeItem("refreshToken");
    menuItemLogIn.href = Pages.LOGIN;
    menuItemSingUp.href = Pages.REGISTRATION;
    menuItemLogOut.remove();
  };
  menuItemLogIn.href = Pages.MAIN;
  menuItemSingUp.href = Pages.MAIN;
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
