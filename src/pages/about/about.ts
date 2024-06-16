import "./about.css";
import { createElement } from "../../components/elements";
import { introduction1p, introduction2p, introduction3p, introduction4p, katikaBioText, nadyavalinBioText, raenlinBioText } from "./text";

export function renderAboutUsContent() {
  const aboutUsSchoolLogo = createElement({
    tagName: "img",
    classNames: ["rs-school-logo", "about-us__rs-school-logo"],
    attributes: { src: "../../public/img/rs-school-logo.png", alt: "RSSchool Logo" },
  });
  const aboutUsSchoolLogoLink = createElement({ tagName: "a", attributes: { href: "https://rs.school/courses", target: "_blank" } });

  const aboutUsWrapper = createElement({ tagName: "div", classNames: ["about-us__wrapper"] });
  const quoteWrapper = createElement({ tagName: "div", classNames: ["quote__wrapper"] });
  const title = createElement({ tagName: "h1", classNames: ["title__text"], textContent: "Developers, thinkers, dreamers..." });
  const quote = createElement({ tagName: "h4", classNames: ["title-quote__text"], textContent: "Народная программерская мудрость:" });
  const quoteText = createElement({
    tagName: "q",
    classNames: ["quote__text"],
    textContent: "Если долго смотреть на код, то код начинает смотреть на тебя...",
  });

  const introductionWrapper = createElement({ tagName: "details", classNames: ["intro__wrapper"] });
  const summaryText = createElement({ tagName: "summary", textContent: "Наша команда - это..." });
  const introduction1Paragraph = createElement({ tagName: "p", classNames: ["about-us__text"], textContent: introduction1p });
  const introduction2Paragraph = createElement({ tagName: "p", classNames: ["about-us__text"], textContent: introduction2p });
  const introduction3Paragraph = createElement({ tagName: "p", classNames: ["about-us__text"], textContent: introduction3p });
  const introduction4Paragraph = createElement({ tagName: "p", classNames: ["about-us__text"], textContent: introduction4p });

  const developersWrapper = createElement({ tagName: "div", classNames: ["developers__wrapper"] });
  const nadyavalinWrapper = createElement({ tagName: "div", classNames: ["nadyavalin__wrapper"] });
  const raenlinWrapper = createElement({ tagName: "div", classNames: ["raenlin__wrapper"] });
  const katikaWrapper = createElement({ tagName: "div", classNames: ["katika__wrapper"] });

  const nadyavalinPhoto = createElement({
    tagName: "img",
    classNames: ["developers-image"],
    attributes: { src: "../../public/developers-img/nadyavalin.jpg" },
  });
  const raenlinPhoto = createElement({
    tagName: "img",
    classNames: ["developers-image"],
    attributes: { src: "../../public/developers-img/raenlin.jpg" },
  });
  const katikaPhoto = createElement({
    tagName: "img",
    classNames: ["developers-image"],
    attributes: { src: "../../public/developers-img/ifbfirst.jpg" },
  });

  const nadyavalinName = createElement({ tagName: "p", classNames: ["developers-name"], textContent: "Надежда Ткачук" });
  const raenlinName = createElement({ tagName: "p", classNames: ["developers-name"], textContent: "Дарья Пчелинцева" });
  const katikaName = createElement({ tagName: "p", classNames: ["developers-name"], textContent: "Екатерина Машко" });

  const nadyavalinPosition = createElement({
    tagName: "p",
    classNames: ["developers-position"],
    textContent: "Front-end developer",
  });
  const raenlinPosition = createElement({
    tagName: "p",
    classNames: ["developers-position"],
    textContent: "Front-end developer",
  });
  const katikaPosition = createElement({
    tagName: "p",
    classNames: ["developers-position"],
    textContent: "Front-end developer",
  });

  const nadyavalinGitHub = createElement({
    tagName: "a",
    classNames: ["developers-github-link"],
    textContent: "GitHub: nadyavalin",
    attributes: { href: "https://github.com/nadyavalin", target: "_blank" },
  });
  const raenlinGitHub = createElement({
    tagName: "a",
    classNames: ["developers-github-link"],
    textContent: "GitHub: raenlin",
    attributes: { href: "https://github.com/raenlin", target: "_blank" },
  });
  const katikaGitHub = createElement({
    tagName: "a",
    classNames: ["developers-github-link"],
    textContent: "GitHub: ifbfirst",
    attributes: { href: "https://github.com/ifbfirst", target: "_blank" },
  });

  const nadyavalinBio = createElement({
    tagName: "p",
    classNames: ["developers-bio"],
    textContent: nadyavalinBioText,
  });
  const raenlinBio = createElement({
    tagName: "p",
    classNames: ["developers-bio"],
    textContent: raenlinBioText,
  });
  const katikaBio = createElement({
    tagName: "p",
    classNames: ["developers-bio"],
    textContent: katikaBioText,
  });
  quoteWrapper.append(quote, quoteText);
  aboutUsSchoolLogoLink.append(aboutUsSchoolLogo);
  nadyavalinWrapper.append(nadyavalinPhoto, nadyavalinName, nadyavalinPosition, nadyavalinGitHub, nadyavalinBio);
  raenlinWrapper.append(raenlinPhoto, raenlinName, raenlinPosition, raenlinGitHub, raenlinBio);
  katikaWrapper.append(katikaPhoto, katikaName, katikaPosition, katikaGitHub, katikaBio);
  developersWrapper.append(nadyavalinWrapper, raenlinWrapper, katikaWrapper);
  introductionWrapper.append(summaryText, introduction1Paragraph, introduction2Paragraph, introduction3Paragraph, introduction4Paragraph);
  aboutUsWrapper.append(title, quoteWrapper, introductionWrapper, aboutUsSchoolLogoLink, developersWrapper);
  return aboutUsWrapper;
}

export default renderAboutUsContent;
