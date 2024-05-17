export const priceFormatter = new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0 });

export function setItemToLocalStorage(key: string, value: string | undefined) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getItemFromLocalStorage(key: string): string | null {
  const item = localStorage.getItem(key);
  if (item) {
    return JSON.parse(item);
  }
  return null;
}

export default priceFormatter;
