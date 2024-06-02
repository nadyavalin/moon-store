import "./slider.css";
import { arrowLeft, arrowRight } from "../svg";
import { createElement, createSvgElement } from "../elements";
import { SliderProps } from "../../types/types";

export function createSlider({ response, isAutoPlay = false, isDraggable = false, className, createSlides, onSlideClick }: SliderProps) {
  const sliderWrapper = createElement({ tagName: "div", classNames: ["slider__wrapper", className] });
  const carousel = createElement({ tagName: "ul", classNames: ["slider__carousel"] });

  const items = response?.body.results;
  carousel.append(...createSlides(items || []));

  const arrowLeftElement = createSvgElement(arrowLeft, "card__arrow");
  const arrowRightElement = createSvgElement(arrowRight, "card__arrow");
  arrowLeftElement.id = "left";
  arrowRightElement.id = "right";
  arrowLeftElement.classList.toggle("disabled", carousel.childElementCount === 1);
  arrowRightElement.classList.toggle("disabled", carousel.childElementCount === 1);

  function moveSlider(direction = "right") {
    const cardImg = carousel.querySelector(".slide__img") as HTMLElement;
    if (cardImg) {
      const firstCardWidth = cardImg.offsetWidth;
      console.log(firstCardWidth);
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

      if (isAutoPlay) {
        clearInterval(autoPlayInterval);
        clearTimeout(waitTimeout);
        waitTimeout = setTimeout(() => {
          autoPlay();
        }, 5000);
      }
    }

    if (target.classList.contains("slide__img") || target.closest(".slide__img")) {
      onSlideClick?.();
    }
  });

  if (isAutoPlay) {
    autoPlay();
  }

  function cycleSlider() {
    const cardImg = carousel.querySelector(".slide__img") as HTMLElement;
    if (cardImg) {
      const firstCardWidth = cardImg.offsetWidth;
      const cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
      const carouselChildren = Array.from(carousel.children);

      const timesToAdd = 50;
      for (let i = 0; i < timesToAdd; i++) {
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

  sliderWrapper.append(arrowLeftElement, carousel, arrowRightElement);

  cycleSlider();
  if (isDraggable) {
    dragSlider();
  }

  return sliderWrapper;
}
