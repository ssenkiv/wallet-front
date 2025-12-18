import { Currency } from '@/modules/wallets/domain/currency'

export interface CreateWalletCommand {
  accountId: number,
  currency: Currency
}