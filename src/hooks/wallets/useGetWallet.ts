import { getById } from '@/modules/wallets/application/getById'
import { mockWalletRepository } from '@/modules/wallets/infra/mockWalletRepository'
import { useQuery } from '@tanstack/react-query'

const getByIdFn = getById(mockWalletRepository);

export function useGetWallet(id: number) {
  const {data, isLoading, error} = useQuery({
    queryKey: ['wallet', id],
    queryFn: () => getByIdFn(id),
  })
  return  {
    data,
    isLoading,
    error,
  }
}