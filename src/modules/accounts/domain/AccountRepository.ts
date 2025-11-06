import { Account } from '@/modules/accounts/domain/Account';

export interface AccountRepository {
  getAllAccounts: () => Promise<Account[]>;
  getAccountById: (accountId: number) => Promise<Account | undefined>;
}