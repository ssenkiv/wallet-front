import { Currency } from '@/modules/wallets/domain/currency'

export interface Wallet {
  id: number;
  accountId: number;
  currency: Currency;
  amount: number;
}