import "./catalog.css";

import { getProducts } from "../../api/api";
import { SnackbarType } from "../../types/types";
import { createElement, createSnackbar } from "../../components/elements";
import { createCard } from "../../components/productCard";
import { ClientResponse, ProductProjectionPagedQueryResponse } from "@commercetools/platform-sdk";

export const catalog = createElement({ tagName: "section", classNames: ["catalog"] });
export const catalogWrapper = createElement({ tagName: "ul", classNames: ["catalog-wrapper"] });

export function renderProductsFromApi() {
  getProducts().then((response) => {
    if (response.statusCode === 200) {
      const catalogItems = catalogWrapper.querySelectorAll(".card");
      if (catalogItems) {
        catalogItems.forEach((item) => item.remove());
      }
      renderCatalogContent(response);
    } else {
      createSnackbar(SnackbarType.error, "Что-то пошло не так... Повторите попытку позже.");
    }
  });
}

function renderCatalogContent(response: ClientResponse<ProductProjectionPagedQueryResponse>) {
  const items = response.body.results;
  items.forEach((item) => {
    const card = createCard(item);
    catalogWrapper.append(card);
  });
}

catalog.append(catalogWrapper);
