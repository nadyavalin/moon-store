import "./modal.css";
import { createElement, createSvgElement } from "../../../components/elements";
import { createSlider } from "../../../components/slider/slider";
import { cross } from "../../../components/svg";
import { createSliderImages } from "../product";
import { ClientResponse, ProductProjectionPagedSearchResponse } from "@commercetools/platform-sdk";

export function createModalImage(scrollToSlideIndex?: number, response?: ClientResponse<ProductProjectionPagedSearchResponse>) {
  const modalBack = createElement({ tagName: "div", classNames: ["modal-back"] });
  const modal = createElement({ tagName: "div", classNames: ["modal"] });
  const closeButton = createSvgElement(cross, "cross", { width: "22px", height: "22px", viewBox: "0 0 19 19", fill: "none" });

  const modalSlider = createSlider({
    className: "modal-slider",
    isAutoPlay: false,
    response,
    scrollToSlideIndex,
    createSlides: createSliderImages,
  });

  modal.append(modalSlider, closeButton);
  modalBack.append(modal);

  closeButton.addEventListener("click", () => {
    modalBack.remove();
  });

  return modalBack;
}
