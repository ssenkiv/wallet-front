import { mockWalletRepository } from '@/modules/wallets/infra/mockWalletRepository'
import { deleteById } from '@/modules/wallets/application/delete'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const deleteFn = deleteById(mockWalletRepository)

export default function useDeleteWallet () {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteFn(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: ['wallet', id] })
      queryClient.invalidateQueries({ queryKey: ['wallets'] })
      toast.success('Wallet deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete wallet')
    },
  })
}