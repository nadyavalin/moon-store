import { createText } from "src/components/elements";

function isValidInput(inputValue: string, pattern: RegExp): boolean {
  return pattern.test(inputValue);
}

function checkValidityAllFields() {
  const arrInputs = Array.from(document.querySelectorAll("input"));
  return arrInputs.every((element) => isValidInput(element.value, new RegExp(element.pattern.replace('"', "/"))));
}

export function addValidationListenersToInput(
  inputTag: HTMLInputElement,
  text: string,
  nextElem: HTMLElement,
  parent: HTMLElement,
  pattern?: string,
) {
  if (!pattern) return;
  const regExp = new RegExp(pattern.replace('"', "/"));
  inputTag.addEventListener("input", () => {
    document.querySelector(`.error-${inputTag.name}`)?.remove();
    if (checkValidityAllFields()) document.querySelector(".submit-button")?.classList.remove("disabled");
    if (!isValidInput(inputTag.value, regExp)) {
      const errorMessage = createText([`error-${inputTag.name}`, "error-message"], text);
      parent.insertBefore(errorMessage, nextElem);
    } else {
      document.querySelector(`.error-${inputTag.name}`)?.remove();
    }
  });
  inputTag.addEventListener("invalid", (e: Event) => {
    e.preventDefault();
  });
}

export default addValidationListenersToInput;
