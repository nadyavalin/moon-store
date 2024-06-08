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

  const aboutUsWrapper = createElement({ tagName: "div", classNames: ["about-us-wrapper"] });
  const introductionWrapper = createElement({ tagName: "div", classNames: ["intro-wrapper"] });
  const introductionFirstWrapper = createElement({ tagName: "div", classNames: ["intro-first-wrapper"] });
  const introductionSecondWrapper = createElement({ tagName: "div", classNames: ["intro-second-wrapper"] });
  const introduction1Paragraph = createElement({ tagName: "p", classNames: ["intro-paragraph"], textContent: introduction1p });
  const introduction2Paragraph = createElement({ tagName: "p", classNames: ["intro-paragraph"], textContent: introduction2p });
  const introduction3Paragraph = createElement({ tagName: "p", classNames: ["intro-paragraph"], textContent: introduction3p });
  const introduction4Paragraph = createElement({ tagName: "p", classNames: ["intro-paragraph"], textContent: introduction4p });
  const developersWrapper = createElement({ tagName: "div", classNames: ["developers-wrapper"] });
  const nadyavalinWrapper = createElement({ tagName: "div", classNames: ["nadyavalin-wrapper"] });
  const raenlinWrapper = createElement({ tagName: "div", classNames: ["raenlin-wrapper"] });
  const katikaWrapper = createElement({ tagName: "div", classNames: ["katika-wrapper"] });

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

  aboutUsSchoolLogoLink.append(aboutUsSchoolLogo);
  nadyavalinWrapper.append(nadyavalinPhoto, nadyavalinName, nadyavalinPosition, nadyavalinGitHub, nadyavalinBio);
  raenlinWrapper.append(raenlinPhoto, raenlinName, raenlinPosition, raenlinGitHub, raenlinBio);
  katikaWrapper.append(katikaPhoto, katikaName, katikaPosition, katikaGitHub, katikaBio);
  developersWrapper.append(nadyavalinWrapper, raenlinWrapper, katikaWrapper);
  introductionFirstWrapper.append(introduction1Paragraph, introduction2Paragraph);
  introductionSecondWrapper.append(introduction3Paragraph, introduction4Paragraph);
  introductionWrapper.append(introductionFirstWrapper, introductionSecondWrapper);
  aboutUsWrapper.append(introductionWrapper, aboutUsSchoolLogoLink, developersWrapper);
  return aboutUsWrapper;
}

export default renderAboutUsContent;
