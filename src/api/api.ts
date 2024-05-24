import { changeAppAfterLogin } from "src/pages/loginPage/loginHandler";
import { ByProjectKeyRequestBuilder, createApiBuilderFromCtpClient, MyCustomerDraft } from "@commercetools/platform-sdk";
import { state } from "src/store/state";
import generateAnonymousSessionFlow from "./anonymousClientBuilder";
import generateRefreshTokenFlow from "./refreshTokenClientBuilder";

let apiRoot: ByProjectKeyRequestBuilder;
if (!state.refreshToken) {
  const ctpClient = generateAnonymousSessionFlow();
  apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: "steps-moon-store" });
} else {
  const ctpClient = generateRefreshTokenFlow(state.refreshToken);
  apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: "steps-moon-store" });
  getCustomerData();
}

function getCustomerData() {
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

export const getProfileInfo = () => apiRoot.me().get().execute();

export const createCustomer = (requestBody: MyCustomerDraft) =>
  apiRoot
    .me()
    .signup()
    .post({
      body: requestBody,
    })
    .execute();
