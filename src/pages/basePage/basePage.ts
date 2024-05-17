import { Pages } from "src/types/types";
import { state } from "src/store/state";
import { createDiv, createElement, createImage, createLink, createLinkMenuItem, createOuterLink, createEmptyDiv } from "../../components/elements";

export const header = createElement("header", ["header"]);
export const main = createElement("main", ["main"]);
export const footer = createElement("footer", ["footer"]);

const logoLink = createLink(Pages.ROOT, ["logo-link"]);
const logo = createImage("../../public/img/logo.png", "Logo", ["logo"]);
const logoLinkH1 = createLink(Pages.ROOT, ["logo-link"]);
const h1 = createElement("h1", ["shop-name"], "Online Moon Store");
const userMenu = createDiv(["user-menu"]);
const navMenu = createElement("nav", ["nav"]);
const ulItem = createElement("ul", ["navbar"]);
const hrHeaderLine = createElement("hr", ["hr-line__header"]);
const hrFooterLine = createElement("hr", ["hr-line__footer"]);

const menuItemSingUp = createLinkMenuItem(Pages.REGISTRATION, "Регистрация");
const menuItemLogIn = createLinkMenuItem(Pages.LOGIN, "Вход");

const menuItemUserProfile = createLinkMenuItem(Pages.PROFILE, "Профиль");
const menuItemLogOut = createLinkMenuItem(Pages.ROOT, "Выход");

const liItemHome = createElement("li");
const liItemCatalog = createElement("li");
const litItemBasket = createElement("li");
const liItemAboutUs = createElement("li");
const menuItemMain = createLinkMenuItem(Pages.ROOT, "Главная");
const menuItemCatalog = createLinkMenuItem(Pages.CATALOG, "Каталог");
const menuItemBasket = createLinkMenuItem(Pages.BASKET, "Корзина");
const menuItemAboutUs = createLinkMenuItem(Pages.ABOUT, "О нас");

// burger
const burgerMenuWrapper = createElement("div", ["burger-menu__wrapper"]);
const burgerMenu = createElement("div", ["burger-menu"]);
const burgerLine = createElement("span");
burgerMenu.append(burgerLine);
burgerMenuWrapper.append(burgerMenu);

burgerMenu.addEventListener("click", () => {
  burgerMenu.classList.toggle("active");
  navMenu.classList.toggle("open");
});

ulItem.addEventListener("click", () => {
  navMenu.classList.remove("open");
  burgerMenu.classList.remove("active");
});

export function addUserGreetingToHeader() {
  const profileLink = createLink(`${Pages.PROFILE}`, ["user-greeting__link"], state.name);
  const greeting = createEmptyDiv(["user-greeting"], ``);
  greeting.appendChild(profileLink);
  greeting.appendChild(document.createTextNode(", здравствуйте!"));
  header.append(greeting);
}

navMenu.append(ulItem);
ulItem.append(liItemHome, menuItemUserProfile, liItemCatalog, litItemBasket, liItemAboutUs);
liItemHome.append(menuItemMain);
liItemCatalog.append(menuItemCatalog);
litItemBasket.append(menuItemBasket);
liItemAboutUs.append(menuItemAboutUs);
userMenu.append(menuItemSingUp, menuItemLogIn, menuItemLogOut);
logoLink.append(logo);
logoLinkH1.append(h1);
header.append(logoLink, burgerMenuWrapper, userMenu, logoLinkH1, navMenu, hrHeaderLine);

const developersWrapper = createEmptyDiv(["developers__wrapper"]);
const developerLinkFirst = createOuterLink("https://github.com/nadyavalin", "nadyavalin");
const developerLinkSecond = createOuterLink("https://github.com/raenlin", "raenlin");
const developerLinkThird = createOuterLink("https://github.com/ifbfirst", "ifbfirst");
const rsschoolLogo = createImage("../../public/img/rsschool-logo.png", "RSSchool Logo", ["rsschool-logo"]);
const rsschoolLogoLink = createOuterLink("https://rs.school/courses");
const footerContentWrapper = createElement("div", ["footer-content__wrapper"]);
const yearOfApp = createEmptyDiv(["year-app"], "2024");
developersWrapper.append(developerLinkFirst, developerLinkSecond, developerLinkThird);
rsschoolLogoLink.append(rsschoolLogo);
footerContentWrapper.append(developersWrapper, rsschoolLogoLink, yearOfApp);
footer.append(hrFooterLine, footerContentWrapper);
