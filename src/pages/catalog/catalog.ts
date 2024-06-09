import "./catalog.css";
import { createElement } from "../../components/elements";
import { getProducts, getCategories } from "../../api/api";
import { CategoryData } from "../../types/types";
import { ClientResponse, ProductProjectionPagedSearchResponse, Category, CategoryPagedQueryResponse, QueryParam } from "@commercetools/platform-sdk";
import { createCard } from "../../components/productCard/productCard";
import { createSvgElement } from "../../components/elements";
import { cross } from "../../components/svg";
import { createSnackbar } from "../../components/elements";
import { SnackbarType } from "../../types/types";
import { Pages } from "../../types/types";
import { createModalSize } from "./modalSize/modalSize";
import { createPagination } from "./pagination/pagination";
import createFilterSortButtons from "../../components/filter/filterView";

export async function renderProductsFromApi(args: string[]): Promise<HTMLElement> {
  const slug = args[args.length - 1];
  const response = await getCategories();
  const results = response?.body.results;
  const category = results?.find((category) => category.slug.ru === slug);
  const id = category?.id;

  const catalog = createElement({ tagName: "section", classNames: ["catalog"] });
  const catalogWrapper = createElement({ tagName: "div", classNames: ["catalog-wrapper"] });
  const catalogMainPaginationWrapper = createElement({ tagName: "div", classNames: ["catalog-main-pagination-wrapper"] });
  const catalogList = createElement({ tagName: "ul", classNames: ["catalog-main"] });

  const filterSortButtons = createFilterSortButtons(id);
  const sidePanel = createElement({ tagName: "div", classNames: ["catalog-side"] });
  const searchPanel = renderSearchPanel();

  const queryArgs: Record<string, QueryParam> = {};
  if (id) {
    queryArgs["filter.query"] = `categories.id:"${id}"`;
  }
  const productResponse = await getProducts(queryArgs);

  const catalogMain = renderCatalogContent(productResponse, catalogList);
  const categories = renderCategories(response, slug);

  searchPanel.addEventListener("click", async (event) => {
    const input = <HTMLInputElement>searchPanel.querySelector(".search-input");
    const target = <HTMLElement>event.target;

    if (target.classList.contains("search-button")) {
      queryArgs["text.ru"] = `${input.value}`;
      const productResponse = await getProducts(queryArgs);
      renderCatalogContent(productResponse, catalogList);
    }
  });

  const pagination = createPagination(productResponse?.body.limit);

  sidePanel.append(filterSortButtons, categories);
  catalogWrapper.append(sidePanel, catalogMainPaginationWrapper);
  catalogMainPaginationWrapper.append(catalogMain, pagination);
  catalog.append(searchPanel, catalogWrapper);

  return catalog;
}

function renderSearchPanel() {
  const searchPanel = createElement({ tagName: "div", classNames: ["search-panel"] });
  const searchPanelInner = createElement({ tagName: "div", classNames: ["search-panel__inner"] });
  const clearBtn = createSvgElement(cross, "clear-btn", { viewBox: "0 0 19 19" });
  const inputWrapper = createElement({ tagName: "div", classNames: ["search-input__wrapper"] });
  const input = createElement({ tagName: "input", classNames: ["search-input"], attributes: { placeholder: "Введите слово..." } });
  const searchBtn = createElement({ tagName: "button", classNames: ["search-button"], textContent: "Поиск" });
  inputWrapper.append(input, clearBtn);
  searchPanelInner.append(inputWrapper, searchBtn);
  searchPanel.append(searchPanelInner);
  clearBtn.addEventListener("click", () => {
    input.value = "";
  });
  return searchPanel;
}

function renderCategories(response: ClientResponse<CategoryPagedQueryResponse> | undefined, slug: string) {
  const categoriesWrapper = createElement({ tagName: "div", classNames: ["categories-wrapper"] });
  const categories: Category[] | undefined = response?.body.results;
  const parentCategories = categories?.filter((category) => !category.parent);
  const childCategories = categories?.filter((category) => category.parent);
  const categoryMap: { [key: string]: CategoryData } = {};

  parentCategories?.forEach((parentCategory) => {
    const parentId = parentCategory.id;
    categoryMap[parentId] = {
      parent: parentCategory,
      children: [],
    };
  });

  childCategories?.forEach((childCategory) => {
    if (childCategory.parent) {
      categoryMap[childCategory.parent.id]?.children.push(childCategory);
    }
  });
  const categoryDataValue = Object.values(categoryMap);
  categoryDataValue.forEach((categoryData) => {
    const categoryWrapper = createElement({ tagName: "div", classNames: ["category-wrapper"] });
    const parentCategoryElement = createElement({
      tagName: "a",
      classNames: ["menu-category", "category-parent"],
      attributes: { href: `${Pages.CATALOG}/${categoryData.parent.slug.ru}` },
    });

    parentCategoryElement.classList.toggle("active", slug === categoryData.parent.slug.ru);
    parentCategoryElement.textContent = categoryData.parent.name.ru;
    parentCategoryElement.setAttribute("data-id", `${categoryData.parent.id}`);
    categoryWrapper.append(parentCategoryElement);
    const childrenContainer = createElement({ tagName: "div", classNames: ["child-categories-wrapper"] });

    categoryData.children.forEach((childCategory) => {
      const childCategoryElement = createElement({
        tagName: "a",
        classNames: ["menu-category", "category-child"],
        attributes: { href: `${Pages.CATALOG}/${categoryData.parent.slug.ru}/${childCategory.slug.ru}` },
      });

      childCategoryElement.classList.toggle("active", slug === childCategory.slug.ru);
      childCategoryElement.textContent = childCategory.name.ru;
      childCategoryElement.setAttribute("data-id", `${childCategory.id}`);
      childrenContainer.append(childCategoryElement);
    });

    categoryWrapper.append(childrenContainer);
    categoriesWrapper.append(categoryWrapper);
  });

  return categoriesWrapper;
}

function renderCatalogContent(response: ClientResponse<ProductProjectionPagedSearchResponse> | undefined, catalogList: HTMLUListElement) {
  const items = response?.body.results;
  if (items?.length === 0) {
    createSnackbar(SnackbarType.error, "Товары отсутствуют");
  } else {
    catalogList.innerHTML = "";
    items?.forEach((item) => {
      const card = createCard(item);
      catalogList.append(card);
    });
  }
  catalogList.addEventListener("click", async (event) => {
    const target = <HTMLButtonElement>event.target;
    if (target.classList.contains("card__button")) {
      event.preventDefault();
      const productId = target.getAttribute("data-id");
      const response = await getProducts({ "filter.query": `id:"${productId}"` });
      const modal = createModalSize(response);
      document.body.append(modal);
    }
  });
  return catalogList;
}
