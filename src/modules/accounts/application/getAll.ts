import { Account } from '@/modules/accounts/domain/Account';
import { AccountRepository } from '@/modules/accounts/domain/AccountRepository';

export function getAccountById(accountRepository: AccountRepository) {
  return async (id: number): Promise<Account | undefined> => {
    return await accountRepository.getAccountById(id);
  }
}