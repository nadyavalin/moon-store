import { CustomerUpdateAction } from "@commercetools/platform-sdk";
import { getUserData, updateCustomer } from "../../api/api";
import { createSnackbar } from "../../components/elements";
import { SnackbarType } from "../../types/types";
import { changeStateBtnInput } from "./profileEditHandlerAccount";

export function editAddress(addressDataDiv: HTMLElement, addressType: string, addressID?: string): void {
  const btnEditAddress = <HTMLElement>addressDataDiv.querySelector(".edit-btn");
  const inputArr = Array.from(addressDataDiv.querySelectorAll("input"));
  const select = <HTMLElement>addressDataDiv.querySelector("select");
  const checkbox = <HTMLInputElement>addressDataDiv.querySelector(".setting-default-address-checkbox");
  inputArr.forEach((element: HTMLInputElement) => {
    changeStateBtnInput(element);
  });
  changeStateBtnInput(select, btnEditAddress);
  const addressObj = createAddressObject(addressDataDiv);
  if (addressID) {
    updateCustomerHandlerAddress(select, [{ action: "changeAddress", addressId: addressID, address: addressObj }], checkbox, false, addressType);
  } else {
    const addressObj = createAddressObject(addressDataDiv);
    updateCustomerHandlerAddress(select, [{ action: "addAddress", address: addressObj }], checkbox, true, addressType);
  }
}

function updateCustomerHandlerAddress(
  select: HTMLElement,
  actions: CustomerUpdateAction[],
  checkbox: HTMLInputElement,
  isNewAddress: boolean,
  addressType?: string,
) {
  if (select.className.includes("active-input")) return;
  getUserData()
    ?.then(({ body }) => {
      updateCustomer(body.version, actions)?.then((response) => {
        if (response.statusCode === 200) {
          createSnackbar(SnackbarType.success, "Изменения сохранены");
          const addressId = response.body.addresses[response.body.addresses.length - 1].id;
          let addressIDForDefault;
          if (checkbox.checked) {
            addressIDForDefault = addressId;
          } else {
            addressIDForDefault = undefined;
          }
          if (addressType === "shipping") {
            updateCustomer(response.body.version, [
              { action: "addShippingAddressId", addressId },
              { action: "setDefaultShippingAddress", addressId: addressIDForDefault },
            ]);
          }
          if (addressType === "billing") {
            updateCustomer(response.body.version, [
              { action: "addBillingAddressId", addressId },
              { action: "setDefaultBillingAddress", addressId: addressIDForDefault },
            ]);
          }
        }
      });
    })
    .catch(() => {
      createSnackbar(SnackbarType.error, "Что-то пошло не так...Попробуйте позже");
    });
}

function createAddressObject(addressDataDiv: Element) {
  const country = <HTMLInputElement>addressDataDiv.querySelector(`.countries__input`);
  const city = <HTMLInputElement>addressDataDiv.querySelector(`.city__input`);
  const street = <HTMLInputElement>addressDataDiv.querySelector(`.street__input`);
  const index = <HTMLInputElement>addressDataDiv.querySelector(`.index__input`);

  const addressObj = {
    city: city.value,
    streetName: street.value,
    postalCode: index.value,
    country: country.value,
  };
  return addressObj;
}

export function removeAddress(addressDiv: HTMLElement, addressID?: string): void {
  const addressesShipping = document.querySelectorAll(".address-shipping-info");
  const addressesBilling = document.querySelectorAll(".address-billing-info");
  if (addressesShipping.length === 1 && addressesBilling.length === 1) {
    createSnackbar(SnackbarType.error, "Невозможно удалить, должен присутствовать хотя бы один адрес");
    return;
  }
  if (!addressID) {
    addressDiv.remove();
    return;
  }
  getUserData()?.then(({ body }) => {
    const version = Number(body.version);
    updateCustomer(version, [{ action: "removeAddress", addressId: addressID }])
      ?.then((response) => {
        if (response.statusCode === 200) {
          createSnackbar(SnackbarType.success, "Адрес удален");
          addressDiv.remove();
        }
      })
      .catch(() => {
        createSnackbar(SnackbarType.error, "Что-то пошло не так...Попробуйте позже");
      });
  });
}
