import { changeAppAfterLogin } from "src/pages/loginPage/loginHandler";
import { addUserGreetingToHeader } from "src/pages/basePage/basePage";
import { createApiBuilderFromCtpClient, MyCustomerDraft } from "@commercetools/platform-sdk";
import { Client } from "@commercetools/sdk-client-v2";
import { state } from "src/store/state";
import generateAnonymousSessionFlow from "./anonymousClientBuilder";
import generateRefreshTokenFlow from "./refreshTokenClientBuilder";

let ctpClient: Client;
if (!state.refreshToken) {
  ctpClient = generateAnonymousSessionFlow();
} else {
  addUserGreetingToHeader();
  ctpClient = generateRefreshTokenFlow(state.refreshToken);
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: "steps-moon-store" });
  apiRoot
    .me()
    .get()
    .execute()
    .then((response) => {
      if (response.statusCode === 200) {
        const userName = response.body.firstName as string;
        changeAppAfterLogin(userName);
      }
    });
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
