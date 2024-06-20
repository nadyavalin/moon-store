import { correctFactorForPrices } from "../../api/constants";
import { createSnackbar } from "../elements";
import { SnackbarType } from "../../types/types";
import { catalogQueryArgs, renderCatalogContent } from "../../pages/catalog/catalog";
import { createPagination } from "src/pages/catalog/pagination/pagination";

export async function filterHandler(
  inputValuePriceFrom: string,
  inputValuePriceTo: string,
  filterWrapperSize: HTMLElement,
  catalogList: HTMLUListElement,
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
  const totalProducts = await renderCatalogContent(catalogList);
  rerenderPagination(catalogList, totalProducts);
}

export function rerenderPagination(catalogList: HTMLUListElement, totalProducts?: number) {
  const paginationWrapper = document.querySelector(".pagination");
  if (paginationWrapper) paginationWrapper.remove();
  if (!totalProducts) return;
  const pagination = <HTMLElement>createPagination(totalProducts, () => renderCatalogContent(catalogList));
  const paginationCatalogMainWrapper = document.querySelector(".catalog-main-pagination-wrapper");
  if (paginationCatalogMainWrapper) paginationCatalogMainWrapper.append(pagination);
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
  catalogList: HTMLUListElement,
) {
  filterPriceFrom.value = "";
  filterPriceTo.value = "";
  Array.from(filterWrapperSize.querySelectorAll("input")).forEach((element) => (element.checked = false));
  catalogQueryArgs.filter = null;
  document.querySelector(".filter-wrapper")?.remove();
  renderCatalogContent(catalogList);
}

export function resetSort(
  priceIncreasingSortCheckbox: HTMLInputElement,
  priceDecreasingSortCheckbox: HTMLInputElement,
  nameSortCheckbox: HTMLInputElement,
  catalogList: HTMLUListElement,
) {
  priceIncreasingSortCheckbox.checked = false;
  priceDecreasingSortCheckbox.checked = false;
  nameSortCheckbox.checked = false;
  catalogQueryArgs.sort = null;
  document.querySelector(".sort-wrapper")?.remove();
  catalogQueryArgs.pageNumber = 1;
  renderCatalogContent(catalogList);
}

export async function sortHandler(
  priceIncreasingSortCheckbox: HTMLInputElement,
  priceDecreasingSortCheckbox: HTMLInputElement,
  nameSortCheckbox: HTMLInputElement,
  catalogList: HTMLUListElement,
) {
  if (!priceIncreasingSortCheckbox.checked && !priceDecreasingSortCheckbox.checked && !nameSortCheckbox) return;
  if (nameSortCheckbox.checked) catalogQueryArgs.sort = "name.ru asc";
  if (priceIncreasingSortCheckbox.checked) catalogQueryArgs.sort = "price asc";
  if (priceDecreasingSortCheckbox.checked) catalogQueryArgs.sort = "price desc";

  renderCatalogContent(catalogList);
}

export async function resetFilterSortSearch(catalogList: HTMLUListElement) {
  catalogQueryArgs.filter = null;
  catalogQueryArgs.pageNumber = 1;
  catalogQueryArgs.sort = null;
  catalogQueryArgs.searchText = null;
  catalogQueryArgs.category = null;
  const totalProducts = await renderCatalogContent(catalogList);
  rerenderPagination(catalogList, totalProducts);
  document.querySelector(".sort-wrapper")?.remove();
  document.querySelector(".filter-wrapper")?.remove();
}
