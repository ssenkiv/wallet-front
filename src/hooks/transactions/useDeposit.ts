import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deposit } from '@/modules/transactions/application/deposit'
import createTransactionRepository from '@/modules/transactions/infra/mockTransactionRepository'
import { createMockWalletRepository } from '@/modules/wallets/infra/mockWalletRepository'
import { DepositCommand } from '@/modules/transactions/types/depositCommand'

const walletRepository = createMockWalletRepository()
const transactionRepository = createTransactionRepository(walletRepository)
const depositFn = deposit(transactionRepository)

export default function useDeposit() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (command: DepositCommand) => depositFn(command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['wallets'] })
    },
  })
}
