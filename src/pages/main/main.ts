import "./main.css";
import createCard from "../../components/productCard/productCard";
import { getCart, getProducts } from "../../api/api";
import { createSlider } from "../../components/slider/slider";
import { createPromoCodesBlock } from "./promoCodes/promoCodes";
import { createElement } from "src/components/elements";

async function getSlider() {
  const response = await getProducts();
  const cartResponse = await getCart();
  const slider = createSlider({
    className: "main-slider",
    isAutoPlay: true,
    response,
    createSlides: (items) => items.map((item) => createCard(item, cartResponse)),
  });

  return slider;
}

export async function getMainPageContent() {
  const mainContentWrapper = createElement({ tagName: "div", classNames: ["main-content__wrapper"] });
  mainContentWrapper.append(createPromoCodesBlock(), await getSlider());
  return mainContentWrapper;
}
