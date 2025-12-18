import { Currency } from '@/modules/wallets/domain/currency'

export type TransactionStatus = 'pending' | 'completed' | 'failed'
export type TransactionType = 'deposit' | 'withdraw' | 'transfer'

export interface Transaction {
  transactionId: number
  type: TransactionType
  accountIdFrom?: number
  accountIdTo?: number
  amount: number
  currency: Currency
  status: TransactionStatus
  createdAt: Date
  description?: string
}