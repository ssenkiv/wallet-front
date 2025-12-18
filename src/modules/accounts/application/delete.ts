import { AccountRepository } from '@/modules/accounts/domain/accountRepository';

export default function deleteAccount(accountRepository: AccountRepository) {
  return async (id: number) => {
    return await accountRepository.deleteAccount(id);
  }
}