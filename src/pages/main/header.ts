import { createDiv, createElement, createLinkMenuItem } from "../../components/elements";

export const header = createElement("header", ["header"]);
export const main = createElement("main", ["main"]);
export const footer = createElement("footer", ["footer"]);

const h1 = createElement("h1", ["shop-name"], "Online Moon Store");
const userMenu = createDiv(["user-menu"]);
const navMenu = createElement("nav", ["nav"]);
const ulItem = createElement("ul", ["navbar"]);
const hrLine = createElement("hr", ["hr-nav-line"]);

const menuItemLogIn = createLinkMenuItem("#login", "Вход");
const menuItemSingUp = createLinkMenuItem("#registration", "Регистрация");

// const menuItemUserProfile = createMenuItem("#", "Профиль");
// const menuItemLogOut = createMenuItem("#", "Выход");

const liItemHome = createElement("li");
const liItemCatalog = createElement("li");
const litItemBasket = createElement("li");
const liItemAboutUs = createElement("li");
const menuItemMain = createLinkMenuItem("#main", "Главная");
const menuItemCatalog = createLinkMenuItem("#catalog", "Каталог");
const menuItemBasket = createLinkMenuItem("#basket", "Корзина");
const menuItemAboutUs = createLinkMenuItem("#about", "О нас");

navMenu.append(ulItem);
ulItem.append(liItemHome, liItemCatalog, litItemBasket, liItemAboutUs);
liItemHome.append(menuItemMain);
liItemCatalog.append(menuItemCatalog);
litItemBasket.append(menuItemBasket);
liItemAboutUs.append(menuItemAboutUs);
userMenu.append(menuItemSingUp, menuItemLogIn);

header.append(userMenu, h1, navMenu, hrLine);
main.append();
footer.append();
