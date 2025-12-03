import Transaction from '@/modules/transactions/domain/transaction'
import { TransactionViewModel } from './transactionViewModel'

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  UAH: '₴',
}

const TYPE_LABELS: Record<string, string> = {
  deposit: 'Deposit',
  withdraw: 'Withdrawal',
  transfer: 'Transfer',
}

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  completed: 'Completed',
  failed: 'Failed',
}

const STATUS_COLORS: Record<string, 'success' | 'warning' | 'danger'> = {
  pending: 'warning',
  completed: 'success',
  failed: 'danger',
}

export default function getTransactionViewModel(
  transaction: Transaction
): TransactionViewModel {
  const currencySymbol = CURRENCY_SYMBOLS[transaction.currency] || transaction.currency

  const formattedAmount = `${currencySymbol}${transaction.amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

  const formattedCreatedAt = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(transaction.createdAt)

  let accountsDisplay = ''
  if (transaction.type === 'deposit') {
    accountsDisplay = `→ #${transaction.accountIdTo}`
  } else if (transaction.type === 'withdraw') {
    accountsDisplay = `#${transaction.accountIdFrom} →`
  } else {
    accountsDisplay = `#${transaction.accountIdFrom} → #${transaction.accountIdTo}`
  }

  return {
    id: transaction.transactionId,
    type: transaction.type,
    typeLabel: TYPE_LABELS[transaction.type],
    accountIdFrom: transaction.accountIdFrom,
    accountIdTo: transaction.accountIdTo,
    accountsDisplay,
    amount: transaction.amount,
    currency: transaction.currency,
    formattedAmount,
    status: transaction.status,
    statusLabel: STATUS_LABELS[transaction.status],
    statusColor: STATUS_COLORS[transaction.status],
    createdAt: transaction.createdAt,
    formattedCreatedAt,
    description: transaction.description,
  }
}
