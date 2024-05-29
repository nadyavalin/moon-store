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

export function createAccountView(response: Customer, parent: HTMLElement) {
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
      value: `${response.firstName}`,
    },
  });
  const nameEditBtn = createElement({
    tagName: "div",
    classNames: ["edit-btn", "name__edit-btn"],
    innerHTML: '<i class="fa-solid fa-pen"></i>',
  });
  nameEditBtn.addEventListener("click", editName);
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
      value: `${response.lastName}`,
    },
  });
  const surnameEditBtn = createElement({
    tagName: "div",
    classNames: ["edit-btn", "surname__edit-btn"],
    innerHTML: '<i class="fa-solid fa-pen"></i>',
  });
  surnameEditBtn.addEventListener("click", editSurname);
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
      value: `${response.dateOfBirth}`,
    },
  });
  const birthdayEditBtn = createElement({
    tagName: "div",
    classNames: ["edit-btn", "birthday__edit-btn"],
    innerHTML: '<i class="fa-solid fa-pen"></i>',
  });
  birthdayEditBtn.addEventListener("click", editBirthday);
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
      value: `${response.email}`,
    },
  });

  const emailEditBtn = createElement({
    tagName: "div",
    classNames: ["edit-btn", "email__edit-btn"],
    innerHTML: '<i class="fa-solid fa-pen"></i>',
  });
  emailEditBtn.addEventListener("click", editEmail);
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
      value: `${response.password}`,
    },
  });

  const passwordEditBtn = createElement({
    tagName: "div",
    classNames: ["edit-btn", "password__edit-btn"],
    innerHTML: '<i class="fa-solid fa-pen"></i>',
  });
  passwordEditBtn.addEventListener("click", editPassword);
  const blockForPasswordError = createElement({ tagName: "div" });
  passwordDiv.append(passwordHeading, password, passwordEditBtn);
  addValidationListenersToInputProfile(name, surnameDiv, accountInfo, ["pattern", "spaces"], nameEditBtn);
  addValidationListenersToInputProfile(surname, birthdayDiv, accountInfo, ["pattern", "spaces"], surnameEditBtn);
  addValidationListenersToInputProfile(birthday, emailDiv, accountInfo, ["date"], birthdayEditBtn);
  addValidationListenersToInputProfile(email, passwordDiv, accountInfo, ["pattern", "spaces"], emailEditBtn);
  addValidationListenersToInputProfile(password, blockForPasswordError, accountInfo, ["pattern", "spaces"], passwordEditBtn);

  accountInfo.append(nameDiv, surnameDiv, birthdayDiv, emailDiv, passwordDiv, blockForPasswordError);
  parent.append(iconUser, accountInfo);
}
