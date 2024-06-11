import "./pagination.css";
import { createElement, createSvgElement } from "../../../components/elements";
import { arrowLeft, arrowRight } from "../../../components/svg";
import { productsPerPage } from "./constants";

export function createPagination(totalProducts: number | undefined, onPageClick: (pageNumber: number) => void) {
  const paginationWrapper = createElement({ tagName: "div", classNames: ["pagination"] });
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
  const paginationNumbersWrapper = createElement({ tagName: "ul", classNames: ["pagination__numbers"] });

  if (totalProducts) {
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      const paginationNumber = createElement({ tagName: "li", classNames: ["pagination__number"], textContent: i.toString() });
      paginationNumber.dataset.index = i.toString();
      if (i === 1) {
        paginationNumber.classList.add("active");
      }
      paginationNumbersWrapper.append(paginationNumber);
    }
  }

  paginationNumbersWrapper.addEventListener("click", async (event) => {
    const target = <HTMLUListElement>event.target;
    if (target.classList.contains("pagination__number")) {
      const pageNumber = Number(target.dataset.index);
      onPageClick(pageNumber);

      const activeButton = paginationNumbersWrapper.querySelector(".pagination-numbers.active");
      if (activeButton) {
        activeButton.classList.remove("active");
      }
      target.classList.add("active");
    }
  });

  paginationWrapper.append(paginationButtonLeft, paginationNumbersWrapper, paginationButtonRight);
  return paginationWrapper;
}
