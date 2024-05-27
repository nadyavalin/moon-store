import { Pages } from "../../types/types";
import { state } from "../../store/state";
import { createElement } from "../../components/elements";

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

menuItemLogOut.addEventListener("click", () => {
  const greeting = header.querySelector(".user-greeting");
  localStorage.removeItem("user");
  localStorage.removeItem("refreshToken");
  window.location.reload();
  menuItemLogIn.href = Pages.LOGIN;
  menuItemSingUp.href = Pages.REGISTRATION;
  userMenu.append(menuItemSingUp, menuItemLogIn);
  greeting?.remove();
  menuItemLogOut.remove();
  menuItemUserProfile.remove();
});

const liItemHome = createElement({ tagName: "li" });
const liItemCatalog = createElement({ tagName: "li" });
const litItemBasket = createElement({ tagName: "li" });
const liItemAboutUs = createElement({ tagName: "li" });
const menuItemMain = createElement({ tagName: "a", classNames: ["menu-item"], textContent: "Главная", attributes: { href: Pages.MAIN } });
export const menuItemCatalog = createElement({
  tagName: "a",
  classNames: ["menu-item"],
  textContent: "Каталог",
  attributes: { href: Pages.CATALOG },
});
const menuItemBasket = createElement({ tagName: "a", classNames: ["menu-item"], textContent: "Корзина", attributes: { href: Pages.BASKET } });
const menuItemAboutUs = createElement({ tagName: "a", classNames: ["menu-item"], textContent: "О нас", attributes: { href: Pages.ABOUT } });

// burger
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
    textContent: `${state.name}`,
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
litItemBasket.append(menuItemBasket);
liItemAboutUs.append(menuItemAboutUs);
userMenu.append(menuItemSingUp, menuItemLogIn);
logoLink.append(logo);
logoLinkH1.append(h1);
header.append(logoLink, burgerMenuWrapper, userMenu, logoLinkH1, navMenu, hrHeaderLine);
document.body.append(snackbarContainer);

const developersWrapper = createElement({ tagName: "div", classNames: ["developers__wrapper"] });
const developerLinkFirst = createElement({
  tagName: "a",
  textContent: "nadyavalin",
  attributes: { href: "https://github.com/nadyavalin", target: "_blank" },
});
const developerLinkSecond = createElement({
  tagName: "a",
  textContent: "raenlin",
  attributes: { href: "https://github.com/raenlin", target: "_blank" },
});
const developerLinkThird = createElement({
  tagName: "a",
  textContent: "ifbfirst",
  attributes: { href: "https://github.com/ifbfirst", target: "_blank" },
});
const rsschoolLogo = createElement({
  tagName: "img",
  classNames: ["rsschool-logo"],
  attributes: { src: "../../public/img/rsschool-logo.png", alt: "RSSchool Logo" },
});
const rsschoolLogoLink = createElement({ tagName: "a", attributes: { href: "https://rs.school/courses", target: "_blank" } });
const footerContentWrapper = createElement({ tagName: "div", classNames: ["footer-content__wrapper"] });
const yearOfApp = createElement({ tagName: "div", classNames: ["year-app"], textContent: "2024" });
developersWrapper.append(developerLinkFirst, developerLinkSecond, developerLinkThird);
rsschoolLogoLink.append(rsschoolLogo);
footerContentWrapper.append(developersWrapper, rsschoolLogoLink, yearOfApp);
footer.append(hrFooterLine, footerContentWrapper);
