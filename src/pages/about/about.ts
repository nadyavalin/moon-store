import "./about.css";
import { createElement } from "../../components/elements";
import { introduction, developer } from "./info";

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
  const introduction1Paragraph = createElement({ tagName: "p", classNames: ["about-us__text"], textContent: introduction });
  const introduction2Paragraph = createElement({ tagName: "p", classNames: ["about-us__text"], textContent: developer[1].introText });
  const introduction3Paragraph = createElement({ tagName: "p", classNames: ["about-us__text"], textContent: developer[0].introText });
  const introduction4Paragraph = createElement({ tagName: "p", classNames: ["about-us__text"], textContent: developer[2].introText });

  const developersWrapper = createElement({ tagName: "div", classNames: ["developers__wrapper"] });
  const nadyavalinWrapper = createElement({ tagName: "div", classNames: ["nadyavalin__wrapper"] });
  const raenlinWrapper = createElement({ tagName: "div", classNames: ["raenlin__wrapper"] });
  const katikaWrapper = createElement({ tagName: "div", classNames: ["katika__wrapper"] });

  const nadyavalinPhoto = createElement({
    tagName: "img",
    classNames: ["developers-image"],
    attributes: { src: developer[0].imageSrc },
  });
  const raenlinPhoto = createElement({
    tagName: "img",
    classNames: ["developers-image"],
    attributes: { src: developer[1].imageSrc },
  });
  const katikaPhoto = createElement({
    tagName: "img",
    classNames: ["developers-image"],
    attributes: { src: developer[2].imageSrc },
  });

  const nadyavalinName = createElement({ tagName: "p", classNames: ["developers-name"], textContent: developer[0].name });
  const raenlinName = createElement({ tagName: "p", classNames: ["developers-name"], textContent: developer[1].name });
  const katikaName = createElement({ tagName: "p", classNames: ["developers-name"], textContent: developer[2].name });

  const nadyavalinPosition = createElement({
    tagName: "p",
    classNames: ["developers-position"],
    textContent: developer[0].position,
  });
  const raenlinPosition = createElement({
    tagName: "p",
    classNames: ["developers-position"],
    textContent: developer[1].position,
  });
  const katikaPosition = createElement({
    tagName: "p",
    classNames: ["developers-position"],
    textContent: developer[2].position,
  });

  const nadyavalinGitHub = createElement({
    tagName: "a",
    classNames: ["developers-github-link"],
    textContent: "GitHub: nadyavalin",
    attributes: { href: developer[0].githubLink, target: "_blank" },
  });
  const raenlinGitHub = createElement({
    tagName: "a",
    classNames: ["developers-github-link"],
    textContent: "GitHub: raenlin",
    attributes: { href: developer[1].githubLink, target: "_blank" },
  });
  const katikaGitHub = createElement({
    tagName: "a",
    classNames: ["developers-github-link"],
    textContent: "GitHub: ifbfirst",
    attributes: { href: developer[2].githubLink, target: "_blank" },
  });

  const nadyavalinBio = createElement({
    tagName: "p",
    classNames: ["developers-bio"],
    textContent: developer[0].bioText,
  });
  const raenlinBio = createElement({
    tagName: "p",
    classNames: ["developers-bio"],
    textContent: developer[1].bioText,
  });
  const katikaBio = createElement({
    tagName: "p",
    classNames: ["developers-bio"],
    textContent: developer[2].bioText,
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
