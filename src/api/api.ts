import { changeAppAfterLogin } from "../pages/loginPage/loginHandler";
import {
  createApiBuilderFromCtpClient,
  MyCustomerDraft,
  ByProjectKeyRequestBuilder,
  CustomerSetFirstNameAction,
  CustomerUpdateAction,
} from "@commercetools/platform-sdk";
import { state } from "../store/state";
import generateAnonymousSessionFlow from "./anonymousClientBuilder";
import generateRefreshTokenFlow from "./refreshTokenClientBuilder";
import { getItemFromLocalStorage } from "../utils/utils";

export const createApiRoot = () => {
  if (!state.refreshToken) {
    const ctpClient = generateAnonymousSessionFlow();
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: "steps-moon-store" });
    state.apiRoot = apiRoot;
  } else {
    const user = state.name as string;
    changeAppAfterLogin(user);
    const ctpClient = generateRefreshTokenFlow(state.refreshToken);
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: "steps-moon-store" });
    state.apiRoot = apiRoot;
  }
};

export const getProducts = () => state.apiRoot?.productProjections().get().execute();
export const getCategories = () => state.apiRoot?.categories().get().execute();
export const createCustomer = (requestBody: MyCustomerDraft) =>
  state.apiRoot
    ?.me()
    .signup()
    .post({
      body: requestBody,
    })
    .execute();

export const getUserData = (customerID: string) => state.apiRoot?.customers().withId({ ID: customerID }).get().execute();

export const updateCustomer = (version: number, actions: CustomerUpdateAction[]) =>
  state.apiRoot
    ?.customers()
    .withId({
      ID: state.customerId as string,
    })
    .post({
      body: {
        version,
        actions,
      },
    })
    .execute();
