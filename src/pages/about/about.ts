import "./about.css";
import { createElement } from "../../components/elements";
import { introduction, developers } from "./info";

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
  const introductionParagraph = createElement({ tagName: "p", classNames: ["about-us__text"], textContent: introduction });
  introductionWrapper.append(summaryText, introductionParagraph);

  const introductionElements = developers.map((dev) => {
    const introText = createElement({ tagName: "p", classNames: ["about-us__text"], textContent: dev.introText });
    return introText;
  });
  introductionWrapper.append(...introductionElements);

  const developersWrapper = createElement({ tagName: "div", classNames: ["developers__wrapper"] });
  const developerElements = developers.map((dev) => {
    const devWrapper = createElement({ tagName: "div", classNames: ["developer__wrapper"] });
    const developerImage = createElement({
      tagName: "img",
      classNames: ["developers-image"],
      attributes: { src: dev.imageSrc },
    });
    const developerName = createElement({ tagName: "p", classNames: ["developers-name"], textContent: dev.name });
    const developerPosition = createElement({
      tagName: "p",
      classNames: ["developers-position"],
      textContent: dev.position,
    });
    const githubLink = createElement({
      tagName: "a",
      classNames: ["developers-github-link"],
      textContent: `GitHub: ${dev.githubName}`,
      attributes: { href: dev.githubLink, target: "_blank" },
    });
    const developerBio = createElement({
      tagName: "p",
      classNames: ["developers-bio"],
      textContent: dev.bioText,
    });

    devWrapper.append(developerImage, developerName, developerPosition, githubLink, developerBio);
    return devWrapper;
  });

  developersWrapper.append(...developerElements);
  quoteWrapper.append(quote, quoteText);
  aboutUsSchoolLogoLink.append(aboutUsSchoolLogo);
  aboutUsWrapper.append(title, quoteWrapper, introductionWrapper, aboutUsSchoolLogoLink, developersWrapper);
  return aboutUsWrapper;
}

export default renderAboutUsContent;
