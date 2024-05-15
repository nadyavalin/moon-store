import { CustomerDraft, createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import generateAnonymousSessionFlow from "./anonymousClientBuilder";

let ctpClient;
if (!localStorage.getItem("token")) {
  ctpClient = generateAnonymousSessionFlow();
  console.log("аноним");
}
if (localStorage.getItem("token")) {
  ctpClient = console.log("рефреш"); // generateAnonymousSessionFlow();
}

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: "steps-moon-store" });

const createCustomer = (requestBody: CustomerDraft) =>
  apiRoot
    .customers()
    .post({
      body: requestBody,
    })
    .execute();

export default createCustomer;
