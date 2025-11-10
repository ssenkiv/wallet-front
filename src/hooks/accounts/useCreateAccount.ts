import {
  mockApiRepository,
} from '@/modules/accounts/infra/MockAccountRepository';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Account } from '@/modules/accounts/domain/Account';
import createAccount from '@/modules/accounts/application/create';
import {
  AccountCreateRequest
} from '@/modules/accounts/types/AccountCreateRequest';

const createAccountFn = createAccount(mockApiRepository);

export default function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createAccount'],
    mutationFn: (accountCreateRequest: AccountCreateRequest): Promise<Account> =>
      createAccountFn(accountCreateRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
}
