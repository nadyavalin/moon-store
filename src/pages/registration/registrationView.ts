import { createElement, createInput, createLink, createText } from "src/components/elements";
import "./registration.css";
import "../../index.css";
import { formRegistrationHandler } from "./registrationHandler";
import { listenToValid } from "./checkValidityForm";

const emailPattern = "([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z0-9_-]+)";
const passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}";
const namePattern = "[A-Za-zА-Яа-яё]{1,15}";
const surnamePattern = "[A-Za-zА-Яа-яё]{1,15}";
const birthdayPattern = "";
const cityPattern = "[A-Za-zА-Яа-яё]{1,15}";
const streetPattern = "[^s]{1,20}";
const indexPattern = "[0-9]{6,6}";
const emailTitle = "Email должен быть в формате example@gmail.com";
const passwordTitle = "Пароль должен содержать 8 символов и включать 1 цифру, 1 заглавную и 1 строчную латинские буквы";
const nameTitle = "Имя должно содержать не менее одной буквы";
const surnameTitle = "Фамилия должна содержать только буквы";
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
  const labelBirthday = createText(["label"], "Дата рождения:");
  const birthday = createInput("birthday", "date", ["birthday"], "", birthdayPattern, birthdayTitle);
  birthday.max = "2011-01-01";
  listenToValid(email, emailTitle, password, accountWrapper, emailPattern);
  listenToValid(password, passwordTitle, name, accountWrapper, passwordPattern);
  listenToValid(name, nameTitle, surname, accountWrapper, namePattern);
  listenToValid(surname, surnameTitle, labelBirthday, accountWrapper, surnamePattern);
  listenToValid(birthday, birthdayTitle, birthday, surname, birthdayPattern);
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
  const city = createInput("city", "text", ["city"], "Город", cityPattern, cityTitle);
  const street = createInput("street", "text", ["street"], "Улица", streetPattern, streetTitle);
  const index = createInput("index", "text", ["index"], "Индекс", indexPattern, indexTitle);
  const defaultAddress = createInput(`default`, "checkbox", ["default"]);
  listenToValid(city, cityTitle, street, addressWrapper, cityPattern);
  listenToValid(street, streetTitle, index, addressWrapper, streetPattern);
  listenToValid(index, indexTitle, defaultAddress, addressWrapper, indexPattern);
  listenToValid(defaultAddress, "", defaultAddress, addressWrapper);
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
  const btnSubmit = createInput("submit", "submit", ["submit"], "Регистрация");
  btnSubmit.onclick = () => formRegistrationHandler();
  form.append(h1, accountWrapper, addressesWrapper, btnSubmit, linkToLogin);
  formWrapper.append(form);
  return formWrapper;
}

export default createFormRegistration;
