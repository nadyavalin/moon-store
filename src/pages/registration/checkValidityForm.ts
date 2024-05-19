import { createElement } from "src/components/elements";

function isValidInput(inputValue: string, pattern: RegExp): boolean {
  return pattern.test(inputValue);
}

function checkValidityAllFields() {
  const arrInputs = Array.from(document.querySelectorAll("input"));
  return arrInputs.every((element) => isValidInput(element.value, new RegExp(element.pattern)));
}

export function addValidationListenersToInput(
  inputTag: HTMLInputElement,
  text: string,
  nextElem: HTMLElement,
  parent: HTMLElement,
  pattern?: RegExp,
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
    if (isValidInput(inputTag.value, pattern)) {
      document.querySelector(`.error-${inputTag.name}`)?.remove();
      inputTag.classList.remove("invalid");
      inputTag.classList.add("valid");
    } else {
      const errorMessage = createElement({ tagName: "div", classNames: [`error-${inputTag.name}`, "error-message"], textContent: text });
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
