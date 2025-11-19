import { useQuery } from '@tanstack/react-query'
import { getById } from '@/modules/accounts/application/getById'
import { mockApiRepository } from '@/modules/accounts/infra/mockAccountRepository'

const getAccountById = getById(mockApiRepository)

export default function useGetAccount(id: number | null) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['account', id],
    queryFn: () => getAccountById(id!),
    enabled: !!id && id > 0,
  })

  return {
    data,
    isLoading,
    error,
  }
}
