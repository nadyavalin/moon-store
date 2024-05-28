import { Category } from "@commercetools/platform-sdk";

export interface State {
  name?: string | null;
  refreshToken: string | null;
  customerId: string | null;
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

export enum Pages {
  ROOT = "/",
  PROFILE = "/profile",
  CATALOG = "/catalog",
  BASKET = "/basket",
  ABOUT = "/about",
  LOGIN = "/login",
  REGISTRATION = "/registration",
  PRODUCT = "/product",
}

export enum SnackbarType {
  error = "error",
  success = "success",
}

export type CategoryData = {
  parent: Category;
  children: Category[];
};
