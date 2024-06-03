import { correctFactorForPrices } from "src/api/constants";
import { getProductsByFilter } from "../../api/api";
import createCard from "../productCard";
import { createSnackbar } from "../elements";
import { SnackbarType } from "src/types/types";

export function filterHandler(valuePriceFrom: string, valuePriceTo: string, filterWrapperSize: HTMLElement) {
  const catalogWrapper = <HTMLElement>document.querySelector(".catalog-wrapper");
  const categoryID = catalogWrapper.getAttribute("data-id");
  //filterWrapperSize.querySelectorAll();
  let request: string[] = [];
  if (categoryID) request.push(`categories.id:"${categoryID}"`);
  if (valuePriceFrom && valuePriceTo) {
    request.push(
      `variants.price.centAmount:range (${String(Number(valuePriceFrom) * correctFactorForPrices)} to ${String(
        Number(valuePriceTo) * correctFactorForPrices,
      )})`,
    );
  }
  request.push(`variants.sku:"L"`);
  // `${variant.sku?.slice(-1)}`

  getProductsByFilter(request)?.then((response) => {
    if (!catalogWrapper) return;

    const items = response?.body.results;
    if (items.length === 0) {
      createSnackbar(SnackbarType.error, "Товары по заданным фильтрам отсутствуют");
    } else {
      catalogWrapper.innerHTML = "";
      items?.forEach((item) => {
        const card = createCard(item);
        catalogWrapper.append(card);
      });
    }
  });
}

export function resetFilter(filterPriceFrom: HTMLInputElement, filterPriceTo: HTMLInputElement, filterWrapperSize: HTMLElement) {
  filterPriceFrom.value = "";
  filterPriceTo.value = "";
  Array.from(filterWrapperSize.querySelectorAll("input")).forEach((element) => (element.checked = false));
}
