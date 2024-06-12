import { Cart, CartUpdateAction } from "@commercetools/platform-sdk";
import { getCart, updateCart } from "../../api/api";
import { correctFactorForPrices } from "../../api/constants";

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

export function deletionConfirmation() {}

export function resetCart() {
  getCart()?.then((response) => {
    response.body.lineItems.forEach((item, index) => {
      const itemDiv = <HTMLElement>document.querySelectorAll(".product-list__wrapper")[index];
      removeProduct(item.id, itemDiv);
    });
  });

  getCart()?.then((response) => {
    let actions: CartUpdateAction[] = [];
    response.body.lineItems.forEach((item) => {
      actions.push({ action: "removeLineItem", lineItemId: item.id });
    });

    updateCart(response.body.version, actions)?.then((response) => {
      if (response.statusCode === 200) {
        const arr = document.querySelectorAll(".product-list__wrapper");
        arr.forEach((item) => item.remove());
        recalculateTotalDataCart(response.body);
        showQuantityItemsInHeader(response.body);
      }
    });
  });
}
