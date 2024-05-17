export interface State {
  name?: string;
  refreshToken: string | null;
}

export interface CardData {
  photo: string;
  title: string;
  price: number;
  discount: number;
}

export enum Pages {
  ROOT = "",
  MAIN = "#main",
  PROFILE = "#profile",
  CATALOG = "#catalog",
  BASKET = "#basket",
  ABOUT = "#about",
  LOGIN = "#login",
  REGISTRATION = "#registration",
}
