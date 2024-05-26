import "./productCard.css";

import { createElement } from "./elements";
import { ProductProjection } from "@commercetools/platform-sdk";
import priceFormatter from "../utils/utils";

export function createCard(item: ProductProjection) {
  const name = item.name.ru;
  const images = item.masterVariant.images;
  const description = item.description?.ru;
  const prices = item.masterVariant.prices;

  const card = createElement({ tagName: "li", classNames: ["card"] });
  const cardBottom = createElement({ tagName: "div", classNames: ["card__bottom-wrapper"] });
  const cardTextWrapper = createElement({ tagName: "div", classNames: ["card__text-wrapper"] });
  const cardName = createElement({ tagName: "h3", classNames: ["card__name"], textContent: name });
  const cardDescription = createElement({ tagName: "div", classNames: ["card__description"], textContent: description });
  const cardPrices = createElement({ tagName: "div", classNames: ["card__prices"] });
  const cardButton = createElement({ tagName: "button", classNames: ["card__button"], textContent: "Добавить в корзину" });

  const cardImage = createElement({ tagName: "img", classNames: ["card__img"], attributes: { src: `${images?.[0].url}`, alt: "Photo" } });
  cardImage.setAttribute("draggable", "false");
  card.append(cardImage);

  const priceAmount = (prices?.[0].value.centAmount ?? 0) / 100;
  const discountAmount = (prices?.[0].discounted?.value.centAmount ?? 0) / 100;
  const price = createElement({ tagName: "p", classNames: ["card__price"], textContent: priceFormatter.format(priceAmount) });
  const discount = createElement({
    tagName: "p",
    classNames: ["card__discount"],
    textContent: priceFormatter.format(discountAmount),
  });
  cardPrices.append(price, discount);

  cardTextWrapper.append(cardName, cardDescription);
  cardBottom.append(cardPrices, cardButton);
  card.append(cardTextWrapper, cardBottom);
  return card;
}

export default createCard;
