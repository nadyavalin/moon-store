import { Cart, CartUpdateAction } from "@commercetools/platform-sdk";
import { getCart, updateCart } from "../../api/api";
import { createElement, createSnackbar, createSvgElement } from "../../components/elements";
import { cross } from "../../components/svg";
import { PriceFormatter } from "../../utils/utils";
import { SnackbarType } from "../../types/types";
import { createEmptyCart } from "./basket";

function recalculateTotalDataCart(response?: Cart) {
  const totalPriceCartDiv = document.querySelector(".product-total__price");
  const totalQuantityDiv = document.querySelector(".product-amount__full-amount");
  if (totalQuantityDiv) totalQuantityDiv.textContent = `${response?.lineItems.reduce((total, item) => total + Number(item.quantity), 0)}`;
  if (totalPriceCartDiv) totalPriceCartDiv.textContent = `${PriceFormatter.formatCents(response?.totalPrice.centAmount)}`;
}

export function showQuantityItemsInHeader(response?: Cart) {
  const quantityItems = document.querySelector(".menu-item__basket-amount");
  if (quantityItems) quantityItems.textContent = `${response?.lineItems.reduce((total, item) => total + Number(item.quantity), 0)}`;
}

export function changeQuantityProduct({
  btn,
  countDiv,
  quantity,
  totalPriceDiv,
  lineItemId,
  lineItemIndex,
}: {
  btn: HTMLElement;
  countDiv: HTMLElement;
  quantity: number;
  totalPriceDiv: HTMLElement;
  lineItemId: string;
  lineItemIndex: number;
}) {
  getCart()?.then((response) => {
    updateCart(response.body.version, [
      {
        action: "changeLineItemQuantity",
        lineItemId,
        quantity,
      },
    ])?.then((response) => {
      if (response.statusCode === 200) {
        btn.classList.toggle("disabled", quantity === 1);
        countDiv.textContent = `${quantity}`;
        totalPriceDiv.textContent = `${PriceFormatter.formatCents(response.body.lineItems[lineItemIndex].totalPrice.centAmount)}`;
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
        createSnackbar(SnackbarType.success, "Товар удален");
        productItemDiv.remove();
        recalculateTotalDataCart(response.body);
        showQuantityItemsInHeader(response.body);
        if (!response.body.lineItems.length) {
          createEmptyCart(document.querySelector(".basket__wrapper") as HTMLElement);
          document.querySelector(".product-total__wrapper")?.remove();
        }
      }
    });
  });
}

export function createModalConfirm() {
  const modalBack = createElement({ tagName: "div", classNames: ["modal-back"] });
  const modalCart = createElement({ tagName: "div", classNames: ["modal"] });
  const modalCartContent = createElement({ tagName: "div", classNames: ["modal-cart__content"] });
  const closeButton = createSvgElement(cross, "cross", { width: "22px", height: "22px", viewBox: "0 0 19 19", fill: "none" });
  const modalText = createElement({ tagName: "div", classNames: ["modal-text"], textContent: "Вы уверены, что хотите очистить корзину?" });
  const confirmButton = createElement({ tagName: "button", classNames: ["modal-confirm-btn"], textContent: "Подтвердить" });
  modalCart.append(modalCartContent);
  modalCartContent.append(modalText, confirmButton, closeButton);
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
        createSnackbar(SnackbarType.success, "Товары удалены из корзины");
        createEmptyCart(document.querySelector(".basket__wrapper") as HTMLElement);
        document.querySelector(".product-total__wrapper")?.remove();
      }
    });
  });
}
