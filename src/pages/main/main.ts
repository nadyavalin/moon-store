import { arrowLeft, arrowRight } from "src/components/svg";
import { createButton, createElement, createImage, createSvgElement } from "../../components/elements";
import { main } from "../basePage/basePage";

const discountPhotos = [
  "../../public/img/discount-1.png",
  "../../public/img/discount-2.png",
  "../../public/img/discount-3.png",
  "../../public/img/discount-4.png",
  "../../public/img/discount-5.png",
];
const container = createElement("div", ["slider__wrapper"]);
const carousel = createElement("ul", ["slider__carousel"]);
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

const autoPlay = () => {
  if (window.innerWidth < 800) return;

  autoPlayInterval = setInterval(() => {
    moveSlider();
  }, 3000);
};

const stopAutoPlay = () => {
  clearInterval(autoPlayInterval);
};

container.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains("card__arrow") || target.closest(".card__arrow")) {
    const direction = target.id;
    moveSlider(direction);
    stopAutoPlay();
    setTimeout(() => {
      stopAutoPlay();
      autoPlay();
    }, 7000);
  }
});

autoPlay();

function cycleSlider() {
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
    const carouselElemnt = carousel;
    if (carousel.scrollLeft === 0) {
      carousel.classList.add("no-transition");
      carouselElemnt.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
      carousel.classList.add("no-transition");
      carouselElemnt.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    }
  };

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  carousel.addEventListener("scroll", infiniteScroll);
}

function createCard(photo: string, title: string, price: string, discount: string) {
  const cardWrapper = createElement("li", ["card__wrapper"]);
  const card = createElement("div", ["card"]);
  const cardImage = createImage(photo, "Photo", ["card__img"]);
  cardImage.setAttribute("draggable", "false");
  const cardBottom = createElement("div", ["card__bottom-wrapper"]);
  const cardTextWrapper = createElement("div", ["card__text-wrapper"]);
  const cardTitle = createElement("h3", ["card__title"], title);
  const cardPrice = createElement("p", ["card__price"], price);
  const cardDiscount = createElement("p", ["card__discount"], discount);
  const buyButton = createButton(["card__button"], "Купить");
  cardTextWrapper.append(cardTitle, cardPrice, cardDiscount);
  cardBottom.append(cardTextWrapper, buyButton);
  card.append(cardImage, cardBottom);
  cardWrapper.append(card);
  carousel.append(cardWrapper);
}

export function renderMainPageContent() {
  createCard(discountPhotos[0], "Космический хаос", "2500 р.", "1000 р.");
  createCard(discountPhotos[1], "Чужой", "1000 р.", "500 р.");
  createCard(discountPhotos[2], "Космонафт", "2000 р.", "1000 р.");
  createCard(discountPhotos[3], "Венера", "1800 р.", "800 р.");
  createCard(discountPhotos[4], "Пришельцы", "2500 р.", "1000 р.");
  cycleSlider();
  dragSlider();

  container.append(arrowLeftElement, carousel, arrowRightElement);
  main.append(container);
  return container;
}

export default renderMainPageContent;
