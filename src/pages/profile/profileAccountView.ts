import { Customer } from "@commercetools/platform-sdk";
import { createElement } from "../../components/elements";
import "./profile.css";
import "../../index.css";
import {
  birthdayTitle,
  emailPattern,
  emailTitle,
  namePattern,
  nameTitle,
  passwordPattern,
  passwordTitle,
  surnamePattern,
  surnameTitle,
} from "../registration/registrationView";
import { editBirthday, editEmail, editName, editPassword, editSurname } from "./profileEditHandlerAccount";
import { addValidationListenersToInputProfile } from "./checkValidityProfile";

export function createAccountView(parent: HTMLElement, response?: Customer) {
  const iconUser = createElement({ tagName: "div", classNames: ["profile-account__user-icon"], innerHTML: '<i class="fa-regular fa-user"></i>' });
  const accountInfo = createElement({ tagName: "div", classNames: ["profile-account__data"] });

  const nameDiv = createElement({
    tagName: "div",
    classNames: ["name_wrapper"],
  });
  const nameHeading = createElement({
    tagName: "span",
    classNames: ["name__heading"],
    textContent: "Имя",
  });
  const name = createElement({
    tagName: "input",
    classNames: ["name__input", "field"],
    attributes: {
      name: "name",
      type: "text",
      title: nameTitle,
      pattern: `${namePattern}`,
      required: "true",
      value: `${response?.firstName}`,
    },
  });
  const nameEditBtn = createElement({
    tagName: "div",
    classNames: ["edit-btn", "name__edit-btn"],
    innerHTML: '<i class="fa-solid fa-pen"></i>',
  });
  nameEditBtn.addEventListener("click", () => {
    editName(name, nameEditBtn);
  });
  nameDiv.append(nameHeading, name, nameEditBtn);

  const surnameDiv = createElement({
    tagName: "div",
    classNames: ["surname_wrapper"],
  });
  const surnameHeading = createElement({
    tagName: "span",
    classNames: ["surname__heading"],
    textContent: "Фамилия",
  });
  const surname = createElement({
    tagName: "input",
    classNames: ["surname__input", "field"],
    attributes: {
      name: "surname",
      type: "text",
      title: surnameTitle,
      pattern: `${surnamePattern}`,
      required: "true",
      value: `${response?.lastName}`,
    },
  });
  const surnameEditBtn = createElement({
    tagName: "div",
    classNames: ["edit-btn", "surname__edit-btn"],
    innerHTML: '<i class="fa-solid fa-pen"></i>',
  });
  surnameEditBtn.addEventListener("click", () => {
    editSurname(surname, surnameEditBtn);
  });
  surnameDiv.append(surnameHeading, surname, surnameEditBtn);
  const birthdayDiv = createElement({
    tagName: "div",
    classNames: ["birthday_wrapper"],
  });
  const birthdayHeading = createElement({
    tagName: "span",
    classNames: ["birthday__heading"],
    textContent: "День рождения",
  });
  const birthday = createElement({
    tagName: "input",
    classNames: ["birthday__input", "field"],
    attributes: {
      name: "birthday",
      type: "date",
      title: birthdayTitle,
      required: "true",
      value: `${response?.dateOfBirth}`,
    },
  });
  const birthdayEditBtn = createElement({
    tagName: "div",
    classNames: ["edit-btn", "birthday__edit-btn"],
    innerHTML: '<i class="fa-solid fa-pen"></i>',
  });
  birthdayEditBtn.addEventListener("click", () => {
    editBirthday(birthday, birthdayEditBtn);
  });
  birthdayDiv.append(birthdayHeading, birthday, birthdayEditBtn);
  const emailDiv = createElement({
    tagName: "div",
    classNames: ["email_wrapper"],
  });
  const emailHeading = createElement({
    tagName: "span",
    classNames: ["email__heading"],
    textContent: "Email",
  });
  const email = createElement({
    tagName: "input",
    classNames: ["email__input", "field"],
    attributes: {
      name: "email",
      type: "text",
      title: emailTitle,
      pattern: `${emailPattern}`,
      required: "true",
      value: `${response?.email}`,
    },
  });

  const emailEditBtn = createElement({
    tagName: "div",
    classNames: ["edit-btn", "email__edit-btn"],
    innerHTML: '<i class="fa-solid fa-pen"></i>',
  });
  emailEditBtn.addEventListener("click", () => {
    editEmail(email, emailEditBtn);
  });
  emailDiv.append(emailHeading, email, emailEditBtn);

  const passwordDiv = createElement({
    tagName: "div",
    classNames: ["password_wrapper"],
  });
  const passwordHeading = createElement({
    tagName: "span",
    classNames: ["password__heading"],
    textContent: "Пароль",
  });
  const password = createElement({
    tagName: "input",
    classNames: ["password__input", "field"],
    attributes: {
      name: "password",
      type: "password",
      title: passwordTitle,
      pattern: `${passwordPattern}`,
      value: `${response?.password}`,
    },
  });

  const passwordEditBtn = createElement({
    tagName: "div",
    classNames: ["edit-btn", "password__edit-btn"],
    innerHTML: '<i class="fa-solid fa-pen"></i>',
  });

  const passwordCurrentDiv = createElement({
    tagName: "div",
    classNames: ["password-current_wrapper"],
  });
  const passwordCurrentHeading = createElement({
    tagName: "span",
    classNames: ["password__heading"],
    textContent: "Текущий пароль",
  });
  const passwordCurrentInput = createElement({
    tagName: "input",
    classNames: ["password-current__input", "field", "active-input"],
    attributes: {
      name: "password",
      type: "password",
      title: passwordTitle,
      pattern: `${passwordPattern}`,
    },
  });

  passwordCurrentDiv.append(passwordCurrentHeading, passwordCurrentInput);
  passwordEditBtn.addEventListener("click", () => {
    editPassword({ passwordCurrentInput, passwordCurrentDiv, newPasswordInput: password, passwordEditBtn });
    passwordCurrentDiv.style.opacity = "1";
    passwordHeading.textContent = "Новый пароль";
    passwordEditBtn.classList.add("disabled-icon");
  });
  const blockForPasswordError = createElement({ tagName: "div" });

  passwordDiv.append(passwordHeading, password, passwordEditBtn);
  addValidationListenersToInputProfile({
    input: name,
    nextElem: surnameDiv,
    parent: accountInfo,
    validateParams: ["pattern", "spaces"],
    btn: nameEditBtn,
  });
  addValidationListenersToInputProfile({
    input: surname,
    nextElem: birthdayDiv,
    parent: accountInfo,
    validateParams: ["pattern", "spaces"],
    btn: surnameEditBtn,
  });
  addValidationListenersToInputProfile({ input: birthday, nextElem: emailDiv, parent: accountInfo, validateParams: ["date"], btn: birthdayEditBtn });
  addValidationListenersToInputProfile({
    input: email,
    nextElem: passwordDiv,
    parent: accountInfo,
    validateParams: ["pattern", "spaces"],
    btn: emailEditBtn,
  });
  addValidationListenersToInputProfile({
    input: password,
    nextElem: passwordCurrentDiv,
    parent: accountInfo,
    validateParams: ["pattern", "spaces"],
    btn: passwordEditBtn,
  });
  addValidationListenersToInputProfile({
    input: passwordCurrentInput,
    nextElem: blockForPasswordError,
    parent: accountInfo,
    validateParams: ["pattern", "spaces"],
    btn: passwordEditBtn,
  });
  accountInfo.append(nameDiv, surnameDiv, birthdayDiv, emailDiv, passwordDiv, passwordCurrentDiv, blockForPasswordError);
  parent.append(iconUser, accountInfo);
}
