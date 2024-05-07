import fetch from "node-fetch";
import {
  ClientBuilder,

  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from "@commercetools/sdk-client-v2";

const projectKey = process.env.CTP_PROJECT_KEY as string;
const scopes = [
  "manage_my_shopping_lists:steps-moon-store manage_my_orders:steps-moon-store manage_customers:steps-moon-store:steps-moon-store view_discount_codes:steps-moon-store manage_my_shopping_lists:steps-moon-store:steps-moon-store view_shipping_methods:steps-moon-store manage_my_payments:steps-moon-store manage_shopping_lists:steps-moon-store:steps-moon-store view_published_products:steps-moon-store manage_orders:steps-moon-store:steps-moon-store manage_my_profile:steps-moon-store:steps-moon-store view_cart_discounts:steps-moon-store manage_my_business_units:steps-moon-store manage_my_quote_requests:steps-moon-store manage_cart_discounts:steps-moon-store:steps-moon-store manage_my_orders:steps-moon-store:steps-moon-store view_categories:steps-moon-store manage_my_quotes:steps-moon-store manage_my_profile:steps-moon-store create_anonymous_token:steps-moon-store",
];

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: "https://auth.europe-west1.gcp.commercetools.com",
  projectKey,
  credentials: {
    clientId: process.env.CTP_CLIENT_ID as string,
    clientSecret: process.env.CTP_CLIENT_SECRET as string,
  },
  scopes,
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: "https://api.europe-west1.gcp.commercetools.com",
  fetch,
};

// Export the ClientBuilder
const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();

export default ctpClient;
