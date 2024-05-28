import { createElement } from "src/components/elements";

export function patternValidator(inputTag: HTMLInputElement): boolean {
  const patternReg = new RegExp(inputTag.pattern);
  return patternReg.test(inputTag.value);
}

export function ageValidator(inputTag: HTMLInputElement): boolean {
  const date = new Date();
  const dateOfBirthday = Date.parse(inputTag.value);
  const minAge = 13;
  return Number(date.setFullYear(date.getFullYear() - minAge)) > dateOfBirthday;
}

export function spacesValidator(inputTag: HTMLInputElement): boolean {
  return !/^[ \s]+|[ \s]+$/.test(inputTag.value);
}

export function checkValidityAllFields() {
  const btnSubmit = document.querySelector(".submit-button");
  const arrInputs = Array.from(document.querySelectorAll("input"));
  const birthday = <HTMLInputElement>document.querySelector(".birthday");
  let validationResult;
  if (!birthday) {
    validationResult = arrInputs.every((element) => patternValidator(element) && spacesValidator(element));
  } else {
    validationResult = arrInputs.every((element) => patternValidator(element) && spacesValidator(element) && ageValidator(birthday));
  }
  if (validationResult) {
    btnSubmit?.classList.remove("disabled");
  } else {
    btnSubmit?.classList.add("disabled");
  }
}

export function showErrorMessage(inputTag: HTMLInputElement, parent: HTMLElement, nextElem: HTMLElement, errorMessage: HTMLElement) {
  errorMessage.classList.remove("hidden");
  inputTag.classList.remove("valid");
  inputTag.classList.add("invalid");
  parent.insertBefore(errorMessage, nextElem);
}

export function removeErrorMessage(inputTag: HTMLInputElement, errorMessage: HTMLElement) {
  errorMessage.classList.add("hidden");
  document.querySelector(`.error-${inputTag.name}`)?.remove();
  inputTag.classList.remove("invalid");
  inputTag.classList.add("valid");
}

export const paramsActions: { [key: string]: (inputTag: HTMLInputElement) => boolean } = {
  pattern: patternValidator,
  date: ageValidator,
  spaces: spacesValidator,
};

export function addValidationListenersToInput(inputTag: HTMLInputElement, nextElem: HTMLElement, parent: HTMLElement, validateParams: string[]) {
  const errorMessage = createElement({ tagName: "div", classNames: [`error-${inputTag.name}`, "error-message"], textContent: inputTag.title });
  inputTag.addEventListener("input", () => {
    const validationResult = validateParams.every((param: string) => paramsActions[param](inputTag) === true);
    if (validationResult === false) {
      showErrorMessage(inputTag, parent, nextElem, errorMessage);
    } else {
      removeErrorMessage(inputTag, errorMessage);
    }
    checkValidityAllFields();
  });
  inputTag.addEventListener("invalid", (e: Event) => {
    e.preventDefault();
  });
}

export default addValidationListenersToInput;
