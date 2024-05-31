export function moveSlider(line: HTMLElement, className: string, direction: string) {
  const cardImg = line.querySelector(className) as HTMLElement;
  if (cardImg) {
    const firstCardWidth = cardImg.offsetWidth;
    if (direction === "left") {
      line.scrollLeft += -firstCardWidth;
    } else {
      line.scrollLeft += firstCardWidth;
    }
  }
}

export function cycleSlider(line: HTMLElement, className: string) {
  const cardImg = line.querySelector(className) as HTMLElement;
  if (cardImg) {
    const firstCardWidth = cardImg.offsetWidth;
    const cardPerView = Math.round(line.offsetWidth / firstCardWidth);
    const carouselChildren = Array.from(line.children);

    const timesToAdd = 50;
    for (let i = 0; i < timesToAdd; i++) {
      carouselChildren
        .slice(-cardPerView)
        .reverse()
        .forEach((card) => {
          line.insertAdjacentHTML("afterbegin", card.outerHTML);
        });

      carouselChildren.slice(0, cardPerView).forEach((card) => {
        line.insertAdjacentHTML("beforeend", card.outerHTML);
      });
    }
  }
}

export function dragSlider(line: HTMLElement) {
  let isDragging = false;
  let startX: number;
  let startScrollLeft: number;

  const dragStart = (e: MouseEvent) => {
    isDragging = true;
    line.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = line.scrollLeft;
  };

  const dragging = (e: MouseEvent) => {
    if (!isDragging) return;
    line.scrollLeft = startScrollLeft - (e.pageX - startX);
  };

  const dragStop = () => {
    isDragging = false;
    line.classList.remove("dragging");
  };

  const infiniteScroll = () => {
    const carouselElement = line;
    if (line.scrollLeft === 0) {
      line.classList.add("no-transition");
      carouselElement.scrollLeft = line.scrollWidth - 2 * line.offsetWidth;
      line.classList.remove("no-transition");
    } else if (Math.ceil(line.scrollLeft) === line.scrollWidth - line.offsetWidth) {
      line.classList.add("no-transition");
      carouselElement.scrollLeft = line.offsetWidth;
      line.classList.remove("no-transition");
    }
  };

  line.addEventListener("mousedown", dragStart);
  line.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  line.addEventListener("scroll", infiniteScroll);
}
