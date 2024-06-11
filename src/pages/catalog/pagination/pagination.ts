import "./pagination.css";
import { createElement, createSvgElement } from "../../../components/elements";
import { arrowLeft, arrowRight } from "../../../components/svg";
import { productsPerPage } from "./constants";

export function createPagination(totalProducts?: number, offset?: number, activePage?: number) {
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
  const paginationNumbersWrapper = createElement({ tagName: "ul", classNames: ["pagination-numbers-wrapper"] });

  if (totalProducts) {
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      const paginationNumber = createElement({ tagName: "li", classNames: ["pagination-numbers"], textContent: i.toString() });
      paginationNumber.dataset.index = i.toString();
      if (i === activePage || (!activePage && i === 1)) {
        paginationNumber.classList.add("active");
      }
      paginationNumbersWrapper.append(paginationNumber);
    }
  }

  paginationNumbersWrapper.addEventListener("click", (event) => {
    const target = event.target as HTMLLIElement;
    if (target?.classList.contains("pagination-numbers")) {
      const index = target.dataset.index ? parseInt(target.dataset.index) : 1;
      offset = productsPerPage * (index - 1);
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
