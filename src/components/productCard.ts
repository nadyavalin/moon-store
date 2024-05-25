import "./productCard.css";
import "../pages/catalog/catalog.css";
import { catalogWrapper } from "../pages/catalog/catalog";
import { createElement } from "./elements";
import { ProductProjection } from "@commercetools/platform-sdk";

export const renderCatalogCard = (item: ProductProjection) => {
  const name = item.name.ru;
  const images = item.masterVariant.images;
  const description = item.description?.ru;
  const prices = item.masterVariant.prices;

  const cardLink = createElement({ tagName: "a", classNames: ["card__link"] });
  const card = createElement({ tagName: "li", classNames: ["card"] });
  const cardInner = createElement({ tagName: "div", classNames: ["card__inner"] });
  const cardImg = createElement({ tagName: "div", classNames: ["card__img"] });
  const cardImgInner = createElement({ tagName: "div", classNames: ["card__img-inner"] });
  const cardText = createElement({ tagName: "div", classNames: ["card__text"] });
  const cardName = createElement({ tagName: "h4", classNames: ["card__name"], textContent: `${name}` });
  const cardDescription = createElement({ tagName: "p", classNames: ["card__description"], textContent: `${description}` });
  const cardPrices = createElement({ tagName: "div", classNames: ["card__prices"] });
  const cardButton = createElement({ tagName: "button", classNames: ["card__button"], textContent: "Добавить в корзину" });

  if (images) {
    for (let i = 0; i < images.length; i++) {
      const img = createElement({ tagName: "img", classNames: ["card__img-item"] });
      img.src = `${images[i].url}`;
      cardImgInner.append(img);
    }
  }

  if (prices) {
    const priceAmount = String(prices[0].value.centAmount).slice(0, -2);
    const discountAmount = String(prices[0].discounted?.value.centAmount).slice(0, -2);
    const price = createElement({ tagName: "span", classNames: ["card__price"], textContent: `${priceAmount} ₽` });
    const discount = createElement({
      tagName: "span",
      classNames: ["card__discount"],
      textContent: `${discountAmount} ₽`,
    });
    cardPrices.append(price, discount);
  }

  cardImg.append(cardImgInner, cardName);
  cardText.append(cardDescription, cardPrices);
  cardInner.append(cardImg, cardText, cardButton);
  cardLink.append(cardInner);
  card.append(cardLink);
  catalogWrapper.append(card);
};
