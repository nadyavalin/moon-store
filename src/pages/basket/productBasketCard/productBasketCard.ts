import "./productBasketCard.css";
import { createElement } from "../../../components/elements";

export function createBusketCard() {
  const productBasketItem = createElement({ tagName: "li", classNames: ["product-basket-item"] });
  const productBasketImage = createElement({
    tagName: "img",
    classNames: ["product-basket__image"],
    attributes: { src: "../../../public/img/img-1.png" },
  });
  const productBasketDeleteIconWrapper = createElement({
    tagName: "div",
    classNames: ["product-busket__delete-button-wrapper"],
    attributes: { title: "Удалить из корзины" },
  });
  const productBasketDeleteIcon = createElement({ tagName: "i", classNames: ["fa-solid", "fa-trash", "trash-button"] });
  const productBasketTextWrapper = createElement({ tagName: "div", classNames: ["product-busket__text-wrapper"] });
  const productBasketName = createElement({ tagName: "p", classNames: ["product-busket__name"], textContent: `Название: Футболки "Лёд и пламя"` });
  const productBasketPricesWrapper = createElement({ tagName: "div", classNames: ["product-busket__prices-wrapper"] });
  const prodcutBasketAmountWrapper = createElement({ tagName: "div", classNames: ["product-busket__amount-wrapper"] });
  const productBasketAmountText = createElement({ tagName: "p", classNames: ["product-busket__amount-text"], textContent: `Количество: ` });
  const proudctBasketAmountWrapper = createElement({ tagName: "div", classNames: ["product-busket__amount-wrapper"] });
  const prodcutBasketPlusAmountButton = createElement({ tagName: "i", classNames: ["fa-solid", "fa-plus", "amount-button"] });
  const productBasketAmount = createElement({ tagName: "p", classNames: ["product-busket__amount"], textContent: `2` });
  const prodcutBasketMinusAmountButton = createElement({ tagName: "i", classNames: ["fa-solid", "fa-minus", "amount-button"] });
  const productBasketPriceWrapper = createElement({ tagName: "div", classNames: ["product-busket__price-wrapper"] });
  const productBasketPriceText = createElement({ tagName: "p", classNames: ["product-busket__price-text"], textContent: `Цена за единицу: ` });
  const productBasketPrice = createElement({ tagName: "p", classNames: ["product-busket__price"], textContent: `2000 р.` });
  const productBasketDiscoutWrapper = createElement({ tagName: "div", classNames: ["product-busket__discout-wrapper"] });
  const productBasketDiscoutText = createElement({ tagName: "p", classNames: ["product-busket__discount-text"], textContent: `Со скидкой: ` });
  const productBasketDiscout = createElement({ tagName: "p", classNames: ["product-busket__discount"], textContent: `1700 р.` });

  const productBasketFinalPriceWrapper = createElement({ tagName: "div", classNames: ["product-busket__final-price-wrapper"] });
  const productBasketFinalPriceText = createElement({
    tagName: "p",
    classNames: ["product-busket__final-price-text"],
    textContent: `Общая стоимость: `,
  });
  const productBasketFinalPrice = createElement({ tagName: "p", classNames: ["product-busket__final-price"], textContent: `3400 р.` });

  proudctBasketAmountWrapper.append(prodcutBasketPlusAmountButton, productBasketAmount, prodcutBasketMinusAmountButton);
  productBasketPricesWrapper.append(productBasketPriceWrapper, productBasketDiscoutWrapper, productBasketFinalPriceWrapper);
  prodcutBasketAmountWrapper.append(productBasketAmountText, proudctBasketAmountWrapper);
  productBasketPriceWrapper.append(productBasketPriceText, productBasketPrice);
  productBasketFinalPriceWrapper.append(productBasketFinalPriceText, productBasketFinalPrice);
  productBasketDiscoutWrapper.append(productBasketDiscoutText, productBasketDiscout);
  productBasketTextWrapper.append(productBasketName, prodcutBasketAmountWrapper, productBasketPricesWrapper);
  productBasketDeleteIconWrapper.append(productBasketDeleteIcon);
  productBasketItem.append(productBasketImage, productBasketTextWrapper, productBasketDeleteIconWrapper);
  return productBasketItem;
}
