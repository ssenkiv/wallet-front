import { Account } from '@/modules/accounts/domain/account';
import { AccountRepository } from '@/modules/accounts/domain/accountRepository';

export default function getAllAccounts(accountRepository: AccountRepository) {
  return async (): Promise<Account[] | undefined> => {
    return await accountRepository.getAllAccounts();
  }
}