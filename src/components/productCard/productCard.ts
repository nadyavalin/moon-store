import "./productCard.css";
import { createElement } from "../elements";
import { ProductProjection, Cart, ClientResponse } from "@commercetools/platform-sdk";
import { PriceFormatter } from "../../utils/utils";
import { Pages } from "../../types/types";
import { getCart, getProducts } from "../../api/api";
import { createModalSize } from "../../pages/catalog/modalSize/modalSize";

export function createCard(item: ProductProjection, cartResponse: ClientResponse<Cart> | undefined) {
  const name = item.name.ru;
  const images = item.masterVariant.images;
  const description = item.description?.ru;
  const prices = item.masterVariant.prices;
  const link = item.slug.ru;
  const id = item.id;
  const itemsInCart = cartResponse?.body.lineItems;

  const card = createElement({ tagName: "li", classNames: ["slide", "card"] });
  card.setAttribute("data-id", `${id}`);
  const cardLink = createElement({ tagName: "a", classNames: ["card-link"], attributes: { href: `${Pages.PRODUCT}/${link}` } });
  const cardBottom = createElement({ tagName: "div", classNames: ["card__bottom-wrapper"] });
  const cardTextWrapper = createElement({ tagName: "div", classNames: ["card__text-wrapper"] });
  const cardName = createElement({ tagName: "h3", classNames: ["card__name"], textContent: name });
  const cardDescription = createElement({ tagName: "div", classNames: ["card__description"], textContent: description });
  const cardPrices = createElement({ tagName: "div", classNames: ["card__prices"] });
  const cardButton = createElement({
    tagName: "button",
    classNames: ["card__button"],
    textContent: "Добавить в корзину",
    attributes: { "data-id": id },
  });

  itemsInCart?.forEach((item) => {
    if (id === item?.productId) {
      cardButton.classList.add("card__button_disabled");
    }
  });

  cardButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const productId = cardButton.getAttribute("data-id");
    const response = await getProducts({ "filter.query": `id:"${productId}"` });
    const cartResponse = await getCart();
    const modal = createModalSize(response, cartResponse, cardButton);
    document.body.append(modal);
  });

  const cardImage = createElement({
    tagName: "img",
    classNames: ["slide__img", "card__img"],
    attributes: { loading: "lazy", src: `${images?.[0].url}`, alt: "Фото товара" },
  });
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
