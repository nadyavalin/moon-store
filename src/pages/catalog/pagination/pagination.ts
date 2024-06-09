import "./pagination.css";
import { createElement, createSvgElement } from "../../../components/elements";
import { arrowLeft, arrowRight } from "../../../components/svg";

export function createPagination(totalProducts: number | undefined) {
  const paginationWrapper = createElement({ tagName: "div", classNames: ["pagination-wrapper"] });
  const paginationButtonLeft = createSvgElement(arrowLeft, "pagination__arrow", {
    width: "24px",
    height: "24px",
    viewBox: "0 0 24 24",
    fill: "none",
  });
  const paginationButtonRight = createSvgElement(arrowRight, "pagination__arrow", {
    width: "24px",
    height: "24px",
    viewBox: "0 0 24 24",
    fill: "none",
  });
  const paginationNumbersWrapper = createElement({ tagName: "div", classNames: ["pagination-numbers-wrapper"] });

  const productsPerPage = 8;
  if (totalProducts) {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    console.log(totalProducts);
    console.log(totalPages);

    for (let i = 1; i <= totalPages; i++) {
      const paginationNumber = createElement({ tagName: "p", classNames: ["pagination-numbers"], textContent: i.toString() });
      console.log(paginationNumber);
      paginationNumbersWrapper.append(paginationNumber);
    }
  }

  paginationWrapper.append(paginationButtonLeft, paginationNumbersWrapper, paginationButtonRight);
  return paginationWrapper;
}
