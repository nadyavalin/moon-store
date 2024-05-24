import "./catalog.css";
import { createElement, createSnackbar } from "../../components/elements";
import { SnackbarType } from "../../types/types";
import { getProducts } from "../../api/api";
import { ClientResponse, ProductProjectionPagedQueryResponse, ProductProjection } from "@commercetools/platform-sdk";

export const catalog = createElement({ tagName: "section", classNames: ["catalog"] });
const catalogWrapper = createElement({ tagName: "ul", classNames: ["catalog-wrapper"] });
catalog.append(catalogWrapper);

export const renderProductsFromApi = () =>
  getProducts().then((response) => {
    if (response.statusCode === 200) {
      const catalogItems = catalogWrapper.querySelectorAll(".card");
      if (catalogItems) {
        catalogItems.forEach((item) => item.remove());
      }
      renderCatalogContent(response);
    } else {
      createSnackbar(SnackbarType.error, "Что-то пошло не так... Повторите попытку позже.");
    }
  });

function renderCatalogContent(response: ClientResponse<ProductProjectionPagedQueryResponse>) {
  const items = response.body.results;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    renderCatalogCard(item);
  }
}

const renderCatalogCard = (item: ProductProjection) => {
  const name = item.name.ru;
  const images = item.masterVariant.images;
  const description = item.description?.ru;
  const prices = item.masterVariant.prices;

  const cardLink = createElement({ tagName: "a", classNames: ["card__link"] });
  const card = createElement({ tagName: "li", classNames: ["card"] });
  const cardImg = createElement({ tagName: "div", classNames: ["card__img"] });
  const cardImgInner = createElement({ tagName: "div", classNames: ["card__img-inner"] });
  const cardName = createElement({ tagName: "h4", classNames: ["card__name"], textContent: `${name}` });
  const cardDescription = createElement({ tagName: "p", classNames: ["card__description"], textContent: `${description}` });
  const cardBottom = createElement({ tagName: "div", classNames: ["card__bottom"] });

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
    cardBottom.append(price, discount);
  }
  cardImg.append(cardImgInner);
  cardLink.append(cardImg, cardName, cardDescription, cardBottom);
  card.append(cardLink);
  catalogWrapper.append(card);
};
