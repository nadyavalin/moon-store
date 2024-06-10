import "./productBasketCard.css";
import "../../product/product.css";
import { createElement } from "../../../components/elements";
import { decreaseQuantityProduct, increaseQuantityProduct, removeProduct } from "../basketHandler";
import { Cart } from "@commercetools/platform-sdk";
import { correctFactorForPrices } from "src/api/constants";

export function createBasketCard(index: number, response?: Cart) {
  const productBasketItem = createElement({ tagName: "li", classNames: ["product-basket-item"] });
  const productBasketImage = createElement({
    tagName: "img",
    classNames: ["product-basket__image"],
    attributes: { src: `${response?.lineItems[index].variant.images[0].url}` },
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
    textContent: `Название: ${response?.lineItems[index].name.ru}`,
  });
  const productBasketAmountSizeWrapper = createElement({ tagName: "div", classNames: ["product-basket__amount-sizes-wrapper"] });
  const productBasketPricesWrapper = createElement({ tagName: "div", classNames: ["product-basket__prices-wrapper"] });
  const productBasketAmountNameWrapper = createElement({ tagName: "div", classNames: ["product-basket__amount-wrapper"] });
  const productBasketAmountText = createElement({ tagName: "p", classNames: ["product-basket__small-text"], textContent: "Количество: " });
  const productBasketAmountWrapper = createElement({ tagName: "div", classNames: ["product-basket__amount-wrapper"] });
  const productBasketPlusAmountButton = createElement({ tagName: "i", classNames: ["fa-solid", "fa-plus", "amount-button"] });
  const productBasketAmount = createElement({
    tagName: "p",
    classNames: ["product-basket__amount"],
    textContent: `${response?.lineItems[index].quantity}`,
  });
  const productBasketMinusAmountButton = createElement({ tagName: "i", classNames: ["fa-solid", "fa-minus", "amount-button"] });
  const productBasketSizeWrapper = createElement({ tagName: "div", classNames: ["product-basket__size-wrapper"] });
  const productBasketSizeText = createElement({ tagName: "p", classNames: ["product-basket__small-text"], textContent: "Размер: " });
  const productBasketSize = createElement({
    tagName: "span",
    classNames: ["product__size-item"],
    textContent: `${response?.lineItems[index].variant.attributes[0].value[0].key}`,
  });
  const productBasketPriceWrapper = createElement({ tagName: "div", classNames: ["product-basket__price-wrapper"] });
  const productBasketPriceText = createElement({ tagName: "p", classNames: ["product-basket__small-text"], textContent: "Цена за единицу: " });
  const productBasketPrice = createElement({
    tagName: "p",
    classNames: ["product-basket__price"],
    textContent: `${Number(response?.lineItems[index].price.value.centAmount) / correctFactorForPrices} р.`,
  });
  const productBasketDiscountWrapper = createElement({ tagName: "div", classNames: ["product-basket__discount-wrapper"] });
  const productBasketDiscountText = createElement({ tagName: "p", classNames: ["product-basket__small-text"], textContent: "Со скидкой: " });
  const productBasketDiscount = createElement({
    tagName: "p",
    classNames: ["product-basket__discount"],
    textContent: `${Number(response?.lineItems[index].price.discounted?.value.centAmount) / correctFactorForPrices} р.`,
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
    textContent: `${Number(response?.lineItems[index].totalPrice.centAmount) / correctFactorForPrices} р.`,
  });

  productBasketAmountWrapper.append(productBasketPlusAmountButton, productBasketAmount, productBasketMinusAmountButton);
  productBasketPricesWrapper.append(productBasketPriceWrapper, productBasketDiscountWrapper, productBasketFinalPriceWrapper);
  productBasketAmountNameWrapper.append(productBasketAmountText, productBasketAmountWrapper);
  productBasketSizeWrapper.append(productBasketSizeText, productBasketSize);
  productBasketPriceWrapper.append(productBasketPriceText, productBasketPrice);
  productBasketFinalPriceWrapper.append(productBasketFinalPriceText, productBasketFinalPrice);
  productBasketDiscountWrapper.append(productBasketDiscountText, productBasketDiscount);
  productBasketAmountSizeWrapper.append(productBasketAmountWrapper, productBasketSizeWrapper);
  productBasketTextWrapper.append(productBasketName, productBasketAmountSizeWrapper, productBasketPricesWrapper);
  productBasketDeleteIconWrapper.append(productBasketDeleteIcon);
  productBasketItem.append(productBasketImage, productBasketTextWrapper, productBasketDeleteIconWrapper);

  productBasketPlusAmountButton.addEventListener("click", () => increaseQuantityProduct(`${response?.lineItems[index].id}`, productBasketAmount));
  productBasketMinusAmountButton.addEventListener("click", () => decreaseQuantityProduct(`${response?.lineItems[index].id}`, productBasketAmount));
  productBasketDeleteIcon.addEventListener("click", () => removeProduct(`${response?.lineItems[index].id}`, productBasketItem));
  return productBasketItem;
}
