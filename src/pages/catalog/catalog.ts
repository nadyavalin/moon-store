import "./catalog.css";
import { createElement } from "../../components/elements";
import { getCategories, getProducts } from "../../api/api";
import { CategoryData } from "../../types/types";
import { getProductsByCategory } from "../../api/api";
import { ClientResponse, ProductProjectionPagedQueryResponse, Category } from "@commercetools/platform-sdk";
import createCard from "../../components/productCard";

export async function renderProductsFromApi() {
  const response = await getProducts();

  const catalog = createElement({ tagName: "section", classNames: ["catalog"] });
  const catalogWrapper = createElement({ tagName: "ul", classNames: ["catalog-wrapper"] });
  renderCatalogContent(response, catalogWrapper);

  const categoriesWrapper = await renderCategories();

  categoriesWrapper.addEventListener("click", async (event) => {
    const target = <HTMLElement>event.target;
    if (target.classList.contains("menu-category")) {
      const id = target.getAttribute("data-id") as string;
      await renderCatalogByCategory(id, catalogWrapper);

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

  catalog.append(categoriesWrapper, catalogWrapper);
  return catalog;
}

async function renderCatalogByCategory(id: string, catalogWrapper: HTMLUListElement) {
  const response = await getProductsByCategory(id);
  renderCatalogContent(response, catalogWrapper);
  return catalogWrapper;
}

async function renderCategories() {
  const response = await getCategories();
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
