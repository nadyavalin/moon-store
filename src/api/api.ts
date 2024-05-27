import { changeAppAfterLogin } from "../pages/loginPage/loginHandler";
import { createApiBuilderFromCtpClient, MyCustomerDraft, ByProjectKeyRequestBuilder, CustomerUpdateAction } from "@commercetools/platform-sdk";
import { state } from "../store/state";
import generateAnonymousSessionFlow from "./anonymousClientBuilder";
import generateRefreshTokenFlow from "./refreshTokenClientBuilder";
import { getItemFromLocalStorage } from "../utils/utils";

export let apiRoot: ByProjectKeyRequestBuilder;
if (!state.refreshToken) {
  const ctpClient = generateAnonymousSessionFlow();
  apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: "steps-moon-store" });
} else {
  const user = getItemFromLocalStorage("user") as string;
  changeAppAfterLogin(user);
  const ctpClient = generateRefreshTokenFlow(state.refreshToken);
  apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: "steps-moon-store" });
}

export const getProductDataWithId = (id: string) => apiRoot.productProjections().withId({ ID: id }).get().execute();

export const getProductsByCategory = (id: string) =>
  apiRoot
    .productProjections()
    .search()
    .get({ queryArgs: { "filter.query": `categories.id:"${id}"` } })
    .execute();

export const getProducts = () => apiRoot.productProjections().get().execute();
export const getCategories = () => apiRoot.categories().get().execute();
export const createCustomer = (requestBody: MyCustomerDraft) =>
  apiRoot
    .me()
    .signup()
    .post({
      body: requestBody,
    })
    .execute();

export const getUserData = (customerID: string) => apiRoot.customers().withId({ ID: customerID }).get().execute();

export const updateCustomer = (version: number, actions: CustomerUpdateAction[]) =>
  apiRoot
    .customers()
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
