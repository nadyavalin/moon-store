import "./product.css";
import { PriceFormatter } from "../../utils/utils";
import { createElement } from "../../components/elements";
import { getProductDataWithSlug } from "../../api/api";
import { createModalImage } from "./modal/modal";
import { createSlider } from "../../components/slider/slider";
import { ProductProjection } from "@commercetools/platform-sdk";

export async function renderProductContent(slug: string): Promise<HTMLElement> {
  const response = await getProductDataWithSlug(slug);
  const productWrapper = createElement({ tagName: "div", classNames: ["product__wrapper"] });
  const cardName = response?.body.results[0].name.ru;
  const cardDescription = response?.body.results[0].description?.ru;
  const cardPrices = response?.body.results[0].masterVariant.prices;
  const productSizes = response?.body.results[0].variants;

  const productTextButtonWrapper = createElement({ tagName: "div", classNames: ["product__text-button-wrapper"] });
  const textWrapper = createElement({ tagName: "div", classNames: ["product__text-wrapper"] });
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

  const productSlider = createSlider({
    className: "product-slider",
    isAutoPlay: false,
    response,
    createSlides: createSliderImages,
    onSlideClick: async () => {
      const modal = await createModalImage(response);
      productWrapper.append(modal);
    },
  });

  productSizes?.forEach((variant) => {
    const sizeItem = createElement({ tagName: "span", classNames: ["product__size-item"], textContent: `${variant.sku?.slice(-1)}` });
    size.append(sizeItem);
  });

  priceWrapper.append(priceText, price);
  discountWrapper.append(discountText, discount);
  pricesWrapper.append(priceWrapper, discountWrapper, buyButton);
  textWrapper.append(name, description, size, pricesWrapper);
  productTextButtonWrapper.append(textWrapper);
  productWrapper.append(productSlider, productTextButtonWrapper);

  return productWrapper;
}

export function createSliderImages(items: ProductProjection[]) {
  return (items[0].masterVariant.images || []).map(({ url }) => {
    const sliderCard = createElement({ tagName: "li", classNames: ["slide"] });
    const image = createElement({ tagName: "img", classNames: ["slide__img"], attributes: { src: url, alt: "Фото товара" } });
    sliderCard.append(image);
    return sliderCard;
  });
}
