import "./productBasketCard.css";
import "../../product/product.css";
import { createElement } from "../../../components/elements";

import { decreaseQuantityProduct, increaseQuantityProduct, removeProduct } from "../basketHandler";
import { correctFactorForPrices } from "../../../api/constants";
import { Cart } from "@commercetools/platform-sdk";

export function createBasketCard(index: number, response?: Cart) {
  const imgUrlItem = `${response?.lineItems[index].variant.images![0].url}`;
  const nameItem = `${response?.lineItems[index].name.ru}`;
  const quantityItem = `${response?.lineItems[index].quantity}`;
  const sizeItem = `${response?.lineItems[index].variant.attributes![0].value[0].key}`;
  const priceItem = `${Number(response?.lineItems[index].price.value.centAmount) / correctFactorForPrices}`;
  const discountPrice = Number(response?.lineItems[index].price.discounted?.value.centAmount) / correctFactorForPrices;
  const id = response?.lineItems[index].productType.id;

  const productBasketItem = createElement({ tagName: "li", classNames: ["product-basket__item"], attributes: { "data-id": `${id}` } });
  const productBasketImage = createElement({
    tagName: "img",
    classNames: ["product-basket__image"],
    attributes: { src: imgUrlItem },
  });
  const productBasketDeleteIconWrapper = createElement({
    tagName: "div",
    classNames: ["product-basket__delete-button-wrapper"],
    attributes: { title: "Удалить из корзины" },
  });

  const productBasketDeleteIcon = createElement({ tagName: "i", classNames: ["fa-solid", "fa-trash", "trash-button"] });
  const productBasketTextWrapper = createElement({ tagName: "div", classNames: ["product-basket__text-wrapper"] });
  const productBasketName = createElement({
    tagName: "p",
    classNames: ["product-basket__name"],
    textContent: `Название: ${nameItem}`,
  });

  const productBasketAmountSizeWrapper = createElement({ tagName: "div", classNames: ["product-basket__amount-sizes-wrapper"] });
  const productBasketAmountWrapper = createElement({ tagName: "div", classNames: ["product-basket__amount-wrapper"] });
  const productBasketAmountText = createElement({ tagName: "p", classNames: ["product-basket__small-text"], textContent: "Количество: " });
  const productBasketAmountButtonsWrapper = createElement({ tagName: "div", classNames: ["product-basket__amount-buttons-wrapper"] });

  const productBasketPlusAmountButton = createElement({ tagName: "i", classNames: ["fa-solid", "fa-plus", "amount-button"] });
  const productBasketAmount = createElement({
    tagName: "p",
    classNames: ["product-basket__amount"],
    textContent: `${quantityItem}`,
  });
  const productBasketMinusAmountButton = createElement({ tagName: "i", classNames: ["fa-solid", "fa-minus", "amount-button"] });

  const productBasketSizeWrapper = createElement({ tagName: "div", classNames: ["product-basket__size-wrapper"] });
  const productBasketSizeText = createElement({ tagName: "p", classNames: ["product-basket__small-text"], textContent: "Размер: " });
  const productBasketSize = createElement({
    tagName: "span",
    classNames: ["product__size-item"],
    textContent: `${sizeItem}`,
  });

  const productBasketPricesWrapper = createElement({ tagName: "div", classNames: ["product-basket__prices-wrapper"] });
  const productBasketPriceWrapper = createElement({ tagName: "div", classNames: ["product-basket__price-wrapper"] });
  const productBasketPriceText = createElement({ tagName: "p", classNames: ["product-basket__small-text"], textContent: "Цена за единицу: " });
  const productBasketPrice = createElement({
    tagName: "p",
    classNames: ["product-basket__price"],
    textContent: `${priceItem} р.`,
  });

  const productBasketDiscountWrapper = createElement({ tagName: "div", classNames: ["product-basket__discount-wrapper"] });
  const productBasketDiscountText = createElement({ tagName: "p", classNames: ["product-basket__small-text"], textContent: "Со скидкой: " });
  const productBasketDiscountValue = createElement({
    tagName: "p",
    classNames: ["product-basket__discount-value"],
    textContent: `${discountPrice} р.`,
  });

  const productBasketFinalPriceWrapper = createElement({ tagName: "div", classNames: ["product-basket__final-price-wrapper"] });
  const productBasketFinalPriceText = createElement({
    tagName: "p",
    classNames: ["product-basket__small-text"],
    textContent: `Общая стоимость: `,
  });
  const productBasketFinalPrice = createElement({
    tagName: "p",
    classNames: ["product-basket__final-price"],
  });

  if (response?.lineItems[index].price.discounted) {
    productBasketFinalPrice.textContent = `${Number(discountPrice) * Number(quantityItem)} р.`;
  }
  productBasketFinalPrice.textContent = `${Number(priceItem) * Number(quantityItem)} р.`;

  productBasketAmountButtonsWrapper.append(productBasketPlusAmountButton, productBasketAmount, productBasketMinusAmountButton);
  productBasketPricesWrapper.append(productBasketPriceWrapper, productBasketDiscountWrapper, productBasketFinalPriceWrapper);
  productBasketAmountWrapper.append(productBasketAmountText, productBasketAmountButtonsWrapper);
  productBasketSizeWrapper.append(productBasketSizeText, productBasketSize);
  productBasketPriceWrapper.append(productBasketPriceText, productBasketPrice);
  productBasketFinalPriceWrapper.append(productBasketFinalPriceText, productBasketFinalPrice);

  if (response?.lineItems[index].price.discounted) {
    productBasketDiscountWrapper.append(productBasketDiscountText, productBasketDiscountValue);
  }
  productBasketDiscountWrapper.append(productBasketDiscountText);

  productBasketAmountSizeWrapper.append(productBasketAmountWrapper, productBasketSizeWrapper);
  productBasketTextWrapper.append(productBasketName, productBasketAmountSizeWrapper, productBasketPricesWrapper);
  productBasketDeleteIconWrapper.append(productBasketDeleteIcon);
  productBasketItem.append(productBasketImage, productBasketTextWrapper, productBasketDeleteIconWrapper);

  productBasketPlusAmountButton.addEventListener("click", () =>
    increaseQuantityProduct(productBasketMinusAmountButton, productBasketAmount, productBasketFinalPrice, `${response?.lineItems[index].id}`, index),
  );
  productBasketMinusAmountButton.addEventListener("click", () =>
    decreaseQuantityProduct(productBasketMinusAmountButton, productBasketAmount, productBasketFinalPrice, `${response?.lineItems[index].id}`, index),
  );
  productBasketDeleteIcon.addEventListener("click", () => removeProduct(`${response?.lineItems[index].id}`, productBasketItem));
  return productBasketItem;
}
