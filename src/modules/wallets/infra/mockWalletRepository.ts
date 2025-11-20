import { WalletRepository } from '@/modules/wallets/domain/walletRepository'
import { Wallet } from '@/modules/wallets/domain/wallet'
import { CreateWalletRequest } from '@/modules/wallets/types/createWalletRequest'

const initialMockWallets: Wallet[] = [
  {
    id: 1,
    accountId: 1,
    currency: 'EUR',
    amount: 1202390,
  },
  {
    id: 2,
    accountId: 2,
    currency: 'EUR',
    amount: 0,
  },
  {
    id: 3,
    accountId: 3,
    currency: 'EUR',
    amount: 0,
  },
  {
    id: 4,
    accountId: 4,
    currency: 'EUR',
    amount: 0,
  },
  {
    id: 5,
    accountId: 5,
    currency: 'EUR',
    amount: 0,
  },
  {
    id: 6,
    accountId: 6,
    currency: 'EUR',
    amount: 0,
  },
  {
    id: 7,
    accountId: 7,
    currency: 'EUR',
    amount: 0,
  },
  {
    id: 8,
    accountId: 8,
    currency: 'EUR',
    amount: 0,
  },
  {
    id: 9,
    accountId: 9,
    currency: 'EUR',
    amount: 0,
  },
  {
    id: 10,
    accountId: 10,
    currency: 'EUR',
    amount: 0,
  },
]
const STORAGE_KEY = 'mock_wallets'
const ID_COUNTER_KEY = 'mock_wallets_counter'

function loadWallets (): Wallet[] {
  if (typeof globalThis.window === 'undefined') return []

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return []

  return JSON.parse(stored)

}

function saveWallets (wallets: Wallet[]): void {
  if (typeof globalThis.window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wallets))
  }
}

function getNextId (): number {
  if (typeof globalThis.window === 'undefined') return Date.now()

  const stored = localStorage.getItem(ID_COUNTER_KEY)
  const currentId = stored ? Number.parseInt(stored, 10) : 10
  const nextId = currentId + 1
  localStorage.setItem(ID_COUNTER_KEY, nextId.toString())
  return nextId
}

function initializeStorage (): void {
  if (typeof globalThis.window === 'undefined') return

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    saveWallets(initialMockWallets)
  }
}

if (typeof globalThis.window !== 'undefined') {
  initializeStorage()
}

function createMockWalletRepository (): WalletRepository {
  return {
    getAllWallets,
    getWalletById,
    createWallet,
    deleteWallet,
  }
}

async function getAllWallets (): Promise<Wallet[]> {
  return loadWallets()
}

async function getWalletById (id: number): Promise<Wallet> {
  const wallet = loadWallets().find((wallet) => wallet.id === id)
  if (!wallet) {
    throw new Error(`Could not find wallet with id ${id}`)
  }
  return wallet
}

async function createWallet (request: CreateWalletRequest): Promise<Wallet> {
  const wallets = loadWallets()
  const newWallet = {
    id: getNextId(),
    currency: request.currency,
    accountId: request.accountId,
    amount: 0,
  }
  const updatedWallets = [...wallets, newWallet]
  saveWallets(updatedWallets)
  return newWallet
}

async function deleteWallet (id: number): Promise<void> {
  const wallets = loadWallets()
  const index = wallets.findIndex(wallet => wallet.id === id)
  if (index === -1) {
    throw new Error(`Wallet with such id ${id} not found`)
  }
  saveWallets(wallets.filter(acc => acc.id !== id))

}

export const mockWalletRepository = createMockWalletRepository()