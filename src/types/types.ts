import { Category } from "@commercetools/platform-sdk";
import { ByProjectKeyRequestBuilder } from "@commercetools/platform-sdk";
import { ClientResponse, ProductProjectionPagedQueryResponse } from "@commercetools/platform-sdk";

export interface State {
  name?: string | null;
  refreshToken: string | null;
  customerId: string | null;
  apiRoot?: ByProjectKeyRequestBuilder | null;
}

export interface Customer {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: [{ country: string; city: string; streetName: string; postalCode: string }];
  shippingAddresses: [number];
  billingAddresses?: [number];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

export interface Slider {
  response?: ClientResponse<ProductProjectionPagedQueryResponse>;
}

export enum Pages {
  ROOT = "",
  MAIN = "#main",
  PROFILE = "#profile",
  CATALOG = "#catalog",
  BASKET = "#basket",
  ABOUT = "#about",
  LOGIN = "#login",
  REGISTRATION = "#registration",
  PRODUCT = "#product",
}

export enum SnackbarType {
  error = "error",
  success = "success",
}

export type CategoryData = {
  parent: Category;
  children: Category[];
};

export enum AddressType {
  shipping = "shipping",
  billing = "billing",
}
