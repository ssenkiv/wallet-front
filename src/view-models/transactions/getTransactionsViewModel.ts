import { Transaction } from '@/modules/transactions/domain/transaction'
import getTransactionViewModel from './getTransactionViewModel'
import { TransactionViewModel } from './transactionViewModel'

export default function getTransactionsViewModel(
  transactions: Transaction[]
): TransactionViewModel[] {
  return transactions.map((tx) => getTransactionViewModel(tx))
}
