import { arrowLeft, arrowRight } from "src/components/svg";
import { createElement, createImage, createSvgElement } from "../../components/elements";
import { main } from "../basePage/basePage";

const discountPhotos = [
  "../../public/img/discount-1.png",
  "../../public/img/discount-2.png",
  "../../public/img/discount-3.png",
  "../../public/img/discount-4.png",
  "../../public/img/discount-5.png",
];
const arrowLeftElement = createSvgElement(arrowLeft, "card__arrow");
const arrowRightElement = createSvgElement(arrowRight, "card__arrow");
arrowLeftElement.id = "left";
arrowRightElement.id = "right";

function useArrowButtons(container: HTMLElement, carousel: HTMLElement) {
  const carouselElement = carousel;

  container.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("card__arrow")) {
      const firstCardWidth = parseInt(carousel.dataset.firstCardWidth || "0", 10);
      const scrollAmount = target.id === "left" ? -firstCardWidth : firstCardWidth;
      carouselElement.scrollLeft += scrollAmount;
    }
  });

  // TODO
  // сейчас баг - стелки работают тоолько после первого клика по карточке
  // этот листенер не нужен
  // при клике на стрелку нужно искать элемент карусели и смотреть на его ширину, так сегда будет актуальная ширина
  carouselElement.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("card__img")) {
      console.log(carouselElement.dataset.firstCardWidth);
      carouselElement.dataset.firstCardWidth = String(target.offsetWidth);
    }
  });

  // cycle slider
  const firstCardWidth = parseInt(carousel.dataset.firstCardWidth || "0", 10);
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

function dragSlider(carousel: HTMLElement) {
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
    const carouselElement = carousel as HTMLElement;
    carouselElement.scrollLeft = startScrollLeft - (e.pageX - startX);
  };

  const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
  };

  const infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
      console.log("You've reached to the end");
    }
  };

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  carousel.addEventListener("scroll", infiniteScroll);
}

export function renderMainPageContent() {
  const container = createElement("div", ["slider__wrapper"]);
  const carousel = createElement("ul", ["slider__carousel"]);
  discountPhotos.forEach((photo) => {
    const cardWrapper = createElement("li", ["card__wrapper"]);
    const card = createElement("div", ["card"]);
    const cardImage = createImage(photo, "Photo", ["card__img"]);
    cardImage.setAttribute("draggable", "false");
    const cardTextWrapper = createElement("div", ["card__text-wrapper"]);
    const cardTitle = createElement("h2", ["card__title"], "Название");
    const cardPrice = createElement("p", ["card__price"], "Цена");
    const cardDiscount = createElement("p", ["card__discount"], "Скидка");
    cardTextWrapper.append(cardTitle, cardPrice, cardDiscount);
    card.append(cardImage, cardTextWrapper);
    cardWrapper.append(card);
    carousel.append(cardWrapper);
  });

  useArrowButtons(container, carousel);
  dragSlider(carousel);

  container.append(arrowLeftElement, carousel, arrowRightElement);
  main.append(container);
  return container;
}

export default renderMainPageContent;
