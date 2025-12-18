import { DepositCommand } from '@/modules/transactions/types/depositCommand'
import { Transaction } from '@/modules/transactions/domain/transaction'
import { WithdrawCommand } from '@/modules/transactions/types/withdrawCommand'
import { TransferCommand } from '@/modules/transactions/types/transferCommand'

export interface TransactionRepository {
  deposit (depositCommand: DepositCommand): Promise<Transaction>;

  withdraw (withdrawCommand: WithdrawCommand): Promise<Transaction>;

  transfer (transferCommand: TransferCommand): Promise<Transaction>;

  getById(transactionId: number): Promise<Transaction>;

  getAll(): Promise<Transaction[]>;
}
