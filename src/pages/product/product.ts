import "./product.css";
import { PriceFormatter } from "../../utils/utils";
import { createElement, createSnackbar } from "../../components/elements";
import { getCart, getProducts, updateCart } from "../../api/api";
import { createModalImage } from "./modal/modal";
import { createSlider } from "../../components/slider/slider";
import { ProductProjection, ClientResponse, ProductProjectionPagedSearchResponse } from "@commercetools/platform-sdk";
import { SnackbarType } from "src/types/types";
import { showQuantityItemsInHeader } from "../basket/basketHandler";

export async function renderProductContent(slug: string): Promise<HTMLElement> {
  const response = await getProducts({ "filter.query": `slug.ru: "${slug}"` });
  const cartResponse = await getCart();
  const itemsInCart = cartResponse?.body.lineItems;

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
  const discountText = createElement({ tagName: "p", classNames: ["discount-text"] });
  const discount = createElement({
    tagName: "p",
    classNames: ["product__discount"],
  });

  if (cardPrices?.[0].discounted?.value.centAmount) {
    discountText.textContent = "Со скидкой: ";
    discount.textContent = PriceFormatter.formatCents(cardPrices?.[0].discounted?.value.centAmount);
  } else {
    discountText.textContent = "Скидки нет";
  }

  const buyButton = createElement({
    tagName: "button",
    classNames: ["product__buy-button", "inactive"],
    textContent: "Добавить в корзину",
    attributes: { disabled: "true" },
  });
  const deleteButton = createElement({ tagName: "button", classNames: ["product__delete-button"], textContent: "Удалить из корзины" });

  const productSlider = createSlider({
    className: "product-slider",
    isAutoPlay: false,
    response,
    createSlides: createSliderImages,
    onSlideClick: (image) => {
      const dataId = image.getAttribute("data-id");
      const imageId = dataId !== null ? parseInt(dataId, 10) : 0;
      const modal = createModalImage(imageId, response);
      productWrapper.append(modal);
    },
  });

  productSizes?.forEach((variant) => {
    if (variant.attributes) {
      const sizeVariant = variant.attributes[0].value[0].key;
      const sizeId = variant.id;
      const sizeItem = createElement({
        tagName: "button",
        classNames: ["product__size-item"],
        textContent: `${sizeVariant}`,
        attributes: { "data-id": `${sizeId}` },
      });
      size.append(sizeItem);
    }
  });

  priceWrapper.append(priceText, price);
  discountWrapper.append(discountText, discount);
  pricesWrapper.append(priceWrapper, discountWrapper, buyButton);
  textWrapper.append(name, description, size, pricesWrapper);
  productTextButtonWrapper.append(textWrapper);
  productWrapper.append(productSlider, productTextButtonWrapper);

  itemsInCart?.forEach((item) => {
    if (response?.body.results[0].slug.ru === item?.productSlug?.ru) {
      size.querySelectorAll<HTMLButtonElement>(".product__size-item").forEach((sizeItem) => {
        if (Number(sizeItem.getAttribute("data-id")) === item.variant.id) {
          sizeItem.classList.add("active");
          buyButton.remove();
          pricesWrapper.append(deleteButton);
        } else {
          sizeItem.classList.add("inactive");
        }
        sizeItem.disabled = true;
      });
    }
  });

  sizeButtonsHandler(size, buyButton);
  addProductToCart(size, response, buyButton, pricesWrapper, deleteButton);
  deleteProductFromCart(slug, deleteButton, pricesWrapper, buyButton, size);

  return productWrapper;
}

export function createSliderImages(items: ProductProjection[]) {
  return (items[0].masterVariant.images || []).map(({ url }, id) => {
    const sliderCard = createElement({ tagName: "li", classNames: ["slide"] });
    const image = createElement({ tagName: "img", classNames: ["slide__img"], attributes: { src: url, alt: "Фото товара", "data-id": `${id}` } });
    sliderCard.append(image);
    return sliderCard;
  });
}

const sizeButtonsHandler = (size: HTMLDivElement, buyButton: HTMLButtonElement) => {
  size.addEventListener("click", (event) => {
    const target = <HTMLButtonElement>event.target;
    if (target.classList.contains("product__size-item") && !target.classList.contains("active")) {
      size.querySelectorAll<HTMLButtonElement>(".product__size-item").forEach((item) => {
        item.classList.remove("active");
        item.disabled = true;
        item.classList.add("inactive");
      });
      target.classList.remove("inactive");
      target.classList.add("active");
      target.disabled = false;
      buyButton.disabled = false;
      buyButton.classList.remove("inactive");
    } else if (target.classList.contains("product__size-item") && target.classList.contains("active")) {
      size.querySelectorAll<HTMLButtonElement>(".product__size-item").forEach((item) => {
        item.classList.remove("inactive");
        item.disabled = false;
      });
      target.classList.remove("active");
      buyButton.disabled = true;
      buyButton.classList.add("inactive");
    }
  });
};

const addProductToCart = (
  size: HTMLDivElement,
  response: ClientResponse<ProductProjectionPagedSearchResponse> | undefined,
  buyButton: HTMLButtonElement,
  pricesWrapper: HTMLDivElement,
  deleteButton: HTMLButtonElement,
) => {
  const productId = response?.body.results[0].id;
  buyButton.addEventListener("click", async () => {
    const cartResponse = await getCart();
    const version = <number>cartResponse?.body.version;
    const activeSize = <HTMLButtonElement>size.querySelector(".active");
    const variantId = Number(activeSize?.getAttribute("data-id"));
    try {
      const updateResponse = await updateCart(version, [{ action: "addLineItem", productId: `${productId}`, variantId, quantity: 1 }]);
      createSnackbar(SnackbarType.success, "Товар добавлен в корзину!");
      showQuantityItemsInHeader(updateResponse?.body);
    } catch {
      createSnackbar(SnackbarType.error, "Что-то пошло не так... Повторите попытку позднее");
    }
    activeSize.disabled = true;
    buyButton.remove();
    pricesWrapper.append(deleteButton);
  });
};

const deleteProductFromCart = (
  slug: string,
  deleteButton: HTMLButtonElement,
  pricesWrapper: HTMLDivElement,
  buyButton: HTMLButtonElement,
  size: HTMLDivElement,
) => {
  deleteButton.addEventListener("click", async () => {
    const cartResponse = await getCart();
    const itemsInCart = cartResponse?.body.lineItems;
    const item = itemsInCart?.find((product) => product?.productSlug?.ru === slug);
    const lineItemId = <string>item?.id;
    const version = <number>cartResponse?.body.version;
    try {
      const updateResponse = await updateCart(version, [{ action: "removeLineItem", lineItemId: `${lineItemId}`, quantity: 1 }]);
      createSnackbar(SnackbarType.success, "Товар удален!");
      showQuantityItemsInHeader(updateResponse?.body);
    } catch {
      createSnackbar(SnackbarType.error, "Что-то пошло не так... Повторите попытку позднее");
    }
    deleteButton.remove();
    pricesWrapper.append(buyButton);
    buyButton.classList.add("inactive");
    buyButton.disabled = true;
    size.querySelectorAll<HTMLButtonElement>(".product__size-item").forEach((item) => {
      item.disabled = false;
      item.classList.remove("inactive");
      item.classList.remove("active");
    });
  });
};
