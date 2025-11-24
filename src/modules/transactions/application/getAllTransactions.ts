import TransactionRepository from '@/modules/transactions/domain/transactionRepository'

export default function getAllTransactions (transactionRepository: TransactionRepository) {
  return () => transactionRepository.getAll();
}