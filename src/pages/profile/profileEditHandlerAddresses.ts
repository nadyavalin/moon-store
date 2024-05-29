import { CustomerUpdateAction } from "@commercetools/platform-sdk";
import { getUserData, updateCustomer } from "../../api/api";
import { createSnackbar } from "../../components/elements";
import { SnackbarType } from "../../types/types";
import { changeStateBtnInput } from "./profileEditHandlerAccount";
import state from "src/store/state";

export function editAddress(addressType: string, addressID?: string): void {
  let address;
  if (!addressID) address = document.querySelector(`.new-address`);
  if (addressID) address = document.querySelector(`.${addressID}`);
  if (!address) return;
  const btnEditAddress = <HTMLElement>address.querySelector(".edit-btn");
  const inputArr = Array.from(address.querySelectorAll("input"));
  const select = <HTMLElement>address?.querySelector("select");
  inputArr.forEach((element: HTMLElement) => {
    changeStateBtnInput(element);
  });
  changeStateBtnInput(select, btnEditAddress);
  const addressObj = createAddressObject(address);
  if (addressID) {
    updateCustomerHandlerAddress(select, [{ action: "changeAddress", addressId: addressID, address: addressObj }]);
  } else {
    const addressObj = createAddressObject(address);
    updateCustomerHandlerAddress(select, [{ action: "addAddress", address: addressObj }], addressType);
  }
}

function updateCustomerHandlerAddress(input: HTMLElement, actions: CustomerUpdateAction[], addressType?: string) {
  if (input.className.includes("active-input")) return;
  getUserData(state.customerId as string)?.then(({ body }) => {
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

function createAddressObject(address: Element) {
  const country = <HTMLInputElement>address.querySelector(`.countries__input`);
  const city = <HTMLInputElement>address.querySelector(`.city__input`);
  const street = <HTMLInputElement>address.querySelector(`.street__input`);
  const index = <HTMLInputElement>address.querySelector(`.index__input`);
  const checkbox = <HTMLInputElement>address.querySelector(`.setting-default-address-checkbox`);
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
  getUserData(state.customerId as string)?.then(({ body }) => {
    const version = Number(body.version);
    if (!addressID) {
      addressDiv.remove();
      return;
    }
    updateCustomer(version, [{ action: "removeAddress", addressId: addressID }])
      ?.then((response) => {
        if (response.statusCode === 200) {
          createSnackbar(SnackbarType.success, "Изменения сохранены");
          addressDiv.remove();
        }
      })
      .catch(() => {
        createSnackbar(SnackbarType.error, "Что-то пошло не так...Попробуйте позже");
      });
  });
}
