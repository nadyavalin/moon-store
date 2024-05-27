import { getUserData, updateDateOfBirthCustomer, updateEmailCustomer, updateFirstNameCustomer, updateLastNameCustomer } from "src/api/api";
import { createSnackbar } from "src/components/elements";
import state from "src/store/state";
import { SnackbarType } from "src/types/types";

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
  if (!input.className.includes("active-input")) {
    getUserData(state.customerId as string).then(({ body }) => {
      const version = Number(body.version);
      const previousName = body.firstName;
      if (previousName !== input.value) {
        updateFirstNameCustomer(input.value, version)
          .then((response) => {
            if (response.statusCode === 200) {
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

export function editSurname(): void {
  const input = <HTMLInputElement>document.querySelector(".surname__input");
  const btn = <HTMLElement>document.querySelector(".surname__edit-btn");
  changeStateBtnInput(input, btn);
  if (!input.className.includes("active-input")) {
    getUserData(state.customerId as string).then(({ body }) => {
      const version = Number(body.version);
      const previousSurname = body.lastName;
      if (previousSurname !== input.value) {
        updateLastNameCustomer(input.value, version)
          .then((response) => {
            if (response.statusCode === 200) {
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

export function editBirthday(): void {
  const input = <HTMLInputElement>document.querySelector(".birthday__input");
  const btn = <HTMLElement>document.querySelector(".birthday__edit-btn");
  changeStateBtnInput(input, btn);
  if (!input.className.includes("active-input")) {
    getUserData(state.customerId as string).then(({ body }) => {
      const version = Number(body.version);
      const dateOfBirthPrevious = body.dateOfBirth;
      if (dateOfBirthPrevious !== input.value) {
        updateDateOfBirthCustomer(input.value, version)
          .then((response) => {
            if (response.statusCode === 200) {
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

export function editEmail(): void {
  const input = <HTMLInputElement>document.querySelector(".email__input");
  const btn = <HTMLElement>document.querySelector(".email__edit-btn");
  changeStateBtnInput(input, btn);
  if (!input.className.includes("active-input")) {
    getUserData(state.customerId as string).then(({ body }) => {
      const version = Number(body.version);
      const previousEmail = body.email;
      if (previousEmail !== input.value) {
        updateEmailCustomer(input.value, version)
          .then((response) => {
            if (response.statusCode === 200) {
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
