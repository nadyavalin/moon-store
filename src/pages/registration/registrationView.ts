import { createElement } from "src/components/elements";
import "./registration.css";
import "../../index.css";
import { Pages } from "src/types/types";
import { formRegistrationHandler } from "./registrationHandler";
import { showHidePasswordHandler } from "../loginPage/loginHandler";
import { addValidationListenersToInput, checkValidityAllFields } from "./checkValidityForm";

export const emailPattern: string = "^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$";
export const passwordPattern: string = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}";
export const namePattern: string = "^[А-яа-я]{1,40}$";
export const surnamePattern: string = "^[А-яа-я]{1,40}$";
export const cityPattern: string = "^[А-яа-я\\-\\s]{1,40}$";
export const streetPattern: string = "^.{1,40}$";
export const indexPattern: string = "^[0-9]{6,6}$";

export const emailTitle = "Email должен быть в формате example@example.ru без пробелов. Допустимы латинские буквы, цифры, символы ._%+-";
export const passwordTitle =
  "Пароль должен содержать не менее 8 символов и включать минимум 1 цифру, 1 заглавную и 1 строчную латинские буквы без пробелов";
export const nameTitle = "Имя должно содержать не менее 1 символа и состоять только из букв русского алфавита";
export const surnameTitle = "Фамилия должна содержать не менее 1 символа и состоять только из букв русского алфавита";
export const birthdayTitle = "Возраст должен быть не младше 13 лет";
export const cityTitle = "Название города должно содержать не менее 1 символа и состоять из букв русского алфавита";
export const streetTitle = "Название улицы должно содержать не менее 1 символа";
export const indexTitle = "Индекс должен содержать 6 цифр";

function createAccountWrapper(): HTMLElement {
  const accountWrapper = createElement({ tagName: "div", classNames: ["account-wrapper"] });
  const email = createElement({
    tagName: "input",
    classNames: ["email"],
    attributes: {
      name: "email",
      type: "text",
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
  const showPasswordArea = createElement({ tagName: "div", classNames: ["form__show-password"] });
  const togglePassword = createElement({
    tagName: "input",
    classNames: ["form__password-toggle"],
    attributes: { id: "form__password-toggle", type: "checkbox" },
  });
  const labelTogglePassword = createElement({
    tagName: "label",
    classNames: ["registration-form__label"],
    attributes: { for: "form__password-toggle" },
    textContent: "Показать пароль",
  });
  showPasswordArea.append(togglePassword, labelTogglePassword);
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
  const labelBirthday = createElement({ tagName: "div", classNames: ["registration-form__label"], textContent: "Дата рождения:" });
  const birthday = createElement({
    tagName: "input",
    classNames: ["birthday"],
    attributes: {
      name: "birthday",
      type: "date",
      placeholder: "",
      title: birthdayTitle,
      required: "true",
    },
  });
  const blockForBirthdayError = createElement({ tagName: "div" });
  showHidePasswordHandler(togglePassword, password);
  addValidationListenersToInput(email, password, accountWrapper, ["pattern", "spaces"]);
  addValidationListenersToInput(password, showPasswordArea, accountWrapper, ["pattern", "spaces"]);
  addValidationListenersToInput(name, surname, accountWrapper, ["pattern", "spaces"]);
  addValidationListenersToInput(surname, labelBirthday, accountWrapper, ["pattern", "spaces"]);
  addValidationListenersToInput(birthday, blockForBirthdayError, accountWrapper, ["date"]);
  accountWrapper.append(email, password, showPasswordArea, name, surname, labelBirthday, birthday, blockForBirthdayError);
  return accountWrapper;
}

function createAddressView(addressTitle: string, addressType: string): HTMLElement {
  const addressWrapper = createElement({ tagName: "div", classNames: ["registration-form__address-wrapper"] });
  const labelAddress = createElement({ tagName: "div", classNames: ["registration-form__label"], textContent: addressTitle });
  const country = createElement({
    tagName: "select",
    classNames: [`countries-${addressType}`],
    attributes: {
      name: `countries-${addressType}`,
    },
    textContent: "Страна",
  });
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
      placeholder: "Улица",
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
    attributes: { name: `setting-default-address-${addressType}`, type: "checkbox", id: `setting-default-address-${addressType}` },
  });
  const checkboxWrapper = createElement({ tagName: "div", classNames: ["registration-form__checkbox-wrapper"] });
  const labelSettingDefaultAddress = createElement({
    tagName: "label",
    classNames: ["registration-form__label"],
    attributes: { for: `setting-default-address-${addressType}` },
    textContent: "Сделать адресом по умолчанию",
  });
  checkboxWrapper.append(checkboxSettingDefaultAddress, labelSettingDefaultAddress);

  addValidationListenersToInput(city, street, addressWrapper, ["pattern", "spaces"]);
  addValidationListenersToInput(street, index, addressWrapper, ["pattern", "spaces"]);
  addValidationListenersToInput(index, checkboxWrapper, addressWrapper, ["pattern"]);
  addressWrapper.append(labelAddress, country, city, street, index, checkboxWrapper);
  return addressWrapper;
}

function switchAddingSecondAddress() {
  const checkboxSettingOneAddress = <HTMLInputElement>document.querySelector(".setting-one-address");
  if (checkboxSettingOneAddress.checked) {
    const addressView = createAddressView("Адрес для счетов:", "billing");
    document.querySelector(".registration-form__addresses-wrapper")?.append(addressView);
    document.querySelector(".submit-button")?.classList.add("disabled");
  } else {
    document.querySelectorAll(".registration-form__address-wrapper")[1].remove();
    checkValidityAllFields();
  }
}

export function renderRegistrationFormContent(): HTMLElement {
  const form = createElement({ tagName: "form", classNames: ["registration-form"] });
  const h2 = createElement({ tagName: "h2", classNames: ["registration-form__heading"], textContent: "Заполните форму регистрации" });
  const h5 = createElement({ tagName: "h5", classNames: ["registration-form__info"], textContent: "* Все поля обязательны для заполнения" });
  const accountWrapper = createAccountWrapper();
  const addressesWrapper = createElement({ tagName: "div", classNames: ["registration-form__addresses-wrapper"] });
  const address = createAddressView("Адрес для доставки:", "shipping");

  const defaultWrapper = createElement({ tagName: "div", classNames: ["registration-form__checkbox-wrapper"] });
  const checkboxSettingOneAddress = createElement({
    tagName: "input",
    classNames: ["setting-one-address"],
    attributes: { name: "setting-one-address", type: "checkbox", id: "setting-one-address" },
  });
  checkboxSettingOneAddress.addEventListener("change", switchAddingSecondAddress);
  const labelDefault = createElement({
    tagName: "label",
    classNames: ["registration-form__label"],
    attributes: { for: "setting-one-address" },
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
  const loginLinkWrapper = createElement({ tagName: "div", classNames: ["registration-form__login-link-wrapper"] });
  loginLinkWrapper.append(linkToLogin);
  form.append(h2, h5, accountWrapper, addressesWrapper, regFormSubmitButton, loginLinkWrapper);
  return form;
}

export default renderRegistrationFormContent;
