import "./productBasketCard.css";
import "../../product/product.css";
import { createElement } from "../../../components/elements";
import { changeQuantityProduct, removeProduct } from "../basketHandler";
import { Cart } from "@commercetools/platform-sdk";
import { PriceFormatter } from "../../../utils/utils";

export function createBasketCard(index: number, response?: Cart) {
  const imgUrlItem = `${response?.lineItems[index].variant.images![0].url}`;
  const id = response?.lineItems[index].id;
  const nameItem = response?.lineItems[index].name.ru;
  const quantityItem = response?.lineItems[index].quantity;
  const sizeItem = response?.lineItems[index].variant.attributes![0].value[0].key;
  const priceItem = PriceFormatter.formatCents(response?.lineItems[index].price.value.centAmount);
  const priceTotalItem = PriceFormatter.formatCents(response?.lineItems[index].totalPrice.centAmount);
  const priceDiscountedItem = response?.lineItems[index].price.discounted?.value.centAmount
    ? PriceFormatter.formatCents(response?.lineItems[index].price.discounted?.value.centAmount)
    : priceItem;

  const productBasketItem = createElement({ tagName: "li", classNames: ["product-basket__item"], attributes: { "data-id": `${id}` } });
  const productBasketImage = createElement({
    tagName: "img",
    classNames: ["product-basket__image"],
    attributes: { src: imgUrlItem },
  });
  const productBasketDeleteIconWrapper = createElement({
    tagName: "div",
    classNames: ["product-basket__delete-button-wrapper"],
    attributes: { title: "Удалить из корзины" },
  });

  const productBasketDeleteIcon = createElement({ tagName: "i", classNames: ["fa-solid", "fa-trash", "trash-button"] });
  const productBasketTextWrapper = createElement({ tagName: "div", classNames: ["product-basket__text-wrapper"] });
  const productBasketName = createElement({
    tagName: "p",
    classNames: ["product-basket__name"],
    textContent: `Название: ${nameItem}`,
  });

  const productBasketAmountSizeWrapper = createElement({ tagName: "div", classNames: ["product-basket__amount-sizes-wrapper"] });
  const productBasketAmountWrapper = createElement({ tagName: "div", classNames: ["product-basket__amount-wrapper"] });
  const productBasketAmountText = createElement({ tagName: "p", classNames: ["product-basket__small-text"], textContent: "Количество: " });
  const productBasketAmountButtonsWrapper = createElement({ tagName: "div", classNames: ["product-basket__amount-buttons-wrapper"] });

  const productBasketPlusAmountButton = createElement({ tagName: "i", classNames: ["fa-solid", "fa-plus", "amount-button"] });
  const productBasketAmount = createElement({
    tagName: "p",
    classNames: ["product-basket__amount"],
    textContent: `${quantityItem}`,
  });
  const productBasketMinusAmountButton = createElement({ tagName: "i", classNames: ["fa-solid", "fa-minus", "amount-button"] });
  if (quantityItem === 1) {
    productBasketMinusAmountButton.classList.add("disabled");
  }
  const productBasketSizeWrapper = createElement({ tagName: "div", classNames: ["product-basket__size-wrapper"] });
  const productBasketSizeText = createElement({ tagName: "p", classNames: ["product-basket__small-text"], textContent: "Размер: " });
  const productBasketSize = createElement({
    tagName: "span",
    classNames: ["product-basket__size-item"],
    textContent: `${sizeItem}`,
  });

  const productBasketPricesWrapper = createElement({ tagName: "div", classNames: ["product-basket__prices-wrapper"] });
  const productBasketPriceWrapper = createElement({ tagName: "div", classNames: ["product-basket__price-wrapper"] });
  const productBasketPriceText = createElement({ tagName: "p", classNames: ["product-basket__small-text"], textContent: "Цена за единицу: " });
  const productBasketPrice = createElement({
    tagName: "p",
    classNames: ["product-basket__price"],
    textContent: `${priceItem}`,
  });

  const productBasketDiscountWrapper = createElement({ tagName: "div", classNames: ["product-basket__discount-wrapper"] });
  const productBasketDiscountText = createElement({ tagName: "p", classNames: ["product-basket__small-text"] });
  const productBasketDiscountValue = createElement({
    tagName: "p",
    classNames: ["product-basket__discount"],
  });
  const productBasketFinalPriceWrapper = createElement({ tagName: "div", classNames: ["product-basket__final-price-wrapper"] });
  const productBasketFinalPriceText = createElement({
    tagName: "p",
    classNames: ["product-basket__small-text"],
    textContent: `Общая стоимость: `,
  });
  const productBasketFinalPrice = createElement({
    tagName: "p",
    classNames: ["product-basket__final-price"],
  });

  if (response?.lineItems[index].discountedPricePerQuantity.length !== 0) {
    const discount = PriceFormatter.formatCents(response?.lineItems[index].discountedPricePerQuantity[0].discountedPrice.value.centAmount);
    productBasketDiscountValue.textContent = `${discount}`;
    productBasketFinalPrice.textContent = `${priceTotalItem}`;
    productBasketDiscountText.textContent = "Со скидкой: ";
  } else {
    productBasketDiscountValue.textContent = `${priceDiscountedItem}`;
    productBasketFinalPrice.textContent = `${priceTotalItem}`;
    productBasketDiscountText.textContent = "Скидки нет";
  }

  productBasketAmountButtonsWrapper.append(productBasketPlusAmountButton, productBasketAmount, productBasketMinusAmountButton);
  productBasketPricesWrapper.append(productBasketPriceWrapper, productBasketDiscountWrapper, productBasketFinalPriceWrapper);
  productBasketAmountWrapper.append(productBasketAmountText, productBasketAmountButtonsWrapper);
  productBasketSizeWrapper.append(productBasketSizeText, productBasketSize);
  productBasketPriceWrapper.append(productBasketPriceText, productBasketPrice);
  productBasketFinalPriceWrapper.append(productBasketFinalPriceText, productBasketFinalPrice);

  productBasketDiscountWrapper.append(productBasketDiscountText, productBasketDiscountValue);

  productBasketAmountSizeWrapper.append(productBasketAmountWrapper, productBasketSizeWrapper);
  productBasketTextWrapper.append(productBasketName, productBasketAmountSizeWrapper, productBasketPricesWrapper);
  productBasketDeleteIconWrapper.append(productBasketDeleteIcon);
  productBasketItem.append(productBasketImage, productBasketTextWrapper, productBasketDeleteIconWrapper);

  productBasketPlusAmountButton.addEventListener("click", () =>
    changeQuantityProduct({
      btn: productBasketMinusAmountButton,
      countDiv: productBasketAmount,
      quantity: Number(productBasketAmount.textContent) + 1,
      totalPriceDiv: productBasketFinalPrice,
      lineItemId: `${response?.lineItems[index].id}`,
      lineItemIndex: index,
    }),
  );
  productBasketMinusAmountButton.addEventListener("click", () =>
    changeQuantityProduct({
      btn: productBasketMinusAmountButton,
      countDiv: productBasketAmount,
      quantity: Number(productBasketAmount.textContent) - 1,
      totalPriceDiv: productBasketFinalPrice,
      lineItemId: `${response?.lineItems[index].id}`,
      lineItemIndex: index,
    }),
  );
  productBasketDeleteIcon.addEventListener("click", () => removeProduct(`${response?.lineItems[index].id}`, productBasketItem));
  return productBasketItem;
}
