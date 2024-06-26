import "./loginPage.css";

import { createElement } from "src/components/elements";
import { Pages } from "src/types/types";
import validateListener from "../registration/checkValidityForm";
import { authorizeUserWithToken, showHidePasswordHandler } from "./loginHandler";
import { emailPattern, emailTitle, passwordPattern, passwordTitle } from "../registration/registrationView";

function renderLoginFormContent(): HTMLElement {
  const loginFormInner = createElement({ tagName: "div", classNames: ["login-form__inner"] });
  const loginFormHeading = createElement({ tagName: "h2", classNames: ["login-form__heading"], textContent: "Авторизация" });
  const loginForm = createElement({ tagName: "form", classNames: ["login-form"] });
  const emailInput = createElement({
    tagName: "input",
    classNames: ["email-input"],
    attributes: {
      id: "email",
      type: "text",
      placeholder: "Email",
      pattern: `${emailPattern}`,
      title: emailTitle,
    },
  });
  const passwordInput = createElement({
    tagName: "input",
    classNames: ["password-input"],
    attributes: { id: "password", type: "password", placeholder: "Пароль", pattern: `${passwordPattern}`, title: passwordTitle },
  });
  const loginFormSubmitButton = createElement({
    tagName: "button",
    classNames: ["submit-button", "disabled"],
    textContent: "Войти",
    attributes: { type: "submit" },
  });
  const showPasswordArea = createElement({ tagName: "div", classNames: ["form__show-password", "login-form__show-password"] });
  const togglePassword = createElement({
    tagName: "input",
    classNames: ["form__password-toggle"],
    attributes: { id: "checkbox", type: "checkbox" },
  });
  const labelTogglePassword = createElement({
    tagName: "label",
    classNames: ["registration-form__label"],
    attributes: { for: "checkbox" },
    textContent: "Показать пароль",
  });
  togglePassword.removeAttribute("required");
  showPasswordArea.append(togglePassword, labelTogglePassword);
  const linkToRegistration = createElement({
    tagName: "a",
    classNames: ["registration-link"],
    textContent: "Еще не зарегистрированы? Регистрация...",
    attributes: { href: Pages.REGISTRATION },
  });

  showHidePasswordHandler(togglePassword, passwordInput);
  validateListener(emailInput, passwordInput, loginForm, ["pattern", "spaces"]);
  validateListener(passwordInput, showPasswordArea, loginForm, ["pattern", "spaces"]);

  loginForm.append(emailInput, passwordInput, showPasswordArea, loginFormSubmitButton);
  loginFormInner.append(loginFormHeading, loginForm, linkToRegistration);

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    authorizeUserWithToken(emailInput.value, passwordInput.value);
  });

  return loginFormInner;
}

export default renderLoginFormContent;
