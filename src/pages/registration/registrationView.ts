import { createElement, createInput, createLink, createSubmitButton, createEmptyDiv, createSpan } from "src/components/elements";
import "./registration.css";
import "../../index.css";
import { formRegistrationHandler } from "./registrationHandler";
import { addValidationListenersToInput } from "./checkValidityForm";

const emailPattern = "";
const passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}";
const namePattern = "^[A-Za-zА-Яа-яё]{1,}$";
const surnamePattern = "^[A-Za-zА-Яа-яё]{1,20}$";
const birthdayPattern = "";
const cityPattern = "^[A-Za-zА-Яа-яё]{1,15}$";
const streetPattern = "[^s]{1,20}";
const indexPattern = "[0-9]{6,6}";

const emailTitle = "Email должен быть в формате example@example.ru";
const passwordTitle = "Пароль должен содержать не менее 8 символов и включать минимум 1 цифру, 1 заглавную и 1 строчную латинские буквы";
const nameTitle = "Имя должно содержать только буквы, не менее одной";
const surnameTitle = "Фамилия должна содержать только буквы, не менее одной";
const birthdayTitle = "Возраст должен быть не младше 13 лет";
const cityTitle = "Название города должно содержать не менее 1 буквы";
const streetTitle = "Название улицы должно содержать не менее 1 символа";
const indexTitle = "Индекс должен содержать 6 цифр";

function createAccountWrapper(): HTMLElement {
  const accountWrapper = createElement("div", ["account-wrapper"]);
  const email = createInput("email", "email", ["email"], "Email", emailPattern, emailTitle);
  const password = createInput("password", "password", ["password"], "Пароль", passwordPattern, passwordTitle);
  const name = createInput("name", "text", ["name"], "Имя", namePattern, nameTitle);
  const surname = createInput("surname", "text", ["surname"], "Фамилия", surnamePattern, surnameTitle);
  const labelBirthday = createEmptyDiv(["label"], "Дата рождения:");
  const birthday = createInput("birthday", "date", ["birthday"], "", birthdayPattern, birthdayTitle);
  birthday.max = "2011-01-01";
  addValidationListenersToInput(email, emailTitle, password, accountWrapper, emailPattern);
  addValidationListenersToInput(password, passwordTitle, name, accountWrapper, passwordPattern);
  addValidationListenersToInput(name, nameTitle, surname, accountWrapper, namePattern);
  addValidationListenersToInput(surname, surnameTitle, labelBirthday, accountWrapper, surnamePattern);
  addValidationListenersToInput(birthday, birthdayTitle, labelBirthday, accountWrapper, birthdayPattern);
  accountWrapper.append(email, password, name, surname, labelBirthday, birthday);
  return accountWrapper;
}

function createAddressWrapper(): HTMLElement {
  const addressWrapper = createElement("div", ["address-wrapper"]);
  const labelAddress = createEmptyDiv(["label"], "Адрес доставки:");
  const country = createElement("select", ["countries"], "Страна");
  const optionBelarus = <HTMLOptionElement>createElement("option", ["option-country"], "Беларусь");
  optionBelarus.value = "BY";
  const optionRussia = <HTMLOptionElement>createElement("option", ["option-country"], "Россия");
  optionRussia.value = "RU";
  country.append(optionBelarus, optionRussia);
  const city = createInput("city", "text", ["city"], "Город", cityPattern, cityTitle);
  const street = createInput("street", "text", ["street"], "Улица", streetPattern, streetTitle);
  const index = createInput("index", "text", ["index"], "Индекс", indexPattern, indexTitle);

  const defaultAddressCheckbox = createInput("", "checkbox", ["checkbox"]);
  const defaultWrapper = createEmptyDiv(["default-wrapper"]);
  const labelDefault = createSpan(["label"], "Cделать адресом по умолчанию");
  defaultAddressCheckbox.removeAttribute("required");
  defaultWrapper.append(defaultAddressCheckbox, labelDefault);

  addValidationListenersToInput(city, cityTitle, street, addressWrapper, cityPattern);
  addValidationListenersToInput(street, streetTitle, index, addressWrapper, streetPattern);
  addValidationListenersToInput(index, indexTitle, defaultWrapper, addressWrapper, indexPattern);
  addValidationListenersToInput(defaultAddressCheckbox, "", defaultWrapper, addressWrapper);
  addressWrapper.append(labelAddress, country, city, street, index, defaultWrapper);
  return addressWrapper;
}

export function renderRegistrationFormContent(): HTMLElement {
  const form = createElement("form", ["registration-form"]);
  const h1 = createElement("h2", ["registration-form__heading"], "Заполните форму регистрации");
  const accountWrapper = createAccountWrapper();
  const addressesWrapper = createElement("div", ["addresses-wrapper"]);
  const address = createAddressWrapper();
  addressesWrapper.append(address);
  const linkToLogin = createLink("#login", ["login-link"], "У вас уже есть аккаунт? Войти...");
  const regFormSubmitButton = createSubmitButton("Регистрация");
  form.addEventListener("submit", formRegistrationHandler);
  const loginLinkWrapper = createElement("div", ["login-link-wrapper"]);
  loginLinkWrapper.append(linkToLogin);
  form.append(h1, accountWrapper, addressesWrapper, regFormSubmitButton, loginLinkWrapper);
  return form;
}

export default renderRegistrationFormContent;
