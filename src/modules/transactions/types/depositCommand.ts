import { Currency } from '@/modules/wallets/domain/currency'

export interface DepositCommand {
  accountIdTo: number
  amount: number
  currency: Currency
  description?: string
}