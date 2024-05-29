import { createSnackbar } from "../../components/elements";
import { Customer, Pages, SnackbarType } from "../../types/types";
import { authorizeUserWithToken } from "../loginPage/loginHandler";
import { createCustomer } from "../../api/api";

export function formRegistrationHandler(event: Event) {
  const form = <HTMLFormElement>document.querySelector(".registration-form");
  event.preventDefault();
  const formData = new FormData(form);
  const checkboxSettingOneAddress = <string>formData.get("setting-one-address");
  const checkboxSettingDefaultAddressShipping = <string>formData.get("setting-default-address-shipping");

  const addressShipping = {
    city: <string>formData.get("city-shipping"),
    streetName: <string>formData.get("street-shipping"),
    postalCode: <string>formData.get("index-shipping"),
    country: <string>formData.get("countries-shipping"),
  };

  const customer: Customer = {
    email: <string>formData.get("email"),
    password: <string>formData.get("password"),
    firstName: <string>formData.get("name"),
    lastName: <string>formData.get("surname"),
    dateOfBirth: <string>formData.get("birthday"),
    addresses: [addressShipping],
    shippingAddresses: [0],
  };

  if (checkboxSettingDefaultAddressShipping) customer.defaultShippingAddress = 0;

  if (!checkboxSettingOneAddress) {
    const addressBilling = addressShipping;
    customer.addresses.push(addressBilling);
    customer.billingAddresses = [1];
    if (checkboxSettingDefaultAddressShipping) {
      customer.defaultBillingAddress = 1;
    }
  }
  if (checkboxSettingOneAddress) {
    const addressBilling = {
      city: <string>formData.get("city-billing"),
      streetName: <string>formData.get("street-billing"),
      postalCode: <string>formData.get("index-billing"),
      country: <string>formData.get("countries-billing"),
    };
    const checkboxSettingDefaultAddressBilling = <string>formData.get("setting-default-address-billing");
    if (checkboxSettingDefaultAddressBilling) customer.defaultBillingAddress = 1;
    customer.billingAddresses = [1];
    customer.addresses.push(addressBilling);
  }

  createCustomer(customer)
    ?.then((response) => {
      if (response.statusCode === 201) {
        createSnackbar(SnackbarType.success, `Пользователь ${response.body.customer.firstName} создан`);
        authorizeUserWithToken(<string>formData.get("email"), <string>formData.get("password"));
        window.location.href = Pages.MAIN;
      }
    })
    .catch(({ statusCode }) => {
      if (statusCode === 400) {
        createSnackbar(
          SnackbarType.error,
          "Пользователь c таким адресом электронной почты уже существует. Войдите в приложение или используйте другой адрес электронной почты",
        );
      }
      if (statusCode === 500) {
        createSnackbar(SnackbarType.error, "Что-то пошло не так... Попробуйте зарегистрироваться позже");
      }
    });
}
export default formRegistrationHandler;
