import "./pagination.css";
import { createElement, createSvgElement } from "../../../components/elements";
import { arrowLeft, arrowRight } from "../../../components/svg";
import { productsPerPage } from "./constants";
import { catalogQueryArgs } from "../catalog";

export function createPagination(onPageClick: () => void, totalProducts?: number) {
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
    if (i === catalogQueryArgs.pageNumber) {
      paginationNumber.classList.toggle("pagination__item_active", Number(paginationNumber.dataset.index) === catalogQueryArgs.pageNumber);
    }
    paginationNumbersWrapper.append(paginationNumber);
  }

  paginationButtonLeft.classList.toggle("pagination__arrow_disabled", catalogQueryArgs.pageNumber === 1);
  paginationButtonRight.classList.toggle("pagination__arrow_disabled", catalogQueryArgs.pageNumber === totalPages);

  paginationWrapper.addEventListener("click", async (event) => {
    const target = <HTMLDivElement>event.target;
    if (target.classList.contains("pagination__item")) {
      catalogQueryArgs.pageNumber = Number(target.dataset.index);
      onPageClick();
    } else if (target.classList.contains("pagination__arrow")) {
      catalogQueryArgs.pageNumber = catalogQueryArgs.pageNumber - (target.dataset.direction === "left" ? 1 : -1);
      onPageClick();
    }
  });

  paginationWrapper.append(paginationButtonLeft, paginationNumbersWrapper, paginationButtonRight);
  return paginationWrapper;
}
