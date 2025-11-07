import { Account } from '@/modules/accounts/domain/Account';
import getAccountViewModel from '@/view-models/accounts/getAccountViewModel';

export function getAccountsViewModel(accounts: Account[]) {
  return accounts.map((account) => getAccountViewModel(account));
}