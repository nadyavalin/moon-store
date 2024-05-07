import { createElement, createInput, createLink, createText } from "src/components/elements";
import "./registration-style.css";
import "../../index.css";
import { formRegistrationHandler } from "./registration-handler";


function createAccountWrapper(): HTMLElement {
  const accountWrapper = createElement("div", ["account-wrapper"]);
  const email = createInput("email", "email", ["email"], "Email", "");
  email.title = "Введите email в формате example@gmail.com";

  const password = createInput("password", "password", ["password"], "Пароль", "(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}");
  password.title = "Пароль должен содержать 1 цифру, 1 заглавную и 1 строчную латинские буквы, не менее 8 символов";

  const name = createInput("name", "text", ["name"], "Имя", "^[a-zа-яё]{1,10}");
  name.title = "Имя должно содержать только буквы латинского алфавита, не менее 1 символа";

  const surname = createInput("surname", "text", ["surname"], "Фамилия");
  surname.title = "Фамилия должна содержать только буквы латинского алфавита, не менее 1 символа";
  accountWrapper.append(email, password, name, surname);
  return accountWrapper;
}

function createBirthdayWrapper(): HTMLElement {
  const birthdayWrapper = createElement("div", ["birthday-wrapper"]);
  const labelBirthday = createText(["label"], "Дата рождения:");
  const birthday = createInput("birthday", "date", ["birthday"], "");
  birthdayWrapper.append(labelBirthday, birthday);
  return birthdayWrapper;
}

function createAddressWrapper(type: string): HTMLElement {
  const addressWrapper = createElement("div", ["address-wrapper"]);
  const labelAddress = createText(["label"], `Адрес ${type}:`);
  const country = createElement("select", [`country-${type}`], "Страна");

  const optionBelarus = createElement("option", [`option-country-${type}`], "Беларусь");
  const optionRussia = createElement("option", [`option-country-${type}`], "Россия");
  country.append(optionBelarus, optionRussia);

  const city = createInput(`city-${type}`, "text", [`city-${type}`], "Город", "^[a-zA-z][a-яёA-я]{1,10}");
  city.title = "Название должно содержать не менее 1 буквы";
  const street = createInput(`street-${type}`, "text", [`street-${type}`], "Улица");
  const houseIndexWrapper = createElement("div", ["house-index-wrapper"]);
  const house = createInput(`house-${type}`, "text", [`house-${type}`], "Дом");
  const index = createInput(`index-${type}`, "text", [`index-${type}`], "Индекс", "(?=.*[0-9]).{6,6}");
  
  index.title = "Индекс должен содержать не менее 6 цифр";
  houseIndexWrapper.append(house, index )
  const defaultAddress = createInput(`default-${type}`, "checkbox", [`default-${type}`]);
  addressWrapper.append(labelAddress, country, city, street, houseIndexWrapper, defaultAddress);
return addressWrapper;
}

export function createFormRegistration() {
  const formWrapper = createElement("form", ["registration-form-wrapper"]);
  const form = createElement("form", ["registration-form"]);
  const h1 = createElement("h1", ["title-registration"], "Заполните форму регистрации");
  const accountWrapper = createAccountWrapper();
  const birthdayWrapper = createBirthdayWrapper();
  const addressesWrapper = createElement("div", ["addresses-wrapper"]);
  const addressShippingWrapper = createAddressWrapper('shipping');
  const addressBillingWrapper = createAddressWrapper("billing");
  addressesWrapper.append(addressShippingWrapper, addressBillingWrapper )
  const linkToLogin = createLink("#", ["link-login"], "У вас уже есть аккаунт? Войти...");
  const btnSubmit = createInput("submit", "submit", ["submit"], "Регистрация");
  btnSubmit.onclick = () => formRegistrationHandler();
  form.append(h1, accountWrapper, birthdayWrapper, addressesWrapper, btnSubmit, linkToLogin);
  formWrapper.append(form);

  return formWrapper;
}
export default createFormRegistration;
