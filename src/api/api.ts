import { changeAppAfterLogin } from "src/pages/loginPage/loginHandler";
import { createApiBuilderFromCtpClient, MyCustomerDraft, ByProjectKeyRequestBuilder } from "@commercetools/platform-sdk";
import { state } from "src/store/state";
import generateAnonymousSessionFlow from "./anonymousClientBuilder";
import generateRefreshTokenFlow from "./refreshTokenClientBuilder";
import { getItemFromLocalStorage } from "src/utils/utils";

let apiRoot: ByProjectKeyRequestBuilder;
if (!state.refreshToken) {
  const ctpClient = generateAnonymousSessionFlow();
  apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: "steps-moon-store" });
} else {
  const user = getItemFromLocalStorage("user") as string;
  changeAppAfterLogin(user);
  const ctpClient = generateRefreshTokenFlow(state.refreshToken);
  apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: "steps-moon-store" });
}

/// Функция для получения данных по клику на "Профиль"
export const getUserData = () => apiRoot.me().get().execute();

export const getProducts = () => apiRoot.productProjections().get().execute();

export const createCustomer = (requestBody: MyCustomerDraft) =>
  apiRoot
    .me()
    .signup()
    .post({
      body: requestBody,
    })
    .execute();
