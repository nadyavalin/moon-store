import { arrowLeft, arrowRight } from "src/components/svg";
import { CardData } from "src/types/types";
import { priceFormatter } from "src/utils/utils";
import { createElement, createSvgElement } from "../../components/elements";
import { main } from "../basePage/basePage";

const discountPhotos = [
  "../../public/img/discount-1.png",
  "../../public/img/discount-2.png",
  "../../public/img/discount-3.png",
  "../../public/img/discount-4.png",
  "../../public/img/discount-5.png",
];
const container = createElement({ tagName: "div", classNames: ["slider__wrapper"] });
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

container.addEventListener("click", (event) => {
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

function createCard(cardData: CardData) {
  const { image, name, description, price, discount } = cardData;
  const cardWrapper = createElement({ tagName: "li", classNames: ["card__wrapper"] });
  const card = createElement({ tagName: "div", classNames: ["card"] });
  const cardImage = createElement({ tagName: "img", classNames: ["card__img"], attributes: { src: image, alt: "Photo" } });
  cardImage.setAttribute("draggable", "false");
  const cardBottom = createElement({ tagName: "div", classNames: ["card__bottom-wrapper"] });
  const cardTextWrapper = createElement({ tagName: "div", classNames: ["card__text-wrapper"] });
  const cardname = createElement({ tagName: "h3", classNames: ["card__name"], textContent: name });
  const cardDescription = createElement({ tagName: "div", classNames: ["card__description"], textContent: description });
  const cardPrices = createElement({ tagName: "div", classNames: ["card__prices"] });
  const cardPrice = createElement({ tagName: "p", classNames: ["card__price"], textContent: priceFormatter.format(price) });
  const cardDiscount = createElement({ tagName: "p", classNames: ["card__discount"], textContent: priceFormatter.format(discount) });
  const cardButton = createElement({ tagName: "button", classNames: ["card__button"], textContent: "Добавить в корзину" });
  cardPrices.append(cardPrice, cardDiscount);
  cardTextWrapper.append(cardname, cardDescription, cardPrices);
  cardBottom.append(cardTextWrapper, cardButton);
  card.append(cardImage, cardBottom);
  cardWrapper.append(card);
  carousel.append(cardWrapper);
}

export function renderMainPageContent() {
  const cardsData: CardData[] = [
    {
      image: discountPhotos[0],
      name: 'Футболки "Огонь и пламя"',
      description: "Футболки с космическим принтом. Плотная хлопковая ткань. Принт не выцветает, не линяет",
      price: 2500,
      discount: 1000,
    },
    {
      image: discountPhotos[1],
      name: 'Футболки "Чужой"',
      description: "Футболки с космическим принтом. Плотная хлопковая ткань. Принт не выцветает, не линяет",
      price: 1000,
      discount: 500,
    },
    {
      image: discountPhotos[2],
      name: 'Футболки "Космонавт"',
      description: "Футболки с космическим принтом. Плотная хлопковая ткань. Принт не выцветает, не линяет",
      price: 2000,
      discount: 1000,
    },
    {
      image: discountPhotos[3],
      name: 'Футболки "Венера"',
      description: "Футболки с космическим принтом. Плотная хлопковая ткань. Принт не выцветает, не линяет",
      price: 1800,
      discount: 800,
    },
    {
      image: discountPhotos[4],
      name: 'Футболки "Пришельцы"',
      description: "Футболки с космическим принтом. Плотная хлопковая ткань. Принт не выцветает, не линяет",
      price: 2500,
      discount: 1000,
    },
  ];

  cardsData.forEach((cardData) => {
    createCard(cardData);
  });

  cycleSlider();
  dragSlider();

  container.append(arrowLeftElement, carousel, arrowRightElement);
  main.append(container);
  return container;
}

export default renderMainPageContent;
