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
import { renderProductsFromApi } from "./pages/catalog/catalog";
import { sliderWrapper, renderProductsForSliderFromApi } from "./pages/main/main";
import { renderProfileContent } from "./pages/profile/profileView";
import { createApiRoot } from "./api/api";
import { renderProductContent } from "./pages/product/product";
import createFilterView, { filters } from "./components/filter/filterView";

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

async function renderContent(hash: string) {
  const contentDiv = document.querySelector(".main");
  const [route, ...args] = hash.split("/");
  if (contentDiv) {
    contentDiv.innerHTML = "";
    switch (route) {
      case Pages.ROOT:
      case Pages.MAIN:
        contentDiv.append(sliderWrapper);
        renderProductsForSliderFromApi();
        break;
      case Pages.PROFILE:
        try {
          if (localStorage.getItem("refreshToken")) {
            contentDiv.append(await renderProfileContent());
          } else {
            window.location.href = Pages.LOGIN;
          }
        } catch (error) {
          contentDiv.append("Ошибка! Контент невозможно отобразить.");
        }
        break;
      case Pages.CATALOG:
        try {
          const renderedCatalogContent = await renderProductsFromApi();
          const renderedFilter = createFilterView(filters.sizes.clothes);
          contentDiv.append(renderedFilter, renderedCatalogContent);
        } catch (error) {
          contentDiv.append("Ошибка! Контент невозможно отобразить.");
        }
        break;
      case Pages.PRODUCT:
        try {
          const renderedProductContent = await renderProductContent(args[0]);
          contentDiv.append(renderedProductContent);
        } catch (error) {
          contentDiv.append("Ошибка! Контент невозможно отобразить.");
        }
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
          window.location.href = Pages.MAIN;
        }
        break;
      case Pages.REGISTRATION:
        if (!localStorage.getItem("refreshToken")) {
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
  renderContent(window.location.hash);
});
