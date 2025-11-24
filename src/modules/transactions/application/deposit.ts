import TransactionRepository from '@/modules/transactions/domain/transactionRepository'
import DepositCommand from '@/modules/transactions/types/depositCommand'
import Transaction from '@/modules/transactions/domain/transaction'

export default function deposit (transactionRepository: TransactionRepository) {
  return (depositCommand: DepositCommand): Promise<Transaction> => {
    return transactionRepository.deposit(depositCommand)
  }
}