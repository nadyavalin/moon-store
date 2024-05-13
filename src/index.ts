import "./index.css";
import "./pages/basePage/basePage.css";
import "./pages/main/main.css";
import "./pages/404/404.css";
import "./api/api";

import { header, main, footer } from "./pages/basePage/basePage";
import { renderMainPageContent } from "./pages/main/main";
import { renderCatalogContent } from "./pages/catalog/catalog";
import { renderBasketContent } from "./pages/basket/basket";
import { renderAboutUsContent } from "./pages/about/about";
import renderLoginFormContent from "./pages/loginPage/loginPage";
import { renderRegistrationFormContent } from "./pages/registration/registrationView";
import { render404PageContent } from "./pages/404/404";

document.body.append(header, main, footer);

function setActiveLink(fragmentId: string) {
  const links = document.querySelectorAll(".menu-item");
  if (links) {
    for (let i = 0; i < links.length; i += 1) {
      const link = links[i];
      const href = link.getAttribute("href");
      if (href) {
        const pageName = href.substring(1);
        if (pageName === fragmentId) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      }
    }
  }
}

function navigate() {
  const contentDiv = document.querySelector(".main");
  const fragmentId = window.location.hash.substring(1);
  if (contentDiv) {
    contentDiv.innerHTML = "";
    switch (fragmentId) {
      case "":
      case "main":
        contentDiv.append(renderMainPageContent());
        break;
      case "catalog":
        contentDiv.innerHTML = renderCatalogContent();
        break;
      case "basket":
        contentDiv.innerHTML = renderBasketContent();
        break;
      case "about":
        contentDiv.innerHTML = renderAboutUsContent();
        break;
      case "login":
        contentDiv.append(renderLoginFormContent());
        break;
      case "registration":
        contentDiv.append(renderRegistrationFormContent());
        break;
      default:
        contentDiv.innerHTML = render404PageContent();
        break;
    }
  }
  setActiveLink(fragmentId);
}

navigate();

window.addEventListener("hashchange", navigate);
document.addEventListener("DOMContentLoaded", navigate);
