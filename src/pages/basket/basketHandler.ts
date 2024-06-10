import { Cart } from "@commercetools/platform-sdk";
import { getCart, updateCart } from "src/api/api";
import { correctFactorForPrices } from "src/api/constants";

function recalculateTotalCartPrice(response: Cart) {
  const totalPriceCartDiv = document.querySelector(".product-total__price");
  const amountItemDiv = document.querySelector(".product-amount__full-amount");
  if (amountItemDiv) amountItemDiv.textContent = `${response.lineItems.length}`;
  if (totalPriceCartDiv) totalPriceCartDiv.textContent = `${Number(response.totalPrice.centAmount) / correctFactorForPrices}`;
}

export function increaseQuantityProduct(countDiv: HTMLElement, totalPriceDiv: HTMLElement, lineItemId: string, lineItemIndex: number) {
  let quantity = Number(countDiv.textContent);
  if (quantity >= 0) quantity += 1;
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
        totalPriceDiv.textContent = `${Number(response.body.lineItems[+lineItemIndex].totalPrice.centAmount) / correctFactorForPrices}`;
        recalculateTotalCartPrice(response.body);
      }
    });
  });
}

export function decreaseQuantityProduct(countDiv: HTMLElement, totalPriceDiv: HTMLElement, lineItemId: string, lineItemIndex: number) {
  let quantity = Number(countDiv.textContent);
  if (quantity === 0) {
    quantity = 0;
    return;
  }
  if (quantity > 0) quantity -= 1;
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
        totalPriceDiv.textContent = `${Number(response.body.lineItems[+lineItemIndex].totalPrice.centAmount) / correctFactorForPrices}`;
        recalculateTotalCartPrice(response.body);
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
        recalculateTotalCartPrice(response.body);
      }
    });
  });
}
