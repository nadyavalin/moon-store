import { changeAppAfterLogin } from "../pages/loginPage/loginHandler";
import { createApiBuilderFromCtpClient, MyCustomerDraft, ByProjectKeyRequestBuilder, CustomerSetFirstNameAction } from "@commercetools/platform-sdk";
import { state } from "../store/state";
import generateAnonymousSessionFlow from "./anonymousClientBuilder";
import generateRefreshTokenFlow from "./refreshTokenClientBuilder";
import { getItemFromLocalStorage } from "../utils/utils";

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

export const getProducts = () => apiRoot.productProjections().get().execute();
export const createCustomer = (requestBody: MyCustomerDraft) =>
  apiRoot
    .me()
    .signup()
    .post({
      body: requestBody,
    })
    .execute();

export const getUserData = (customerID: string) => apiRoot.customers().withId({ ID: customerID }).get().execute();

export const updateFirstNameCustomer = (firstName: string, version: number) =>
  apiRoot
    .customers()
    .withId({
      ID: state.customerId as string,
    })
    .post({
      body: {
        version,
        actions: [
          {
            action: "setFirstName",
            firstName,
          },
        ],
      },
    })
    .execute();

export const updateLastNameCustomer = (lastName: string, version: number) =>
  apiRoot
    .customers()
    .withId({
      ID: state.customerId as string,
    })
    .post({
      body: {
        version,
        actions: [
          {
            action: "setLastName",
            lastName,
          },
        ],
      },
    })
    .execute();

export const updateDateOfBirthCustomer = (dateOfBirth: string, version: number) =>
  apiRoot
    .customers()
    .withId({
      ID: state.customerId as string,
    })
    .post({
      body: {
        version,
        actions: [
          {
            action: "setDateOfBirth",
            dateOfBirth,
          },
        ],
      },
    })
    .execute();

export const updateEmailCustomer = (email: string, version: number) =>
  apiRoot
    .customers()
    .withId({
      ID: state.customerId as string,
    })
    .post({
      body: {
        version,
        actions: [
          {
            action: "changeEmail",
            email,
          },
        ],
      },
    })
    .execute();
