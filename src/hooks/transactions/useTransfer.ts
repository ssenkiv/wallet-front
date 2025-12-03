import { useMutation, useQueryClient } from '@tanstack/react-query'
import transfer from '@/modules/transactions/application/transfer'
import createTransactionRepository from '@/modules/transactions/infra/mockTransactionRepository'
import TransferCommand from '@/modules/transactions/types/transferCommand'

const transactionRepository = createTransactionRepository()
const transferFn = transfer(transactionRepository)

export default function useTransfer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (command: TransferCommand) => transferFn(command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['wallets'] })
    },
  })
}
