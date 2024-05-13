// import fetch from "node-fetch";
// import {
//   ClientBuilder,

//   // Import middlewares
//   type AuthMiddlewareOptions, // Required for auth
//   type HttpMiddlewareOptions, // Required for sending HTTP requests
//   type PasswordAuthMiddlewareOptions, // Required for password flow
// } from "@commercetools/sdk-client-v2";

// const projectKey = process.env.CTP_PROJECT_KEY as string;
// const scopes = [process.env.CTP_SCOPES] as string[]

// // Configure authMiddlewareOptions
// const authMiddlewareOptions: AuthMiddlewareOptions = {
//   host: "https://auth.europe-west1.gcp.commercetools.com",
//   projectKey,
//   credentials: {
//     clientId: process.env.CTP_CLIENT_ID as string,
//     clientSecret: process.env.CTP_CLIENT_SECRET as string,
//   },
//   scopes,
//   fetch,
// };

// // Configure httpMiddlewareOptions
// const httpMiddlewareOptions: HttpMiddlewareOptions = {
//   host: "https://api.europe-west1.gcp.commercetools.com",
//   fetch,
// };

// // Configure password flow
// const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
//   host: "https://auth.europe-west1.gcp.commercetools.com",
//   projectKey,
//   credentials: {
//     clientId: process.env.CTP_CLIENT_ID as string,
//     clientSecret: process.env.CTP_CLIENT_SECRET as string,
//     user: {
//       username: "example@example.ru",
//       password: "Example1",
//     },
//   },
//   scopes,
//   fetch,
// };

// // Export the ClientBuilder for auth
// const ctpClientAuthorization = new ClientBuilder()
//   .withPasswordFlow(passwordAuthMiddlewareOptions)
//   .withLoggerMiddleware() // Include middleware for logging
//   .build();
// // const ctpClient = new ClientBuilder()
// //   .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
// //   .withClientCredentialsFlow(authMiddlewareOptions)
// //   .withPasswordFlow(passwordAuthMiddlewareOptions)
// //   .withHttpMiddleware(httpMiddlewareOptions)
// //   .withLoggerMiddleware() // Include middleware for logging
// //   .build();

// // export default ctpClient;
