import { Address, Customer } from "@commercetools/platform-sdk";
import { createElement } from "../../components/elements";
import { cityPattern, cityTitle, indexPattern, indexTitle, streetPattern, streetTitle } from "../registration/registrationView";
import { editAddress, removeAddress } from "./profileEditHandlerAddresses";
import { addValidationListenersToInputProfile } from "./checkValidityProfile";

export function createAddressesView(response: Customer | undefined, parent: HTMLElement) {
  const addressesShippingWrapper = createElement({ tagName: "div", classNames: ["addresses-shipping-wrapper"] });
  const addressesBillingWrapper = createElement({ tagName: "div", classNames: ["addresses-billing-wrapper"] });
  const addressesShippingHeading = createElement({ tagName: "div", classNames: [`addresses-shipping__heading`], textContent: "Адреса для доставки" });
  const addressesBillingHeading = createElement({ tagName: "div", classNames: [`addresses-billing__heading`], textContent: "Адреса для счетов" });

  const addShippingAddressBtn = createElement({
    tagName: "div",
    classNames: ["add-btn", `address-shipping__add-btn`],
    innerHTML: '<i class="fa-solid fa-plus"></i>',
  });

  const addBillingAddressBtn = createElement({
    tagName: "div",
    classNames: ["add-btn", `address-billing__add-btn`],
    innerHTML: '<i class="fa-solid fa-plus"></i>',
  });
  let isNewAddress: boolean;
  addressesShippingWrapper.append(addressesShippingHeading, addShippingAddressBtn);
  addressesBillingWrapper.append(addressesBillingHeading, addBillingAddressBtn);
  response?.addresses?.forEach((address) => {
    isNewAddress = false;
    response.shippingAddressIds?.forEach((shippingAddressID) => {
      let isDefaultAddress = false;

      if (response.defaultShippingAddressId === shippingAddressID) isDefaultAddress = true;
      if (shippingAddressID === address.id) createAddressView("shipping", addressesShippingWrapper, isDefaultAddress, isNewAddress, address);
    });

    response.billingAddressIds?.forEach((billingAddressID) => {
      let isDefaultAddress = false;
      if (response.defaultBillingAddressId === billingAddressID) isDefaultAddress = true;
      if (billingAddressID === address.id) createAddressView("billing", addressesBillingWrapper, isDefaultAddress, isNewAddress, address);
    });
  });
  isNewAddress = true;
  addShippingAddressBtn.addEventListener("click", () => {
    createAddressView("shipping", addressesShippingWrapper, false, isNewAddress, response?.addresses[response?.addresses.length - 1]);
  });
  addBillingAddressBtn.addEventListener("click", () => {
    createAddressView("billing", addressesBillingWrapper, false, isNewAddress, response?.addresses[response?.addresses.length - 1]);
  });
  parent.append(addressesShippingWrapper, addressesBillingWrapper);
}

