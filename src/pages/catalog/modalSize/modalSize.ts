import "./modalSize.css";
import "../../product/product.css";
import { createElement, createSvgElement } from "../../../components/elements";
import { cross } from "../../../components/svg";
import { ClientResponse, ProductProjectionPagedSearchResponse } from "@commercetools/platform-sdk";
import { getCart, updateCart } from "../../../api/api";
import { getItemFromLocalStorage } from "src/utils/utils";
import state from "src/store/state";
import { showQuantityItemsInHeader } from "src/pages/basket/basketHandler";

export function createModalSize(response: ClientResponse<ProductProjectionPagedSearchResponse> | undefined) {
  const productSizes = response?.body.results[0].variants;
  const productId = response?.body.results[0].id;

  const modalsizeBack = createElement({ tagName: "div", classNames: ["modal-back"] });
  const modalSize = createElement({ tagName: "div", classNames: ["modal"] });
  const closeButton = createSvgElement(cross, "cross", { width: "22px", height: "22px", viewBox: "0 0 19 19", fill: "none" });
  const size = createElement({ tagName: "div", classNames: ["product__size"], innerHTML: "<b>Размеры:</b> " });

  productSizes?.forEach((variant) => {
    if (variant.attributes) {
      const sizeVariant = variant.attributes[0].value[0].key;
      const variantId = variant.id;
      const sizeItem = createElement({
        tagName: "span",
        classNames: ["product__size-item"],
        textContent: `${sizeVariant}`,
        attributes: { "data-id": `${variantId}` },
      });
      size.append(sizeItem);
    }
  });

  modalSize.append(size, closeButton);
  modalsizeBack.append(modalSize);

  closeButton.addEventListener("click", () => {
    modalsizeBack.remove();
  });

  modalsizeBack.addEventListener("click", async (event) => {
    modalsizeBack.remove();
    const target = <HTMLSpanElement>event.target;
    if (target.classList.contains("product__size-item")) {
      const variantId = Number(target.getAttribute("data-id"));
      const response = await getCart();
      const version = <number>response?.body.version;
      await updateCart(version, [{ action: "addLineItem", productId: `${productId}`, variantId, quantity: 1 }]);
      showQuantityItemsInHeader(response?.body);
    }
  });
  return modalsizeBack;
}
