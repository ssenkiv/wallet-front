import TransactionRepository from '@/modules/transactions/domain/transactionRepository'
import TransferCommand from '@/modules/transactions/types/transferCommand'
import Transaction from '@/modules/transactions/domain/transaction'
import DepositCommand from '@/modules/transactions/types/depositCommand'
import WithdrawCommand from '@/modules/transactions/types/withdrawCommand'
import { mockWalletRepository } from '@/modules/wallets/infra/mockWalletRepository'

const walletRepository = mockWalletRepository

const STORAGE_KEY = 'mock_transactions'
const ID_COUNTER_KEY = 'mock_transactions_counter'

const initialMockTransactions: Transaction[] = [
  {
    transactionId: 1,
    type: 'deposit',
    accountIdTo: 1,
    amount: 500000,
    currency: 'EUR',
    status: 'completed',
    createdAt: new Date('2024-01-15'),
    description: 'Initial deposit',
  },
  {
    transactionId: 2,
    type: 'deposit',
    accountIdTo: 1,
    amount: 702390,
    currency: 'EUR',
    status: 'completed',
    createdAt: new Date('2024-02-20'),
    description: 'Salary payment',
  },
  {
    transactionId: 3,
    type: 'transfer',
    accountIdFrom: 1,
    accountIdTo: 2,
    amount: 50000,
    currency: 'EUR',
    status: 'completed',
    createdAt: new Date('2024-03-10'),
    description: 'Payment for services',
  },
]

function loadTransactions(): Transaction[] {
  if (typeof globalThis.window === 'undefined') return []

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return []

  const transactions = JSON.parse(stored)
  return transactions.map((tx: Transaction) => ({
    ...tx,
    createdAt: new Date(tx.createdAt),
  }))
}

function saveTransactions(transactions: Transaction[]): void {
  if (typeof globalThis.window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  }
}

function getNextId(): number {
  if (typeof globalThis.window === 'undefined') return Date.now()

  const stored = localStorage.getItem(ID_COUNTER_KEY)
  const currentId = stored ? Number.parseInt(stored, 10) : 10
  const nextId = currentId + 1
  localStorage.setItem(ID_COUNTER_KEY, nextId.toString())
  return nextId
}

function initializeStorage(): void {
  if (typeof globalThis.window === 'undefined') return

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    saveTransactions(initialMockTransactions)
  }
}

if (typeof globalThis.window !== 'undefined') {
  initializeStorage()
}

export default function createTransactionRepository(): TransactionRepository {
  return {
    transfer,
    deposit,
    withdraw,
    getById,
    getAll,
  }
}

async function deposit(depositCommand: DepositCommand): Promise<Transaction> {
  const allWallets = await walletRepository.getAllWallets()
  const walletToDeposit = allWallets.find(
    (wallet) => wallet.accountId === depositCommand.accountIdTo
  )

  if (!walletToDeposit) {
    throw new Error(`Wallet not found for account ${depositCommand.accountIdTo}`)
  }

  if (walletToDeposit.currency !== depositCommand.currency) {
    throw new Error(
      `Currency mismatch: wallet uses ${walletToDeposit.currency}, but deposit is in ${depositCommand.currency}`
    )
  }

  await walletRepository.updateWallet({
    walletId: walletToDeposit.id,
    amount: walletToDeposit.amount + depositCommand.amount,
  })

  const transaction: Transaction = {
    transactionId: getNextId(),
    type: 'deposit',
    accountIdTo: depositCommand.accountIdTo,
    amount: depositCommand.amount,
    currency: depositCommand.currency,
    status: 'completed',
    createdAt: new Date(),
    description: depositCommand.description,
  }

  const transactions = loadTransactions()
  saveTransactions([...transactions, transaction])

  return transaction
}

async function withdraw(withdrawCommand: WithdrawCommand): Promise<Transaction> {
  const allWallets = await walletRepository.getAllWallets()
  const walletToWithdraw = allWallets.find(
    (wallet) => wallet.accountId === withdrawCommand.accountIdFrom
  )

  if (!walletToWithdraw) {
    throw new Error(`Wallet not found for account ${withdrawCommand.accountIdFrom}`)
  }

  if (walletToWithdraw.currency !== withdrawCommand.currency) {
    throw new Error(
      `Currency mismatch: wallet uses ${walletToWithdraw.currency}, but withdrawal is in ${withdrawCommand.currency}`
    )
  }

  if (walletToWithdraw.amount < withdrawCommand.amount) {
    throw new Error(
      `Insufficient funds: wallet has ${walletToWithdraw.amount}, but withdrawal amount is ${withdrawCommand.amount}`
    )
  }

  await walletRepository.updateWallet({
    walletId: walletToWithdraw.id,
    amount: walletToWithdraw.amount - withdrawCommand.amount,
  })

  const transaction: Transaction = {
    transactionId: getNextId(),
    type: 'withdraw',
    accountIdFrom: withdrawCommand.accountIdFrom,
    amount: withdrawCommand.amount,
    currency: withdrawCommand.currency,
    status: 'completed',
    createdAt: new Date(),
    description: withdrawCommand.description,
  }

  const transactions = loadTransactions()
  saveTransactions([...transactions, transaction])

  return transaction
}

async function transfer(transferCommand: TransferCommand): Promise<Transaction> {
  const allWallets = await walletRepository.getAllWallets()
  const walletFrom = allWallets.find(
    (wallet) => wallet.accountId === transferCommand.accountIdFrom
  )
  const walletTo = allWallets.find(
    (wallet) => wallet.accountId === transferCommand.accountIdTo
  )

  if (!walletFrom) {
    throw new Error(`Source wallet not found for account ${transferCommand.accountIdFrom}`)
  }

  if (!walletTo) {
    throw new Error(`Destination wallet not found for account ${transferCommand.accountIdTo}`)
  }

  if (walletFrom.currency !== transferCommand.currency) {
    throw new Error(
      `Currency mismatch: source wallet uses ${walletFrom.currency}, but transfer is in ${transferCommand.currency}`
    )
  }

  if (walletTo.currency !== transferCommand.currency) {
    throw new Error(
      `Currency mismatch: destination wallet uses ${walletTo.currency}, but transfer is in ${transferCommand.currency}`
    )
  }

  if (walletFrom.amount < transferCommand.amount) {
    throw new Error(
      `Insufficient funds: source wallet has ${walletFrom.amount}, but transfer amount is ${transferCommand.amount}`
    )
  }

  await walletRepository.updateWallet({
    walletId: walletFrom.id,
    amount: walletFrom.amount - transferCommand.amount,
  })

  await walletRepository.updateWallet({
    walletId: walletTo.id,
    amount: walletTo.amount + transferCommand.amount,
  })

  const transaction: Transaction = {
    transactionId: getNextId(),
    type: 'transfer',
    accountIdFrom: transferCommand.accountIdFrom,
    accountIdTo: transferCommand.accountIdTo,
    amount: transferCommand.amount,
    currency: transferCommand.currency,
    status: 'completed',
    createdAt: new Date(),
    description: transferCommand.description,
  }

  const transactions = loadTransactions()
  saveTransactions([...transactions, transaction])

  return transaction
}

async function getById(id: number): Promise<Transaction> {
  const transactions = loadTransactions()
  const transaction = transactions.find((tx) => tx.transactionId === id)

  if (!transaction) {
    throw new Error(`Transaction with ID ${id} not found`)
  }

  return transaction
}

async function getAll(): Promise<Transaction[]> {
  return loadTransactions()
}
