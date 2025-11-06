import { AccountRepository } from '@/modules/accounts/domain/AccountRepository';
import { Account } from '@/modules/accounts/domain/Account';

function createMockAccountRepository(): AccountRepository {
  return {
    getAllAccounts,
    getAccountById,
  };
}

const mockAccount: Account = {
  id: 1,
  firstName: "Taras",
  lastName: "Shevchenko",
  email: "kobzar@gmail.com",
  createdAt: new Date(),
  updateAt: new Date(),
  profilePictureUrl: "/Shevchenko_Taras.jpg"

}

async function getAllAccounts() {
  return [mockAccount];
}

async function getAccountById(id: number) {
  return mockAccount;
}

export const mockApiRepository = createMockAccountRepository();