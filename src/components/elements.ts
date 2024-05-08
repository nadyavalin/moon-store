export function createInput(id: string, type: string, className: string[], placeholder: string) {
  const input = document.createElement("input");
  input.type = type;
  input.id = id;
  input.name = id;
  input.classList.add(...className);
  input.placeholder = placeholder;
  input.setAttribute("required", "true");
  return input;
}

export function createButton(id: string, className: string[], text = "") {
  const button = document.createElement("button");
  button.id = id;
  button.name = id;
  button.classList.add(...className);
  button.textContent = text;
  return button;
}

export function createSubmitButton(text: string) {
  const button = createButton("submit", ["submit", "disabled"], text);
  button.type = "submit";
  button.disabled = true;
  return button;
}

export function createText(className: string[], text?: string) {
  const textItem = document.createElement("div");
  textItem.classList.add(...className);
  if (text) {
    textItem.textContent = text;
  }
  return textItem;
}

export function createLink(link: string, className: string[], text?: string) {
  const linkA = document.createElement("a");
  linkA.href = link;
  linkA.classList.add(...className);
  if (text) {
    linkA.textContent = text;
  }
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

export function createSpan(className: string[], text: string) {
  const span = document.createElement("span");
  span.classList.add(...className);
  span.textContent = text;
  return span;
}

export function createElement(elem: string, className?: string[], text?: string) {
  const element = document.createElement(elem);
  if (className) {
    element.classList.add(...className);
  }
  if (text) {
    element.textContent = text;
  }
  return element;
}

export function createImage(className: string[], src: string, alt: string) {
  const image = document.createElement("img");
  image.classList.add(...className);
  image.src = src;
  image.alt = alt;
  image.title = alt;
  return image;
}

export function createSnackbar(text: string) {
  let opacity = 1;
  const snackbar = document.createElement("div");
  const vertical = "top";
  const horizontal = "right";
  const open = true;

  const fadeOutInterval = setInterval(() => {
    opacity -= 0.1;
    snackbar.style.opacity = opacity.toString();
    if (opacity <= 0) {
      clearInterval(fadeOutInterval);
      document.body.removeChild(snackbar);
    }
  }, 300);

  if (open) {
    snackbar.style.position = "fixed";
    snackbar.style.top = vertical === "top" ? "20px" : "auto";
    snackbar.style.right = horizontal === "right" ? "20px" : "auto";
  }

  snackbar.classList.add("snackbar");
  snackbar.textContent = text;
  return snackbar;
}
