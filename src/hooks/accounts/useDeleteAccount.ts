import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import deleteAccount from '@/modules/accounts/application/delete'
import { mockApiRepository } from '@/modules/accounts/infra/mockAccountRepository'

const delAcc = deleteAccount(mockApiRepository)

export default function useDeleteAccount() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => delAcc(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: ['account', id] })
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      toast.success('Account deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete account')
    },
  })
}
