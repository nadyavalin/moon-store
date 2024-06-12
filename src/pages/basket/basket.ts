import "./basket.css";
import { createElement } from "../../components/elements";
import { createBasketCard } from "./productBasketCard/productBasketCard";
import { getCart } from "../../api/api";
import { correctFactorForPrices } from "../../api/constants";
import { deletionConfirmation, resetCart, showQuantityItemsInHeader } from "./basketHandler";

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
  resetCartButton.addEventListener("click", resetCart);
  response?.body.lineItems.forEach((item, index) => {
    productListWrapper.append(createBasketCard(index, response?.body));
  });

  productTotalWrapper.append(productTotalTextWrapper, productAmountTextWrapper, resetCartButton);
  productAmountTextWrapper.append(productAmountTitle, productFullAmount);
  productTotalTextWrapper.append(productTotalTitle, productTotalPrice);
  basketWrapper.append(productListWrapper, productTotalWrapper);
  return basketWrapper;
}

export default renderBasketContent;
