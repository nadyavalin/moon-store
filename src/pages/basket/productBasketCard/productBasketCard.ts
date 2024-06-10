import "./productBasketCard.css";
import "../../product/product.css";
import { createElement } from "../../../components/elements";

export function createBasketCard() {
  const productBasketItem = createElement({ tagName: "li", classNames: ["product-basket-item"] });
  const productBasketImage = createElement({
    tagName: "img",
    classNames: ["product-basket__image"],
    attributes: { src: "../../../../public/img/img-1.png" },
  });
  const productBasketDeleteIconWrapper = createElement({
    tagName: "div",
    classNames: ["product-basket__delete-button-wrapper"],
    attributes: { title: "Удалить из корзины" },
  });

  const productBasketDeleteIcon = createElement({ tagName: "i", classNames: ["fa-solid", "fa-trash", "trash-button"] });
  const productBasketTextWrapper = createElement({ tagName: "div", classNames: ["product-basket__text-wrapper"] });
  const productBasketName = createElement({ tagName: "p", classNames: ["product-basket__name"], textContent: `Название: Футболки "Лёд и пламя"` });

  const productBasketAmountSizeWrapper = createElement({ tagName: "div", classNames: ["product-basket__amount-sizes-wrapper"] });
  const productBasketAmountWrapper = createElement({ tagName: "div", classNames: ["product-basket__amount-wrapper"] });
  const productBasketAmountText = createElement({ tagName: "p", classNames: ["product-basket__small-text"], textContent: "Количество: " });
  const productBasketAmountButtonsWrapper = createElement({ tagName: "div", classNames: ["product-basket__amount-buttons-wrapper"] });

  const productBasketPlusAmountButton = createElement({ tagName: "i", classNames: ["fa-solid", "fa-plus", "amount-button"] });
  const productBasketAmount = createElement({ tagName: "p", classNames: ["product-basket__amount"], textContent: `2` });
  const productBasketMinusAmountButton = createElement({ tagName: "i", classNames: ["fa-solid", "fa-minus", "amount-button"] });

  const productBasketSizeWrapper = createElement({ tagName: "div", classNames: ["product-basket__size-wrapper"] });
  const productBasketSizeText = createElement({ tagName: "p", classNames: ["product-basket__small-text"], textContent: "Размер: " });
  const productBasketSize = createElement({ tagName: "span", classNames: ["product__size-item"], textContent: `XL` });

  const productBasketPricesWrapper = createElement({ tagName: "div", classNames: ["product-basket__prices-wrapper"] });
  const productBasketPriceWrapper = createElement({ tagName: "div", classNames: ["product-basket__price-wrapper"] });
  const productBasketPriceText = createElement({ tagName: "p", classNames: ["product-basket__small-text"], textContent: "Цена за единицу: " });
  const productBasketPrice = createElement({ tagName: "p", classNames: ["product-basket__price"], textContent: `2000 р.` });

  const productBasketDiscountWrapper = createElement({ tagName: "div", classNames: ["product-basket__discount-wrapper"] });
  const productBasketDiscountText = createElement({ tagName: "p", classNames: ["product-basket__small-text"], textContent: "Со скидкой: " });
  const productBasketDiscount = createElement({ tagName: "p", classNames: ["product-basket__discount"], textContent: `1700 р.` });

  const productBasketFinalPriceWrapper = createElement({ tagName: "div", classNames: ["product-basket__final-price-wrapper"] });
  const productBasketFinalPriceText = createElement({
    tagName: "p",
    classNames: ["product-basket__small-text"],
    textContent: `Общая стоимость: `,
  });
  const productBasketFinalPrice = createElement({ tagName: "p", classNames: ["product-basket__final-price"], textContent: `3400 р.` });

  productBasketAmountButtonsWrapper.append(productBasketPlusAmountButton, productBasketAmount, productBasketMinusAmountButton);
  productBasketPricesWrapper.append(productBasketPriceWrapper, productBasketDiscountWrapper, productBasketFinalPriceWrapper);
  productBasketAmountWrapper.append(productBasketAmountText, productBasketAmountButtonsWrapper);
  productBasketSizeWrapper.append(productBasketSizeText, productBasketSize);
  productBasketPriceWrapper.append(productBasketPriceText, productBasketPrice);
  productBasketFinalPriceWrapper.append(productBasketFinalPriceText, productBasketFinalPrice);
  productBasketDiscountWrapper.append(productBasketDiscountText, productBasketDiscount);
  productBasketAmountSizeWrapper.append(productBasketAmountWrapper, productBasketSizeWrapper);
  productBasketTextWrapper.append(productBasketName, productBasketAmountSizeWrapper, productBasketPricesWrapper);
  productBasketDeleteIconWrapper.append(productBasketDeleteIcon);
  productBasketItem.append(productBasketImage, productBasketTextWrapper, productBasketDeleteIconWrapper);
  return productBasketItem;
}
