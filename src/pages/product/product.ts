import "./product.css";
import { PriceFormatter } from "../../utils/utils";
import { createElement } from "../../components/elements";

export function renderProductContent() {
  const productWrapper = createElement({ tagName: "div", classNames: ["product__wrapper"] });
  const productTextWrapper = createElement({ tagName: "div", classNames: ["product__text-wrapper"] });
  const image = createElement({ tagName: "img", classNames: ["product__img"], attributes: { src: "../../../public/img/img-1.png" } });
  const name = createElement({ tagName: "h4", classNames: ["product__name"], textContent: "Название продукта" });
  const description = createElement({ tagName: "p", classNames: ["product__description"], textContent: "Описание продукта" });
  const size = createElement({ tagName: "p", classNames: ["product__size"], textContent: "Размеры: L, M, S" });
  const price = createElement({ tagName: "p", classNames: ["product__price"], textContent: PriceFormatter.formatCents(200000) });
  const discount = createElement({ tagName: "p", classNames: ["product__discount"], textContent: PriceFormatter.formatCents(150000) });
  const buyButton = createElement({ tagName: "button", classNames: ["product__buy-button"], textContent: "Добавить в корзину" });

  productTextWrapper.append(name, description, size, price, discount, buyButton);
  productWrapper.append(image, productTextWrapper);

  return productWrapper;
}

export default renderProductContent;
