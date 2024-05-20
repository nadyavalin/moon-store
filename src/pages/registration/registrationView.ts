import { createElement } from "src/components/elements";
import "./registration.css";
import "../../index.css";
import { Pages } from "src/types/types";
import { formRegistrationHandler } from "./registrationHandler";
import { addValidationListenersToInput } from "./checkValidityForm";
import { showHidePasswordHandler } from "../loginPage/loginHandler";

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
  const accountWrapper = createElement({ tagName: "div", classNames: ["account-wrapper"] });
  const email = createElement({
    tagName: "input",
    classNames: ["email"],
    attributes: {
      name: "email",
      type: "email",
      placeholder: "Email",
      pattern: `${emailPattern}`,
      title: emailTitle,
      required: "true",
    },
  });
  const password = createElement({
    tagName: "input",
    classNames: ["password"],
    attributes: {
      name: "password",
      type: "password",
      placeholder: "Пароль",
      pattern: `${passwordPattern}`,
      title: passwordTitle,
      required: "true",
    },
  });
  const showPasswordArea = createElement({ tagName: "div", classNames: ["login-form__show-password"] });
  const togglePassword = createElement({
    tagName: "input",
    classNames: ["login-form__password-toggle"],
    attributes: { id: "checkbox", type: "checkbox" },
  });
  togglePassword.removeAttribute("required");
  showPasswordArea.append(togglePassword, `Показать пароль`);
  const name = createElement({
    tagName: "input",
    classNames: ["name"],
    attributes: {
      name: "name",
      type: "text",
      placeholder: "Имя",
      pattern: `${namePattern}`,
      title: nameTitle,
      required: "true",
    },
  });
  const surname = createElement({
    tagName: "input",
    classNames: ["surname"],
    attributes: {
      name: "surname",
      type: "text",
      placeholder: "Фамилия",
      pattern: `${surnamePattern}`,
      title: surnameTitle,
      required: "true",
    },
  });
  const labelBirthday = createElement({ tagName: "div", classNames: ["label"], textContent: "Дата рождения:" });
  const birthday = createElement({
    tagName: "input",
    classNames: ["birthday"],
    attributes: {
      name: "birthday",
      type: "date",
      placeholder: "",
      pattern: `${birthdayPattern}`,
      title: birthdayTitle,
      required: "true",
    },
  });
  birthday.max = "2011-01-01";
  const blockForBirthdayError = createElement({ tagName: "div", classNames: ["wrapper"] });
  showHidePasswordHandler(togglePassword, password);
  addValidationListenersToInput(email, emailTitle, password, accountWrapper, emailPattern);
  addValidationListenersToInput(password, passwordTitle, showPasswordArea, accountWrapper, passwordPattern);
  addValidationListenersToInput(name, nameTitle, surname, accountWrapper, namePattern);
  addValidationListenersToInput(surname, surnameTitle, labelBirthday, accountWrapper, surnamePattern);
  addValidationListenersToInput(birthday, birthdayTitle, blockForBirthdayError, accountWrapper, birthdayPattern);
  accountWrapper.append(email, password, showPasswordArea, name, surname, labelBirthday, birthday, blockForBirthdayError);
  return accountWrapper;
}

function createAddressView(addressTitle: string, addressType: string): HTMLElement {
  const addressWrapper = createElement({ tagName: "div", classNames: ["address-wrapper"] });
  const labelAddress = createElement({ tagName: "div", classNames: ["label"], textContent: addressTitle });
  const country = createElement({ tagName: "select", classNames: [`countries-${addressType}`], textContent: "Страна" });
  const optionBelarus = createElement({ tagName: "option", classNames: ["option-country"], textContent: "Беларусь" });
  optionBelarus.value = "BY";
  const optionRussia = createElement({ tagName: "option", classNames: ["option-country"], textContent: "Россия" });
  optionRussia.value = "RU";
  country.append(optionBelarus, optionRussia);
  const city = createElement({
    tagName: "input",
    classNames: [`city-${addressType}`],
    attributes: {
      name: `city-${addressType}`,
      type: "text",
      placeholder: "Город",
      pattern: `${cityPattern}`,
      title: cityTitle,
      required: "true",
    },
  });
  const street = createElement({
    tagName: "input",
    classNames: [`street-${addressType}`],
    attributes: {
      name: `street-${addressType}`,
      type: "text",
      placeholder: "Город",
      pattern: `${streetPattern}`,
      title: streetTitle,
      required: "true",
    },
  });
  const index = createElement({
    tagName: "input",
    classNames: [`index-${addressType}`],
    attributes: {
      name: `index-${addressType}`,
      type: "text",
      placeholder: "Индекс",
      pattern: `${indexPattern}`,
      title: indexTitle,
      required: "true",
    },
  });

  const checkboxSettingDefaultAddress = createElement({
    tagName: "input",
    classNames: [`setting-default-address-${addressType}`],
    attributes: { name: `setting-default-address-${addressType}`, type: "checkbox" },
  });
  const checkboxWrapper = createElement({ tagName: "div", classNames: ["checkbox-wrapper"] });
  const labelSettingDefaultAddress = createElement({
    tagName: "span",
    classNames: ["label"],
    textContent: "Cделать адресом по умолчанию",
  });
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
  const form = createElement({ tagName: "form", classNames: ["registration-form"] });
  const h2 = createElement({ tagName: "h2", classNames: ["registration-form__heading"], textContent: "Заполните форму регистрации" });
  const h5 = createElement({ tagName: "h5", classNames: ["registration-form__info"], textContent: "* Все поля обязательны для заполнения" });
  const accountWrapper = createAccountWrapper();
  const addressesWrapper = createElement({ tagName: "div", classNames: ["addresses-wrapper"] });
  const address = createAddressView("Адрес для доставки:", "shipping");

  const defaultWrapper = createElement({ tagName: "div", classNames: ["checkbox-wrapper"] });
  const checkboxSettingOneAddress = createElement({
    tagName: "input",
    classNames: ["setting-one-address"],
    attributes: { name: "setting-one-address", type: "checkbox" },
  });
  checkboxSettingOneAddress.addEventListener("change", switchAddingSecondAddress);
  const labelDefault = createElement({
    tagName: "span",
    classNames: ["label"],
    textContent: "Использовать разные адреса для доставки и счетов",
  });
  checkboxSettingOneAddress.removeAttribute("required");
  defaultWrapper.append(checkboxSettingOneAddress, labelDefault);
  addressesWrapper.append(address, defaultWrapper);
  const linkToLogin = createElement({
    tagName: "a",
    classNames: ["login-link"],
    textContent: "У вас уже есть аккаунт? Войти...",
    attributes: { href: Pages.LOGIN },
  });
  const regFormSubmitButton = createElement({
    tagName: "button",
    classNames: ["submit-button", "disabled"],
    textContent: "Регистрация",
    attributes: { type: "submit" },
  });
  form.addEventListener("submit", formRegistrationHandler);
  const loginLinkWrapper = createElement({ tagName: "div", classNames: ["login-link-wrapper"] });
  loginLinkWrapper.append(linkToLogin);
  form.append(h2, h5, accountWrapper, addressesWrapper, regFormSubmitButton, loginLinkWrapper);
  return form;
}

export default renderRegistrationFormContent;
