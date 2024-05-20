export function createInput(id: string, type: string, className: string[], placeholder?: string, pattern?: string, title?: string) {
  const input = document.createElement("input");
  input.type = type;
  input.id = id;
  input.name = id;
  input.classList.add(...className);
  if (placeholder) input.placeholder = placeholder;
  if (pattern) input.pattern = `${pattern}`;
  if (title) input.title = title;
  input.setAttribute("required", "true");
  input.setAttribute("autocomplete", "true");
  return input;
}

export function createButton(className: string[], text = "") {
  const button = document.createElement("button");
  button.classList.add(...className);
  button.textContent = text;
  return button;
}

export function createSubmitButton(text: string) {
  const button = createButton(["submit-button", "disabled"], text);
  button.type = "submit";
  return button;
}

export function createLink(link: string, className?: string[], text?: string | null) {
  const linkA = document.createElement("a");
  linkA.href = link;
  if (className) linkA.classList.add(...className);
  if (text) linkA.textContent = text;
  return linkA;
}

export function createOuterLink(link: string, text?: string) {
  const linkA = document.createElement("a");
  linkA.href = link;
  if (text) linkA.textContent = text;
  linkA.target = "_blank";
  return linkA;
}

export function createLinkMenuItem(link: string, text: string) {
  const menuItem = createLink(link, ["menu-item"]);
  menuItem.textContent = text;
  return menuItem;
}

export function createDiv(className: string[], data?: { key: string; value: string }) {
  const div = document.createElement("div");
  div.classList.add(...className);
  if (data && data.key && data.value) {
    div.setAttribute(`data-${data.key}`, data.value);
  }
  return div;
}

export function createEmptyDiv(className?: string[], text?: string) {
  const textItem = document.createElement("div");
  if (className) textItem.classList.add(...className);
  if (text) textItem.textContent = text;
  return textItem;
}

export function createSpan(className: string[], text: string) {
  const span = document.createElement("span");
  span.classList.add(...className);
  span.textContent = text;
  return span;
}

export function createElement(elem: string, className?: string[], text?: string) {
  const element = document.createElement(elem);
  if (className) element.classList.add(...className);
  if (text) element.textContent = text;
  return element;
}

export function createImage(src: string, alt: string, className?: string[]) {
  const image = document.createElement("img");
  image.src = src;
  image.alt = alt;
  image.title = alt;
  if (className) image.classList.add(...className);
  return image;
}

export function createSnackbar(text: string) {
  let opacity = 1;
  const snackbar = document.createElement("div");
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

export function createSvgElement(svgString: string, className?: string) {
  const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgElement.innerHTML = svgString;
  if (className) svgElement.classList.add(className);
  return svgElement;
}
