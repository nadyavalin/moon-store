import "./slider.css";

import { getProducts } from "../../api/api";
import { SnackbarType } from "../../types/types";
import { createCard } from "../../components/productCard";
import { arrowLeft, arrowRight } from "../../components/svg";
import { createElement, createSnackbar, createSvgElement } from "../../components/elements";
import { ClientResponse, ProductProjectionPagedQueryResponse } from "@commercetools/platform-sdk";

export const sliderWrapper = createElement({ tagName: "div", classNames: ["slider__wrapper"] });
const carousel = createElement({ tagName: "ul", classNames: ["slider__carousel"] });
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

function cycleSlider() {
  const cardImg = carousel.querySelector(".card__img") as HTMLElement;
  if (cardImg) {
    const firstCardWidth = cardImg.offsetWidth;
    const cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
    const carouselChildren = Array.from(carousel.children);

    carouselChildren
      .slice(-cardPerView)
      .reverse()
      .forEach((card) => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
      });

    carouselChildren.slice(0, cardPerView).forEach((card) => {
      carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });
  }
}

function dragSlider() {
  let isDragging = false;
  let startX: number;
  let startScrollLeft: number;

  const dragStart = (e: MouseEvent) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e: MouseEvent) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
  };

  const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
  };

  const infiniteScroll = () => {
    const carouselElement = carousel;
    if (carousel.scrollLeft === 0) {
      carousel.classList.add("no-transition");
      carouselElement.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
      carousel.classList.add("no-transition");
      carouselElement.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    }
  };

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  carousel.addEventListener("scroll", infiniteScroll);
}

export function renderProductsForSliderFromApi() {
  getProducts()?.then((response) => {
    if (response.statusCode === 200) {
      const sliderCards = carousel.querySelectorAll(".card");
      if (sliderCards) {
        sliderCards.forEach((item) => item.remove());
      }
      renderCardsForSlider(response);
    } else {
      createSnackbar(SnackbarType.error, "Что-то пошло не так... Повторите попытку позже.");
    }
  });
}

function renderCardsForSlider(response: ClientResponse<ProductProjectionPagedQueryResponse>) {
  const items = response.body.results;
  items.forEach((item) => {
    const card = createCard(item);
    carousel.append(card);
  });
}

sliderWrapper.append(arrowLeftElement, carousel, arrowRightElement);

cycleSlider();
dragSlider();
