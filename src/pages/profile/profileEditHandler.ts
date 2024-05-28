import { Customer, CustomerUpdateAction } from "@commercetools/platform-sdk";
import { getUserData, updateCustomer } from "../../api/api";
import { createSnackbar } from "../../components/elements";
import state from "../../store/state";
import { SnackbarType } from "../../types/types";
import { setItemToLocalStorage } from "../../utils/utils";

function changeStateBtnInput(element: HTMLElement, btn?: HTMLElement) {
  if (btn) btn.innerHTML = " ";
  if (element.className.includes("active-input")) {
    if (btn) btn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    element.classList.remove("active-input");
  } else {
    if (btn) btn.innerHTML = '<i class="fa-regular fa-floppy-disk"></i>';
    element.classList.add("active-input");
    element.focus();
  }
}

export function editName(): void {
  const input = <HTMLInputElement>document.querySelector(".name__input");
  const btn = <HTMLElement>document.querySelector(".name__edit-btn");
  changeStateBtnInput(input, btn);
  updateCustomerHandler(input, [{ action: "setFirstName", firstName: input.value }], "firstName", function changeGreeting() {
    const nameInGreeting = document.querySelector(".user-greeting__link");
    if (nameInGreeting) nameInGreeting.textContent = input.value;
    setItemToLocalStorage("user", input.value);
  });
}

export function editSurname(): void {
  const input = <HTMLInputElement>document.querySelector(".surname__input");
  const btn = <HTMLElement>document.querySelector(".surname__edit-btn");
  changeStateBtnInput(input, btn);
  updateCustomerHandler(input, [{ action: "setLastName", lastName: input.value }], "lastName");
}

export function editBirthday(): void {
  const input = <HTMLInputElement>document.querySelector(".birthday__input");
  const btn = <HTMLElement>document.querySelector(".birthday__edit-btn");
  changeStateBtnInput(input, btn);
  updateCustomerHandler(input, [{ action: "setDateOfBirth", dateOfBirth: input.value }], "dateOfBirth");
}

export function editEmail(): void {
  const input = <HTMLInputElement>document.querySelector(".email__input");
  const btn = <HTMLElement>document.querySelector(".email__edit-btn");
  changeStateBtnInput(input, btn);
  updateCustomerHandler(input, [{ action: "changeEmail", email: input.value }], "email");
}

export function editPassword(): void {
  const input = <HTMLElement>document.querySelector(".password__input");
  const btn = <HTMLElement>document.querySelector(".password__edit-btn");
  changeStateBtnInput(input, btn);
}

export function editAddress(e: Event): void {
  const target = <HTMLElement>e.target;
  const btn = <HTMLButtonElement>target.closest(".edit-btn");
  // const btnID = btn.id;
  const address = target.closest(".address__data");
  if (!address) return;
  const inputArr = Array.from(address.querySelectorAll("input"));
  const select = <HTMLElement>address?.querySelector("select");

  inputArr.forEach((element: HTMLElement) => {
    changeStateBtnInput(element);
  });
  changeStateBtnInput(select, btn);
}

function updateCustomerHandler(input: HTMLInputElement, actions: CustomerUpdateAction[], fieldName: keyof Customer, callback?: () => void) {
  if (!input.className.includes("active-input")) {
    getUserData(state.customerId as string)?.then(({ body }) => {
      const version = Number(body.version);
      const previousValue = body[fieldName];
      if (previousValue !== input.value) {
        updateCustomer(version, actions)
          ?.then((response) => {
            if (response.statusCode === 200) {
              callback?.();
              createSnackbar(SnackbarType.success, "Изменения сохранены");
            }
          })
          .catch(() => {
            createSnackbar(SnackbarType.error, "Что-то пошло не так...Попробуйте позже");
          });
      }
    });
  }
}
