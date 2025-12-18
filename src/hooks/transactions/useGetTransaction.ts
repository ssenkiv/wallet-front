import { useQuery } from '@tanstack/react-query'
import { getTransactionById } from '@/modules/transactions/application/getTransactionById'
import createTransactionRepository from '@/modules/transactions/infra/mockTransactionRepository'
import { createMockWalletRepository } from '@/modules/wallets/infra/mockWalletRepository'

const walletRepository = createMockWalletRepository()
const transactionRepository = createTransactionRepository(walletRepository)
const getTransactionByIdFn = getTransactionById(transactionRepository)

export default function useGetTransaction(id: number | null) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['transaction', id],
    queryFn: () => {
      if (!id || id <= 0) {
        throw new Error('Invalid transaction ID')
      }
      return getTransactionByIdFn(id)
    },
    enabled: !!id && id > 0,
  })

  return { data, isLoading, error }
}
