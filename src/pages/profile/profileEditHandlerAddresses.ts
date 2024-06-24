import { CustomerUpdateAction } from "@commercetools/platform-sdk";
import { getUserData, updateCustomer } from "../../api/api";
import { createSnackbar } from "../../components/elements";
import { AddressType, SnackbarType } from "../../types/types";
import { changeStateBtnInput } from "./profileEditHandlerAccount";

export function editAddress({
  addressDataDiv,
  addressType,
  addressEditBtn,
}: {
  addressDataDiv: HTMLElement;
  addressType: AddressType;
  addressEditBtn: HTMLElement;
}): void {
  const inputArr = Array.from(addressDataDiv.querySelectorAll("input"));
  const select = <HTMLElement>addressDataDiv.querySelector("select");
  inputArr.forEach((element: HTMLInputElement) => {
    changeStateBtnInput(element);
  });
  changeStateBtnInput(select, addressEditBtn);
  const addressObj = createAddressObject(addressDataDiv);
  if (addressDataDiv.id) {
    updateCustomerHandlerAddress({
      select,
      actions: [{ action: "changeAddress", addressId: addressDataDiv.id, address: addressObj }],
      isNewAddress: false,
      addressType,
      addressDataDiv,
    });
  } else {
    updateCustomerHandlerAddress({
      select,
      actions: [{ action: "addAddress", address: addressObj }],
      isNewAddress: true,
      addressType,
      addressDataDiv,
    });
  }
}

function updateCustomerHandlerAddress({
  select,
  actions,
  isNewAddress,
  addressType,
  addressDataDiv,
}: {
  select: HTMLElement;
  actions: CustomerUpdateAction[];
  isNewAddress: boolean;
  addressType: AddressType;
  addressDataDiv: HTMLElement;
}) {
  if (select.className.includes("active-input")) return;
  getUserData()
    ?.then(({ body }) => {
      updateCustomer(body.version, actions)?.then((response) => {
        if (response.statusCode === 200) {
          createSnackbar(SnackbarType.success, "Изменения сохранены");
          const addressIdNew = response.body.addresses[response.body.addresses.length - 1].id;
          const checkbox = <HTMLInputElement>addressDataDiv.querySelector(".setting-default-address-checkbox");
          let addressIDForDefault;
          if (isNewAddress) {
            addressDataDiv.id = `${addressIdNew}`;
            addressIDForDefault = checkbox.checked ? addressIdNew : undefined;
          }
          if (!isNewAddress) {
            addressIDForDefault = checkbox.checked ? addressDataDiv.id : undefined;
          }
          const actions: CustomerUpdateAction[] = [
            {
              action: addressType === AddressType.shipping ? "setDefaultShippingAddress" : "setDefaultBillingAddress",
              addressId: addressIDForDefault,
            },
          ];
          if (isNewAddress) {
            actions.push({ action: addressType === AddressType.shipping ? "addShippingAddressId" : "addBillingAddressId", addressId: addressIdNew });
          }
          updateCustomer(response.body.version, actions);
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
    createSnackbar(SnackbarType.success, "Адрес удален");
    return;
  }
  getUserData()?.then(({ body }) => {
    const version = body.version;
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
