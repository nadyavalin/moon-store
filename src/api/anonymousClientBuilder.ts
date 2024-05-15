import { AnonymousAuthMiddlewareOptions, Client } from "@commercetools/sdk-client-v2";
import fetch from "node-fetch";
import {
  ClientBuilder,

  // Import middlewares
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from "@commercetools/sdk-client-v2";

function generateAnonymousSessionFlow(): Client {
  const projectKey = process.env.CTP_PROJECT_KEY as string;
  const scopes = [process.env.CTP_SCOPES as string];
  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: "https://api.europe-west1.gcp.commercetools.com",
    fetch,
  };

  const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
    host: "https://auth.europe-west1.gcp.commercetools.com",
    projectKey,
    credentials: {
      clientId: process.env.CTP_CLIENT_ID as string,
      clientSecret: process.env.CTP_CLIENT_SECRET as string,
      anonymousId: process.env.CTP_ANONYMOUS_ID, // a unique id
    },
    scopes,
    fetch,
  };

  const ctpClient = new ClientBuilder().withAnonymousSessionFlow(anonymousAuthMiddlewareOptions).withHttpMiddleware(httpMiddlewareOptions).build();

  return ctpClient;
}

export default generateAnonymousSessionFlow;
