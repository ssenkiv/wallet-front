import { Currency } from '@/modules/wallets/domain/currency'
import { TransactionStatus, TransactionType } from '@/modules/transactions/domain/transaction'

export interface TransactionViewModel {
  id: number
  type: TransactionType
  typeLabel: string
  accountIdFrom?: number
  accountIdTo?: number
  accountsDisplay: string
  amount: number
  currency: Currency
  formattedAmount: string
  status: TransactionStatus
  statusLabel: string
  statusColor: 'success' | 'warning' | 'danger'
  createdAt: Date
  formattedCreatedAt: string
  description?: string
}
