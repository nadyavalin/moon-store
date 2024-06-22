import fetch from "node-fetch";
import { ClientBuilder, type PasswordAuthMiddlewareOptions, type HttpMiddlewareOptions, TokenCache, TokenStore } from "@commercetools/sdk-client-v2";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { createSnackbar } from "../../components/elements";
import { Pages, SnackbarType } from "../../types/types";
import { projectKey, clientId, clientSecret, authHost, apiHost, scopes } from "../../api/constants";
import { addUserGreetingToHeader, menuItemLogIn, menuItemLogOut, menuItemSingUp, menuItemUserProfile, userMenu } from "../basePage/basePage";
import { showQuantityItemsInHeader } from "../basket/basketHandler";
import { appStore } from "../../store/store";

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
    appStore.setState({ refreshToken: refreshToken });
    createSnackbar(SnackbarType.success, "Вы авторизованы");
    window.location.hash = Pages.MAIN;
  }
  if (customerId) {
    appStore.setState({ customerId: customerId });
  }
  if (cartId) {
    appStore.setState({ cartId: cartId });
  }
  menuItemLogIn.href = Pages.MAIN;
  menuItemSingUp.href = Pages.MAIN;
  appStore.setState({ name: userName });
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

  appStore.setState({ apiRoot: createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey }) });

  appStore.state.apiRoot
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
        const cartId = response.body.cart?.id;
        const userID = response.body.customer.id;
        const token = tokenCache.myCache.refreshToken as string;
        changeAppAfterLogin(user, token, userID, cartId);
      }
    })
    .catch(() => {
      createSnackbar(SnackbarType.error, "Вы ввели неправильный адрес электронной почты или пароль");
    });
};
