import "./catalog.css";
import { menuItemCatalog } from "../basePage/basePage";
import { createElement, createSnackbar } from "src/components/elements";
import { SnackbarType } from "src/types/types";
import { getProducts } from "../../api/api";
import { ClientResponse, ProductProjectionPagedQueryResponse, ProductProjection } from "@commercetools/platform-sdk";

menuItemCatalog.onclick = () => {
  getProducts().then((response) => {
    if (response.statusCode === 200) {
      renderCatalogContent(response);
    } else {
      createSnackbar(SnackbarType.error, "Что-то пошло не так...");
    }
  });
};

export const catalog = createElement({ tagName: "section", classNames: ["catalog"] });
const catalogWrapper = createElement({ tagName: "ul", classNames: ["catalog-wrapper"] });
catalog.append(catalogWrapper);

function renderCatalogContent(response: ClientResponse<ProductProjectionPagedQueryResponse>) {
  const items = response.body.results;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    renderCatalogCard(item);
  }
}

const renderCatalogCard = (item: ProductProjection) => {
  console.log(item);
  const name = item.name.ru;
  const images = item.masterVariant.images;
  const description = item.description?.ru;
  const prices = item.masterVariant.prices;

  const catalogItemLink = createElement({ tagName: "a", classNames: ["catalog-item__link"] });
  const catalogItem = createElement({ tagName: "li", classNames: ["catalog-item"] });
  const catalogItemImg = createElement({ tagName: "div", classNames: ["catalog-item__img"] });
  const cataloItemImgInner = createElement({ tagName: "div", classNames: ["catalog-item__img-inner"] });
  const catalogItemName = createElement({ tagName: "h3", classNames: ["catalog-item__name"], textContent: `${name}` });
  const catalogItemDescription = createElement({ tagName: "h4", classNames: ["catalog-item__description"], textContent: `${description}` });
  const catalogItemBottom = createElement({ tagName: "div", classNames: ["catalog-item__bottom"] });

  if (images) {
    for (let i = 0; i < images.length; i++) {
      const img = createElement({ tagName: "img", classNames: ["catalog-item__img-item"] });
      img.src = `${images[i].url}`;
      cataloItemImgInner.append(img);
    }
  }
  if (prices) {
    const priceAmount = String(prices[0].value.centAmount).slice(0, -2);
    const discountAmount = String(prices[0].discounted?.value.centAmount).slice(0, -2);
    const price = createElement({ tagName: "span", classNames: ["catalog-item__price"], textContent: `${priceAmount} ₽` });
    const discount = createElement({
      tagName: "span",
      classNames: ["catalog-item__discount"],
      textContent: `${discountAmount} ₽`,
    });
    catalogItemBottom.append(price, discount);
  }
  catalogItemImg.append(cataloItemImgInner);
  catalogItemLink.append(catalogItemImg, catalogItemName, catalogItemDescription, catalogItemBottom);
  catalogItem.append(catalogItemLink);
  catalogWrapper.append(catalogItem);
};
