import "./productCard.css";

import { createElement } from "./elements";
import { ProductProjection } from "@commercetools/platform-sdk";
import { PriceFormatter } from "../utils/utils";
import { Pages } from "../types/types";

export function createCard(item: ProductProjection) {
  const name = item.name.ru;
  const images = item.masterVariant.images;
  const description = item.description?.ru;
  const prices = item.masterVariant.prices;
  const link = item.slug.ru;
  const id = item.id;

  const card = createElement({ tagName: "li", classNames: ["card"] });
  card.setAttribute("data-id", `${id}`);
  // TODO сделать правильное перенаправление
  // const cardLink = createElement({ tagName: "a", classNames: ["card-link"], attributes: { href: `#${link}` } });
  const cardLink = createElement({ tagName: "a", classNames: ["card-link"], attributes: { href: Pages.PRODUCT } });
  const cardBottom = createElement({ tagName: "div", classNames: ["card__bottom-wrapper"] });
  const cardTextWrapper = createElement({ tagName: "div", classNames: ["card__text-wrapper"] });
  const cardName = createElement({ tagName: "h3", classNames: ["card__name"], textContent: name });
  const cardDescription = createElement({ tagName: "div", classNames: ["card__description"], textContent: description });
  const cardPrices = createElement({ tagName: "div", classNames: ["card__prices"] });
  const cardButton = createElement({ tagName: "button", classNames: ["card__button"], textContent: "Добавить в корзину" });

  const cardImage = createElement({ tagName: "img", classNames: ["card__img"], attributes: { src: `${images?.[0].url}`, alt: "Photo" } });
  cardImage.setAttribute("draggable", "false");
  card.append(cardLink);
  cardLink.append(cardImage);

  const price = createElement({
    tagName: "p",
    classNames: ["card__price"],
    textContent: PriceFormatter.formatCents(prices?.[0].value.centAmount),
  });
  const discount = createElement({
    tagName: "p",
    classNames: ["card__discount"],
    textContent: PriceFormatter.formatCents(prices?.[0].discounted?.value.centAmount),
  });

  cardPrices.append(price, discount);

  cardTextWrapper.append(cardName, cardDescription);
  cardBottom.append(cardPrices, cardButton);
  cardLink.append(cardTextWrapper, cardBottom);
  return card;
}

export default createCard;
