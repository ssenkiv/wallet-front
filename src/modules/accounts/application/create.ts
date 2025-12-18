import { AccountRepository } from '@/modules/accounts/domain/accountRepository';
import { Account } from '@/modules/accounts/domain/account';
import {
  AccountCreateRequest
} from '@/modules/accounts/types/accountCreateRequest';

export default function createAccount(accountRepository: AccountRepository) {
  return async (accountCreateRequest: AccountCreateRequest): Promise<Account> => {
    return await accountRepository.createAccount(accountCreateRequest);
  };
}
