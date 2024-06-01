import "./modal.css";
import { createElement, createSvgElement } from "../../../components/elements";
import { createSlider } from "../../../components/slider/slider";
import { cross } from "../../../components/svg";
import { createSliderImages } from "../product";
import { ClientResponse, ProductProjectionPagedSearchResponse } from "@commercetools/platform-sdk";

export function createModalImage(response?: ClientResponse<ProductProjectionPagedSearchResponse>) {
  const modalBack = createElement({ tagName: "div", classNames: ["modal-back"] });
  const modal = createElement({ tagName: "div", classNames: ["modal"] });
  const closeButton = createElement({ tagName: "div", classNames: ["close-button"] });
  const crossSvg = createSvgElement(cross, "cross");

  const modalSlider = createSlider({
    className: "modal-slider",
    isAutoPlay: false,
    response,
    createSlides: createSliderImages,
  });

  closeButton.append(crossSvg);
  modal.append(modalSlider, closeButton);
  modalBack.append(modal);

  closeButton.addEventListener("click", () => {
    modalBack.remove();
  });

  return modalBack;
}
