import { createElement, createInput, createLink, createSubmitButton, createEmptyDiv, createSpan } from "src/components/elements";
import "./registration.css";
import "../../index.css";
import { formRegistrationHandler } from "./registrationHandler";
import { addValidationListenersToInput } from "./checkValidityForm";

export const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordPattern: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/;
const namePattern: RegExp = /^[A-Za-zА-Яа-яё]{1,}$/;
const surnamePattern: RegExp = /^[A-Za-zА-Яа-яё]{1,20}$/;
const birthdayPattern: RegExp = /[0-9]/;
const cityPattern: RegExp = /^[A-Za-zА-Яа-яё]{1,15}$/;
const streetPattern: RegExp = /^[^s]{1,20}$/;
const indexPattern: RegExp = /^[0-9]{6,6}$/;

export const emailTitle = "Email должен быть в формате example@example.ru";
export const passwordTitle = "Пароль должен содержать не менее 8 символов и включать минимум 1 цифру, 1 заглавную и 1 строчную латинские буквы";
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
  const blockForBirthdayError = createEmptyDiv(["wrapper"]);
  addValidationListenersToInput(email, emailTitle, password, accountWrapper, emailPattern);
  addValidationListenersToInput(password, passwordTitle, name, accountWrapper, passwordPattern);
  addValidationListenersToInput(name, nameTitle, surname, accountWrapper, namePattern);
  addValidationListenersToInput(surname, surnameTitle, labelBirthday, accountWrapper, surnamePattern);
  addValidationListenersToInput(birthday, birthdayTitle, blockForBirthdayError, accountWrapper, birthdayPattern);
  accountWrapper.append(email, password, name, surname, labelBirthday, birthday, blockForBirthdayError);
  return accountWrapper;
}

function createAddressView(nameAddress: string, addressNotice: string): HTMLElement {
  const addressWrapper = createElement("div", ["address-wrapper"]);
  const labelAddress = createEmptyDiv(["label"], nameAddress);
  const country = createElement("select", [`countries-${addressNotice}`], "Страна");
  const optionBelarus = <HTMLOptionElement>createElement("option", ["option-country"], "Беларусь");
  optionBelarus.value = "BY";
  const optionRussia = <HTMLOptionElement>createElement("option", ["option-country"], "Россия");
  optionRussia.value = "RU";
  country.append(optionBelarus, optionRussia);
  const city = createInput(`city-${addressNotice}`, "text", [`city-${addressNotice}`], "Город", cityPattern, cityTitle);
  const street = createInput(`street-${addressNotice}`, "text", [`street-${addressNotice}`], "Улица", streetPattern, streetTitle);
  const index = createInput(`index-${addressNotice}`, "text", [`index-${addressNotice}`], "Индекс", indexPattern, indexTitle);

  const checkboxSettingDefaultAddress = createInput(`setting-default-address-${addressNotice}`, "checkbox", [
    `setting-default-address-${addressNotice}`,
  ]);
  const checkboxWrapper = createEmptyDiv(["checkbox-wrapper"]);
  const labelSettingDefaultAddress = createSpan(["label"], "Cделать адресом по умолчанию");
  checkboxSettingDefaultAddress.removeAttribute("required");
  checkboxWrapper.append(checkboxSettingDefaultAddress, labelSettingDefaultAddress);

  addValidationListenersToInput(city, cityTitle, street, addressWrapper, cityPattern);
  addValidationListenersToInput(street, streetTitle, index, addressWrapper, streetPattern);
  addValidationListenersToInput(index, indexTitle, checkboxWrapper, addressWrapper, indexPattern);
  addressWrapper.append(labelAddress, country, city, street, index, checkboxWrapper);
  return addressWrapper;
}

function switchAddingSecondAddress() {
  const checkboxSettingOneAddress = <HTMLInputElement>document.querySelector(".setting-one-address");
  if (checkboxSettingOneAddress.checked) {
    const addressView = createAddressView("Адрес для счетов:", "billing");
    document.querySelector(".addresses-wrapper")?.append(addressView);
    document.querySelector(".submit-button")?.classList.add("disabled");
  } else {
    document.querySelectorAll(".address-wrapper")[1].remove();
  }
}

export function renderRegistrationFormContent(): HTMLElement {
  const form = createElement("form", ["registration-form"]);
  const h2 = createElement("h2", ["registration-form__heading"], "Заполните форму регистрации");
  const h5 = createElement("h5", ["registration-form__info"], " * Все поля обязательны для заполнения");
  const accountWrapper = createAccountWrapper();
  const addressesWrapper = createElement("div", ["addresses-wrapper"]);
  const address = createAddressView("Адрес для доставки:", "shipping");

  const defaultWrapper = createEmptyDiv(["checkbox-wrapper"]);
  const checkboxSettingOneAddress = createInput("setting-one-address", "checkbox", ["setting-one-address"]);
  checkboxSettingOneAddress.addEventListener("change", switchAddingSecondAddress);
  const labelDefault = createSpan(["label"], "Использовать разные адреса для доставки и счетов");
  checkboxSettingOneAddress.removeAttribute("required");
  defaultWrapper.append(checkboxSettingOneAddress, labelDefault);
  addressesWrapper.append(address, defaultWrapper);
  const linkToLogin = createLink("#login", ["login-link"], "У вас уже есть аккаунт? Войти...");
  const regFormSubmitButton = createSubmitButton("Регистрация");
  form.addEventListener("submit", formRegistrationHandler);
  const loginLinkWrapper = createElement("div", ["login-link-wrapper"]);
  loginLinkWrapper.append(linkToLogin);
  form.append(h2, h5, accountWrapper, addressesWrapper, regFormSubmitButton, loginLinkWrapper);
  return form;
}

export default renderRegistrationFormContent;
