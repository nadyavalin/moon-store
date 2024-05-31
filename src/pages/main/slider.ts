import "./slider.css";
import { createCard } from "../../components/productCard";
import { arrowLeft, arrowRight } from "../../components/svg";
import { createElement, createSvgElement } from "../../components/elements";
import { ClientResponse, ProductProjectionPagedQueryResponse } from "@commercetools/platform-sdk";
import { cycleSlider, dragSlider } from "../../components/slider";

export function createSlider(response: ClientResponse<ProductProjectionPagedQueryResponse> | undefined) {
  const sliderWrapper = createElement({ tagName: "div", classNames: ["slider__wrapper"] });
  const carousel = createElement({ tagName: "ul", classNames: ["slider__carousel"] });

  const items = response?.body.results;
  items?.forEach((item) => {
    const card = createCard(item);
    carousel.append(card);
  });

  const arrowLeftElement = createSvgElement(arrowLeft, "card__arrow");
  const arrowRightElement = createSvgElement(arrowRight, "card__arrow");
  arrowLeftElement.id = "left";
  arrowRightElement.id = "right";

  function moveSlider(direction = "right") {
    const cardImg = carousel.querySelector(".card__img") as HTMLElement;
    if (cardImg) {
      const firstCardWidth = cardImg.offsetWidth;
      if (direction === "left") {
        carousel.scrollLeft += -firstCardWidth;
      } else {
        carousel.scrollLeft += firstCardWidth;
      }
    }
  }

  let autoPlayInterval: NodeJS.Timeout;
  let waitTimeout: NodeJS.Timeout;

  const autoPlay = () => {
    if (window.innerWidth < 800) return;

    autoPlayInterval = setInterval(() => {
      moveSlider();
    }, 3000);
  };
  sliderWrapper.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("card__arrow") || target.closest(".card__arrow")) {
      const direction = target.id;
      moveSlider(direction);

      clearInterval(autoPlayInterval);
      clearTimeout(waitTimeout);
      waitTimeout = setTimeout(() => {
        autoPlay();
      }, 5000);
    }
  });

  autoPlay();

  sliderWrapper.append(arrowLeftElement, carousel, arrowRightElement);

  cycleSlider(carousel, "card__img");
  dragSlider(carousel);

  return sliderWrapper;
}
