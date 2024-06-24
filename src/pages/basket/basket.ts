import "./basket.css";
import { createElement, createSnackbar } from "../../components/elements";
import { createBasketCard } from "./productBasketCard/productBasketCard";
import { addDiscountAction, getCart } from "../../api/api";
import { createModalConfirm } from "./basketHandler";
import { PriceFormatter } from "../../utils/utils";
import { Pages, SnackbarType } from "../../types/types";

export async function renderBasketContent() {
  const response = await getCart();
  const totalQuantity = response?.body.lineItems.reduce((total, item) => total + Number(item.quantity), 0);
  const totalPrice = PriceFormatter.formatCents(response?.body.totalPrice.centAmount);
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

  const promoCodeWrapper = createElement({ tagName: "div", classNames: ["promo-code__basket-wrapper"] });
  const promoCodeTitle = createElement({ tagName: "p", classNames: ["promo-code__title"], textContent: "Введите промокод:" });
  const promoCodeInput = createElement({
    tagName: "input",
    classNames: ["promo-code__input"],
    attributes: { placeholder: "Промокод" },
  });

  const promoCodeButton = createElement({ tagName: "button", classNames: ["promo-code__button-apply", "inactive"], textContent: "Применить" });
  promoCodeWrapper.append(promoCodeTitle, promoCodeInput, promoCodeButton);
  promoCodeInput.addEventListener("input", () => {
    promoCodeButton.classList.remove("inactive");
  });

  response?.body.lineItems.forEach((item, index) => {
    productListWrapper.append(createBasketCard(index, response?.body));
  });

  productTotalWrapper.append(productTotalTextWrapper, productAmountTextWrapper, resetCartButton);
  productAmountTextWrapper.append(productAmountTitle, productFullAmount);
  productTotalTextWrapper.append(productTotalTitle, productTotalPrice);
  basketWrapper.append(productListWrapper, promoCodeWrapper, productTotalWrapper);

  addDiscountPromo(promoCodeButton, promoCodeInput, productListWrapper, productTotalPrice);

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

  emptyCartMessage.append(textEmptyCart, linkToCatalog);
  basketWrapper.innerHTML = "";
  basketWrapper.appendChild(emptyCartMessage);
}

export default renderBasketContent;

const addDiscountPromo = (
  promoCodeButton: HTMLButtonElement,
  promoCodeInput: HTMLInputElement,
  productListWrapper: HTMLUListElement,
  productTotalPrice: HTMLDivElement,
) => {
  promoCodeButton.addEventListener("click", async () => {
    productListWrapper.querySelectorAll(".product-basket__item")?.forEach((item) => item.remove());
    const cart = await getCart();
    const version = <number>cart?.body.version;
    try {
      await addDiscountAction(version, [{ action: "addDiscountCode", code: `${promoCodeInput.value}` }]);
      createSnackbar(SnackbarType.success, "Промокод активирован!");
    } catch {
      createSnackbar(SnackbarType.error, "Вы ввели неверный промокод");
    }
    promoCodeInput.value = "";
    promoCodeButton.classList.add("inactive");
    const response = await getCart();
    productTotalPrice.textContent = `${PriceFormatter.formatCents(response?.body.totalPrice.centAmount)}`;
    response?.body.lineItems.forEach((item, index) => {
      productListWrapper.append(createBasketCard(index, response?.body));
    });
  });
};
