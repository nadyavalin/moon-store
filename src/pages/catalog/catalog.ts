import "./catalog.css";
import { createElement } from "../../components/elements";
import { getProducts, getCategories } from "../../api/api";
import { CategoryData } from "../../types/types";
import { ClientResponse, ProductProjectionPagedQueryResponse, Category } from "@commercetools/platform-sdk";
import { createCard } from "../../components/productCard";

export async function renderProductsFromApi() {
  const response = await getProducts();

  const catalog = createElement({ tagName: "section", classNames: ["catalog"] });
  const catalogWrapper = createElement({ tagName: "div", classNames: ["catalog-wrapper"] });
  const filterWrapper = createElement({ tagName: "div", classNames: ["filter-wrapper"] });
  const catalogMain = createElement({ tagName: "ul", classNames: ["catalog-main"] });
  const sidePanel = createElement({ tagName: "div", classNames: ["catalog-side"] });
  const searchPanel = renderSearchPanel();
  renderCatalogContent(response, catalogMain);
  const categories = await renderCategories();

  categories.addEventListener("click", async (event) => {
    const target = <HTMLElement>event.target;
    if (target.classList.contains("menu-category")) {
      const id = target.getAttribute("data-id") as string;
      await renderCatalogByCategory(id, catalogMain);
    }
    if (target.classList.contains("catalog-caregory")) {
      renderCatalogContent(response, catalogMain);
    }
    if (target.classList.contains("menu-category__item")) {
      const clickedCategory = target as HTMLElement;
      const allCategoryItems = Array.from(categories.querySelectorAll(".menu-category__item")) as HTMLElement[];
      allCategoryItems.forEach((item) => {
        if (item !== clickedCategory) {
          item.classList.remove("active");
        }
      });

      clickedCategory.classList.add("active");
    }
  });

  searchPanel.addEventListener("click", async (event) => {
    const input = <HTMLInputElement>searchPanel.querySelector(".search-input");
    const target = <HTMLButtonElement>event.target;
    if (target.classList.contains("search-button")) {
      const response = await getProducts({ "text.ru": `${input.value}` });
      renderCatalogContent(response, catalogMain);
    }
  });

  sidePanel.append(filterWrapper, categories);
  catalogWrapper.append(sidePanel, catalogMain);
  catalog.append(searchPanel, catalogWrapper);

  return catalog;
}

function renderSearchPanel() {
  const searchPanel = createElement({ tagName: "div", classNames: ["search-panel"] });
  const searchPanelInner = createElement({ tagName: "div", classNames: ["search-panel__inner"] });
  const input = createElement({ tagName: "input", classNames: ["search-input"], attributes: { placeholder: "Введите слово..." } });
  const button = createElement({ tagName: "button", classNames: ["search-button"], textContent: "Поиск" });
  searchPanelInner.append(input, button);
  searchPanel.append(searchPanelInner);
  return searchPanel;
}

async function renderCatalogByCategory(id: string, catalogWrapper: HTMLUListElement) {
  const response = await getProducts({ "filter.query": `categories.id:"${id}"` });
  renderCatalogContent(response, catalogWrapper);
}

async function renderCategories() {
  const response = await getCategories();
  const categoriesWrapper = createElement({ tagName: "div", classNames: ["categories-wrapper"] });
  const subCategories = createElement({ tagName: "div", classNames: ["subcategories-wrapper"] });
  const catalogCategory = createElement({ tagName: "div", classNames: ["catalog-caregory", "menu-category__item"], textContent: "Каталог" });
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
    const parentCategoryElement = createElement({ tagName: "span", classNames: ["menu-category__item", "menu-category", "category-parent"] });
    parentCategoryElement.textContent = categoryData.parent.name.ru;
    parentCategoryElement.setAttribute("data-id", `${categoryData.parent.id}`);
    categoryWrapper.append(parentCategoryElement);
    const childrenContainer = createElement({ tagName: "div", classNames: ["child-categories-wrapper"] });

    categoryData.children.forEach((childCategory) => {
      const childCategoryElement = createElement({ tagName: "span", classNames: ["menu-category__item", "menu-category", "category-child"] });
      childCategoryElement.textContent = childCategory.name.ru;
      childCategoryElement.setAttribute("data-id", `${childCategory.id}`);
      childrenContainer.append(childCategoryElement);
    });

    categoryWrapper.append(childrenContainer);
    subCategories.append(categoryWrapper);
  });
  categoriesWrapper.append(catalogCategory, subCategories);
  return categoriesWrapper;
}

function renderCatalogContent(response: ClientResponse<ProductProjectionPagedQueryResponse> | undefined, catalogWrapper: HTMLUListElement) {
  catalogWrapper.innerHTML = "";
  const items = response?.body.results;
  items?.forEach((item) => {
    const card = createCard(item);
    catalogWrapper.append(card);
  });
}
