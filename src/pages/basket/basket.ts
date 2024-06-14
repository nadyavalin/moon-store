import "./basket.css";
import { createElement } from "../../components/elements";
import { createBasketCard } from "./productBasketCard/productBasketCard";
import { getCart } from "../../api/api";
import { createModalConfirm, showQuantityItemsInHeader } from "./basketHandler";
import { PriceFormatter } from "../../utils/utils";
import { Pages } from "../../types/types";

export async function renderBasketContent() {
  const response = await getCart();
  const totalQuantity = response?.body.lineItems.reduce((total, item) => total + Number(item.quantity), 0);
  const totalPrice = PriceFormatter.formatCents(response?.body.totalPrice.centAmount);
  showQuantityItemsInHeader(response?.body);
  const basketWrapper = createElement({ tagName: "div", classNames: ["basket__wrapper"] });
  if (response?.body.lineItems.length === 0) {
    createEmptyCart(basketWrapper);
    return basketWrapper;
  }
  const productListWrapper = createElement({ tagName: "ul", classNames: ["product-list__wrapper"] });
  const productTotalWrapper = createElement({ tagName: "div", classNames: ["product-total__wrapper"] });
  const productTotalTextWrapper = createElement({ tagName: "div", classNames: ["product-total__text-wrapper"] });
  const productTotalTitle = createElement({ tagName: "p", classNames: ["product-total__title"], textContent: "Итого:" });
  const productTotalPrice = createElement({
    tagName: "p",
    classNames: ["product-total__price"],
    textContent: ` ${totalPrice}`,
  });

  const productAmountTextWrapper = createElement({ tagName: "div", classNames: ["product-amount__wrapper"] });
  const productAmountTitle = createElement({ tagName: "p", classNames: ["product-amount__title"], textContent: "Всего товаров:" });
  const productFullAmount = createElement({
    tagName: "p",
    classNames: ["product-amount__full-amount"],
    textContent: `${totalQuantity}`,
  });
  const resetCartButton = createElement({ tagName: "button", classNames: ["basket__reset-btn"], textContent: "Очистить корзину" });
  resetCartButton.addEventListener("click", () => {
    basketWrapper.append(createModalConfirm());
  });

  response?.body.lineItems.forEach((item, index) => {
    productListWrapper.append(createBasketCard(index, response?.body));
  });

  productTotalWrapper.append(productTotalTextWrapper, productAmountTextWrapper, resetCartButton);
  productAmountTextWrapper.append(productAmountTitle, productFullAmount);
  productTotalTextWrapper.append(productTotalTitle, productTotalPrice);
  basketWrapper.append(productListWrapper, productTotalWrapper);
  return basketWrapper;
}

export function createEmptyCart(basketWrapper: HTMLElement) {
  const emptyCartMessage = createElement({
    tagName: "div",
    classNames: ["cart-empty-message"],
  });
  const textEmptyCart = createElement({
    tagName: "div",
    classNames: ["cart-empty-text"],
    textContent: "В вашей корзине еще нет товаров... Она грустит :(",
  });
  const linkToCatalog = createElement({
    tagName: "a",
    classNames: ["cart-link"],
    innerHTML: `Вы можете выбрать товары в каталоге  <i class="fa-solid fa-cart-plus"></i>`,
    attributes: {
      href: `${Pages.CATALOG}`,
    },
  });
  const poorMoonImage = createElement({
    tagName: "img",
    classNames: ["poor-moon-image"],
    attributes: { src: "../../public/img/poor-moon.jpg", alt: "Фото грустящей луны" },
  });
  emptyCartMessage.append(textEmptyCart, linkToCatalog, poorMoonImage);
  basketWrapper.innerHTML = "";
  basketWrapper.appendChild(emptyCartMessage);
}

export default renderBasketContent;