function createAddressView(addressType: string, parent: HTMLElement, isDefaultAddress: boolean, isNewAddress: boolean, address?: Address) {
  const addressInfo = createElement({ tagName: "div", classNames: [`address-${addressType}-info`] });
  const iconAddress = createElement({
    tagName: "div",
    classNames: [`address-${addressType}__address-icon`],
    innerHTML: '<i class="fa-solid fa-truck-fast"></i>',
  });
  const addressData = createElement({ tagName: "div", classNames: [`address__data`] });
  const addressEditBtn = createElement({
    tagName: "div",
    classNames: ["edit-btn", `address-${addressType}__edit-btn`],
    innerHTML: '<i class="fa-solid fa-pen"></i>',
  });
  if (!isNewAddress) addressData.classList.add(`${address?.id}`);

  addressEditBtn.addEventListener("click", () => {
    if (!isNewAddress) editAddress(addressData, addressType, address?.id);
    if (isNewAddress) editAddress(addressData, addressType);
  });
  const addressRemoveBtn = createElement({
    tagName: "div",
    classNames: ["remove-btn", `address-${addressType}__remove-btn`],
    innerHTML: '<i class="fa-solid fa-trash"></i>',
  });
  addressRemoveBtn.addEventListener("click", () => {
    if (!isNewAddress) removeAddress(addressInfo, address?.id);
    if (isNewAddress) removeAddress(addressInfo);
  });

  const countryDiv = createElement({
    tagName: "div",
    classNames: ["country_wrapper"],
  });
  const countryHeading = createElement({
    tagName: "span",
    classNames: ["country__heading"],
    textContent: "Страна",
  });

  const country = createElement({
    tagName: "select",
    classNames: ["countries__input", `countries-${addressType}__input`, "field"],
    attributes: {
      name: `countries-${addressType}`,
    },
    textContent: "Страна",
  });
  countryDiv.append(countryHeading, country, addressEditBtn, addressRemoveBtn);
  const optionBelarus = createElement({ tagName: "option", classNames: ["option-country"], textContent: "Беларусь" });
  optionBelarus.value = "BY";
  const optionRussia = createElement({ tagName: "option", classNames: ["option-country"], textContent: "Россия" });
  optionRussia.value = "RU";
  if (address && address.country === "RU") optionRussia.setAttribute("selected", "true");
  if (address && address.country === "BY") optionBelarus.setAttribute("selected", "true");
  country.append(optionBelarus, optionRussia);

  const cityDiv = createElement({
    tagName: "div",
    classNames: ["city_wrapper"],
  });
  const cityHeading = createElement({
    tagName: "span",
    classNames: ["city__heading"],
    textContent: "Город",
  });

  const city = createElement({
    tagName: "input",
    classNames: ["city__input", `city-${addressType}__input`, "field"],
    attributes: {
      name: `city-${addressType}`,
      type: "text",
      pattern: cityPattern,
      title: cityTitle,
      required: "true",
      value: <string>address?.city,
    },
  });

  cityDiv.append(cityHeading, city);
  const streetDiv = createElement({
    tagName: "div",
    classNames: ["street_wrapper"],
  });
  const streetHeading = createElement({
    tagName: "span",
    classNames: ["street__heading"],
    textContent: "Улица",
  });
  const street = createElement({
    tagName: "input",
    classNames: ["street__input", `street-${addressType}__input`, "field"],
    attributes: {
      name: `street-${addressType}`,
      type: "text",
      pattern: streetPattern,
      title: streetTitle,
      required: "true",
      value: <string>address?.streetName,
    },
  });

  streetDiv.append(streetHeading, street);

  const indexDiv = createElement({
    tagName: "div",
    classNames: ["index_wrapper"],
  });
  const indexHeading = createElement({
    tagName: "span",
    classNames: ["street__heading"],
    textContent: "Индекс",
  });
  const index = createElement({
    tagName: "input",
    classNames: ["index__input", `index-${addressType}__input`, "field"],
    attributes: {
      name: `index-${addressType}`,
      type: "text",
      pattern: indexPattern,
      title: indexTitle,
      required: "true",
      value: <string>address?.postalCode,
    },
  });

  indexDiv.append(indexHeading, index);
  const checkboxSettingDefaultAddress = createElement({
    tagName: "input",
    classNames: ["setting-default-address-checkbox", `setting-default-address-${addressType}`, "field"],
    attributes: { name: `setting-default-address-${addressType}`, type: "checkbox", id: `setting-default-address-${addressType}` },
  });
  const checkboxWrapper = createElement({ tagName: "div", classNames: ["profile__checkbox-wrapper"] });
  const labelSettingDefaultAddress = createElement({
    tagName: "label",
    classNames: ["profile__checkbox__label"],
    attributes: { for: `setting-default-address-${addressType}` },
    textContent: "Адрес по умолчанию",
  });
  if (isDefaultAddress === true) checkboxSettingDefaultAddress.setAttribute("checked", "true");
  addValidationListenersToInputProfile(city, streetDiv, addressData, ["pattern", "spaces"], addressEditBtn);
  addValidationListenersToInputProfile(street, indexDiv, addressData, ["pattern", "spaces"], addressEditBtn);
  addValidationListenersToInputProfile(index, checkboxWrapper, addressData, ["pattern", "spaces"], addressEditBtn);
  checkboxWrapper.append(checkboxSettingDefaultAddress, labelSettingDefaultAddress);
  addressData.append(countryDiv, cityDiv, streetDiv, indexDiv, checkboxWrapper);
  addressInfo.append(iconAddress, addressData);
  parent.append(addressInfo);
}
