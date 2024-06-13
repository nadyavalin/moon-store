import "./main.css";
import createCard from "../../components/productCard/productCard";
import { getCart, getProducts } from "../../api/api";
import { createSlider } from "../../components/slider/slider";

export async function getMainPageContent() {
  const response = await getProducts({ limit: 20 });
  const cartResponse = await getCart();
  const slider = createSlider({
    className: "main-slider",
    isAutoPlay: true,
    response,
    createSlides: (items) => items.map((item) => createCard(item, cartResponse)),
  });
  return slider;
}
