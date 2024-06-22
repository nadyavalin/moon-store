import {
  createApiBuilderFromCtpClient,
  MyCustomerDraft,
  CustomerUpdateAction,
  QueryParam,
  CartUpdateAction,
  CartAddDiscountCodeAction,
} from "@commercetools/platform-sdk";

import generateAnonymousSessionFlow from "./anonymousClientBuilder";
import generateRefreshTokenFlow from "./refreshTokenClientBuilder";
import { changeAppAfterLogin } from "../pages/loginPage/loginHandler";
import { Client } from "@commercetools/sdk-client-v2";
import { setItemToLocalStorage } from "../utils/utils";
import { anonymousId } from "./anonymousClientBuilder";
import { showQuantityItemsInHeader } from "../pages/basket/basketHandler";
import { appStore } from "../store/store";

export const createApiRoot = () => {
  let ctpClient: Client;
  if (!appStore.state.refreshToken) {
    ctpClient = generateAnonymousSessionFlow();
  } else {
    const user = appStore.state.name as string;
    changeAppAfterLogin(user);
    ctpClient = generateRefreshTokenFlow(appStore.state.refreshToken);
  }
  appStore.setState({ apiRoot: createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: "steps-moon-store" }) });
};

export const cartHandler = async () => {
  if (appStore.state.refreshToken) {
    const response = await getCart();
    showQuantityItemsInHeader(response?.body);
    return;
  }
  if (!appStore.state.cartId) {
    const response = await createCart({ currency: "RUB", country: "RU" });
    const cartId = response?.body.id;
    const anonymousId = response?.body.anonymousId;
    setItemToLocalStorage("cart-id", `${cartId}`);
    setItemToLocalStorage("anonymousId", anonymousId);
    showQuantityItemsInHeader(response?.body);
    appStore.setState({ cartId: cartId });
    appStore.setState({ anonymousId: anonymousId });
  } else if (anonymousId !== appStore.state.anonymousId) {
    const response = await getCart();
    const version = response?.body.version as number;
    await updateCart(version, [
      {
        action: "setAnonymousId",
        anonymousId: `${anonymousId}`,
      },
    ]);
    showQuantityItemsInHeader(response?.body);
  }
};

export const getProducts = (queryArgs?: Record<string, QueryParam>) =>
  appStore.state.apiRoot
    ?.productProjections()
    .search()
    .get({ queryArgs: { limit: 8, offset: 0, ...queryArgs } })
    .execute();

export const getCategories = () => appStore.state.apiRoot?.categories().get().execute();

export const createCustomer = (requestBody: MyCustomerDraft) =>
  appStore.state.apiRoot
    ?.me()
    .signup()
    .post({
      body: requestBody,
    })
    .execute();

export const createCart = (requestBody: { currency: string; country: string }) =>
  appStore.state.apiRoot
    ?.me()
    .carts()
    .post({
      body: requestBody,
    })
    .execute();

export const getCart = () =>
  appStore.state.apiRoot
    ?.carts()
    .withId({ ID: appStore.state.cartId as string })
    .get()
    .execute();

export const updateCart = (version: number, actions: CartUpdateAction[]) =>
  appStore.state.apiRoot
    ?.carts()
    .withId({ ID: appStore.state.cartId as string })
    .post({
      body: {
        version,
        actions,
      },
    })
    .execute();

export const getUserData = () =>
  appStore.state.apiRoot
    ?.customers()
    .withId({ ID: appStore.state.customerId as string })
    .get()
    .execute();

export const updateCustomer = (version: number, actions: CustomerUpdateAction[]) =>
  appStore.state.apiRoot
    ?.customers()
    .withId({
      ID: appStore.state.customerId as string,
    })
    .post({
      body: {
        version,
        actions,
      },
    })
    .execute();

export const changePassword = (id: string, version: number, currentPassword: string, newPassword: string) =>
  appStore.state.apiRoot
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

export const getDiscounts = () => appStore.state.apiRoot?.discountCodes().get().execute();

export const addDiscountAction = (version: number, actions: CartAddDiscountCodeAction[]) =>
  appStore.state.apiRoot
    ?.me()
    .carts()
    .withId({ ID: appStore.state.cartId as string })
    .post({
      body: {
        version,
        actions,
      },
    })
    .execute();
