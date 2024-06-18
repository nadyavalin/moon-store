import fetch from "node-fetch";
import { ClientBuilder, type PasswordAuthMiddlewareOptions, type HttpMiddlewareOptions, TokenCache, TokenStore } from "@commercetools/sdk-client-v2";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { createSnackbar } from "../../components/elements";
import { Pages, SnackbarType } from "../../types/types";
import { state } from "../../store/state";
import { setItemToLocalStorage } from "../../utils/utils";
import { projectKey, clientId, clientSecret, authHost, apiHost, scopes } from "../../api/constants";
import { addUserGreetingToHeader, menuItemLogIn, menuItemLogOut, menuItemSingUp, menuItemUserProfile, userMenu } from "../basePage/basePage";
import { getCart } from "src/api/api";
import { showQuantityItemsInHeader } from "../basket/basketHandler";

export const showHidePasswordHandler = (togglePassword: HTMLInputElement, passwordInput: HTMLInputElement) => {
  const toggle = togglePassword;
  const password = passwordInput;
  toggle.onchange = () => {
    if (toggle.checked) {
      password.type = "text";
    } else {
      password.type = "password";
    }
  };
};

class MyTokenCache implements TokenCache {
  myCache: TokenStore = { token: "", expirationTime: 0 };

  set(newCache: TokenStore) {
    this.myCache = newCache;
  }

  get(): TokenStore {
    return this.myCache;
  }
}

export async function changeAppAfterLogin(userName: string, refreshToken?: string, customerId?: string, cartId?: string) {
  if (refreshToken) {
    setItemToLocalStorage("refreshToken", refreshToken);
    state.refreshToken = refreshToken;
    createSnackbar(SnackbarType.success, "Вы авторизованы");
    window.location.hash = Pages.MAIN;
  }
  if (customerId) {
    state.customerId = customerId;
  }
  if (cartId) {
    state.cartId = cartId;
  }
  menuItemLogIn.href = Pages.MAIN;
  menuItemSingUp.href = Pages.MAIN;
  state.name = userName;
  addUserGreetingToHeader();
  menuItemLogIn.remove();
  menuItemSingUp.remove();
  userMenu.append(menuItemUserProfile);
  userMenu.append(menuItemLogOut);
  menuItemLogOut.classList.remove("active");
}

export const authorizeUserWithToken = (email: string, password: string) => {
  const tokenCache = new MyTokenCache();
  const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: authHost,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
      user: {
        username: email,
        password,
      },
    },
    scopes: [scopes],
    fetch,
    tokenCache,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: apiHost,
    fetch,
  };

  const ctpClient = new ClientBuilder()
    .withProjectKey(projectKey)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  state.apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });

  state.apiRoot
    ?.me()
    .login()
    .post({
      body: {
        email,
        password,
        activeCartSignInMode: "MergeWithExistingCustomerCart",
      },
    })
    .execute()
    .then(async (response) => {
      if (response.statusCode === 200) {
        showQuantityItemsInHeader(response.body.cart);
        const user = response.body.customer.firstName as string;
        setItemToLocalStorage("user", user);
        const cartId = response.body.cart?.id;
        setItemToLocalStorage("cart-id", cartId);
        const userID = response.body.customer.id;
        setItemToLocalStorage("customerId", userID);
        const token = tokenCache.myCache.refreshToken as string;
        changeAppAfterLogin(user, token, userID, cartId);
      }
    })
    .catch(() => {
      createSnackbar(SnackbarType.error, "Вы ввели неправильный адрес электронной почты или пароль");
    });
};
