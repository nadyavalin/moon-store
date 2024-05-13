import { arrowLeft, arrowRight } from "src/components/svg";
import { createElement, createImage, createSvgElement } from "../../components/elements";
import { main } from "../basePage/basePage";

export function renderMainPageContent() {
  const discountPhotos = [
    "../../public/img/discount-1.png",
    "../../public/img/discount-2.png",
    "../../public/img/discount-3.png",
    "../../public/img/discount-4.png",
    "../../public/img/discount-5.png",
  ];

  const container = createElement("div", ["slider-wrapper"]);
  const carousel = createElement("ul", ["slider-wrapper__carousel"]);
  const arrowLeftElement = createSvgElement(arrowLeft, "card__arrow");
  const arrowRightElement = createSvgElement(arrowRight, "card__arrow");

  discountPhotos.forEach((photo) => {
    const cardWrapper = createElement("li", ["card-wrapper"]);
    const card = createElement("div", ["card"]);
    const cardImage = createImage(photo, "Photo", ["card__img"]);
    const cardTextWrapper = createElement("div", ["card__text-wrapper"]);
    const cardTitle = createElement("h2", ["card__title"], "Название");
    const cardPrice = createElement("p", ["card__price"], "Цена");
    const cardDiscount = createElement("p", ["card__discount"], "Скидка");
    cardTextWrapper.append(cardTitle, cardPrice, cardDiscount);
    card.append(cardImage, cardTextWrapper);
    cardWrapper.append(card);
    carousel.append(cardWrapper);
  });

  container.append(arrowLeftElement, carousel, arrowRightElement);
  main.append(container);

  // let isDragging = false;

  const dragStart = () => {
    // isDragging = true;
    carousel.classList.add("dragging");
  };

  // const dragging = (e: DragEvent) => {
  //   if(!isDragging) return;
  //   carousel.scrollLeft = e.pageX;
  // };

  carousel.addEventListener("mousedown", dragStart);
  // carousel.addEventListener("mousemove", dragging());
  return container;
}

export default renderMainPageContent;
