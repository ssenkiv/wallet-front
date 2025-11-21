import { Currency } from '@/modules/wallets/domain/currency'

export interface WalletViewModel {
  id: number;
  accountId: number;
  currency: Currency;
  amount: number;
  formattedAmount: string;
}
