import { Customer, CustomerUpdateAction } from "@commercetools/platform-sdk";
import { changePassword, getUserData, updateCustomer } from "../../api/api";
import { createSnackbar } from "../../components/elements";
import { SnackbarType } from "../../types/types";
import { setItemToLocalStorage } from "../../utils/utils";
import { authorizeUserWithToken } from "../loginPage/loginHandler";

export function changeStateBtnInput(element: HTMLElement, btn?: HTMLElement) {
  if (btn) btn.innerHTML = " ";
  if (element.className.includes("active-input")) {
    if (btn) btn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    element.classList.remove("active-input");
    element.classList.remove("valid");
  } else {
    if (btn) btn.innerHTML = '<i class="fa-regular fa-floppy-disk"></i>';
    element.classList.add("active-input");
    element.focus();
  }
}

export function editName(nameInput: HTMLInputElement, btn: HTMLElement): void {
  changeStateBtnInput(nameInput, btn);
  updateCustomerHandler(nameInput, [{ action: "setFirstName", firstName: nameInput.value }], "firstName", function changeGreeting() {
    const nameInGreeting = document.querySelector(".user-greeting__link");
    if (nameInGreeting) nameInGreeting.textContent = nameInput.value;
    setItemToLocalStorage("user", nameInput.value);
  });
}

export function editSurname(surnameInput: HTMLInputElement, btn: HTMLElement): void {
  changeStateBtnInput(surnameInput, btn);
  updateCustomerHandler(surnameInput, [{ action: "setLastName", lastName: surnameInput.value }], "lastName");
}

export function editBirthday(birthdayInput: HTMLInputElement, btn: HTMLElement): void {
  changeStateBtnInput(birthdayInput, btn);
  updateCustomerHandler(birthdayInput, [{ action: "setDateOfBirth", dateOfBirth: birthdayInput.value }], "dateOfBirth");
}

export function editEmail(emailInput: HTMLInputElement, btn: HTMLElement): void {
  changeStateBtnInput(emailInput, btn);
  updateCustomerHandler(emailInput, [{ action: "changeEmail", email: emailInput.value }], "email");
}

function updateCustomerHandler(input: HTMLInputElement, actions: CustomerUpdateAction[], fieldName: keyof Customer, callback?: () => void) {
  if (!input.className.includes("active-input")) {
    getUserData()?.then(({ body }) => {
      const version = body.version;
      const previousValue = body[fieldName];
      if (previousValue !== input.value) {
        updateCustomer(version, actions)
          ?.then((response) => {
            if (response.statusCode === 200) {
              callback?.();
              createSnackbar(SnackbarType.success, "Изменения сохранены");
            }
          })
          .catch((response) => {
            if (response.statusCode === 400) {
              createSnackbar(SnackbarType.error, "Пользователь с такой почтой существует");
            }
            if (response.statusCode === 500) {
              createSnackbar(SnackbarType.error, "Что-то пошло не так...Попробуйте позже");
            }
          });
      }
    });
  }
}

export function editPassword(
  passwordCurrentInput: HTMLInputElement,
  passwordCurrentDiv: HTMLElement,
  newPasswordInput: HTMLInputElement,
  btn: HTMLElement,
): void {
  changeStateBtnInput(newPasswordInput, btn);
  if (newPasswordInput.className.includes("active-input")) return;
  passwordCurrentInput.classList.remove("valid");
  getUserData()?.then(({ body }) => {
    const id = body.id;
    const version = Number(body.version);
    if (passwordCurrentInput.value.length !== 0 && passwordCurrentInput.value !== newPasswordInput.value) {
      changePassword(id, version, passwordCurrentInput.value, newPasswordInput.value)
        ?.then((response) => {
          if (response.statusCode === 200) {
            createSnackbar(SnackbarType.success, "Изменения сохранены");
            authorizeUserWithToken(body.email, newPasswordInput.value);
          }
        })
        .catch((response) => {
          if (response.statusCode === 400) {
            createSnackbar(SnackbarType.error, "Текущий пароль неверный");
            changeStateBtnInputAfterWrongPassword(passwordCurrentDiv, btn, newPasswordInput);
          }
        });
    } else {
      showCustomErrorPassword(passwordCurrentInput, newPasswordInput);
      changeStateBtnInputAfterWrongPassword(passwordCurrentDiv, btn, newPasswordInput);
    }
  });
}

function showCustomErrorPassword(passwordCurrentInput: HTMLInputElement, newPasswordInput: HTMLInputElement) {
  if (passwordCurrentInput.value.length === 0) {
    createSnackbar(SnackbarType.error, "Введите текущий пароль");
  }
  if (passwordCurrentInput.value === newPasswordInput.value) {
    createSnackbar(SnackbarType.error, "Введите отличные друг от друга пароли");
  }
}

function changeStateBtnInputAfterWrongPassword(currentPasswordDiv: HTMLElement, btn: HTMLElement, input: HTMLInputElement) {
  currentPasswordDiv.style.opacity = "1";
  btn.innerHTML = '<i class="fa-regular fa-floppy-disk"></i>';
  btn.classList.add("disabled-icon");
  input.classList.add("active-input");
}
