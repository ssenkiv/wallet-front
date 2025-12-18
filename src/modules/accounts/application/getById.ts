import { AccountRepository } from '@/modules/accounts/domain/accountRepository';

export function getById(accountRepository: AccountRepository) {
  return async (accountId: number) => {
    return await accountRepository.getAccountById(accountId);
  }
}