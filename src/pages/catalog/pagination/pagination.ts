import "./pagination.css";
import { createElement, createSvgElement } from "../../../components/elements";
import { arrowLeft, arrowRight } from "../../../components/svg";
import { productsPerPage } from "./constants";
import { catalogQueryArgs } from "../catalog";

export function createPagination(totalProducts: number | undefined, onPageClick: (pageNumber: number) => void) {
  if (!totalProducts) {
    return null;
  }

  const paginationWrapper = createElement({ tagName: "div", classNames: ["pagination"] });
  const paginationButtonLeft = createSvgElement(arrowLeft, "pagination__arrow", {
    width: "24px",
    height: "24px",
    viewBox: "0 0 24 24",
    fill: "none",
  });
  paginationButtonLeft.setAttribute("data-direction", "left");

  const paginationButtonRight = createSvgElement(arrowRight, "pagination__arrow", {
    width: "24px",
    height: "24px",
    viewBox: "0 0 24 24",
    fill: "none",
  });
  paginationButtonRight.setAttribute("data-direction", "right");

  const paginationNumbersWrapper = createElement({ tagName: "ul", classNames: ["pagination__items"] });

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const paginationNumber = createElement({ tagName: "li", classNames: ["pagination__item"], textContent: i.toString() });
    paginationNumber.dataset.index = i.toString();
    if (i === 1) {
      paginationNumber.classList.add("pagination__item_active");
      paginationButtonLeft.classList.add("pagination__arrow_disabled");
    }
    if (totalPages === 1) {
      paginationButtonRight.classList.add("pagination__arrow_disabled");
    }
    paginationNumbersWrapper.append(paginationNumber);
  }

  const paginationState = {
    currentPage: 1,
  };

  function updatePagination() {
    const paginationItems = paginationNumbersWrapper.querySelectorAll(".pagination__item") as NodeListOf<HTMLLIElement>;
    onPageClick(catalogQueryArgs.pageNumber as number);
    paginationState.currentPage = catalogQueryArgs.pageNumber as number;
    paginationItems.forEach((element) => {
      element.classList.toggle("pagination__item_active", Number(element.dataset.index) === catalogQueryArgs.pageNumber);
    });
    paginationButtonLeft.classList.toggle("pagination__arrow_disabled", catalogQueryArgs.pageNumber === 1);
    paginationButtonRight.classList.toggle("pagination__arrow_disabled", catalogQueryArgs.pageNumber === totalPages);
  }

  paginationWrapper.addEventListener("click", async (event) => {
    const target = <HTMLDivElement>event.target;
    if (target.classList.contains("pagination__item")) {
      catalogQueryArgs.pageNumber = Number(target.dataset.index);
      updatePagination();
    } else if (target.classList.contains("pagination__arrow")) {
      catalogQueryArgs.pageNumber = paginationState.currentPage - (target.dataset.direction === "left" ? 1 : -1);
      updatePagination();
    }
  });

  paginationWrapper.append(paginationButtonLeft, paginationNumbersWrapper, paginationButtonRight);
  return paginationWrapper;
}
