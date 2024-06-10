import "./basket.css";
import { createElement } from "../../components/elements";
import { createBasketCard } from "./productBasketCard/productBasketCard";
import { getCart } from "src/api/api";
import { correctFactorForPrices } from "src/api/constants";

export async function renderBasketContent() {
  const response = await getCart();
  const amountCartDiv = document.querySelector(".menu-item__basket-amount");
  if (amountCartDiv) amountCartDiv.textContent = `${response?.body.lineItems.length}`;
  const basketWrapper = createElement({ tagName: "div", classNames: ["basket__wrapper"] });
  const productListWrapper = createElement({ tagName: "ul", classNames: ["product-list__wrapper"] });
  const productTotalWrapper = createElement({ tagName: "div", classNames: ["product-total__wrapper"] });

  const productTotalTextWrapper = createElement({ tagName: "div", classNames: ["product-total__text-wrapper"] });
  const productTotalTitle = createElement({ tagName: "p", classNames: ["product-total__title"], textContent: "Итого:" });
  const productTotalPrice = createElement({
    tagName: "p",
    classNames: ["product-total__price"],
    textContent: `${Number(response?.body.totalPrice.centAmount) / correctFactorForPrices} p.`,
  });

  const productAmountTextWrapper = createElement({ tagName: "div", classNames: ["product-amount__wrapper"] });
  const productAmountTitle = createElement({ tagName: "p", classNames: ["product-amount__title"], textContent: "Всего товаров:" });
  const productFullAmount = createElement({
    tagName: "p",
    classNames: ["product-amount__full-amount"],
    textContent: `${response?.body.lineItems.length}`,
  });

  response?.body.lineItems.forEach((item, index) => {
    productListWrapper.append(createBasketCard(index, response?.body));
  });

  productTotalWrapper.append(productTotalTextWrapper, productAmountTextWrapper);
  productAmountTextWrapper.append(productAmountTitle, productFullAmount);
  productTotalTextWrapper.append(productTotalTitle, productTotalPrice);
  basketWrapper.append(productListWrapper, productTotalWrapper);

  return basketWrapper;
}

export default renderBasketContent;
