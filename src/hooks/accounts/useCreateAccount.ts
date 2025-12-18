import { mockApiRepository } from '@/modules/accounts/infra/mockAccountRepository'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Account } from '@/modules/accounts/domain/Account'
import createAccount from '@/modules/accounts/application/create'
import { AccountCreateRequest } from '@/modules/accounts/types/AccountCreateRequest'

const createAccountFn = createAccount(mockApiRepository)

export default function useCreateAccount() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (
      accountCreateRequest: AccountCreateRequest
    ): Promise<Account> => createAccountFn(accountCreateRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      toast.success('Account created successfully')
    },
    onError: () => {
      toast.error('Failed to create account')
    },
  })
}
