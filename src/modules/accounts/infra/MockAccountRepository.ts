import { AccountRepository } from '@/modules/accounts/domain/AccountRepository';
import { Account } from '@/modules/accounts/domain/Account';
import { LoginResponse } from '@/modules/accounts/types/LoginResponse';

function incrementAndGetId() {
  let currentId = 1;
  return function() {
    currentId += 1;
    return currentId;
  };
}

const getNextId = incrementAndGetId();

function createMockAccountRepository(): AccountRepository {
  return {
    getAllAccounts,
    getAccountById,
    updateAccount,
    deleteAccount,
    createAccount,
    login
  };
}

const mockAccount: Account = {
  id: 1,
  firstName: 'Taras',
  lastName: 'Shevchenko',
  email: 'kobzar@gmail.com',
  createdAt: new Date(),
  updateAt: new Date(),
  profilePictureUrl: '/Shevchenko_Taras.jpg',
  password: 'password'

};

const accounts: Account[] = [mockAccount];

async function getAllAccounts() {
  return accounts;
}

async function getAccountById(id: number) {
  if (id < accounts.length && id > 0) {
    return accounts[id];
  } else {
    throw new Error('Account not found');
  }
}

async function updateAccount(id: number, data: Partial<Account>) {
  if (accounts.length > id && id > 0) {
    const foundAccount = accounts[id -1];
    Object.assign(foundAccount, data);
    return mockAccount;
  } else {
    throw new Error('Account not found');
  }

}

async function deleteAccount(id: number) {
  if (id < accounts.length && id > 0) {
    accounts.splice(id, 1);
  }
}

async function createAccount(account: Partial<Account>) {
  const newAccount: Account = {
    ...account,
    id: getNextId(),
    createdAt: new Date(),
    updateAt: new Date(),
  } as Account;

  accounts.push(newAccount);
  return newAccount;
}

async function login(email: string, password: string) {
  if (email === mockAccount.email && password === mockAccount.password) {
    return {
      token: 'mock-jwt',
      role: 'USER',
    } as LoginResponse
  } else {
    throw new Error('Invalid credentials');
  }
}

export const mockApiRepository = createMockAccountRepository();