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
  const city = <string>formData.get("city");
  const streetName = <string>formData.get("street");
  const postalCode = <string>formData.get("index");
  const countries = <HTMLSelectElement>document.querySelector(".countries");
  const country = countries.value;
  const checkboxDefault = <HTMLInputElement>document.querySelector(".checkbox");

  const customer: Customer = {
    email: email.trim(),
    password: password.trim(),
    firstName: name.trim(),
    lastName: surname.trim(),
    dateOfBirth: birthday,
    addresses: [{ country, city, streetName, postalCode }],
    shippingAddresses: [0],
  };
  if (checkboxDefault.checked) customer.defaultShippingAddress = 0;
  // customer.billingAddresses = [0];
  // customer.defaultBillingAddress = 0;

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
