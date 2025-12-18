import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import deposit from '@/modules/transactions/application/deposit'
import createTransactionRepository from '@/modules/transactions/infra/mockTransactionRepository'
import DepositCommand from '@/modules/transactions/types/depositCommand'

const transactionRepository = createTransactionRepository()
const depositFn = deposit(transactionRepository)

export default function useDeposit() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (command: DepositCommand) => depositFn(command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['wallets'] })
      toast.success('Deposit completed successfully')
    },
    onError: () => {
      toast.error('Failed to complete deposit')
    },
  })
}
