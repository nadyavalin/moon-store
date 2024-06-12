import "./main.css";
import createCard from "../../components/productCard/productCard";
import { getCart, getProducts } from "../../api/api";
import { createSlider } from "../../components/slider/slider";
// import state from "../../store/state";
// import { QueryParam } from "@commercetools/platform-sdk";

export async function getMainPageContent() {
  const response = await getProducts();
  // let limitCards = response?.body.limit;
  // limitCards = 20;

  // const getCardsLimit = (queryArgs?: Record<string, QueryParam>) =>
  //   state.apiRoot?.productProjections().get({ queryArgs: { limit: 20, ...queryArgs } });
  const cartResponse = await getCart();
  const slider = createSlider({
    className: "main-slider",
    isAutoPlay: true,
    response,
    createSlides: (items) => items.map((item) => createCard(item, cartResponse)),
  });
  return slider;
}
