import "./index.css";
import "./components/loader.css";
import "./pages/basePage/basePage.css";
import "./pages/404/404.css";

import { Pages, SnackbarType } from "./types/types";
import { cartHandler, createApiRoot } from "./api/api";
import { getMainPageContent } from "./pages/main/main";
import { header, main, footer } from "./pages/basePage/basePage";
import { renderBasketContent } from "./pages/basket/basket";
import { renderAboutUsContent } from "./pages/about/about";
import { render404PageContent } from "./pages/404/404";
import { getCatalogPage } from "./pages/catalog/catalog";
import { renderProfileContent } from "./pages/profile/profileView";
import { renderProductContent } from "./pages/product/product";
import { renderRegistrationFormContent } from "./pages/registration/registrationView";
import { createElement, createSnackbar } from "./components/elements";
import renderLoginFormContent from "./pages/loginPage/loginPage";
import { appStore } from "./store/store";

document.body.append(header, main, footer);

function setActiveLink(fragmentId: string) {
  const links = document.querySelectorAll(".menu-item");
  links.forEach((link) => {
    const href = link.getAttribute("href");
    link.classList.toggle("active", href === fragmentId);
  });
}

export const renderPageContent = async (renderFunc: () => Promise<HTMLElement>) => {
  const loader = createElement({ tagName: "div", classNames: ["loader"] });
  const contentDiv = document.querySelector(".main");
  try {
    contentDiv?.append(loader);
    contentDiv?.append(await renderFunc());
  } catch (error) {
    contentDiv?.append("Ошибка! Контент невозможно отобразить.");
    createSnackbar(SnackbarType.error, "Контент невозможно отобразить");
  } finally {
    loader.remove();
  }
};

async function renderContent(hash: string) {
  const contentDiv = document.querySelector(".main");
  const [route, ...args] = hash.split("/");
  if (contentDiv) {
    contentDiv.innerHTML = "";
    switch (route) {
      case Pages.ROOT:
      case Pages.MAIN:
        await renderPageContent(getMainPageContent);
        break;
      case Pages.PROFILE:
        if (appStore.state.refreshToken !== null) {
          await renderPageContent(renderProfileContent);
        } else {
          window.location.href = Pages.LOGIN;
        }
        break;
      case Pages.CATALOG:
        await renderPageContent(() => getCatalogPage(args));
        break;
      case Pages.PRODUCT:
        await renderPageContent(() => renderProductContent(args[0]));
        break;
      case Pages.BASKET:
        await renderPageContent(renderBasketContent);
        break;
      case Pages.ABOUT:
        contentDiv.append(renderAboutUsContent());
        break;
      case Pages.LOGIN:
        if (appStore.state.refreshToken === null) {
          contentDiv.append(renderLoginFormContent());
        } else {
          window.location.href = Pages.MAIN;
        }
        break;
      case Pages.REGISTRATION:
        if (appStore.state.refreshToken === null) {
          contentDiv.append(renderRegistrationFormContent());
        } else {
          window.location.href = Pages.MAIN;
        }
        break;
      default:
        contentDiv.innerHTML = render404PageContent();
        break;
    }
  }
  setActiveLink(route);
}

window.addEventListener("hashchange", () => {
  renderContent(window.location.hash);
});

document.addEventListener("DOMContentLoaded", () => {
  createApiRoot();
  cartHandler();
  renderContent(window.location.hash);
});
