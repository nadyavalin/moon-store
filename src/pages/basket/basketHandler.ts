import { Cart } from "@commercetools/platform-sdk";
import { getCart, updateCart } from "src/api/api";
import { correctFactorForPrices } from "src/api/constants";
import { createSnackbar } from "src/components/elements";
import { SnackbarType } from "src/types/types";

function recalculateTotalCartPrice(response?: Cart) {
  const totalPriceCartDiv = document.querySelector(".product-total__price");
  const amountItemDiv = document.querySelector(".product-amount__full-amount");
  if (amountItemDiv) amountItemDiv.textContent = `${response?.lineItems.length}`;
  if (totalPriceCartDiv) totalPriceCartDiv.textContent = `${Number(response?.totalPrice.centAmount) / correctFactorForPrices} р.`;
}

export function showQuantityItemsInHeader(response?: Cart) {
  const quantityItems = document.querySelector(".menu-item__basket-amount");
  if (quantityItems) quantityItems.textContent = `${response?.lineItems.length}`;
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
    ])
      ?.then((response) => {
        if (response.statusCode === 200) {
          countDiv.textContent = `${quantity}`;
          totalPriceDiv.textContent = `${Number(response.body.lineItems[+lineItemIndex].totalPrice.centAmount) / correctFactorForPrices} р.`;
          recalculateTotalCartPrice(response.body);
        }
      })
      .catch(() => createSnackbar(SnackbarType.error, "Что-то пошло не так...Попробуйте позже"));
  });
}
function updateCartHandler() {}
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
    ])
      ?.then((response) => {
        if (response.statusCode === 200) {
          countDiv.textContent = `${quantity}`;
          totalPriceDiv.textContent = `${Number(response.body.lineItems[+lineItemIndex].totalPrice.centAmount) / correctFactorForPrices} р.`;
          recalculateTotalCartPrice(response.body);
        }
      })
      .catch(() => createSnackbar(SnackbarType.error, "Что-то пошло не так...Попробуйте позже"));
  });
}

export function removeProduct(lineItemId: string, productItemDiv: HTMLElement) {
  getCart()?.then((response) => {
    updateCart(response.body.version, [
      {
        action: "removeLineItem",
        lineItemId,
      },
    ])
      ?.then((response) => {
        if (response.statusCode === 200) {
          productItemDiv.remove();
          recalculateTotalCartPrice(response.body);
          showQuantityItemsInHeader(response.body);
        }
      })
      .catch(() => createSnackbar(SnackbarType.error, "Что-то пошло не так...Попробуйте позже"));
  });
}
