import "./main.css";
import createCard from "../../components/productCard";
import { getProducts } from "../../api/api";
import { createSlider } from "../../components/slider/slider";

export async function getMainPageContent() {
  const response = await getProducts();
  const slider = createSlider({
    className: "main-slider",
    isAutoPlay: true,
    response,
    createSlides: (items) => items.map((item) => createCard(item)),
  });
  return slider;
}
