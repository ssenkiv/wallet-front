import { TransactionRepository } from '@/modules/transactions/domain/transactionRepository'

export function getAllTransactions (transactionRepository: TransactionRepository) {
  return () => transactionRepository.getAll();
}
