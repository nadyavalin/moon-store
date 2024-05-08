import { createText } from "src/components/elements";

function isValidInput(inputValue: string, pattern: RegExp): boolean {
  return pattern.test(inputValue);
}

export function listenToValid(inputTag: HTMLInputElement, text: string, nextElem: HTMLElement, parent: HTMLElement, pattern?: string) {
  inputTag.addEventListener("input", () => {
    document.querySelector(`.error-${inputTag.name}`)?.remove();
    if (!pattern) return;
    const regExp = new RegExp(pattern.replace('"', "/"));
    const value = inputTag.value.trim();
    if (!isValidInput(value, regExp)) {
      const errorEmail = createText([`error-${inputTag.name}`, "error-message"], text);
      parent.insertBefore(errorEmail, nextElem);
    } else {
      document.querySelector(`.error-${inputTag.name}`)?.remove();
    }
  });
  inputTag.addEventListener("invalid", (e: Event) => {
    e.preventDefault();
  });
}
export default listenToValid;
