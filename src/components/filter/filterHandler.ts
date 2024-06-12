import { correctFactorForPrices } from "../../api/constants";
import { getCart, getProducts } from "../../api/api";
import { createSnackbar } from "../elements";
import { SnackbarType } from "../../types/types";
import createCard from "../productCard/productCard";
import { QueryParam } from "@commercetools/platform-sdk";

const queryArgs: Record<string, QueryParam> = {};

export async function filterHandler(inputValuePriceFrom: string, inputValuePriceTo: string, filterWrapperSize: HTMLElement, categoryID?: string) {
  const cartResponse = await getCart();
  const catalogMain = <HTMLElement>document.querySelector(".catalog-main");
  let arrFilter = [];
  if (categoryID) arrFilter.push(`categories.id:"${categoryID}"`);
  if (inputValuePriceFrom || inputValuePriceTo) {
    const requestPrice = <string>priceFilterHandler(inputValuePriceFrom, inputValuePriceTo);
    arrFilter.push(requestPrice);
  }
  const requestSize = sizeFilterHandler(filterWrapperSize);
  if (requestSize) queryArgs["filter"] = arrFilter.push(requestSize);
  queryArgs["filter"] = arrFilter;
  getProducts(queryArgs)?.then((response) => {
    if (!catalogMain) return;

    const items = response?.body.results;
    if (items.length === 0) {
      createSnackbar(SnackbarType.error, "Товары по заданным фильтрам отсутствуют");
    } else {
      catalogMain.innerHTML = "";
      items?.forEach((item) => {
        const card = createCard(item, cartResponse);
        catalogMain.append(card);
      });
    }
  });
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
  } else {
    return;
  }
}

export function resetFilter(filterPriceFrom: HTMLInputElement, filterPriceTo: HTMLInputElement, filterWrapperSize: HTMLElement) {
  filterPriceFrom.value = "";
  filterPriceTo.value = "";
  Array.from(filterWrapperSize.querySelectorAll("input")).forEach((element) => (element.checked = false));
}

export function resetSort(
  priceIncreasingSortCheckbox: HTMLInputElement,
  priceDecreasingSortCheckbox: HTMLInputElement,
  nameSortCheckbox: HTMLInputElement,
) {
  priceIncreasingSortCheckbox.checked = false;
  priceDecreasingSortCheckbox.checked = false;
  nameSortCheckbox.checked = false;
}

export async function sortHandler(
  priceIncreasingSortCheckbox: HTMLInputElement,
  priceDecreasingSortCheckbox: HTMLInputElement,
  nameSortCheckbox: HTMLInputElement,
  categoryID?: string,
) {
  const catalogMain = <HTMLElement>document.querySelector(".catalog-main");
  const cartResponse = await getCart();
  if (!priceIncreasingSortCheckbox.checked && !priceDecreasingSortCheckbox.checked && !nameSortCheckbox) return;
  if (categoryID) queryArgs["filter"] = `categories.id:"${categoryID}"`;
  if (nameSortCheckbox.checked) queryArgs["sort"] = "name.ru asc";
  if (priceIncreasingSortCheckbox.checked) queryArgs["sort"] = "price asc";
  if (priceDecreasingSortCheckbox.checked) queryArgs["sort"] = "price desc";
  getProducts(queryArgs)?.then((response) => {
    if (!catalogMain) return;
    const items = response?.body.results;
    catalogMain.innerHTML = "";
    items?.forEach((item) => {
      const card = createCard(item, cartResponse);
      catalogMain.append(card);
    });
  });
}
