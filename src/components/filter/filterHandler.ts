import { correctFactorForPrices } from "src/api/constants";
import { getProductsByFilter } from "../../api/api";
import createCard from "../productCard";
import { createSnackbar } from "../elements";
import { SnackbarType } from "src/types/types";

export function filterHandler(inputValuePriceFrom: string, inputValuePriceTo: string, filterWrapperSize: HTMLElement) {
  const requestSize = sizeFilterHandler(filterWrapperSize);
  const catalogMain = <HTMLElement>document.querySelector(".catalog-main");
  const categoryID = catalogMain.getAttribute("data-id");

  let request: string[] = [];
  if (categoryID) request.push(`categories.id:"${categoryID}"`);
  if (inputValuePriceFrom || inputValuePriceTo) {
    const requestPrice = <string>priceFilterHandler(inputValuePriceFrom, inputValuePriceTo);
    request.push(requestPrice);
  }
  if (requestSize) request.push(requestSize);
  getProductsByFilter(request)?.then((response) => {
    if (!catalogMain) return;

    const items = response?.body.results;
    if (items.length === 0) {
      createSnackbar(SnackbarType.error, "Товары по заданным фильтрам отсутствуют");
    } else {
      catalogMain.innerHTML = "";
      items?.forEach((item) => {
        const card = createCard(item);
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
