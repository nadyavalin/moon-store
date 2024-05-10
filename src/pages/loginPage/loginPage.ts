import "./loginPage.css";

import { createElement, createInput } from "src/components/elements";

const emailPattern = "([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z0-9_-]+)";
const emailTitle = "Email должен быть в формате example@gmail.com";
const passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}";
const passwordTitle = "Пароль должен содержать 8 символов и включать 1 цифру, 1 заглавную и 1 строчную латинские буквы";

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
  const formInner = <HTMLDivElement>createElement("div", ["loginForm-inner"]);
  const h1 = <HTMLHeadingElement>createElement("h2", ["loginForm-heading"], "Авторизация");
  const form = <HTMLFormElement>createElement("form", ["loginForm"]);
  const emailInput = <HTMLInputElement>createInput("email", "email", ["email-input"], "Email", emailPattern, emailTitle);
  const passwordInput = <HTMLInputElement>createInput("password", "password", ["password-input"], "Пароль", passwordPattern, passwordTitle);
  const submit = <HTMLInputElement>createInput("submit", "submit", ["form-submit", "disabled"]);
  const showPassword = <HTMLDivElement>createElement("div", ["showPassword"]);
  const togglePassword = <HTMLInputElement>createInput("checkbox", "checkbox", ["togglePassword"]);
  togglePassword.removeAttribute("required");
  showPassword.append(togglePassword, `Показать пароль`);

  showHidePasswordHandler(togglePassword, passwordInput);

  form.append(emailInput, passwordInput, showPassword, submit);
  formInner.append(h1, form);

  return formInner;
}

export default renderLoginFormContent;
