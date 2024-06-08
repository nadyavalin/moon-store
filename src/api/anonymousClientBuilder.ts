import { AnonymousAuthMiddlewareOptions, Client } from "@commercetools/sdk-client-v2";
import fetch from "node-fetch";
import {
  ClientBuilder,

  // Import middlewares
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from "@commercetools/sdk-client-v2";
import { projectKey, clientId, clientSecret, authHost, apiHost, scopes } from "../api/constants";
import { generateRandomString } from "../utils/utils";

export const anonymousId = generateRandomString(12);
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
      anonymousId,
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
