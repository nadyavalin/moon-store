import "./modalSize.css";
import "../../product/product.css";
import { createElement, createSvgElement } from "../../../components/elements";
import { cross } from "../../../components/svg";
import { getProducts } from "../../../api/api";

export async function createModalSize(slug: string): Promise<HTMLElement> {
  const modalsizeBack = createElement({ tagName: "div", classNames: ["modal-back"] });
  const modalSize = createElement({ tagName: "div", classNames: ["modal"] });
  const closeButton = createSvgElement(cross, "cross", { width: "22px", height: "22px", viewBox: "0 0 19 19", fill: "none" });

  const response = await getProducts({ "filter.query": `slug.ru: "${slug}"` });
  const productSizes = response?.body.results[0].variants;
  const size = createElement({ tagName: "div", classNames: ["product__size"], innerHTML: "<b>Размеры:</b> " });

  productSizes?.forEach((variant) => {
    if (variant.attributes) {
      const sizeVariant = variant.attributes[0].value[0].key;
      const sizeItem = createElement({ tagName: "span", classNames: ["product__size-item"], textContent: `${sizeVariant}` });
      size.append(sizeItem);
    }
  });

  modalSize.append(closeButton);
  modalsizeBack.append(modalSize);

  closeButton.addEventListener("click", () => {
    modalsizeBack.remove();
  });

  return modalsizeBack;
}
