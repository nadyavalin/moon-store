import { createElement, createSvgElement } from "../elements";
import { filterIcon, sortIcon } from "../svg";
import "./filter.css";
import { filterHandler, resetFilter, resetSort, sortHandler } from "./filterHandler";

const createFilterSortButtons = (categoryID?: string) => {
  const filterButtonsWrapper = createElement({ tagName: "div", classNames: ["filter-sort__buttons-wrapper"] });
  const filterButton = createSvgElement(filterIcon, "filter-icon", { width: "30", height: "30", viewBox: "0 0 48 48" });
  const sortButton = createSvgElement(sortIcon, "sort-icon", {
    width: "30",
    height: "30",
    viewBox: "0 0 24 24",
    "stroke-width": "2",
    stroke: "currentColor",
    fill: "none",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
  });
  filterButtonsWrapper.append(filterButton, sortButton);

  filterButton.addEventListener("click", () => {
    const filterWrapper = createFilterSidebarView(categoryID);
    filterWrapper.classList.toggle("open-filter");
    if (filterWrapper.className.includes("open-filter")) {
      filterWrapper.remove();
    } else {
      const catalogWrapper = <HTMLElement>document.querySelector(".catalog-wrapper");
      catalogWrapper.append(filterWrapper);
    }
  });
  sortButton.addEventListener("click", () => {
    const sortWrapper = createSortSidebarView(categoryID);
    sortWrapper.classList.toggle("open-filter");
    if (sortWrapper.className.includes("open-filter")) {
      sortWrapper.remove();
    } else {
      const catalogWrapper = <HTMLElement>document.querySelector(".catalog-wrapper");
      catalogWrapper.append(sortWrapper);
    }
  });
  return filterButtonsWrapper;
};

function createFilterSidebarView(categoryID?: string) {
  const filterWrapper = createElement({ tagName: "div", classNames: ["filter-wrapper", "open-filter"] });
  const filterHeading = createElement({ tagName: "h2", classNames: ["filter__heading"], textContent: "Фильтры" });
  const priceHeading = createElement({ tagName: "span", classNames: ["price__heading"], textContent: "Цена ₽:" });
  const filterWrapperPrice = createElement({ tagName: "div", classNames: ["price"] });
  const priceSize = createElement({ tagName: "span", classNames: ["size__heading"], textContent: "Размер:" });
  const filterWrapperSize = createElement({ tagName: "div", classNames: ["size"] });
  const filterPriceFrom = createElement({
    tagName: "input",
    classNames: ["price__input-from"],
    attributes: { type: "text", placeholder: "От" },
  });
  const filterCountHyphen = createElement({ tagName: "span", textContent: "-" });
  const filterPriceTo = createElement({ tagName: "input", classNames: ["price__input-to"], attributes: { type: "text", placeholder: "До" } });
  filterWrapperPrice.append(filterPriceFrom, filterCountHyphen, filterPriceTo);
  const sizes = ["S", "M", "L", "XL"];

  sizes.forEach((element) => {
    const size = createElement({ tagName: "label", classNames: ["size__label"], attributes: { for: `${element}` }, textContent: element });
    const checkbox = createElement({ tagName: "input", classNames: ["product__size-item"], attributes: { type: "checkbox", id: `${element}` } });
    filterWrapperSize.append(checkbox, size);
  });
  const buttonsWrapper = createElement({ tagName: "div", classNames: ["filter__buttons-wrapper"] });
  const applyButton = createElement({ tagName: "button", classNames: ["filter__button-apply"], textContent: "Применить" });
  const resetButton = createElement({ tagName: "button", classNames: ["filter__button-reset"], textContent: "Сбросить" });
  buttonsWrapper.append(applyButton, resetButton);
  applyButton.addEventListener("click", () => {
    filterHandler(filterPriceFrom.value, filterPriceTo.value, filterWrapperSize, categoryID);
    filterWrapper.remove();
  });
  resetButton.addEventListener("click", () => resetFilter(filterPriceFrom, filterPriceTo, filterWrapperSize));
  filterWrapper.append(filterHeading, priceHeading, filterWrapperPrice, priceSize, filterWrapperSize, buttonsWrapper);
  return filterWrapper;
}

function createSortSidebarView(categoryID?: string) {
  const sortWrapper = createElement({ tagName: "div", classNames: ["sort-wrapper", "open-filter"] });
  const sortHeading = createElement({ tagName: "h2", classNames: ["sort__heading"], textContent: "Сортировка" });
  const priceHeading = createElement({ tagName: "span", classNames: ["price__heading"], textContent: "Цена ₽:" });
  const priceIncreasingSortWrapper = createElement({ tagName: "div", classNames: ["sort__price-wrapper"] });
  const priseIncreasingSortLabel = createElement({
    tagName: "label",
    classNames: ["sort__label"],
    attributes: { for: "price-sort" },
    textContent: "По возрастанию",
  });
  const priceIncreasingSortCheckbox = createElement({ tagName: "input", classNames: ["sort"], attributes: { type: "checkbox", id: "price-sort" } });
  const priceDecreasingSortWrapper = createElement({ tagName: "div", classNames: ["sort__price-wrapper"] });
  const priseDecreasingSortLabel = createElement({
    tagName: "label",
    classNames: ["sort__label"],
    attributes: { for: "price-sort" },
    textContent: "По убыванию",
  });
  const priceDecreasingSortCheckbox = createElement({ tagName: "input", classNames: ["sort"], attributes: { type: "checkbox", id: "price-sort" } });

  priceIncreasingSortWrapper.append(priceIncreasingSortCheckbox, priseIncreasingSortLabel);
  priceDecreasingSortWrapper.append(priceDecreasingSortCheckbox, priseDecreasingSortLabel);

  const buttonsWrapper = createElement({ tagName: "div", classNames: ["sort__buttons-wrapper"] });
  const applyButton = createElement({ tagName: "button", classNames: ["sort__button-apply"], textContent: "Применить" });
  const resetButton = createElement({ tagName: "button", classNames: ["sort__button-reset"], textContent: "Сбросить" });
  buttonsWrapper.append(applyButton, resetButton);
  applyButton.addEventListener("click", () => {
    sortHandler(priceIncreasingSortCheckbox, priceDecreasingSortCheckbox, categoryID);
    sortWrapper.remove();
  });
  resetButton.addEventListener("click", () => resetSort(priceIncreasingSortCheckbox, priceDecreasingSortCheckbox));
  sortWrapper.append(sortHeading, priceHeading, priceIncreasingSortWrapper, priceDecreasingSortWrapper, buttonsWrapper);
  return sortWrapper;
}

export default createFilterSortButtons;
