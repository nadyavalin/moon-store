import "./catalog.css";
import { createElement } from "../../components/elements";
import { getCategories, getProducts, searchProducts } from "../../api/api";
import { CategoryData } from "../../types/types";
import { getProductsByCategory } from "../../api/api";
import { ClientResponse, ProductProjectionPagedQueryResponse, Category } from "@commercetools/platform-sdk";
import createCard from "../../components/productCard";

export async function renderProductsFromApi() {
  const response = await getProducts();

  const catalog = createElement({ tagName: "section", classNames: ["catalog"] });
  const catalogWrapper = createElement({ tagName: "ul", classNames: ["catalog-wrapper"] });
  const sidePanel = createElement({ tagName: "div", classNames: ["catalog-side"] });
  renderCatalogContent(response, catalogWrapper);
  const searchField = renderSearchField();
  const categories = await renderCategories();

  categories.addEventListener("click", async (event) => {
    const target = <HTMLElement>event.target;
    if (target.classList.contains("menu-category")) {
      const id = target.getAttribute("data-id") as string;
      await renderCatalogByCategory(id, catalogWrapper);
    }
    if (target.classList.contains("catalog-caregory")) {
      renderCatalogContent(response, catalogWrapper);
    }
    if (target.classList.contains("menu-category__item")) {
      const clickedCategory = target as HTMLElement;
      const allCategoryItems = Array.from(categories.querySelectorAll(".menu-category__item")) as HTMLElement[];
      allCategoryItems.forEach((item) => {
        if (item !== clickedCategory) {
          item.classList.remove("active");
        }
      });

      clickedCategory.classList.toggle("active");
    }
  });

  searchField.addEventListener("click", async (event) => {
    const input = <HTMLInputElement>searchField.querySelector(".side-input");
    const target = <HTMLButtonElement>event.target;
    if (target.classList.contains("side-button")) {
      const response = await searchProducts(input.value);
      renderCatalogContent(response, catalogWrapper);
    }
  });

  sidePanel.append(searchField, categories);
  catalog.append(sidePanel, catalogWrapper);
  return catalog;
}

function renderSearchField() {
  const sidePanelWrapper = createElement({ tagName: "div", classNames: ["catalog-side__wrapper"] });
  const input = createElement({ tagName: "input", classNames: ["side-input"], attributes: { placeholder: "Введите слово..." } });
  const button = createElement({ tagName: "button", classNames: ["side-button"], textContent: "Поиск" });
  sidePanelWrapper.append(input, button);
  return sidePanelWrapper;
}

async function renderCatalogByCategory(id: string, catalogWrapper: HTMLUListElement) {
  const response = await getProductsByCategory(id);
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
