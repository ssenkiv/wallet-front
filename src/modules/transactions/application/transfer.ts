import { TransactionRepository } from '@/modules/transactions/domain/transactionRepository'
import { TransferCommand } from '@/modules/transactions/types/transferCommand'
import { Transaction } from '@/modules/transactions/domain/transaction'

export function transfer (transactionRepository: TransactionRepository) {
  return (transferCommand: TransferCommand): Promise<Transaction> => {
    return transactionRepository.transfer(transferCommand);
  }
}
