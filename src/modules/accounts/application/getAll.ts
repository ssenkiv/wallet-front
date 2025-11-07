import { Account } from '@/modules/accounts/domain/Account';
import { AccountRepository } from '@/modules/accounts/domain/AccountRepository';

export default function getAllAccounts(accountRepository: AccountRepository) {
  return async (): Promise<Account[] | undefined> => {
    return await accountRepository.getAllAccounts();
  }
}