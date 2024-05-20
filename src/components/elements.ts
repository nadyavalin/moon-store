import { snackbarContainer } from "src/pages/basePage/basePage";
import { SnackbarType } from "src/types/types";

export function createElement<T extends keyof HTMLElementTagNameMap>({
  tagName,
  classNames,
  textContent,
  innerHTML,
  attributes,
}: {
  tagName: T;
  classNames?: string[];
  textContent?: string;
  innerHTML?: string;
  attributes?: Record<string, string>;
}): HTMLElementTagNameMap[T] {
  const element = document.createElement(tagName);
  if (classNames) {
    element.classList.add(...classNames);
  }

  if (textContent) {
    element.textContent = textContent;
  }

  if (innerHTML) {
    element.innerHTML = innerHTML;
  }

  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }
  return element;
}

export function createSvgElement(svgString: string, className?: string) {
  const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgElement.innerHTML = svgString;
  if (className) svgElement.classList.add(className);
  return svgElement;
}

export function createSnackbar(type: SnackbarType, text: string) {
  const snackbar = createElement({ tagName: "div", classNames: ["snackbar", `snackbar_${type}`], textContent: text });
  snackbarContainer.prepend(snackbar);
  setTimeout(() => {
    snackbarContainer.removeChild(snackbar);
  }, 4000);
}

// TODO пришлось вернуть эту функцию, потому что createElement некорректно работает с паттернами
export function createInput(id: string, type: string, className: string[], placeholder?: string, pattern?: RegExp, title?: string) {
  const input = document.createElement("input");
  input.type = type;
  input.id = id;
  input.name = id;
  input.classList.add(...className);
  if (placeholder) input.placeholder = placeholder;
  if (pattern) input.pattern = `${pattern}`.replaceAll("/", "");
  if (title) input.title = title;
  input.setAttribute("required", "true");
  input.setAttribute("autocomplete", "true");
  return input;
}
