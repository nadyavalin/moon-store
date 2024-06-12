import "./basket.css";
import { createElement } from "../../components/elements";
import { createBasketCard } from "./productBasketCard/productBasketCard";
import { getCart } from "../../api/api";
import { correctFactorForPrices } from "../../api/constants";
import { createModalConfirm, showQuantityItemsInHeader } from "./basketHandler";

export async function renderBasketContent() {
  const response = await getCart();
  const totalQuantity = response?.body.lineItems.reduce((total, item) => total + Number(item.quantity), 0);
  const totalPrice = Number(response?.body.totalPrice.centAmount) / correctFactorForPrices;
  showQuantityItemsInHeader(response?.body);
  const basketWrapper = createElement({ tagName: "div", classNames: ["basket__wrapper"] });
  if (response?.body.lineItems.length === 0) basketWrapper.textContent = "В корзине нет товаров";
  const productListWrapper = createElement({ tagName: "ul", classNames: ["product-list__wrapper"] });
  const productTotalWrapper = createElement({ tagName: "div", classNames: ["product-total__wrapper"] });

  const productTotalTextWrapper = createElement({ tagName: "div", classNames: ["product-total__text-wrapper"] });
  const productTotalTitle = createElement({ tagName: "p", classNames: ["product-total__title"], textContent: "Итого:" });
  const productTotalPrice = createElement({
    tagName: "p",
    classNames: ["product-total__price"],
    textContent: ` ${totalPrice} p.`,
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

  // ввод промо кода
  const promoCodeWrapper = createElement({ tagName: "div", classNames: ["promo-code__basket-wrapper"] });
  const promoCodeTitle = createElement({ tagName: "p", classNames: ["promo-code__title"], textContent: "Введите промокод:" });
  const promoCodeInput = createElement({
    tagName: "input",
    classNames: ["promo-code__input"],
    textContent: ` Введите промокод`,
  });
  const promoCodeButton = createElement({ tagName: "button", classNames: ["promo-code__button-apply"], textContent: "Применить" });

  promoCodeWrapper.append(promoCodeTitle, promoCodeInput, promoCodeButton);
  // ввод промо кода

  response?.body.lineItems.forEach((item, index) => {
    productListWrapper.append(createBasketCard(index, response?.body));
  });

  productTotalWrapper.append(productTotalTextWrapper, productAmountTextWrapper, resetCartButton);
  productAmountTextWrapper.append(productAmountTitle, productFullAmount);
  productTotalTextWrapper.append(productTotalTitle, productTotalPrice);
  basketWrapper.append(productListWrapper, promoCodeWrapper, productTotalWrapper);
  return basketWrapper;
}

export default renderBasketContent;
