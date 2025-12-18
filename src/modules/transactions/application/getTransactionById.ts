import { TransactionRepository } from '@/modules/transactions/domain/transactionRepository'
import { Transaction } from '@/modules/transactions/domain/transaction'

export function getTransactionById (transactionRepository: TransactionRepository) {
  return (transactionId: number): Promise<Transaction> => {
    return transactionRepository.getById(transactionId)
  }
}
