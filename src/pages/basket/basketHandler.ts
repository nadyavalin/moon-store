import { Cart, CartUpdateAction } from "@commercetools/platform-sdk";
import { getCart, updateCart } from "../../api/api";
import { correctFactorForPrices } from "../../api/constants";
import { createElement, createSvgElement } from "src/components/elements";
import { cross } from "src/components/svg";

function recalculateTotalDataCart(response?: Cart) {
  const totalPriceCartDiv = document.querySelector(".product-total__price");
  const totalQuantityDiv = document.querySelector(".product-amount__full-amount");
  if (totalQuantityDiv) totalQuantityDiv.textContent = `${response?.lineItems.reduce((total, item) => total + Number(item.quantity), 0)}`;
  if (totalPriceCartDiv) totalPriceCartDiv.textContent = `${Number(response?.totalPrice.centAmount) / correctFactorForPrices} р.`;
}

export function showQuantityItemsInHeader(response?: Cart) {
  const quantityItems = document.querySelector(".menu-item__basket-amount");
  if (quantityItems) quantityItems.textContent = `${response?.lineItems.reduce((total, item) => total + Number(item.quantity), 0)}`;
}

export function increaseQuantityProduct(
  btn: HTMLElement,
  countDiv: HTMLElement,
  totalPriceDiv: HTMLElement,
  lineItemId: string,
  lineItemIndex: number,
) {
  let quantity = Number(countDiv.textContent);
  quantity += 1;
  btn.classList.remove("disabled");
  getCart()?.then((response) => {
    updateCart(response.body.version, [
      {
        action: "changeLineItemQuantity",
        lineItemId,
        quantity,
      },
    ])?.then((response) => {
      if (response.statusCode === 200) {
        countDiv.textContent = `${quantity}`;
        totalPriceDiv.textContent = `${Number(response.body.lineItems[+lineItemIndex].totalPrice.centAmount) / correctFactorForPrices} р.`;
        recalculateTotalDataCart(response.body);
        showQuantityItemsInHeader(response.body);
      }
    });
  });
}

export function decreaseQuantityProduct(
  btn: HTMLElement,
  countDiv: HTMLElement,
  totalPriceDiv: HTMLElement,
  lineItemId: string,
  lineItemIndex: number,
) {
  let quantity = Number(countDiv.textContent);
  if (quantity === 1) {
    btn.classList.add("disabled");
  }
  if (quantity >= 2) {
    quantity -= 1;
  }

  getCart()?.then((response) => {
    updateCart(response.body.version, [
      {
        action: "changeLineItemQuantity",
        lineItemId,
        quantity,
      },
    ])?.then((response) => {
      if (response.statusCode === 200) {
        countDiv.textContent = `${quantity}`;
        totalPriceDiv.textContent = `${Number(response.body.lineItems[+lineItemIndex].totalPrice.centAmount) / correctFactorForPrices} р.`;
        recalculateTotalDataCart(response.body);
        showQuantityItemsInHeader(response.body);
      }
    });
  });
}

export function removeProduct(lineItemId: string, productItemDiv: HTMLElement) {
  getCart()?.then((response) => {
    updateCart(response.body.version, [
      {
        action: "removeLineItem",
        lineItemId,
      },
    ])?.then((response) => {
      if (response.statusCode === 200) {
        productItemDiv.remove();
        recalculateTotalDataCart(response.body);
        showQuantityItemsInHeader(response.body);
      }
    });
  });
}

export function createModalConfirm() {
  const modalBack = createElement({ tagName: "div", classNames: ["modal-back"] });
  const modalCart = createElement({ tagName: "div", classNames: ["modal", "modal-cart"] });
  const closeButton = createSvgElement(cross, "cross", { width: "22px", height: "22px", viewBox: "0 0 19 19", fill: "none" });
  const modalText = createElement({ tagName: "div", classNames: ["modal-text"], textContent: "Вы уверены, что хотите очистить корзину?" });
  const confirmButton = createElement({ tagName: "button", classNames: ["modal-confirm-btn"], textContent: "Подтвердить" });
  modalCart.append(modalText, confirmButton, closeButton);
  modalBack.append(modalCart);
  closeButton.addEventListener("click", () => {
    modalBack.remove();
  });
  confirmButton.addEventListener("click", () => {
    resetCart();
    modalBack.remove();
  });
  return modalBack;
}

export function resetCart() {
  getCart()?.then((response) => {
    let actions: CartUpdateAction[] = [];
    response.body.lineItems.forEach((item) => {
      actions.push({ action: "removeLineItem", lineItemId: item.id });
    });

    updateCart(response.body.version, actions)?.then((response) => {
      if (response.statusCode === 200) {
        const arr = document.querySelectorAll(".product-basket-item");
        arr.forEach((item) => item.remove());
        recalculateTotalDataCart(response.body);
        showQuantityItemsInHeader(response.body);
      }
    });
  });
}
