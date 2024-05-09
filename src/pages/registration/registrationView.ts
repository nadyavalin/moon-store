import { createElement, createInput, createLink, createText } from "src/components/elements";
import "./registration.css";
import "../../index.css";
import { formRegistrationHandler } from "./registrationHandler";
import { addValidationListenersToInput } from "./checkValidityForm";

export enum Patterns {
  email = "([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z0-9_-]+)",
  password = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}",
  name = "^[A-Za-zА-Яа-яё]{1,}$",
  surname = "^[A-Za-zА-Яа-яё]{1,20}$",
  birthday = "",
  city = "^[A-Za-zА-Яа-яё]{1,15}$",
  street = "[^s]{1,20}",
  index = "[0-9]{6,6}",
}

enum Titles {
  email = "Email должен быть в формате example@gmail.com",
  password = "Пароль должен содержать 8 символов и включать 1 цифру, 1 заглавную и 1 строчную латинские буквы",
  name = "Имя должно содержать не менее одной буквы",
  surname = "Фамилия должна содержать только буквы",
  birthday = "Возраст должен быть не младше 13 лет",
  city = "Название города должно содержать не менее 1 буквы",
  street = "Название улицы должно содержать не менее 1 символа",
  index = "Индекс должен содержать 6 цифр",
}

function createAccountWrapper(): HTMLElement {
  const accountWrapper = createElement("div", ["account-wrapper"]);
  const email = createInput("email", "email", ["email"], "Email", Patterns.email, Titles.email);
  const password = createInput("password", "password", ["password"], "Пароль", Patterns.password, Titles.password);
  const name = createInput("name", "text", ["name"], "Имя", Patterns.name, Titles.name);
  const surname = createInput("surname", "text", ["surname"], "Фамилия", Patterns.surname, Titles.surname);
  const labelBirthday = createText(["label"], "Дата рождения:");
  const birthday = createInput("birthday", "date", ["birthday"], "", Patterns.birthday, Titles.birthday);
  birthday.max = "2011-01-01";
  addValidationListenersToInput(email, Titles.email, password, accountWrapper, Patterns.email);
  addValidationListenersToInput(password, Titles.password, name, accountWrapper, Patterns.password);
  addValidationListenersToInput(name, Titles.name, surname, accountWrapper, Patterns.name);
  addValidationListenersToInput(surname, Titles.surname, labelBirthday, accountWrapper, Patterns.surname);
  accountWrapper.append(email, password, name, surname, labelBirthday, birthday);
  return accountWrapper;
}

function createAddressWrapper(): HTMLElement {
  const addressWrapper = createElement("div", ["address-wrapper"]);
  const labelAddress = createText(["label"], "Адрес доставки:");
  const country = createElement("select", [`country`], "Страна");
  const optionBelarus = createElement("option", ["option-country"], "Беларусь");
  const optionRussia = createElement("option", ["option-country"], "Россия");
  country.append(optionBelarus, optionRussia);
  const city = createInput("city", "text", ["city"], "Город", Patterns.city, Titles.city);
  const street = createInput("street", "text", ["street"], "Улица", Patterns.street, Titles.street);
  const index = createInput("index", "text", ["index"], "Индекс", Patterns.index, Titles.index);
  const defaultAddress = createInput("default-address", "checkbox", ["default-address"]);
  defaultAddress.removeAttribute("required");
  addValidationListenersToInput(city, Titles.street, street, addressWrapper, Patterns.city);
  addValidationListenersToInput(street, Titles.street, index, addressWrapper, Patterns.street);
  addValidationListenersToInput(index, Titles.index, defaultAddress, addressWrapper, Patterns.index);
  addValidationListenersToInput(defaultAddress, "", defaultAddress, addressWrapper);
  addressWrapper.append(labelAddress, country, city, street, index, defaultAddress);
  return addressWrapper;
}

export function createFormRegistration(): HTMLElement {
  const formWrapper = createElement("form", ["registration-form-wrapper"]);
  const form = createElement("form", ["registration-form"]);
  const h1 = createElement("h1", ["title-registration"], "Заполните форму регистрации");
  const accountWrapper = createAccountWrapper();
  const addressesWrapper = createElement("div", ["addresses-wrapper"]);
  const address = createAddressWrapper();
  addressesWrapper.append(address);
  const linkToLogin = createLink("#", ["link-login"], "У вас уже есть аккаунт? Войти...");
  const btnSubmit = createInput("submit", "submit", ["submit-registration", "disabled"], "Регистрация");
  btnSubmit.onclick = () => formRegistrationHandler();
  form.append(h1, accountWrapper, addressesWrapper, btnSubmit, linkToLogin);
  formWrapper.append(form);
  return formWrapper;
}

export default createFormRegistration;
