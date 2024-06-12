import { createElement } from "../../../components/elements";
import "./promoCodes.css";

export function createPromoCodesBlock() {
  const promoCodesWrapper = createElement({ tagName: "div", classNames: ["promo-codes__wrapper"] });
  const promoCodeForFirstPurchaseWrapper = createElement({ tagName: "div", classNames: ["promo-code__first-purchase-wrapper"] });
  const promoCodeForPairTShirtsWrapper = createElement({ tagName: "div", classNames: ["promo-codes__pair-t-shirts-wrapper"] });

  const promoCodeText = createElement({ tagName: "h2", classNames: ["promo-code__text"], textContent: "Ваш промо код на первую покупку" });
  const promoCode = createElement({ tagName: "p", classNames: ["promo-code"], textContent: `fp1` });
  promoCodeForFirstPurchaseWrapper.append(promoCodeText);
  promoCodesWrapper.append(promoCodeForFirstPurchaseWrapper, promoCodeForPairTShirtsWrapper);
  return promoCodesWrapper;
}
