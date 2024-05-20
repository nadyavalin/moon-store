import { createEmptyDiv } from "src/components/elements";

function isValidInput(inputTag: HTMLInputElement, pattern: string): boolean {
  if (inputTag.name === "birthday") {
    const date = new Date();
    const dateOfBirthday = Date.parse(inputTag.value);
    const minAge = 13;
    if (Number(date.setFullYear(date.getFullYear() - minAge)) > dateOfBirthday) return true;
    return false;
  }
  const patternReg = new RegExp(pattern);
  return patternReg.test(inputTag.value);
}

function hasStartFinishSpaces(inputValue: string): boolean {
  return /^[ \s]+|[ \s]+$/.test(inputValue);
}

export function checkValidityAllFields() {
  const arrInputs = Array.from(document.querySelectorAll("input"));
  return arrInputs.every((element) => isValidInput(element, element.pattern) && !hasStartFinishSpaces(element.value));
}

export function addValidationListenersToInput(
  inputTag: HTMLInputElement,
  text: string,
  nextElem: HTMLElement,
  parent: HTMLElement,
  pattern?: string,
) {
  if (!pattern) return;
  inputTag.addEventListener("input", () => {
    const btnSubmit = document.querySelector(".submit-button");
    document.querySelector(`.error-${inputTag.name}`)?.remove();
    if (checkValidityAllFields()) {
      btnSubmit?.classList.remove("disabled");
    } else {
      btnSubmit?.classList.add("disabled");
    }

    if (isValidInput(inputTag, pattern) && !hasStartFinishSpaces(inputTag.value)) {
      document.querySelector(`.error-${inputTag.name}`)?.remove();
      inputTag.classList.remove("invalid");
      inputTag.classList.add("valid");
    } else {
      const errorMessage = createEmptyDiv([`error-${inputTag.name}`, "error-message"], text);
      inputTag.classList.remove("valid");
      inputTag.classList.add("invalid");
      parent.insertBefore(errorMessage, nextElem);
    }
  });
  inputTag.addEventListener("invalid", (e: Event) => {
    e.preventDefault();
  });
}

export default addValidationListenersToInput;
