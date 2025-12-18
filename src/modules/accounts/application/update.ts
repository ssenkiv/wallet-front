import { AccountRepository } from '@/modules/accounts/domain/accountRepository';
import { Account } from '@/modules/accounts/domain/account';

export interface AccountUpdateRequest {
  id: number;
  updateAccount: Partial<Account>;
}

export default function updateAccountById(accountRepository: AccountRepository) {
  return async (accountUpdateRequest: AccountUpdateRequest) => {
    return await accountRepository.updateAccount(accountUpdateRequest.id, accountUpdateRequest.updateAccount);
  }
}