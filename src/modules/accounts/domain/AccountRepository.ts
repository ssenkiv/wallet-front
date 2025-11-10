import { Account } from '@/modules/accounts/domain/Account';
import { LoginResponse } from '@/modules/accounts/types/LoginResponse';

export interface AccountRepository {
  getAllAccounts: () => Promise<Account[]>;
  getAccountById: (accountId: number) => Promise<Account | undefined>;
  updateAccount: (id: number, data: Partial<Account>) => Promise<Account>;
  deleteAccount: (accountId: number) => Promise<void>;
  createAccount: (account: Partial<Account>) => Promise<Account>;
  login: (email: string, password: string) => Promise<LoginResponse>;
}