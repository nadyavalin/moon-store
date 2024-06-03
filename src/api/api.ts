import { changeAppAfterLogin } from "../pages/loginPage/loginHandler";

import { createApiBuilderFromCtpClient, MyCustomerDraft, CustomerUpdateAction, QueryParam } from "@commercetools/platform-sdk";

import { state } from "../store/state";
import generateAnonymousSessionFlow from "./anonymousClientBuilder";
import generateRefreshTokenFlow from "./refreshTokenClientBuilder";
import { Client } from "@commercetools/sdk-client-v2";

export const createApiRoot = () => {
  let ctpClient: Client;
  if (!state.refreshToken) {
    ctpClient = generateAnonymousSessionFlow();
  } else {
    const user = state.name as string;
    changeAppAfterLogin(user);
    ctpClient = generateRefreshTokenFlow(state.refreshToken);
  }
  state.apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: "steps-moon-store" });
};

export const getProducts = (queryArgs?: Record<string, QueryParam>) =>
  state.apiRoot
    ?.productProjections()
    .search()
    .get({ queryArgs: { limit: 50, ...queryArgs } })
    .execute();

export const getProductsByFilter = (queries: string[]) =>
  state.apiRoot
    ?.productProjections()
    .search()
    .get({ queryArgs: { filter: queries } })
    .execute();
export const getCategories = () => state.apiRoot?.categories().get().execute();
export const createCustomer = (requestBody: MyCustomerDraft) =>
  state.apiRoot
    ?.me()
    .signup()
    .post({
      body: requestBody,
    })
    .execute();

export const getUserData = () =>
  state.apiRoot
    ?.customers()
    .withId({ ID: state.customerId as string })
    .get()
    .execute();

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

export const changePassword = (id: string, version: number, currentPassword: string, newPassword: string) =>
  state.apiRoot
    ?.customers()
    .password()
    .post({
      body: {
        id,
        version,
        currentPassword,
        newPassword,
      },
    })
    .execute();
