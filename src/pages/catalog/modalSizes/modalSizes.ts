import "./modalSizes.css";
import "../../product/modal/modal.css";
import { createElement, createSnackbar, createSvgElement } from "../../../components/elements";
import { cross } from "../../../components/svg";
import { ClientResponse, ProductProjectionPagedSearchResponse, Cart } from "@commercetools/platform-sdk";
import { getCart, updateCart } from "../../../api/api";
import { SnackbarType } from "../../../types/types";
import { showQuantityItemsInHeader } from "../../basket/basketHandler";

export function createModalSize(
  response: ClientResponse<ProductProjectionPagedSearchResponse> | undefined,
  cartResponse: ClientResponse<Cart> | undefined,
  cardButton: HTMLButtonElement,
) {
  const productSizes = response?.body.results[0].variants;
  const productId = response?.body.results[0].id;
  const itemsInCart = cartResponse?.body.lineItems;

  const modalSizesBack = createElement({ tagName: "div", classNames: ["modal-back"] });
  const modalSizes = createElement({ tagName: "div", classNames: ["modal-sizes"] });
  const modalSizesContent = createElement({ tagName: "div", classNames: ["modal-sizes__content"] });
  const closeButton = createSvgElement(cross, "cross", { width: "22px", height: "22px", viewBox: "0 0 19 19", fill: "none" });
  const size = createElement({ tagName: "div", classNames: ["product__size"], innerHTML: "<b>Размеры:</b> " });

  productSizes?.forEach((variant) => {
    if (variant.attributes) {
      const sizeVariant = variant.attributes[0].value[0].key;
      const variantId = variant.id;
      const sizeItem = createElement({
        tagName: "button",
        classNames: ["product__size-item"],
        textContent: `${sizeVariant}`,
        attributes: { "data-id": `${variantId}` },
      });
      size.append(sizeItem);
    }
  });

  itemsInCart?.forEach((item) => {
    if (productId === item?.productId) {
      size.querySelectorAll<HTMLButtonElement>(".product__size-item").forEach((sizeItem) => {
        if (Number(sizeItem.getAttribute("data-id")) === item.variant.id) {
          sizeItem.classList.add("active");
          sizeItem.disabled = true;
        } else {
          sizeItem.disabled = true;
          sizeItem.classList.add("inactive");
        }
      });
    }
  });

  modalSizesContent.append(size, closeButton);
  modalSizes.append(modalSizesContent);
  modalSizesBack.append(modalSizes);

  closeButton.addEventListener("click", () => {
    modalSizesBack.remove();
  });

  modalSizesBack.addEventListener("click", async (event) => {
    modalSizesBack.remove();
    const target = <HTMLButtonElement>event.target;
    if (target.classList.contains("product__size-item")) {
      const variantId = Number(target.getAttribute("data-id"));
      const response = await getCart();
      const version = <number>response?.body.version;
      try {
        const updateResponse = await updateCart(version, [{ action: "addLineItem", productId: `${productId}`, variantId, quantity: 1 }]);
        createSnackbar(SnackbarType.success, "Товар добавлен в корзину!");
        cardButton.classList.add("card__button_disabled");
        showQuantityItemsInHeader(updateResponse?.body);
      } catch {
        createSnackbar(SnackbarType.error, "Что-то пошло не так... Повторите попытку позднее");
      }
    }
  });
  return modalSizesBack;
}
