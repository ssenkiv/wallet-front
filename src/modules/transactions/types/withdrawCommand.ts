import { Currency } from '@/modules/wallets/domain/currency'

export interface WithdrawCommand {
  accountIdFrom: number
  amount: number
  currency: Currency
  description?: string
}