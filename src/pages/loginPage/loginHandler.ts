import fetch from "node-fetch";
import {
  ClientBuilder,
  type PasswordAuthMiddlewareOptions, // Required for password flow
  type HttpMiddlewareOptions,
  TokenCache,
  TokenStore,
} from "@commercetools/sdk-client-v2";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { createSnackbar } from "../../components/elements";
import { Pages, SnackbarType } from "../../types/types";
import { state } from "../../store/state";
import { setItemToLocalStorage } from "../../utils/utils";
import { projectKey, clientId, clientSecret, authHost, apiHost, scopes } from "../../api/constants";
import { addUserGreetingToHeader, menuItemLogIn, menuItemLogOut, menuItemSingUp, menuItemUserProfile, userMenu } from "../basePage/basePage";

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
        setItemToLocalStorage("user", user);
        const token = tokenCache.myCache.refreshToken as string;
        window.location.reload();
        changeAppAfterLogin(user, token);
      }
    })
    .catch(() => {
      createSnackbar(SnackbarType.error, "Вы ввели неправильный адрес электронной почты или пароль");
    });
};
