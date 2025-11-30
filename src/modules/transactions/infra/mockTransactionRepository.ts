import TransactionRepository from '@/modules/transactions/domain/transactionRepository'
import TransferCommand from '@/modules/transactions/types/transferCommand'
import Transaction from '@/modules/transactions/domain/transaction'
import DepositCommand from '@/modules/transactions/types/depositCommand'
import WithdrawCommand from '@/modules/transactions/types/withdrawCommand'
import { mockWalletRepository } from '@/modules/wallets/infra/mockWalletRepository'

const walletRepository = mockWalletRepository
const ID_COUNTER_KEY = 'mock_transactions_counter'

function getNextId (): number {
  if (typeof globalThis.window === 'undefined') return Date.now()

  const stored = localStorage.getItem(ID_COUNTER_KEY)
  const currentId = stored ? Number.parseInt(stored, 10) : 10
  const nextId = currentId + 1
  localStorage.setItem(ID_COUNTER_KEY, nextId.toString())
  return nextId
}

export default function createTransactionRepository (): TransactionRepository {
  return {
    transfer,
    deposit,
    withdraw,
    getById,
    getAll,

  }
}

async function transfer (transferCommand: TransferCommand): Promise<Transaction | undefined> {
  const allWallets = await walletRepository.getAllWallets()
  const walletTo = allWallets.find(wallet => wallet.accountId === transferCommand.accountIdTo)
  const walletFrom = allWallets.find(wallet => wallet.accountId === transferCommand.accountIdFrom)

  if (walletFrom && walletTo) {
    if (walletTo.currency !== transferCommand.currency && walletFrom.currency !== transferCommand.currency) {
      throw new Error('Invalid currency for transfer')
    }
    if (walletFrom.amount >= transferCommand.amount) {
      walletFrom.amount -= transferCommand.amount
      walletTo.amount += transferCommand.amount
      return {
        transactionId: getNextId(),
        accountIdFrom: transferCommand.accountIdFrom,
        accountIdTo: transferCommand.accountIdTo,
        currency: transferCommand.currency,
        amount: transferCommand.amount,

      }
    }
  }
}

async function deposit (depositCommand: DepositCommand): Promise<Transaction> {
  const allWallets = await walletRepository.getAllWallets();
  const walletToDeposit = allWallets.find(wallet => wallet.accountId === depositCommand.accountIdTo);
  if (walletToDeposit && walletToDeposit.currency === depositCommand.currency) {
    walletToDeposit.amount += depositCommand.amount;
  }
}

function withdraw (withdrawCommand: WithdrawCommand): Promise<Transaction> {

}

function getById (id: number): Promise<Transaction> {

}

function getAll (): Promise<Transaction[]> {

}
