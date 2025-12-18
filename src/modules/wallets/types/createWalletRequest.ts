import { Currency } from '@/modules/wallets/domain/currency'

export interface CreateWalletRequest {
  accountId: number,
  currency: Currency
}