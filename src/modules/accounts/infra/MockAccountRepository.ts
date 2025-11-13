import { AccountRepository } from '@/modules/accounts/domain/AccountRepository'
import { Account } from '@/modules/accounts/domain/Account'
import { LoginResponse } from '@/modules/accounts/types/LoginResponse'

const STORAGE_KEY = 'mock_accounts'
const ID_COUNTER_KEY = 'mock_account_id_counter'
const NETWORK_DELAY = 300

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

function loadAccounts (): Account[] {
  if (typeof globalThis.window === 'undefined') return []

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return []

  const accounts = JSON.parse(stored)
  return accounts.map((acc: Account) => ({
    ...acc,
    createdAt: new Date(acc.createdAt),
    updateAt: new Date(acc.updateAt),
  }))
}

function saveAccounts (accounts: Account[]): void {
  if (typeof globalThis.window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts))
}

function getNextId (): number {
  if (typeof globalThis.window === 'undefined') return Date.now()

  const stored = localStorage.getItem(ID_COUNTER_KEY)
  const currentId = stored ? Number.parseInt(stored, 10) : 10
  const nextId = currentId + 1
  localStorage.setItem(ID_COUNTER_KEY, nextId.toString())
  return nextId
}

function createMockAccountRepository(): AccountRepository {
  return {
    getAllAccounts,
    getAccountById,
    updateAccount,
    deleteAccount,
    createAccount,
    login,
  };
}

const initialMockAccounts: Account[] = [
  {
    id: 1,
    firstName: 'Taras',
    lastName: 'Shevchenko',
    email: 'kobzar@gmail.com',
    createdAt: new Date('2023-01-15'),
    updateAt: new Date('2024-11-01'),
    profilePictureUrl: '/Shevchenko_Taras.jpg',
    password: 'password',
  },
  {
    id: 2,
    firstName: 'Lesya',
    lastName: 'Ukrainka',
    email: 'lesya.ukrainka@gmail.com',
    createdAt: new Date('2023-03-20'),
    updateAt: new Date('2024-10-28'),
    password: 'password',
  },
  {
    id: 3,
    firstName: 'Ivan',
    lastName: 'Franko',
    email: 'ivan.franko@gmail.com',
    createdAt: new Date('2023-05-10'),
    updateAt: new Date('2024-10-15'),
    password: 'password',
  },
  {
    id: 4,
    firstName: 'Olga',
    lastName: 'Kobylyanska',
    email: 'olga.k@gmail.com',
    createdAt: new Date('2023-07-22'),
    updateAt: new Date('2024-11-05'),
    password: 'password',
  },
  {
    id: 5,
    firstName: 'Mykhailo',
    lastName: 'Hrushevsky',
    email: 'mykhailo.h@gmail.com',
    createdAt: new Date('2023-08-30'),
    updateAt: new Date('2024-10-20'),
    password: 'password',
  },
  {
    id: 6,
    firstName: 'Marko',
    lastName: 'Vovchok',
    email: 'marko.vovchok@gmail.com',
    createdAt: new Date('2023-09-12'),
    updateAt: new Date('2024-11-08'),
    password: 'password',
  },
  {
    id: 7,
    firstName: 'Hryhorii',
    lastName: 'Skovoroda',
    email: 'hryhorii.s@gmail.com',
    createdAt: new Date('2023-10-05'),
    updateAt: new Date('2024-10-25'),
    password: 'password',
  },
  {
    id: 8,
    firstName: 'Oksana',
    lastName: 'Zabuzhko',
    email: 'oksana.z@gmail.com',
    createdAt: new Date('2023-11-18'),
    updateAt: new Date('2024-11-09'),
    password: 'password',
  },
  {
    id: 9,
    firstName: 'Vasyl',
    lastName: 'Stus',
    email: 'vasyl.stus@gmail.com',
    createdAt: new Date('2024-01-25'),
    updateAt: new Date('2024-10-30'),
    password: 'password',
  },
  {
    id: 10,
    firstName: 'Lina',
    lastName: 'Kostenko',
    email: 'lina.kostenko@gmail.com',
    createdAt: new Date('2024-02-14'),
    updateAt: new Date('2024-11-10'),
    password: 'password',
  },
]

function initializeStorage (): void {
  if (typeof globalThis.window === 'undefined') return

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    saveAccounts(initialMockAccounts)
  }
}

if (typeof globalThis.window !== 'undefined') {
  initializeStorage()
}

async function getAllAccounts() {
  await delay(NETWORK_DELAY)
  return loadAccounts()
}

async function getAccountById(id: number) {
  await delay(NETWORK_DELAY)
  const accounts = loadAccounts()
  const account = accounts.find((acc) => acc.id === id)

  if (!account) {
    throw new Error(`Account with ID ${id} not found`)
  }

  return account
}

async function updateAccount(id: number, data: Partial<Account>) {
  await delay(NETWORK_DELAY)
  const accounts = loadAccounts()
  const foundAccount = accounts.find((acc) => acc.id === id)

  if (!foundAccount) {
    throw new Error('Account not found');
  }

  const updatedAccount = {
    ...foundAccount,
    ...data,
    id: foundAccount.id,
    updateAt: new Date(),
  }

  const updatedAccounts = accounts.map((acc) =>
    acc.id === id ? updatedAccount : acc,
  )

  saveAccounts(updatedAccounts)
  return updatedAccount
}

async function deleteAccount(id: number) {
  await delay(NETWORK_DELAY)
  const accounts = loadAccounts()
  const index = accounts.findIndex((acc) => acc.id === id)

  if (index === -1) {
    throw new Error('Account not found')
  }

  const updatedAccounts = accounts.filter((acc) => acc.id !== id)
  saveAccounts(updatedAccounts)
}

async function createAccount(account: Partial<Account>) {
  await delay(NETWORK_DELAY)
  const accounts = loadAccounts()

  const newAccount: Account = {
    ...account,
    id: getNextId(),
    createdAt: new Date(),
    updateAt: new Date(),
  } as Account;

  const updatedAccounts = [...accounts, newAccount]
  saveAccounts(updatedAccounts)
  return newAccount;
}

async function login(email: string, password: string) {
  await delay(NETWORK_DELAY)
  const accounts = loadAccounts()
  const account = accounts.find(
    (acc) => acc.email === email && acc.password === password)

  if (!account) {
    throw new Error('Invalid credentials')
  }

  return {
    token: 'mock-jwt',
    role: 'USER',
  } as LoginResponse
}

export const mockApiRepository = createMockAccountRepository();