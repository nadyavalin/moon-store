import { correctFactorForPrices } from "../api/constants";

export class PriceFormatter {
  static format(amount = 0) {
    return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0 }).format(amount);
  }

  static formatCents(amount = 0) {
    return PriceFormatter.format(amount / correctFactorForPrices);
  }
}

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

export function generateRandomString(length: number) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
}
