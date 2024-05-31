import "./modal.css";
import { createElement, createSvgElement } from "../../../components/elements";
import { getProductDataWithSlug } from "../../../api/api";
import { cross } from "../../../components/svg";

export async function createModalImage(slug: string) {
  const response = await getProductDataWithSlug(slug);
  const images = response?.body.results[0].masterVariant.images;
  const modalBack = createElement({ tagName: "div", classNames: ["modal-back", "hidden"] });
  const modal = createElement({ tagName: "div", classNames: ["modal"] });
  const closeButton = createElement({ tagName: "div", classNames: ["close-button"] });
  const crossSvg = createSvgElement(cross, "cross");
  const bigImageWrapper = createElement({ tagName: "div", classNames: ["big-image__wrapper"] });
  images?.forEach((img) => {
    const bitImage = createElement({ tagName: "img", classNames: ["product__img_big"], attributes: { src: `${img.url}`, alt: "" } });
    bigImageWrapper.append(bitImage);
  });
  closeButton.append(crossSvg, bigImageWrapper);
  modal.append(closeButton);
  modalBack.append(modal);

  crossSvg.addEventListener("click", () => {
    modalBack.classList.add("hidden");
  });
  return modalBack;
}
