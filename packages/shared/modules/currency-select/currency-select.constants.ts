export const HEADER_CURRENCY_VALUES = {
  USDT: "USD Tether",
  BTC: "Bitcoin",
  ETH: "Ethereum",
  ADA: "Cardano",
  USD: "US Dollar",
  EUR: "Euro",
  XRP: "Ripple",
  BCH: "Bitcoin Cash",
  LTC: "Litecoin",
  DOGE: "Dogecoin"
};

export type CURRENCIES = keyof typeof CURRENCY_VALUES;

export const CURRENCY_VALUES = {
  GVT: "Genesis Vision Token",
  ...HEADER_CURRENCY_VALUES
};

export enum CURRENCY_VALUES_ENUM {
  USDT = "USD Tether",
  BTC = "Bitcoin",
  ETH = "Ethereum",
  ADA = "Cardano",
  USD = "US Dollar",
  EUR = "Euro",
  XRP = "Ripple",
  BCH = "Bitcoin Cash",
  LTC = "Litecoin",
  DOGE = "Dogecoin",
  GVT = "Genesis Vision Token"
}
