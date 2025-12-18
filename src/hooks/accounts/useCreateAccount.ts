import { mockApiRepository } from '@/modules/accounts/infra/mockAccountRepository'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Account } from '@/modules/accounts/domain/account'
import createAccount from '@/modules/accounts/application/create'
import { AccountCreateRequest } from '@/modules/accounts/types/accountCreateRequest'

const createAccountFn = createAccount(mockApiRepository)

export default function useCreateAccount() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (
      accountCreateRequest: AccountCreateRequest
    ): Promise<Account> => createAccountFn(accountCreateRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    },
  })
}
