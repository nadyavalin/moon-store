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

export function createSnackbar(text: string) {
  let opacity = 1;
  const snackbar = createElement({ tagName: "div" });
  document.body.appendChild(snackbar);
  const vertical = "top";
  const horizontal = "right";
  const open = true;
  setTimeout(() => {
    const fadeOutInterval = setInterval(() => {
      opacity -= 0.1;
      snackbar.style.opacity = opacity.toString();
      if (opacity <= 0) {
        clearInterval(fadeOutInterval);
        document.body.removeChild(snackbar);
      }
    }, 300);
  }, 2000);

  if (open) {
    snackbar.style.position = "fixed";
    snackbar.style.top = vertical === "top" ? "20px" : "auto";
    snackbar.style.right = horizontal === "right" ? "20px" : "auto";
  }

  snackbar.classList.add("snackbar");
  snackbar.textContent = text;
  return snackbar;
}

export function createErrorSuccessSnackbar(type: number, text: string) {
  if (type === 400 || type === 500) {
    const snackbar = createSnackbar(text);
    snackbar.classList.add("snackbar_red");
  }
  if (type === 200 || type === 201) {
    const snackbar = createSnackbar(text);
    snackbar.classList.add("snackbar_green");
  }
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
