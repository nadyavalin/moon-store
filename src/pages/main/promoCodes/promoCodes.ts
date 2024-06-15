import { getDiscounts } from "../../../api/api";
import { createElement } from "../../../components/elements";
import "./promoCodes.css";

export async function createPromoCodesBlock() {
  const response = await getDiscounts();
  console.log(response);
  const quantity = response?.body.results;
  const promoCodesWrapper = createElement({ tagName: "div", classNames: ["promo-codes__wrapper"] });

  quantity?.forEach((item) => {
    const promoCodeForPurchaseWrapper = createElement({ tagName: "div", classNames: ["promo-code__wrapper"] });
    const promoCodePurchaseTextWrapper = createElement({ tagName: "div", classNames: ["promo-code__text-wrapper"] });
    const promoCodePurchaseText = createElement({
      tagName: "p",
      classNames: ["promo-code__text"],
      textContent: `${item.description?.ru}`,
    });
    const promoCodePurchase = createElement({ tagName: "p", classNames: ["promo-code"], textContent: `${item.code}` });
    const promoCodeImage = createElement({
      tagName: "img",
      classNames: ["promo-code__image"],
      attributes: { src: "../../../../public/img/first-purchase.jpg", alt: `${item.description?.ru}` },
    });

    promoCodePurchaseTextWrapper.append(promoCodePurchaseText, promoCodePurchase);
    promoCodeForPurchaseWrapper.append(promoCodePurchaseTextWrapper, promoCodeImage);
    promoCodesWrapper.append(promoCodeForPurchaseWrapper);
  });
  return promoCodesWrapper;
}
