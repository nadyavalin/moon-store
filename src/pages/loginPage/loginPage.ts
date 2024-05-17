import "./loginPage.css";

import { createElement, createInput, createLink, createSubmitButton } from "src/components/elements";
import validateListener from "../registration/checkValidityForm";
import authorizeUserWithToken from "./loginHandler";
import { emailPattern, emailTitle, passwordPattern, passwordTitle } from "../registration/registrationView";

const showHidePasswordHandler = (togglePassword: HTMLInputElement, passwordInput: HTMLInputElement) => {
  const toggle = togglePassword;
  const password = passwordInput;
  toggle.onchange = () => {
    if (toggle.checked) {
      password.type = "text";
    } else {
      password.type = "password";
    }
  };
};

function renderLoginFormContent(): HTMLElement {
  const loginFormInner = <HTMLDivElement>createElement("div", ["login-form__inner"]);
  const loginFormHeading = <HTMLHeadingElement>createElement("h2", ["login-form__heading"], "Авторизация");
  const loginForm = <HTMLFormElement>createElement("form", ["login-form"]);
  const emailInput = <HTMLInputElement>createInput("email", "email", ["email-input"], "Email", emailPattern, emailTitle);
  const passwordInput = <HTMLInputElement>createInput("password", "password", ["password-input"], "Пароль", passwordPattern, passwordTitle);
  const loginFormSubmitButton = <HTMLButtonElement>createSubmitButton("Войти");
  const showPasswordArea = <HTMLDivElement>createElement("div", ["login-form__show-password"]);
  const togglePassword = <HTMLInputElement>createInput("checkbox", "checkbox", ["login-form__password-toggle"]);
  togglePassword.removeAttribute("required");
  showPasswordArea.append(togglePassword, `Показать пароль`);
  const linkToRegistration = <HTMLAnchorElement>createLink("#registration", ["registration-link"], "Еще не зарегистрированы? Регистрация...");

  showHidePasswordHandler(togglePassword, passwordInput);
  validateListener(emailInput, emailTitle, passwordInput, loginForm, emailPattern);
  validateListener(passwordInput, passwordTitle, showPasswordArea, loginForm, passwordPattern);

  loginForm.append(emailInput, passwordInput, showPasswordArea, loginFormSubmitButton);
  loginFormInner.append(loginFormHeading, loginForm, linkToRegistration);

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    authorizeUserWithToken(emailInput.value, passwordInput.value);
  });

  return loginFormInner;
}

export default renderLoginFormContent;
