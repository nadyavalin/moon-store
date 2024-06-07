import "./productBasketCard.css";
import "../../product/product.css";
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
  const productBasketAmountSizeWrapper = createElement({ tagName: "div", classNames: ["product-busket__amount-sizes-wrapper"] });
  const productBasketPricesWrapper = createElement({ tagName: "div", classNames: ["product-busket__prices-wrapper"] });
  const prodcutBasketAmountWrapper = createElement({ tagName: "div", classNames: ["product-busket__amount-wrapper"] });
  const productBasketAmountText = createElement({ tagName: "p", classNames: ["product-busket__small-text"], textContent: "Количество: " });
  const proudctBasketAmountWrapper = createElement({ tagName: "div", classNames: ["product-busket__amount-wrapper"] });
  const prodcutBasketPlusAmountButton = createElement({ tagName: "i", classNames: ["fa-solid", "fa-plus", "amount-button"] });
  const productBasketAmount = createElement({ tagName: "p", classNames: ["product-busket__amount"], textContent: `2` });
  const prodcutBasketMinusAmountButton = createElement({ tagName: "i", classNames: ["fa-solid", "fa-minus", "amount-button"] });
  const productBasketSizeWrapper = createElement({ tagName: "div", classNames: ["product-busket__size-wrapper"] });
  const productBasketSizeText = createElement({ tagName: "p", classNames: ["product-busket__small-text"], textContent: "Размер: " });
  const productBasketSize = createElement({ tagName: "span", classNames: ["product__size-item"], textContent: `XL` });
  const productBasketPriceWrapper = createElement({ tagName: "div", classNames: ["product-busket__price-wrapper"] });
  const productBasketPriceText = createElement({ tagName: "p", classNames: ["product-busket__small-text"], textContent: "Цена за единицу: " });
  const productBasketPrice = createElement({ tagName: "p", classNames: ["product-busket__price"], textContent: `2000 р.` });
  const productBasketDiscoutWrapper = createElement({ tagName: "div", classNames: ["product-busket__discout-wrapper"] });
  const productBasketDiscoutText = createElement({ tagName: "p", classNames: ["product-busket__small-text"], textContent: "Со скидкой: " });
  const productBasketDiscout = createElement({ tagName: "p", classNames: ["product-busket__discount"], textContent: `1700 р.` });

  const productBasketFinalPriceWrapper = createElement({ tagName: "div", classNames: ["product-busket__final-price-wrapper"] });
  const productBasketFinalPriceText = createElement({
    tagName: "p",
    classNames: ["product-busket__small-text"],
    textContent: `Общая стоимость: `,
  });
  const productBasketFinalPrice = createElement({ tagName: "p", classNames: ["product-busket__final-price"], textContent: `3400 р.` });

  proudctBasketAmountWrapper.append(prodcutBasketPlusAmountButton, productBasketAmount, prodcutBasketMinusAmountButton);
  productBasketPricesWrapper.append(productBasketPriceWrapper, productBasketDiscoutWrapper, productBasketFinalPriceWrapper);
  prodcutBasketAmountWrapper.append(productBasketAmountText, proudctBasketAmountWrapper);
  productBasketSizeWrapper.append(productBasketSizeText, productBasketSize);
  productBasketPriceWrapper.append(productBasketPriceText, productBasketPrice);
  productBasketFinalPriceWrapper.append(productBasketFinalPriceText, productBasketFinalPrice);
  productBasketDiscoutWrapper.append(productBasketDiscoutText, productBasketDiscout);
  productBasketAmountSizeWrapper.append(prodcutBasketAmountWrapper, productBasketSizeWrapper);
  productBasketTextWrapper.append(productBasketName, productBasketAmountSizeWrapper, productBasketPricesWrapper);
  productBasketDeleteIconWrapper.append(productBasketDeleteIcon);
  productBasketItem.append(productBasketImage, productBasketTextWrapper, productBasketDeleteIconWrapper);
  return productBasketItem;
}
