import { createDiv, createElement, createImage, createLink, createLinkMenuItem } from "../../components/elements";

export const header = createElement("header", ["header"]);
export const main = createElement("main", ["main"]);
export const footer = createElement("footer", ["footer"]);

const logoWrapper1 = createDiv(["logo-wrapper1"]);
const logoLink1 = createLink("#main", ["logo-link"]);
const logo1 = createImage("../../public/img/logo-1.png", "Logo", ["logo"]);

const logoWrapper2 = createDiv(["logo-wrapper2"]);
const logoLink2 = createLink("#main", ["logo-link"]);
const logo2 = createImage("../../public/img/logo-2.png", "Logo", ["logo"]);

const menuWrapper = createDiv(["menu-wrapper"]);
const logoLinkH1 = createLink("#main", ["logo-link"]);
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

logoLink1.append(logo1);
logoWrapper1.append(logoLink1);

logoLinkH1.append(h1);
menuWrapper.append(userMenu, logoLinkH1, navMenu, hrLine);

logoLink2.append(logo2);
logoWrapper2.append(logoLink2);

header.append(logoWrapper1, menuWrapper, logoWrapper2);
main.append();
footer.append();
