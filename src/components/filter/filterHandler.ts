import { correctFactorForPrices } from "../../api/constants";
import { createSnackbar } from "../elements";
import { Pages, SnackbarType } from "../../types/types";
import { catalogQueryArgs, renderCatalogContent } from "../../pages/catalog/catalog";

export async function filterHandler(
  inputValuePriceFrom: string,
  inputValuePriceTo: string,
  filterWrapperSize: HTMLElement,
  catalogMainPaginationWrapper: HTMLElement,
) {
  let arrFilter = [];
  if (inputValuePriceFrom || inputValuePriceTo) {
    const requestPrice = <string>priceFilterHandler(inputValuePriceFrom, inputValuePriceTo);
    arrFilter.push(requestPrice);
  }
  const requestSize = sizeFilterHandler(filterWrapperSize);
  if (requestSize) arrFilter.push(requestSize);
  catalogQueryArgs.filter = arrFilter;
  catalogQueryArgs.pageNumber = 1;
  renderCatalogContent(catalogMainPaginationWrapper);
}

function priceFilterHandler(inputValuePriceFrom: string, inputValuePriceTo: string) {
  if (!Number(inputValuePriceFrom) && !Number(inputValuePriceTo)) {
    createSnackbar(SnackbarType.error, "Введите число");
    return;
  }
  let valuePriceFrom;
  let valuePriceTo;
  inputValuePriceFrom ? (valuePriceFrom = Number(inputValuePriceFrom) * correctFactorForPrices) : (valuePriceFrom = "*");
  inputValuePriceTo ? (valuePriceTo = Number(inputValuePriceTo) * correctFactorForPrices) : (valuePriceTo = "*");
  return `variants.price.centAmount:range (${String(valuePriceFrom)} to ${String(valuePriceTo)})`;
}

function sizeFilterHandler(filterWrapperSize: HTMLElement) {
  const checkboxArr = Array.from(filterWrapperSize.querySelectorAll(".product__size-item"));
  const arrCheckedCheckbox = checkboxArr.filter((element) => (element as HTMLInputElement).checked);
  if (arrCheckedCheckbox.length !== 0) {
    return `variants.attributes.sizes.key:"${arrCheckedCheckbox[0].id}"`;
  }
}

export function resetFilter(
  filterPriceFrom: HTMLInputElement,
  filterPriceTo: HTMLInputElement,
  filterWrapperSize: HTMLElement,
  catalogMainPaginationWrapper: HTMLElement,
) {
  filterPriceFrom.value = "";
  filterPriceTo.value = "";
  Array.from(filterWrapperSize.querySelectorAll("input")).forEach((element) => (element.checked = false));
  catalogQueryArgs.filter = null;
  document.querySelector(".filter-wrapper")?.remove();
  renderCatalogContent(catalogMainPaginationWrapper);
}

export function resetSort(
  priceIncreasingSortCheckbox: HTMLInputElement,
  priceDecreasingSortCheckbox: HTMLInputElement,
  nameSortCheckbox: HTMLInputElement,
  catalogMainPaginationWrapper: HTMLElement,
) {
  priceIncreasingSortCheckbox.checked = false;
  priceDecreasingSortCheckbox.checked = false;
  nameSortCheckbox.checked = false;
  catalogQueryArgs.sort = null;
  document.querySelector(".sort-wrapper")?.remove();
  catalogQueryArgs.pageNumber = 1;
  renderCatalogContent(catalogMainPaginationWrapper);
}

export async function sortHandler(
  priceIncreasingSortCheckbox: HTMLInputElement,
  priceDecreasingSortCheckbox: HTMLInputElement,
  nameSortCheckbox: HTMLInputElement,
  catalogMainPaginationWrapper: HTMLElement,
) {
  if (!priceIncreasingSortCheckbox.checked && !priceDecreasingSortCheckbox.checked && !nameSortCheckbox) return;
  if (nameSortCheckbox.checked) catalogQueryArgs.sort = "name.ru asc";
  if (priceIncreasingSortCheckbox.checked) catalogQueryArgs.sort = "price asc";
  if (priceDecreasingSortCheckbox.checked) catalogQueryArgs.sort = "price desc";
  renderCatalogContent(catalogMainPaginationWrapper);
}

export async function resetFilterSortSearch(catalogMainPaginationWrapper: HTMLElement) {
  catalogQueryArgs.filter = null;
  catalogQueryArgs.pageNumber = 1;
  catalogQueryArgs.sort = null;
  catalogQueryArgs.searchText = null;
  catalogQueryArgs.category = null;
  renderCatalogContent(catalogMainPaginationWrapper);
  document.querySelector(".sort-wrapper")?.remove();
  document.querySelector(".filter-wrapper")?.remove();
  window.location.hash = Pages.CATALOG;
}
