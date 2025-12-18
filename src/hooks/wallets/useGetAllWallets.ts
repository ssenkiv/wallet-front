import { getAll } from '@/modules/wallets/application/getAll'
import { mockWalletRepository } from '@/modules/wallets/infra/mockWalletRepository'
import { useQuery } from '@tanstack/react-query'

const getAllFn = getAll(mockWalletRepository)

export function useGetAllWallets () {
  const { data, isLoading, error } = useQuery({
    queryKey: ['wallets'],
    queryFn: () => getAllFn(),
  })

  return {
    data,
    isLoading,
    error,
  }
}