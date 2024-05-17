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
import { Pages } from "src/types/types";
import { state } from "src/store/state";
import { setItemToLocalStorage } from "src/utils/utils";
import { addUserGreetingToHeader, menuItemLogIn, menuItemLogOut, menuItemSingUp, userMenu } from "../basePage/basePage";

const projectKey = process.env.CTP_PROJECT_KEY as string;
const scopes = [process.env.CTP_SCOPES] as string[];

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

function changeAppAfterLogin(userName: string | undefined, refreshToken: string | undefined) {
  setItemToLocalStorage("refreshToken", refreshToken);
  createSnackbar("Вы авторизованы");
  window.location.hash = Pages.MAIN;
  menuItemLogIn.href = Pages.MAIN;
  menuItemSingUp.href = Pages.MAIN;
  setItemToLocalStorage("user", userName);
  state.name = userName;
  addUserGreetingToHeader();
  userMenu.append(menuItemLogOut);
}

const authorizeUserWithToken = (email: string, password: string) => {
  // Configure password flow
  const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: "https://auth.europe-west1.gcp.commercetools.com",
    projectKey,
    credentials: {
      clientId: process.env.CTP_CLIENT_ID as string,
      clientSecret: process.env.CTP_CLIENT_SECRET as string,
      user: {
        username: email,
        password,
      },
    },
    scopes,
    fetch,
    tokenCache,
  };

  // Configure httpMiddlewareOptions
  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: "https://api.europe-west1.gcp.commercetools.com",
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
        changeAppAfterLogin(response.body.customer.firstName, tokenCache.myCache.refreshToken);
      }
    })
    .catch(() => {
      createSnackbar("Вы ввели неправильный адрес электронной почты или пароль");
    });
};

export default authorizeUserWithToken;
