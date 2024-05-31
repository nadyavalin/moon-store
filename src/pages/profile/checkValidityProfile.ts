import { createElement } from "../../components/elements";
import { paramsActions, removeErrorMessage, showErrorMessage } from "../registration/checkValidityForm";

export function addValidationListenersToInputProfile({
  input,
  nextElem,
  parent,
  validateParams,
  btn,
}: {
  input: HTMLInputElement;
  nextElem: HTMLElement;
  parent: HTMLElement;
  validateParams: string[];
  btn: HTMLElement;
}) {
  const errorMessage = createElement({ tagName: "div", classNames: [`error-${input.name}`, "error-message"], textContent: input.title });
  input.addEventListener("input", () => {
    const validationResult = validateParams.every((param: string) => paramsActions[param](input) === true);
    if (validationResult === false) {
      showErrorMessage(input, parent, nextElem, errorMessage);
      btn.classList.add("disabled-icon");
    } else {
      removeErrorMessage(input, errorMessage);
      btn.classList.remove("disabled-icon");
    }
  });
  input.addEventListener("invalid", (e: Event) => {
    e.preventDefault();
  });
}
