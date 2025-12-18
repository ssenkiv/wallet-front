import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import withdraw from '@/modules/transactions/application/withdraw'
import createTransactionRepository from '@/modules/transactions/infra/mockTransactionRepository'
import WithdrawCommand from '@/modules/transactions/types/withdrawCommand'

const transactionRepository = createTransactionRepository()
const withdrawFn = withdraw(transactionRepository)

export default function useWithdraw() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (command: WithdrawCommand) => withdrawFn(command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['wallets'] })
      toast.success('Withdrawal completed successfully')
    },
    onError: () => {
      toast.error('Failed to complete withdrawal')
    },
  })
}
