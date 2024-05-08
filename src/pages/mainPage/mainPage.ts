import { createDiv, createElement, createLinkMenuItem } from "../../components/elements";

export const header = createElement("header", ["header"]);
export const main = createElement("main", ["main"]);
export const footer = createElement("footer", ["footer"]);

const h1 = createElement("h1", ["h1"], "Online Moon Store");
const userMenu = createDiv(["user-menu"]);
const navMenu = createElement("nav", ["nav"]);
const ulItem = createElement("ul", ["nav__ul"]);

const menuItemLogIn = createLinkMenuItem("#", "Вход");
const menuItemSingUp = createLinkMenuItem("#", "Регистрация");

// const menuItemUserProfile = createMenuItem("#", "Профиль");
// const menuItemLogOut = createMenuItem("#", "Выход");

const liItemHome = createElement("li");
const liItemCatalog = createElement("li");
const litItemBasket = createElement("li");
const liItemAboutUs = createElement("li");
const menuItemHome = createLinkMenuItem("#", "Главная");
const menuItemCatalog = createLinkMenuItem("#", "Каталог");
const menuItemBasket = createLinkMenuItem("#", "Корзина");
const menuItemAboutUs = createLinkMenuItem("#", "О нас");

navMenu.append(ulItem);
ulItem.append(liItemHome, liItemCatalog, litItemBasket, liItemAboutUs);
liItemHome.append(menuItemHome);
liItemCatalog.append(menuItemCatalog);
litItemBasket.append(menuItemBasket);
liItemAboutUs.append(menuItemAboutUs);
userMenu.append(menuItemSingUp, menuItemLogIn);

header.append(userMenu, h1, navMenu);
main.append();
footer.append();
