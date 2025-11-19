import updateAccountById, {
  AccountUpdateRequest,
} from '@/modules/accounts/application/update'
import { mockApiRepository } from '@/modules/accounts/infra/mockAccountRepository'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Account } from '@/modules/accounts/domain/Account'

const updateAccount = updateAccountById(mockApiRepository)

export default function useUpdateAccount() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (
      accountUpdateRequest: AccountUpdateRequest
    ): Promise<Account> => updateAccount(accountUpdateRequest),
    onSuccess: (account) => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      queryClient.invalidateQueries({ queryKey: ['account', account.id] })
    },
  })
}
