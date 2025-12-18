import { AccountRepository } from '@/modules/accounts/domain/accountRepository';

export default function login(accountRepository: AccountRepository) {
  return async (email: string, password: string) => {
    return accountRepository.login(email, password);
  }
}