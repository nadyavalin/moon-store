import "./product.css";
import { PriceFormatter } from "../../utils/utils";
import { createElement, createSvgElement } from "../../components/elements";
import { getProductDataWithSlug } from "../../api/api";
import { arrowLeft, arrowRight } from "../../components/svg";
import { cycleSlider, moveSlider } from "../../components/slider";
import { createModalImage } from "./modal/modal";

export async function renderProductContent(slug: string): Promise<HTMLElement> {
  const contentDiv = document.querySelector(".main");
  try {
    const modal = await createModalImage(slug);
    contentDiv?.append(modal);
  } catch (error) {
    contentDiv?.append("Ошибка! Изображение невозможно отобразить.");
  }
  const response = await getProductDataWithSlug(slug);
  const productWrapper = createElement({ tagName: "div", classNames: ["product__wrapper"] });
  const cardName = response?.body.results[0].name.ru;
  const cardDescription = response?.body.results[0].description?.ru;
  const cardPrices = response?.body.results[0].masterVariant.prices;
  const images = response?.body.results[0].masterVariant.images;
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

  // Swiper code begin
  const swiperWrapper = createElement({ tagName: "div", classNames: ["swiper__wrapper"] });
  const swiperLine = createElement({ tagName: "ul", classNames: ["swiper__line"] });
  const arrowButtonLeft = createSvgElement(arrowLeft, "swiper__arrow");
  const arrowButtonRight = createSvgElement(arrowRight, "swiper__arrow");
  arrowButtonLeft.id = "left";
  arrowButtonRight.id = "right";

  images?.forEach((img) => {
    const swiperCard = createElement({ tagName: "li", classNames: ["swiper-card"] });
    const image = createElement({ tagName: "img", classNames: ["product__img"], attributes: { src: `${img.url}`, alt: "" } });
    swiperLine.append(swiperCard);
    swiperCard.append(image);
  });

  swiperWrapper.append(arrowButtonLeft, swiperLine, arrowButtonRight);

  swiperWrapper.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("swiper__arrow") || target.closest(".swiper__arrow")) {
      const direction = target.id;
      moveSlider(swiperLine, ".product__img", direction);
    }
    if (target.classList.contains("product__img") || target.closest(".product__img")) {
      const modalBack = document.querySelector(".modal-back");
      modalBack?.classList.remove("hidden");
    }
  });

  const slideCount = swiperLine.childElementCount;
  if (slideCount === 1) {
    arrowButtonLeft.classList.add("disabled");
    arrowButtonRight.classList.add("disabled");
  } else {
    arrowButtonLeft.classList.remove("disabled");
    arrowButtonRight.classList.remove("disabled");
  }
  cycleSlider(swiperLine, ".product__img");
  // Swiper code end

  productSizes?.forEach((variant) => {
    const sizeItem = createElement({ tagName: "span", classNames: ["product__size-item"], textContent: `${variant.sku?.slice(-1)}` });
    size.append(sizeItem);
  });

  priceWrapper.append(priceText, price);
  discountWrapper.append(discountText, discount);
  pricesWrapper.append(priceWrapper, discountWrapper, buyButton);
  textWrapper.append(name, description, size, pricesWrapper);
  productTextButtonWrapper.append(textWrapper);
  productWrapper.append(swiperWrapper, productTextButtonWrapper);

  return productWrapper;
}
