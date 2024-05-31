import { getProducts } from "../../api/api";
import { createSlider } from "./slider";

export async function getMainPageContent() {
  const products = await getProducts();
  const slider = createSlider(products);
  return slider;
}
