import "./loginPage.css";

import { createElement, createInput } from "src/components/elements";

const formWrapper = <HTMLDivElement>createElement("div", ["loginForm-wrapper"]);
const formInner = <HTMLDivElement>createElement("div", ["loginForm-inner"]);
const h1 = <HTMLHeadingElement>createElement("h2", ["loginForm-heading"], "Авторизация");
const form = <HTMLFormElement>createElement("form", ["loginForm"]);
const emailInput = <HTMLInputElement>createInput("email", "email", ["email-input"], "Email");
const passwordInput = <HTMLInputElement>createInput("password", "text", ["password-input"], "Пароль");
const showPassword = <HTMLDivElement>createElement("div", ["showPassword"]);
showPassword.innerHTML = `<label><input type="checkbox"></input>Показать пароль</label>`;

form.append(emailInput, passwordInput);
formInner.append(h1, form, showPassword);
formWrapper.append(formInner);

export default formWrapper;
