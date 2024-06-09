import "./pagination.css";
import { createElement, createSvgElement } from "../../../components/elements";
import { arrowLeft, arrowRight } from "../../../components/svg";
import { getProducts } from "../../../api/api";

export async function createPagination() {
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

  // const response = await getProducts({ queryArgs: { limit: 50 } });
  // const totalProducts = response?.total;

  const paginationNumbers = createElement({ tagName: "p", classNames: ["pagination-numbers"], textContent: "1" });

  paginationNumbersWrapper.append(paginationNumbers);
  paginationWrapper.append(paginationButtonLeft, paginationNumbersWrapper, paginationButtonRight);
  return paginationWrapper;
}
