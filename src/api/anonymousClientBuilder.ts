import { AnonymousAuthMiddlewareOptions, Client } from "@commercetools/sdk-client-v2";
import fetch from "node-fetch";
import {
  ClientBuilder,

  // Import middlewares
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from "@commercetools/sdk-client-v2";
import { projectKey, clientId, clientSecret, authHost, apiHost, scopes } from "src/api/constants";

function generateAnonymousSessionFlow(): Client {
  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: apiHost,
    fetch,
  };

  const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
    host: authHost,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
    },
    scopes: [scopes],
    fetch,
  };

  const ctpClient = new ClientBuilder()
    .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return ctpClient;
}

export default generateAnonymousSessionFlow;
