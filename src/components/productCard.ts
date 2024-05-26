import "./productCard.css";

import { createElement } from "./elements";
import { ProductProjection } from "@commercetools/platform-sdk";

export function createCard(item: ProductProjection) {
  const name = item.name.ru;
  const images = item.masterVariant.images;
  const description = item.description?.ru;
  const prices = item.masterVariant.prices;

  const card = createElement({ tagName: "li", classNames: ["card"] });
  const cardBottom = createElement({ tagName: "div", classNames: ["card__bottom-wrapper"] });
  const cardTextWrapper = createElement({ tagName: "div", classNames: ["card__text-wrapper"] });
  const cardname = createElement({ tagName: "h3", classNames: ["card__name"], textContent: name });
  const cardDescription = createElement({ tagName: "div", classNames: ["card__description"], textContent: description });
  const cardPrices = createElement({ tagName: "div", classNames: ["card__prices"] });
  const cardButton = createElement({ tagName: "button", classNames: ["card__button"], textContent: "Добавить в корзину" });

  if (images) {
    const cardImage = createElement({ tagName: "img", classNames: ["card__img"], attributes: { src: `${images[0].url}`, alt: "Photo" } });
    cardImage.setAttribute("draggable", "false");
    card.append(cardImage);
  }

  if (prices) {
    const priceAmount = String(prices[0].value.centAmount).slice(0, -2);
    const discountAmount = String(prices[0].discounted?.value.centAmount).slice(0, -2);
    const price = createElement({ tagName: "p", classNames: ["card__price"], textContent: `${priceAmount} ₽` });
    const discount = createElement({ tagName: "p", classNames: ["card__discount"], textContent: `${discountAmount} ₽` });
    cardPrices.append(price, discount);
  }

  cardTextWrapper.append(cardname, cardDescription);
  cardBottom.append(cardPrices, cardButton);
  card.append(cardTextWrapper, cardBottom);
  return card;
}

export default createCard;
