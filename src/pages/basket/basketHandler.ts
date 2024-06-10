import { getCart, updateCart } from "src/api/api";

export function increaseQuantityProduct(lineItemId: string, countDiv: HTMLElement) {
  let quantity = Number(countDiv.textContent);
  if (quantity >= 0) quantity += 1;
  countDiv.textContent = `${quantity}`;
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
      }
    });
  });
}

export function decreaseQuantityProduct(lineItemId: string, countDiv: HTMLElement) {
  let quantity = Number(countDiv.textContent);
  if (quantity === 0) quantity = 0;
  if (quantity > 0) quantity -= 1;
  countDiv.textContent = `${quantity}`;
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
      }
    });
  });
}
