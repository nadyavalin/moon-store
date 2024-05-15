export interface State {}

export interface CardData {
  photo: string;
  title: string;
  price: number;
  discount: number;
}

export enum Pages {
  MAIN = "main",
  CATALOG = "catalog",
  BASKET = "basket",
  ABOUT = "about",
  LOGIN = "login",
  REGISTRATION = "registration",
}
