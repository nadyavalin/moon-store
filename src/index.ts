import "./index.css";
import "./pages/basePage/basePage.css";
import "./pages/404/404.css";
import "./api/api";

import { header, main, footer } from "./pages/basePage/basePage";
import { renderBasketContent } from "./pages/basket/basket";
import { renderAboutUsContent } from "./pages/about/about";
import renderLoginFormContent from "./pages/loginPage/loginPage";
import { renderRegistrationFormContent } from "./pages/registration/registrationView";
import { render404PageContent } from "./pages/404/404";
import { Pages } from "./types/types";
import { catalog, renderProductsFromApi } from "./pages/catalog/catalog";
import { sliderWrapper, renderProductsForSliderFromApi } from "./pages/main/main";
import { profile, renderCustomerDataFromApi } from "./pages/profile/profile";
import renderProductContent from "./pages/product/product";

document.body.append(header, main, footer);

function setActiveLink(fragmentId: string) {
  const links = document.querySelectorAll(".menu-item");
  if (links) {
    for (let i = 0; i < links.length; i += 1) {
      const link = links[i];
      const href = link.getAttribute("href");
      const pageName = href?.substring(-1);
      link.classList.toggle("active", pageName === fragmentId);
    }
  }
}

function renderContent(route: string) {
  const contentDiv = document.querySelector(".main");
  if (contentDiv) {
    contentDiv.innerHTML = "";
    switch (route) {
      case Pages.ROOT:
        contentDiv.append(sliderWrapper);
        renderProductsForSliderFromApi();
        break;
      case Pages.PROFILE:
        if (localStorage.getItem("refreshToken")) {
          contentDiv.append(profile);
          renderCustomerDataFromApi();
        } else {
          navigate(Pages.ROOT);
        }
        break;
      case Pages.CATALOG:
        contentDiv.append(catalog);
        renderProductsFromApi();
        break;
      case Pages.PRODUCT:
        contentDiv.append(renderProductContent());
        break;
      case Pages.BASKET:
        contentDiv.innerHTML = renderBasketContent();
        break;
      case Pages.ABOUT:
        contentDiv.innerHTML = renderAboutUsContent();
        break;
      case Pages.LOGIN:
        if (!localStorage.getItem("refreshToken")) {
          contentDiv.append(renderLoginFormContent());
        } else {
          navigate(Pages.ROOT);
        }
        break;
      case Pages.REGISTRATION:
        if (!localStorage.getItem("refreshToken")) {
          contentDiv.append(renderRegistrationFormContent());
        } else {
          navigate(Pages.ROOT);
        }
        break;
      default:
        contentDiv.innerHTML = render404PageContent();
        break;
    }
  }
  setActiveLink(route);
}

export function linkClickHandler(event: Event) {
  event.preventDefault();
  const href = (event.target as HTMLAnchorElement).pathname;
  navigate(href);
}

export const navigate = (route: string) => {
  window.history.pushState({}, "", route);
  renderContent(route);
};

document.addEventListener("DOMContentLoaded", () => {
  renderContent(window.location.pathname);
});

window.addEventListener("popstate", () => {
  renderContent(window.location.pathname);
});
