import { AccountRepository } from '@/modules/accounts/domain/AccountRepository';
import { Account } from '@/modules/accounts/domain/Account';
import { LoginResponse } from '@/modules/accounts/types/LoginResponse';

function incrementAndGetId() {
  let currentId = 10;
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
    login,
  };
}

const mockAccounts: Account[] = [
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
];

const accounts: Account[] = [...mockAccounts];

async function getAllAccounts() {
  return accounts;
}

async function getAccountById(id: number) {
  return accounts.find((account) => account.id === id)
}

async function updateAccount(id: number, data: Partial<Account>) {
  const foundAccount = accounts.find((account) => account.id === id);
  if (foundAccount) {
    Object.assign(foundAccount, data);
    console.log(foundAccount);
    return foundAccount;
  } else {
    throw new Error('Account not found');
  }
}

async function deleteAccount(id: number) {
  const index = accounts.findIndex((account) => account.id === id);
  if (index !== -1) {
    accounts.splice(index, 1);
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
  console.log(accounts);
  return newAccount;
}

async function login(email: string, password: string) {
  const account = accounts.find((acc) => acc.email === email && acc.password === password);
  if (account) {
    return {
      token: 'mock-jwt',
      role: 'USER',
    } as LoginResponse;
  } else {
    throw new Error('Invalid credentials');
  }
}

export const mockApiRepository = createMockAccountRepository();