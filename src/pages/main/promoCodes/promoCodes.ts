import { createElement } from "../../../components/elements";
import "./promoCodes.css";

export function createPromoCodesBlock() {
  const promoCodesWrapper = createElement({ tagName: "div", classNames: ["promo-codes__wrapper"] });
  const promoCodeForFirstPurchaseWrapper = createElement({ tagName: "div", classNames: ["promo-code__wrapper"] });
  const promoCodeForPairTShirtsWrapper = createElement({ tagName: "div", classNames: ["promo-code__wrapper"] });

  const promoCodeFirstPurchaseImage = createElement({
    tagName: "img",
    classNames: ["promo-code__image"],
    attributes: { src: "../../../../public/img/first-purchase.jpg", alt: "Ваш персональный промокод на первую покупку" },
  });
  const promoCodeFirstPurchaseTextWrapper = createElement({ tagName: "div", classNames: ["promo-code__text-wrapper"] });
  const promoCodeFirstPurchaseText = createElement({
    tagName: "p",
    classNames: ["promo-code__text"],
    textContent: "Ваш промо код на первую покупку",
  });
  const promoCodeFirstPurchasePercent = createElement({ tagName: "p", classNames: ["promo-code__percent"], textContent: "5%" });
  const promoCodeFirstPurchase = createElement({ tagName: "p", classNames: ["promo-code"], textContent: `fp1` });

  const promoCodePairTShirtImage = createElement({
    tagName: "img",
    classNames: ["promo-code__image"],
    attributes: { src: "../../../../public/img/first-purchase.jpg", alt: "Ваш промокод на первую покупку" },
  });
  const promoCodePairTShirtTextWrapper = createElement({ tagName: "div", classNames: ["promo-code__text-wrapper"] });
  const promoCodePairTShirtText = createElement({
    tagName: "p",
    classNames: ["promo-code__text"],
    textContent: "Ваш промокод на покупку парных футболок",
  });
  const promoCodePairTShirtPercent = createElement({ tagName: "p", classNames: ["promo-code__percent"], textContent: "5%" });
  const promoCodePairTShirt = createElement({ tagName: "p", classNames: ["promo-code"], textContent: `pt2` });

  promoCodeFirstPurchaseTextWrapper.append(promoCodeFirstPurchaseText, promoCodeFirstPurchasePercent, promoCodeFirstPurchase);
  promoCodeForFirstPurchaseWrapper.append(promoCodeFirstPurchaseTextWrapper, promoCodeFirstPurchaseImage);
  promoCodeForPairTShirtsWrapper.append(promoCodePairTShirtTextWrapper, promoCodePairTShirtImage);
  promoCodePairTShirtTextWrapper.append(promoCodePairTShirtText, promoCodePairTShirtPercent, promoCodePairTShirt);
  promoCodesWrapper.append(promoCodeForFirstPurchaseWrapper, promoCodeForPairTShirtsWrapper);
  return promoCodesWrapper;
}
