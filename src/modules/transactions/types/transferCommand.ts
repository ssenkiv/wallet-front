import { Currency } from '@/modules/wallets/domain/currency'

export interface TransferCommand {
  accountIdFrom: number
  accountIdTo: number
  amount: number
  currency: Currency
  description?: string
}