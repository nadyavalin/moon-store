import fetch from "node-fetch";
import {
  ClientBuilder,
  type PasswordAuthMiddlewareOptions, // Required for password flow
  type HttpMiddlewareOptions,
  TokenCache,
  TokenStore,
} from "@commercetools/sdk-client-v2";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { createSnackbar } from "src/components/elements";
import { Pages, SnackbarType } from "src/types/types";
import { state } from "src/store/state";
import { setItemToLocalStorage } from "src/utils/utils";
import { projectKey, clientId, clientSecret, authHost, apiHost, scopes } from "src/api/constants";
import { addUserGreetingToHeader, menuItemLogIn, menuItemLogOut, menuItemSingUp, userMenu } from "../basePage/basePage";

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
  myCache: TokenStore = { token: "", expirationTime: 0 }; // начальные значения для кэша

  set(newCache: TokenStore) {
    // устанавливаем новый кэш
    this.myCache = newCache;
  }

  get(): TokenStore {
    // возвращаем текущий кэш
    return this.myCache;
  }
}

const tokenCache = new MyTokenCache();

export function changeAppAfterLogin(userName: string, refreshToken?: string) {
  if (refreshToken) {
    setItemToLocalStorage("refreshToken", refreshToken);
    createSnackbar(SnackbarType.success, "Вы авторизованы");
  }
  setItemToLocalStorage("user", userName);
  window.location.hash = Pages.MAIN;
  menuItemLogIn.href = Pages.MAIN;
  menuItemSingUp.href = Pages.MAIN;
  state.name = userName;
  addUserGreetingToHeader();
  userMenu.append(menuItemLogOut);
}

export const authorizeUserWithToken = (email: string, password: string) => {
  // Configure password flow
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

  // Configure httpMiddlewareOptions
  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: apiHost,
    fetch,
  };

  // ClientBuilder
  const ctpClient = new ClientBuilder()
    .withProjectKey(projectKey)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .withLoggerMiddleware() // Include middleware for logging
    .build();

  // Create apiRoot
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });

  apiRoot
    .me()
    .login()
    .post({
      body: {
        email,
        password,
      },
    })
    .execute()
    .then((response) => {
      if (response.statusCode === 200) {
        const user = response.body.customer.firstName as string;
        const token = tokenCache.myCache.refreshToken as string;
        changeAppAfterLogin(user, token);
      }
    })
    .catch(() => {
      createSnackbar(SnackbarType.error, "Вы ввели неправильный адрес электронной почты или пароль");
    });
};
