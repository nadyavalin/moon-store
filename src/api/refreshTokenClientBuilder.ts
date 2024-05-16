import fetch from "node-fetch";
import {
  ClientBuilder,

  // Import middlewares
  type HttpMiddlewareOptions, // Required for sending HTTP requests
  type RefreshAuthMiddlewareOptions,
} from "@commercetools/sdk-client-v2";

function generateRefreshTokenFlow() {
  const projectKey = process.env.CTP_PROJECT_KEY as string;
  const refreshToken = localStorage.getItem("refreshToken") as string;

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: "https://api.europe-west1.gcp.commercetools.com",
    fetch,
  };

  const options: RefreshAuthMiddlewareOptions = {
    host: "https://auth.europe-west1.gcp.commercetools.com",
    projectKey,
    credentials: {
      clientId: process.env.CTP_CLIENT_ID as string,
      clientSecret: process.env.CTP_CLIENT_SECRET as string,
    },
    refreshToken,
    fetch,
  };

  const ctpClient = new ClientBuilder()
    .withProjectKey(projectKey)
    .withRefreshTokenFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware() // Include middleware for logging
    .build();

  return ctpClient;
}

export default generateRefreshTokenFlow;
