import "./index.css";
import "./pages/main/header.css";
import "./pages/404/404.css";
import "./api/api";
import { header, main, footer } from "./pages/main/header";
import { renderMainPageContent } from "./pages/main/main";
import { renderCatalogContent } from "./pages/catalog/catalog";
import { renderBasketContent } from "./pages/basket/basket";
import { renderAboutUsContent } from "./pages/about/about";
import { renderLoginFormContent } from "./pages/loginForm/loginForm";
import { renderRegistrationFormContent } from "./pages/registration/registrationView";
import { render404PageContent } from "./pages/404/404";

document.body.append(header, main, footer);

function setActiveLink(fragmentId: string) {
  const links = document.querySelectorAll("header a");
  if (links) {
    for (let i = 0; i < links.length; i += 1) {
      const link = links[i];
      const href = link.getAttribute("href");
      if (href) {
        const pageName = href.substring(1);
        if (pageName === fragmentId) {
          link.setAttribute("class", "active");
        } else {
          link.removeAttribute("class");
        }
      }
    }
  }
}

function navigate() {
  const contentDiv = document.querySelector(".main");
  const fragmentId = window.location.hash.substring(1);
  let isValidRoute = false;

  switch (fragmentId) {
    case "main":
    case "catalog":
    case "basket":
    case "about":
    case "login":
    case "registration":
      isValidRoute = true;
      break;
    default:
      isValidRoute = false;
      break;
  }

  if (contentDiv && isValidRoute) {
    switch (fragmentId) {
      case "main":
        contentDiv.innerHTML = renderMainPageContent();
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
        contentDiv.innerHTML = renderLoginFormContent();
        break;
      case "registration":
        contentDiv.innerHTML = renderRegistrationFormContent().outerHTML;
        break;
      default:
        contentDiv.innerHTML = renderMainPageContent();
        break;
    }
  } else {
    contentDiv!.innerHTML = render404PageContent();
  }
  setActiveLink(fragmentId);
}

navigate();

window.addEventListener("hashchange", navigate);
document.addEventListener("DOMContentLoaded", navigate);
