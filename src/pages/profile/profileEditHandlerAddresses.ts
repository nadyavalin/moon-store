import { CustomerUpdateAction } from "@commercetools/platform-sdk";
import { getUserData, updateCustomer } from "../../api/api";
import { createSnackbar } from "../../components/elements";
import { SnackbarType } from "../../types/types";
import { changeStateBtnInput } from "./profileEditHandlerAccount";

export function editAddress(addressDataDiv: HTMLElement, addressType: string, addressID?: string): void {
  const btnEditAddress = <HTMLElement>addressDataDiv.querySelector(".edit-btn");
  const inputArr = Array.from(addressDataDiv.querySelectorAll("input"));
  const select = <HTMLElement>addressDataDiv.querySelector("select");
  inputArr.forEach((element: HTMLInputElement) => {
    changeStateBtnInput(element);
  });
  changeStateBtnInput(select, btnEditAddress);

  const addressObj = createAddressObject(addressDataDiv);
  if (addressID) {
    updateCustomerHandlerAddress(select, [{ action: "changeAddress", addressId: addressID, address: addressObj }]);
  } else {
    const addressObj = createAddressObject(addressDataDiv);
    updateCustomerHandlerAddress(select, [{ action: "addAddress", address: addressObj }], addressType);
  }
}

function updateCustomerHandlerAddress(select: HTMLElement, actions: CustomerUpdateAction[], addressType?: string) {
  if (select.className.includes("active-input")) return;
  // if (!inputArr.every((element: HTMLElement) => (element as HTMLInputElement).value.length !== 0)) {
  //   createSnackbar(SnackbarType.error, "Введите значения");
  //   return;
  // }
  getUserData()?.then(({ body }) => {
    const version = Number(body.version);
    updateCustomer(version, actions)
      ?.then((response) => {
        if (response.statusCode === 200) {
          createSnackbar(SnackbarType.success, "Изменения сохранены");
          if (addressType === "shipping") {
            updateCustomer(version + 1, [
              { action: "addShippingAddressId", addressId: response.body.addresses[response.body.addresses.length - 1].id },
            ]);
          }
          if (addressType === "billing") {
            updateCustomer(version + 1, [
              { action: "addBillingAddressId", addressId: response.body.addresses[response.body.addresses.length - 1].id },
            ]);
          }
        }
      })
      .catch(() => {
        createSnackbar(SnackbarType.error, "Что-то пошло не так...Попробуйте позже");
      });
  });
}

function createAddressObject(addressDataDiv: Element) {
  const country = <HTMLInputElement>addressDataDiv.querySelector(`.countries__input`);
  const city = <HTMLInputElement>addressDataDiv.querySelector(`.city__input`);
  const street = <HTMLInputElement>addressDataDiv.querySelector(`.street__input`);
  const index = <HTMLInputElement>addressDataDiv.querySelector(`.index__input`);
  const checkbox = <HTMLInputElement>addressDataDiv.querySelector(`.setting-default-address-checkbox`);
  const addressObj = {
    city: city.value,
    streetName: street.value,
    postalCode: index.value,
    country: country.value,
  };
  return addressObj;
}

export function removeAddress(addressDiv: HTMLElement, addressID?: string): void {
  alert(addressID);
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
