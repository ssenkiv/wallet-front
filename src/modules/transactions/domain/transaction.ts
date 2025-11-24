import { Currency } from '@/modules/wallets/domain/currency'

export default interface Transaction {
  transactionId: number,
  accountIdFrom?: number,
  accountIdTo?: number,
  amount: number,
  currency: Currency
}