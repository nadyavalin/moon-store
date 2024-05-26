export class PriceFormatter {
  static format(amount = 0) {
    return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0 }).format(amount);
  }

  static formatCents(amount = 0) {
    return PriceFormatter.format(amount / 100);
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
