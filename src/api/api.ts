import changeAppAfterLogout from "src/pages/loginPage/logoutHandler";
import { createApiBuilderFromCtpClient, MyCustomerDraft } from "@commercetools/platform-sdk";
import { state } from "src/store/state";
import { addUserGreetingToHeader } from "src/pages/basePage/basePage";
import generateAnonymousSessionFlow from "./anonymousClientBuilder";
import generateRefreshTokenFlow from "./refreshTokenClientBuilder";

let ctpClient;
if (!state.refreshToken) {
  ctpClient = generateAnonymousSessionFlow();
}
if (state.refreshToken) {
  changeAppAfterLogout();
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
