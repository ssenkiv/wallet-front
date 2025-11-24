import TransactionRepository from '@/modules/transactions/domain/transactionRepository'
import WithdrawCommand from '@/modules/transactions/types/withdrawCommand'
import Transaction from '@/modules/transactions/domain/transaction'

export default function withdraw (transactionRepository: TransactionRepository) {
  return (withdrawCommand: WithdrawCommand): Promise<Transaction> => {
    return transactionRepository.withdraw(withdrawCommand)
  }
}