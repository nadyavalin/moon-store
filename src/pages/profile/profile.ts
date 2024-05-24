import { Address, AddressDraft, BaseAddress, Customer, CustomerDraft, MyCustomerDraft } from "@commercetools/platform-sdk";
import { getUserData } from "../../api/api";
import { createElement, createSnackbar } from "../../components/elements";
import "./profile.css";
import "../../index.css";
import { cityPattern, indexPattern, namePattern, streetPattern, surnamePattern } from "../registration/registrationView";
import { SnackbarType } from "src/types/types";

export const renderCustomerDataFromApi = () =>
  getUserData().then((response) => {
    if (response.statusCode === 200) {
      document.querySelector("profile-wrapper")?.remove();
      renderProfileContent(response.body);
    } else {
      createSnackbar(SnackbarType.error, "Что-то пошло не так... Повторите попытку позже.");
    }
  });

export const profile = createElement({ tagName: "div", classNames: ["profile-wrapper"] });

function renderProfileContent(response: Customer): void {
  const titleMain = createElement({ tagName: "h2", classNames: ["profile__heading"], textContent: "Профиль пользователя" });
  const accountWrapper = createElement({ tagName: "div", classNames: ["profile-account-wrapper"] });
  const addressesWrapper = createElement({ tagName: "div", classNames: ["profile-addresses-wrapper"] });
  createAccountView(response, accountWrapper);
  createAddressesView(response, addressesWrapper);
  profile.append(titleMain, accountWrapper, addressesWrapper);
}

function createAccountView(response: Customer, parent: HTMLElement) {
  const iconUser = createElement({ tagName: "div", classNames: ["profile-account__user-icon"], innerHTML: '<i class="fa-regular fa-user"></i>' });
  const accountInfo = createElement({ tagName: "div", classNames: ["profile-account__data"] });

  const nameDiv = createElement({
    tagName: "div",
    classNames: ["name_wrapper"],
  });
  const nameHeading = createElement({
    tagName: "span",
    classNames: ["name__heading"],
    textContent: "Имя",
  });
  const name = createElement({
    tagName: "input",
    classNames: ["name"],
    attributes: {
      name: "name",
      type: "text",
      pattern: `${namePattern}`,
      required: "true",
      value: `${response.firstName}`,
    },
  });
  nameDiv.append(nameHeading, name);

  const surnameDiv = createElement({
    tagName: "div",
    classNames: ["surname_wrapper"],
  });
  const surnameHeading = createElement({
    tagName: "span",
    classNames: ["surname__heading"],
    textContent: "Фамилия",
  });
  const surname = createElement({
    tagName: "input",
    classNames: ["surname"],
    attributes: {
      name: "surname",
      type: "text",
      pattern: `${surnamePattern}`,
      required: "true",
      value: `${response.lastName}`,
    },
  });
  surnameDiv.append(surnameHeading, surname);
  const birthdayDiv = createElement({
    tagName: "div",
    classNames: ["birthday_wrapper"],
  });
  const birthdayHeading = createElement({
    tagName: "span",
    classNames: ["birthday__heading"],
    textContent: "День рождения",
  });
  const birthday = createElement({
    tagName: "input",
    classNames: ["birthday"],
    attributes: {
      name: "birthday",
      type: "date",
      required: "true",
      value: `${response.dateOfBirth}`,
    },
  });
  birthdayDiv.append(birthdayHeading, birthday);
  accountInfo.append(nameDiv, surnameDiv, birthdayDiv);
  parent.append(iconUser, accountInfo);
}

function createAddressesView(response: Customer, parent: HTMLElement) {
  const addressesShippingWrapper = createElement({ tagName: "div", classNames: ["addresses-shipping-wrapper"] });
  const addressesBillingWrapper = createElement({ tagName: "div", classNames: ["addresses-billing-wrapper"] });
  const addressesShippingHeading = createElement({ tagName: "div", classNames: [`addresses-shipping__heading`], textContent: "Адреса для доставки" });
  const addressesBillingHeading = createElement({ tagName: "div", classNames: [`addresses-billing__heading`], textContent: "Адреса для счетов" });
  const addressesShippingInfo = createElement({ tagName: "div", classNames: ["addresses-shipping-info"] });
  const addressesBillingInfo = createElement({ tagName: "div", classNames: ["addresses-billing-info"] });
  addressesShippingWrapper.append(addressesShippingHeading, addressesShippingInfo);
  addressesBillingWrapper.append(addressesBillingHeading, addressesBillingInfo);
  response.addresses?.forEach((address) => {
    response.shippingAddressIds?.forEach((shippingAddress) => {
      let isDefaultAddress = false;
      if (response.defaultShippingAddressId === shippingAddress) isDefaultAddress = true;
      if (shippingAddress === address.id) createAddressView(address, "shipping", addressesShippingInfo, isDefaultAddress);
    });
    response.billingAddressIds?.forEach((billingAddress) => {
      let isDefaultAddress = false;
      if (response.defaultBillingAddressId === billingAddress) isDefaultAddress = true;
      if (billingAddress === address.id) createAddressView(address, "billing", addressesBillingInfo, isDefaultAddress);
    });
  });
  parent.append(addressesShippingWrapper, addressesBillingWrapper);
}

function createAddressView(response: Address, addressType: string, parent: HTMLElement, isDefaultAddress: boolean) {
  const iconAddress = createElement({
    tagName: "div",
    classNames: [`addresses-${addressType}__address-icon`],
    innerHTML: '<i class="fa-solid fa-truck-fast"></i>',
  });
  const addressInfo = createElement({ tagName: "div", classNames: [`addresses-${addressType}__data`] });

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
    classNames: [`countries-${addressType}`],
    attributes: {
      name: `countries-${addressType}`,
      value: response.country,
    },
    textContent: "Страна",
  });
  countryDiv.append(countryHeading, country);
  const optionBelarus = createElement({ tagName: "option", classNames: ["option-country"], textContent: "Беларусь" });
  optionBelarus.value = "BY";
  const optionRussia = createElement({ tagName: "option", classNames: ["option-country"], textContent: "Россия" });
  optionRussia.value = "RU";
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
    classNames: [`city-${addressType}`],
    attributes: {
      name: `city-${addressType}`,
      type: "text",
      pattern: `${cityPattern}`,
      required: "true",
      value: <string>response.city,
    },
  });
  cityDiv.append(cityHeading, city);
  const streetDiv = createElement({
    tagName: "div",
    classNames: ["city_wrapper"],
  });
  const streetHeading = createElement({
    tagName: "span",
    classNames: ["street__heading"],
    textContent: "Улица",
  });
  const street = createElement({
    tagName: "input",
    classNames: [`street-${addressType}`],
    attributes: {
      name: `street-${addressType}`,
      type: "text",
      pattern: `${streetPattern}`,
      required: "true",
      value: <string>response.streetName,
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
    classNames: [`index-${addressType}`],
    attributes: {
      name: `index-${addressType}`,
      type: "text",
      pattern: `${indexPattern}`,
      required: "true",
      value: <string>response.postalCode,
    },
  });
  indexDiv.append(indexHeading, index);
  const checkboxSettingDefaultAddress = createElement({
    tagName: "input",
    classNames: [`setting-default-address-${addressType}`],
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

  checkboxWrapper.append(checkboxSettingDefaultAddress, labelSettingDefaultAddress);

  addressInfo.append(countryDiv, cityDiv, streetDiv, indexDiv, checkboxWrapper);
  parent.append(iconAddress, addressInfo);
}
