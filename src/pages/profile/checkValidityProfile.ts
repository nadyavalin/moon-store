import { createElement } from "../../components/elements";
import { paramsActions, removeErrorMessage, showErrorMessage } from "../registration/checkValidityForm";

export function addValidationListenersToInputProfile(
  inputTag: HTMLInputElement,
  nextElem: HTMLElement,
  parent: HTMLElement,
  validateParams: string[],
  btnEdit: HTMLElement,
) {
  const errorMessage = createElement({ tagName: "div", classNames: [`error-${inputTag.name}`, "error-message"], textContent: inputTag.title });
  inputTag.addEventListener("input", () => {
    const validationResult = validateParams.every((param: string) => paramsActions[param](inputTag) === true);
    if (validationResult === false) {
      showErrorMessage(inputTag, parent, nextElem, errorMessage);
      btnEdit.classList.add("disabled-icon");
    } else {
      removeErrorMessage(inputTag, errorMessage);
      btnEdit.classList.remove("disabled-icon");
    }
  });
  inputTag.addEventListener("invalid", (e: Event) => {
    e.preventDefault();
  });
}


export function addShippingAddress(){



}