import createCustomer from "src/api/api";
import { createSnackbar } from "src/components/elements";
import { authorizeUserWithToken } from "../loginPage/loginHandler";

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
  // const checkboxDefault = <HTMLInputElement>document.querySelector(".checkbox");

  // if(checkboxDefault.checked)

  const requestBody = {
    email: email.trim(),
    password: password.trim(),
    firstName: name.trim(),
    lastName: surname.trim(),
    dateOfBirth: birthday,
    addresses: [{ country, city, streetName, postalCode }],
    defaultShippingAddress: 0,
    defaultBillingAddress: 0,
    shippingAddresses: [0],
    billingAddresses: [0],
  };

  // requestBody.billingAddresses = [0]

  createCustomer(requestBody)
    .then((response) => {
      if (response.statusCode === 201) {
        createSnackbar(`Пользователь ${response.body.customer.firstName} создан`);
        setTimeout(() => authorizeUserWithToken(email.trim(), password.trim()), 6000);
        window.location.href = "#main";
      }
    })
    .catch(({ statusCode }) => {
      if (statusCode === 400) {
        createSnackbar(`Пользователь c таким адресом электронной почты уже существует. Войдите в приложение`);
      }
      if (statusCode === 500) {
        createSnackbar(`Что-то пошло не так... Попробуйте зарегистрироваться позже`);
      }
    });
}
export default formRegistrationHandler;
