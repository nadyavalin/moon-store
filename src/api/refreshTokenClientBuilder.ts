import fetch from "node-fetch";
import { ClientBuilder, type HttpMiddlewareOptions, type RefreshAuthMiddlewareOptions } from "@commercetools/sdk-client-v2";
import { projectKey, clientId, clientSecret, authHost, apiHost } from "src/api/constants";

function generateRefreshTokenFlow(refreshToken: string) {
  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: apiHost,
    fetch,
  };

  const options: RefreshAuthMiddlewareOptions = {
    host: authHost,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
    },
    refreshToken,
    fetch,
  };

  const ctpClient = new ClientBuilder()
    .withProjectKey(projectKey)
    .withRefreshTokenFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return ctpClient;
}

export default generateRefreshTokenFlow;
