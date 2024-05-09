import "./index.css";
import "./pages/mainPage/mainPageHeader.css";
import "./api/api";
import { header, main, footer } from "./pages/mainPage/mainPageHeader";
import { renderMainPageContent } from "./pages/mainPage/mainPageContent";
import { renderCatalogContent } from "./pages/catalog/catalog";
import { renderBasketContent } from "./pages/basket/basket";
import { renderAboutUsContent } from "./pages/aboutUs/aboutUs";
import { renderLoginFormContent } from "./pages/loginForm/loginForm";
// import { createFormRegistration } from "./pages/registration/registrationView";

// const formRegistration = createFormRegistration();
// document.body.append(formRegistration);
document.body.append(header, main, footer);

const partialsCache: Record<string, string> = {};

function fetchFile(path: string, callback: (data: string) => void): void {
  const request = new XMLHttpRequest();
  request.onload = () => {
    callback(request.responseText);
  };

  request.open("GET", path);
  request.send(null);
}

function getContent(fragmentId: string, callback: (data: string) => void): void {
  if (partialsCache[fragmentId]) {
    callback(partialsCache[fragmentId]);
  } else {
    const filePath = `./pages/${fragmentId}/${fragmentId}.ts`;
    fetchFile(filePath, (content) => {
      partialsCache[fragmentId] = content;
      callback(content);
    });
  }
}

function setActiveLink(fragmentId: string) {
  const navbarDiv = document.querySelector(".navbar");
  if (navbarDiv) {
    const links = navbarDiv.children;
    let link;
    let pageName;

    for (let i = 0; i < links.length; i += 1) {
      link = links[i];
      const href = link.getAttribute("href");
      if (href) {
        pageName = href.substring(1);
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

  getContent(fragmentId, (content) => {
    if (contentDiv) {
      switch (fragmentId) {
        case "home":
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
        // case "registration":
        //   contentDiv.innerHTML = createFormRegistration();
        //   break;
        default:
          contentDiv.innerHTML = content;
          break;
      }
    }
  });

  setActiveLink(fragmentId);
}

navigate();

window.addEventListener("hashchange", navigate);
document.addEventListener("DOMContentLoaded", navigate);
