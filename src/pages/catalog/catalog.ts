import "./catalog.css";
import { createElement, createSnackbar } from "../../components/elements";
import { SnackbarType } from "../../types/types";
import { getCategories, getProducts } from "../../api/api";
import { CategoryData } from "../../types/types";

import { getProductsByCategory } from "../../api/api";

import {
  ClientResponse,
  ProductProjectionPagedQueryResponse,
  ProductProjection,
  CategoryPagedQueryResponse,
  Category,
} from "@commercetools/platform-sdk";
import state from "src/store/state";
import createCard from "../../components/productCard";

export const catalog = createElement({ tagName: "section", classNames: ["catalog"] });
const catalogWrapper = createElement({ tagName: "ul", classNames: ["catalog-wrapper"] });
export const categoriesWrapper = createElement({ tagName: "div", classNames: ["categories-wrapper"] });
catalog.append(categoriesWrapper, catalogWrapper);

categoriesWrapper.addEventListener("click", (event) => {
  const target = <HTMLElement>event.target;
  if (target.classList.contains("menu-category")) {
    const id = target.getAttribute("data-id") as string;
    getProductsByCategory(id)?.then((response) => {
      if (response.statusCode === 200) {
        clearCatalogData();
        renderCatalogContent(response);
      } else {
        createSnackbar(SnackbarType.error, "Что-то пошло не так... Повторите попытку позже.");
      }
    });

    const clickedCategory = target as HTMLElement;

    const allCategoryItems = Array.from(categoriesWrapper.querySelectorAll(".menu-category")) as HTMLElement[];
    allCategoryItems.forEach((item) => {
      if (item !== clickedCategory) {
        item.classList.remove("active");
      }
    });

    clickedCategory.classList.toggle("active");
  }
});

const clearCategoriesData = () => {
  const categories = categoriesWrapper.querySelectorAll(".category-wrapper");
  categories.forEach((category) => category.remove());
};

const clearCatalogData = () => {
  const catalogItems = catalogWrapper.querySelectorAll(".card");
  catalogItems.forEach((item) => item.remove());
};

export function renderProductsFromApi() {
  getProducts()?.then((response) => {
    if (response.statusCode === 200) {
      clearCatalogData();
      renderCatalogContent(response);
    } else {
      createSnackbar(SnackbarType.error, "Что-то пошло не так... Повторите попытку позже.");
    }
  });
  getCategories()?.then((response) => {
    if (response.statusCode === 200) {
      clearCategoriesData();
      renderCategories(response);
    }
  });
}

function renderCategories(response: ClientResponse<CategoryPagedQueryResponse>) {
  const categories: Category[] = response.body.results;
  const parentCategories = categories.filter((category) => !category.parent);
  const childCategories = categories.filter((category) => category.parent);

  const categoryMap: { [key: string]: CategoryData } = {};

  parentCategories.forEach((parentCategory) => {
    const parentId = parentCategory.id;
    categoryMap[parentId] = {
      parent: parentCategory,
      children: [],
    };
  });

  childCategories.forEach((childCategory) => {
    if (childCategory.parent) {
      categoryMap[childCategory.parent.id]?.children.push(childCategory);
    }
  });
  const categoryDataValue = Object.values(categoryMap);
  categoryDataValue.forEach((categoryData) => {
    const categoryWrapper = createElement({ tagName: "div", classNames: ["category-wrapper"] });
    const parentCategoryElement = createElement({ tagName: "span", classNames: ["menu-category", "category-parent"] });
    parentCategoryElement.textContent = categoryData.parent.name.ru;
    parentCategoryElement.setAttribute("data-id", `${categoryData.parent.id}`);
    categoryWrapper.append(parentCategoryElement);
    const childrenContainer = createElement({ tagName: "div", classNames: ["child-categories-wrapper"] });

    categoryData.children.forEach((childCategory) => {
      const childCategoryElement = createElement({ tagName: "span", classNames: ["menu-category", "category-child"] });
      childCategoryElement.textContent = childCategory.name.ru;
      childCategoryElement.setAttribute("data-id", `${childCategory.id}`);
      childrenContainer.append(childCategoryElement);
    });

    categoryWrapper.append(childrenContainer);
    categoriesWrapper.append(categoryWrapper);
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
