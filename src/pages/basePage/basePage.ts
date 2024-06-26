import "./basePage.css";
import "../../index.css";
import { Pages } from "../../types/types";
import { appStore } from "../../store/store";
import { createElement } from "../../components/elements";
import { cartHandler, createApiRoot } from "../../api/api";
import { developers } from "../about/info";

export const header = createElement({ tagName: "header", classNames: ["header"] });
export const main = createElement({ tagName: "main", classNames: ["main"] });
export const footer = createElement({ tagName: "footer", classNames: ["footer"] });

const logoLink = createElement({ tagName: "a", classNames: ["logo-link"], attributes: { href: Pages.MAIN } });
const logo = createElement({ tagName: "img", classNames: ["logo"], attributes: { src: "../../public/img/logo.png", alt: "Logo" } });
const logoLinkH1 = createElement({ tagName: "a", classNames: ["logo-link"], attributes: { href: Pages.MAIN } });
const h1 = createElement({ tagName: "h1", classNames: ["shop-name"], textContent: "Online Moon Store" });
export const userMenu = createElement({ tagName: "div", classNames: ["user-menu"] });
const navMenu = createElement({ tagName: "nav", classNames: ["nav"] });
const ulItem = createElement({ tagName: "ul", classNames: ["navbar"] });
const hrHeaderLine = createElement({ tagName: "hr", classNames: ["hr-line__header"] });
const hrFooterLine = createElement({ tagName: "hr", classNames: ["hr-line__footer"] });
export const snackbarContainer = createElement({ tagName: "div", classNames: ["snackbar-container"] });
export const menuItemSingUp = createElement({
  tagName: "a",
  classNames: ["menu-item"],
  textContent: "Регистрация",
  attributes: { href: Pages.REGISTRATION },
});
export const menuItemLogIn = createElement({ tagName: "a", classNames: ["menu-item"], textContent: "Вход", attributes: { href: Pages.LOGIN } });
export const menuItemUserProfile = createElement({
  tagName: "a",
  classNames: ["menu-item"],
  textContent: "Профиль",
  attributes: { href: Pages.PROFILE },
});
export const menuItemLogOut = createElement({ tagName: "button", classNames: ["menu-item"], textContent: "Выход" });

menuItemLogOut.addEventListener("click", async () => {
  const greeting = header.querySelector(".user-greeting");
  greeting?.remove();
  appStore.setState({ name: null, refreshToken: null, customerId: null, cartId: null, anonymousId: null });
  menuItemLogIn.href = Pages.LOGIN;
  menuItemSingUp.href = Pages.REGISTRATION;
  userMenu.append(menuItemSingUp, menuItemLogIn);
  menuItemLogOut.remove();
  menuItemUserProfile.remove();
  createApiRoot();
  await cartHandler();
  window.location.hash = Pages.MAIN;
});

const liItemHome = createElement({ tagName: "li" });
const liItemCatalog = createElement({ tagName: "li" });
const litItemBasket = createElement({ tagName: "li", classNames: ["menu-item__basket"] });
const liItemAboutUs = createElement({ tagName: "li" });
const menuItemMain = createElement({ tagName: "a", classNames: ["menu-item"], textContent: "Главная", attributes: { href: Pages.MAIN } });
export const menuItemCatalog = createElement({
  tagName: "a",
  classNames: ["menu-item"],
  textContent: "Каталог",
  attributes: { href: Pages.CATALOG },
});

const menuItemBasket = createElement({
  tagName: "a",
  classNames: ["menu-item", "menu-item__basket-link"],
  textContent: "Корзина",
  attributes: { href: Pages.BASKET },
});
const menuItemBasketIcon = createElement({ tagName: "i", classNames: ["fa-solid", "fa-cart-shopping"] });
const menuItemBasketAmount = createElement({ tagName: "p", classNames: ["menu-item__basket-amount"] });
const menuItemAboutUs = createElement({ tagName: "a", classNames: ["menu-item"], textContent: "О нас", attributes: { href: Pages.ABOUT } });

const burgerMenuWrapper = createElement({ tagName: "div", classNames: ["burger-menu__wrapper"] });
const burgerMenu = createElement({ tagName: "div", classNames: ["burger-menu"] });
const burgerLine = createElement({ tagName: "span" });
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
  const greeting = createElement({ tagName: "div", classNames: ["user-greeting"] });
  const profileLink = createElement({
    tagName: "a",
    classNames: ["user-greeting__link"],
    textContent: `${appStore.state.name}`,
    attributes: { href: Pages.PROFILE },
  });
  greeting.appendChild(profileLink);
  greeting.appendChild(document.createTextNode(", здравствуйте!"));
  header.append(greeting);
}

navMenu.append(ulItem);
ulItem.append(liItemHome, liItemCatalog, litItemBasket, liItemAboutUs);
liItemHome.append(menuItemMain);
liItemCatalog.append(menuItemCatalog);
litItemBasket.append(menuItemBasket, menuItemBasketAmount);
menuItemBasket.append(menuItemBasketIcon);
liItemAboutUs.append(menuItemAboutUs);
userMenu.append(menuItemSingUp, menuItemLogIn);
logoLink.append(logo);
logoLinkH1.append(h1);
header.append(logoLink, burgerMenuWrapper, userMenu, logoLinkH1, navMenu, hrHeaderLine);
document.body.append(snackbarContainer);

const developersWrapper = createElement({ tagName: "div", classNames: ["footer__developers-wrapper"] });

const developersGithubLinks = developers.map((dev) => {
  const githubLink = createElement({
    tagName: "a",
    textContent: dev.githubName,
    attributes: { href: dev.githubLink, target: "_blank" },
  });
  return githubLink;
});

const rsSchoolLogo = createElement({
  tagName: "img",
  classNames: ["rs-school-logo"],
  attributes: { src: "../../public/img/rs-school-logo.png", alt: "RSSchool Logo" },
});
const rsSchoolLogoLink = createElement({ tagName: "a", attributes: { href: "https://rs.school/courses", target: "_blank" } });
const footerContentWrapper = createElement({ tagName: "div", classNames: ["footer-content__wrapper"] });
const yearOfApp = createElement({ tagName: "div", classNames: ["year-app"], textContent: "2024" });
developersWrapper.append(...developersGithubLinks);
rsSchoolLogoLink.append(rsSchoolLogo);
footerContentWrapper.append(developersWrapper, rsSchoolLogoLink, yearOfApp);
footer.append(hrFooterLine, footerContentWrapper);
