import "./product.css";
import { PriceFormatter } from "../../utils/utils";
import { createElement } from "../../components/elements";
import { ProductProjection, ClientResponse } from "@commercetools/platform-sdk";

export const productWrapper = createElement({ tagName: "div", classNames: ["product__wrapper"] });

export function renderProductContent(response: ClientResponse<ProductProjection>) {
  productWrapper.innerHTML = "";
  const productInner = productWrapper.querySelectorAll("div");
  productInner.forEach((item) => item.remove());

  const cardName = response.body.name.ru;
  const cardDescription = response.body.description?.ru;
  const cardPrices = response.body.masterVariant.prices;
  const images = response.body.masterVariant.images;
  const productSizes = response.body.variants;

  const productTextButtonWrapper = createElement({ tagName: "div", classNames: ["product__text-button-wrapper"] });
  const textWrapper = createElement({ tagName: "div", classNames: ["product__text-wrapper"] });
  const imageContainer = createElement({ tagName: "a", classNames: ["image__link"], attributes: { href: `#` } });
  const name = createElement({ tagName: "p", classNames: ["product__name"], innerHTML: `<b>Название:</b> ${cardName}` });
  const description = createElement({ tagName: "p", classNames: ["product__description"], innerHTML: `<b>Описание:</b> ${cardDescription}` });
  const size = createElement({ tagName: "div", classNames: ["product__size"], innerHTML: "<b>Размеры:</b> " });

  const pricesWrapper = createElement({ tagName: "div", classNames: ["prices__wrapper"] });
  const priceWrapper = createElement({ tagName: "div", classNames: ["price__wrapper"] });
  const priceText = createElement({ tagName: "p", classNames: ["price-text"], textContent: "Цена: " });
  const price = createElement({
    tagName: "p",
    classNames: ["product__price"],
    textContent: PriceFormatter.formatCents(cardPrices?.[0].value.centAmount),
  });
  const discountWrapper = createElement({ tagName: "div", classNames: ["discount__wrapper"] });
  const discountText = createElement({ tagName: "p", classNames: ["discount-text"], textContent: "Скидка: " });
  const discount = createElement({
    tagName: "p",
    classNames: ["product__discount"],
    textContent: PriceFormatter.formatCents(cardPrices?.[0].discounted?.value.centAmount),
  });

  const buyButton = createElement({ tagName: "button", classNames: ["product__buy-button"], textContent: "Добавить в корзину" });

  // TODO Use this code in product slider
  // images?.forEach((img) => {
  //   const image = createElement({ tagName: "img", classNames: ["product__img"], attributes: { src: `${img.url}` } });
  //   imageContainer.append(image);
  // });

  const image = createElement({ tagName: "img", classNames: ["product__img"], attributes: { src: `${images?.[0].url}` } });
  imageContainer.append(image);

  productSizes.forEach((variant) => {
    const sizeItem = createElement({ tagName: "span", classNames: ["product__size-item"], textContent: `${variant.sku?.slice(-1)}` });
    size.append(sizeItem);
  });

  priceWrapper.append(priceText, price);
  discountWrapper.append(discountText, discount);
  pricesWrapper.append(priceWrapper, discountWrapper);
  textWrapper.append(name, description, size, pricesWrapper);
  productTextButtonWrapper.append(textWrapper, buyButton);
  productWrapper.append(imageContainer, productTextButtonWrapper);
}
