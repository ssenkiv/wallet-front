export type Currency = "USD" | "EUR" | "UAH";

export interface Wallet {
  id: string;
  accountId: number;
  currency: Currency;
  balance: number;
}