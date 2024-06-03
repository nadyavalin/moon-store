import { createElement, createSvgElement } from "../elements";
import { filterIcon, sortIcon } from "../svg";
import "./filter.css";
import { filterHandler, resetFilter } from "./filterHandler";

const createFilterView = () => {
  const filterButtonsWrapper = createElement({ tagName: "div", classNames: ["filter__buttons-wrapper"] });
  const filterButton = createElement({ tagName: "div", classNames: ["filter-button"], attributes: { title: "Фильтровать" } });
  const svgFilter = createSvgElement(filterIcon, "filter-icon");
  filterButton.append(svgFilter);
  const sortButton = createElement({ tagName: "div", classNames: ["sort-button"], attributes: { title: "Сортировать" } });
  const svgSort = createSvgElement(sortIcon, "sort-icon");
  sortButton.append(svgSort);
  filterButtonsWrapper.append(filterButton, sortButton);
  const filterWrapper = createFilterSidebarView();
  filterButton.addEventListener("click", () => {
    filterWrapper.classList.toggle("open-filter");
    if (filterWrapper.className.includes("open-filter")) {
      filterWrapper.remove();
    } else {
      const catalogWrapper = <HTMLElement>document.querySelector(".catalog-wrapper");
      catalogWrapper.append(filterWrapper);
    }
  });

  return filterButtonsWrapper;
};

function createFilterSidebarView() {
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
    filterHandler(filterPriceFrom.value, filterPriceTo.value, filterWrapperSize);
    filterWrapper.remove();
  });
  resetButton.addEventListener("click", () => resetFilter(filterPriceFrom, filterPriceTo, filterWrapperSize));
  filterWrapper.append(filterHeading, priceHeading, filterWrapperPrice, priceSize, filterWrapperSize, buttonsWrapper);
  return filterWrapper;
}

export default createFilterView;
