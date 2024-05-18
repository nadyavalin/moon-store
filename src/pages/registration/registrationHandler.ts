import createCustomer from "src/api/api";
import { createErrorSuccessSnackbar } from "src/components/elements";
import { Customer, Pages } from "src/types/types";
import authorizeUserWithToken from "../loginPage/loginHandler";

export function formRegistrationHandler(event: Event) {
  const form = <HTMLFormElement>document.querySelector(".registration-form");
  event.preventDefault();
  const formData = new FormData(form);
  const email = <string>formData.get("email");
  const password = <string>formData.get("password");
  const name = <string>formData.get("name");
  const surname = <string>formData.get("surname");
  const birthday = <string>formData.get("birthday");
  const checkboxSettingOneAddress = <HTMLInputElement>document.querySelector(".setting-one-address");
  const countriesShipping = <HTMLSelectElement>document.querySelector(".countries-shipping");
  const checkboxSettingDefaultAddressShipping = <HTMLInputElement>document.querySelector(".setting-default-address-shipping");

  const addressShipping = {
    city: <string>formData.get("city-shipping"),
    streetName: <string>formData.get("street-shipping"),
    postalCode: <string>formData.get("index-shipping"),
    country: countriesShipping.value,
  };

  const customer: Customer = {
    email: email.trim(),
    password: password.trim(),
    firstName: name.trim(),
    lastName: surname.trim(),
    dateOfBirth: birthday,
    addresses: [addressShipping],
    shippingAddresses: [0],
  };

  if (checkboxSettingDefaultAddressShipping.checked) customer.defaultShippingAddress = 0;

  if (checkboxSettingOneAddress.checked) {
    const countriesBilling = <HTMLSelectElement>document.querySelector(".countries-billing");
    const addressBilling = {
      city: <string>formData.get("city-billing"),
      streetName: <string>formData.get("street-billing"),
      postalCode: <string>formData.get("index-billing"),
      country: countriesBilling.value,
    };
    const checkboxSettingDefaultAddressBilling = <HTMLInputElement>document.querySelector(".setting-default-address-billing");
    if (checkboxSettingDefaultAddressBilling.checked) customer.defaultBillingAddress = 1;
    customer.billingAddresses = [1];
    customer.addresses.push(addressBilling);
  }

  createCustomer(customer)
    .then((response) => {
      if (response.statusCode === 201) {
        createErrorSuccessSnackbar(201, `Пользователь ${response.body.customer.firstName} создан`);
        setTimeout(() => authorizeUserWithToken(email.trim(), password.trim()), 4000);
        window.location.href = Pages.MAIN;
      }
    })
    .catch(({ statusCode }) => {
      if (statusCode === 400) {
        createErrorSuccessSnackbar(
          400,
          "Пользователь c таким адресом электронной почты уже существует. Войдите в приложение или используйте другой адрес электронной почты",
        );
      }
      if (statusCode === 500) {
        createErrorSuccessSnackbar(500, "Что-то пошло не так... Попробуйте зарегистрироваться позже");
      }
    });
}
export default formRegistrationHandler;
