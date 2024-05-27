import "./product.css";
import { PriceFormatter } from "../../utils/utils";
import { createElement } from "../../components/elements";
import { ProductProjection, ClientResponse } from "@commercetools/platform-sdk";

export const productWrapper = createElement({ tagName: "div", classNames: ["product__wrapper"] });

export function renderProductContent(response: ClientResponse<ProductProjection>) {
  console.log(response);
  const productInner = productWrapper.querySelectorAll("div");
  productInner.forEach((item) => item.remove());

  const cardName = response.body.name.ru;
  const cardDescription = response.body.description?.ru;
  const cardPrices = response.body.masterVariant.prices;
  const images = response.body.masterVariant.images;
  const productSizes = response.body.variants;

  const productTextWrapper = createElement({ tagName: "div", classNames: ["product__text-wrapper"] });
  const imageContainer = createElement({ tagName: "div" });
  const name = createElement({ tagName: "h4", classNames: ["product__name"], textContent: `${cardName}` });
  const description = createElement({ tagName: "p", classNames: ["product__description"], textContent: `${cardDescription}` });
  const size = createElement({ tagName: "div", classNames: ["product__size"], textContent: "Размеры:" });
  const price = createElement({
    tagName: "p",
    classNames: ["product__price"],
    textContent: PriceFormatter.formatCents(cardPrices?.[0].value.centAmount),
  });
  const discount = createElement({
    tagName: "p",
    classNames: ["product__discount"],
    textContent: PriceFormatter.formatCents(cardPrices?.[0].discounted?.value.centAmount),
  });
  const buyButton = createElement({ tagName: "button", classNames: ["product__buy-button"], textContent: "Добавить в корзину" });
  images?.forEach((img) => {
    const image = createElement({ tagName: "img", classNames: ["product__img"], attributes: { src: `${img.url}` } });
    imageContainer.append(image);
  });
  productSizes.forEach((variant) => {
    const sizeItem = createElement({ tagName: "span", classNames: ["product__size-item"], textContent: `${variant.sku?.slice(-1)}` });
    size.append(sizeItem);
  });

  productTextWrapper.append(name, description, size, price, discount, buyButton);
  productWrapper.append(imageContainer, productTextWrapper);
}
