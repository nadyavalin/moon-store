import { getProducts } from "../../api/api";
import { SnackbarType } from "../../types/types";
import { createElement, createSnackbar } from "../../components/elements";
import { renderCatalogCard } from "../../components/productCard";
import { ClientResponse, ProductProjectionPagedQueryResponse } from "@commercetools/platform-sdk";

export const catalog = createElement({ tagName: "section", classNames: ["catalog"] });
export const catalogWrapper = createElement({ tagName: "ul", classNames: ["catalog-wrapper"] });
catalog.append(catalogWrapper);

export const renderProductsFromApi = () =>
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

function renderCatalogContent(response: ClientResponse<ProductProjectionPagedQueryResponse>) {
  const items = response.body.results;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    renderCatalogCard(item);
  }
}
