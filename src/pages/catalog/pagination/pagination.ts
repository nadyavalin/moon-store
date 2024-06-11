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
  const paginationNumbersWrapper = createElement({ tagName: "ul", classNames: ["pagination__items"] });

  if (totalProducts) {
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      const paginationNumber = createElement({ tagName: "li", classNames: ["pagination__item"], textContent: i.toString() });
      paginationNumber.dataset.index = i.toString();
      if (i === 1) {
        paginationNumber.classList.add("pagination__item_active");
      }
      paginationNumbersWrapper.append(paginationNumber);
    }
  }

  const paginationState = {
    currentPage: 1,
  };

  paginationWrapper.addEventListener("click", async (event) => {
    const target = <HTMLDivElement>event.target;
    const paginationItems = paginationNumbersWrapper.querySelectorAll(".pagination__item") as NodeListOf<HTMLLIElement>;

    if (target.classList.contains("pagination__item")) {
      const pageNumber = Number(target.dataset.index);
      paginationState.currentPage = pageNumber;
      onPageClick(pageNumber);

      paginationItems.forEach((element) => {
        if (Number(element.dataset.index) === paginationState.currentPage) {
          element.classList.add("pagination__item_active");
        } else {
          element.classList.remove("pagination__item_active");
        }
      });
    } else if (target.classList.contains("pagination__arrow")) {
      // TODO
    }
  });

  paginationWrapper.append(paginationButtonLeft, paginationNumbersWrapper, paginationButtonRight);
  return paginationWrapper;
}
