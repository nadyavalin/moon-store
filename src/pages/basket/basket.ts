import "./basket.css";
import { createElement } from "../../components/elements";
import { createBusketCard } from "./productBasketCard/productBasketCard";

export function renderBasketContent() {
  const basketWrapper = createElement({ tagName: "div", classNames: ["basket__wrapper"] });
  const productListWrapper = createElement({ tagName: "ul", classNames: ["product-list__wrapper"] });
  const productTotalWrapper = createElement({ tagName: "div", classNames: ["product-total__wrapper"] });

  const productTotalTextWrapper = createElement({ tagName: "div", classNames: ["product-total__text-wrapper"] });
  const procutTotalTitle = createElement({ tagName: "p", classNames: ["product-total__title"], textContent: "Итого:" });
  const productTotalPrice = createElement({ tagName: "p", classNames: ["product-total__price"], textContent: "3400 р." });

  const productAmountTextWrapper = createElement({ tagName: "div", classNames: ["product-amount__wrapper"] });
  const procutAmountTitle = createElement({ tagName: "p", classNames: ["product-amount__title"], textContent: "Всего товаров:" });
  const productFullAmount = createElement({ tagName: "p", classNames: ["product-amount__full-amount"], textContent: "2 шт." });

  productListWrapper.append(createBusketCard());
  productTotalWrapper.append(productTotalTextWrapper, productAmountTextWrapper);
  productAmountTextWrapper.append(procutAmountTitle, productFullAmount);
  productTotalTextWrapper.append(procutTotalTitle, productTotalPrice);
  basketWrapper.append(productListWrapper, productTotalWrapper);

  return basketWrapper;
}

export default renderBasketContent;
