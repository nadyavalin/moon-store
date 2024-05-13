import ctpClient from "BuildClient";
import { CustomerDraft, createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: "steps-moon-store" });

const createCustomer = (requestBody: CustomerDraft) =>
  apiRoot
    .customers()
    .post({
      body: requestBody,
    })
    .execute();

export default createCustomer;
