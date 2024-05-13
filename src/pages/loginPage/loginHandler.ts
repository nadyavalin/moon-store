import fetch from "node-fetch";
import {
  ClientBuilder,
  type PasswordAuthMiddlewareOptions, // Required for password flow
  type HttpMiddlewareOptions,
} from "@commercetools/sdk-client-v2";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { createSnackbar } from "src/components/elements";

const projectKey = process.env.CTP_PROJECT_KEY as string;
const scopes = [process.env.CTP_SCOPES] as string[];

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
  };

  // Configure httpMiddlewareOptions
  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: "https://api.europe-west1.gcp.commercetools.com",
    fetch,
  };

  // ClientBuilder
  const ctpClient = new ClientBuilder()
    .withHttpMiddleware(httpMiddlewareOptions)
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .withLoggerMiddleware() // Include middleware for logging
    .build();

  // Create apiRoot
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });

  apiRoot
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
        createSnackbar("Вы авторизованы!");
        window.location.hash = "#main";
      }
    })
    .catch(() => {
      createSnackbar("Такого пользователя не существует!");
    });
};

function loginFormHandler(email: string, password: string) {
  authorizeUserWithToken(email, password);
}

export default loginFormHandler;
