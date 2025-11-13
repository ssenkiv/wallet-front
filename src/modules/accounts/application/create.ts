import { AccountRepository } from '@/modules/accounts/domain/AccountRepository';
import { Account } from '@/modules/accounts/domain/Account';
import {
  AccountCreateRequest
} from '@/modules/accounts/types/AccountCreateRequest';

export default function createAccount(accountRepository: AccountRepository) {
  return async (accountCreateRequest: AccountCreateRequest): Promise<Account> => {
    return await accountRepository.createAccount(accountCreateRequest);
  };
}
