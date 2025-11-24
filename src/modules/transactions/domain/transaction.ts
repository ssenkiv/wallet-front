import { Currency } from '@/modules/wallets/domain/currency'

export default interface Transaction {
  transactionId: string,
  accountIdFrom?: number,
  accountIdTo?: number,
  amount: number,
  currency: Currency
}