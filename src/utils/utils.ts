export const priceFormatter = new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0 });

// export function setItemToLocalStorage(key: string, value: string) {
//   localStorage.setItem(key, value);
// }

// export function getItemFromLocalStorage(key: string) {
//   if (localStorage.getItem(key)) {
//     const item = localStorage.getItem(key);
//     return item;
//   }
//   return null;
// }

export function setItemToLocalStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify({ value }));
}

export function getItemFromLocalStorage<T>(key: string): T | string | null {
  const item = localStorage.getItem(key);

  if (!item) {
    return null;
  }

  try {
    return JSON.parse(item).value;
  } catch {
    return item;
  }
}

export default priceFormatter;
