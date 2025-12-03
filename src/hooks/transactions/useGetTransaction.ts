import { useQuery } from '@tanstack/react-query'
import getTransactionById from '@/modules/transactions/application/getTransactionById'
import createTransactionRepository from '@/modules/transactions/infra/mockTransactionRepository'

const transactionRepository = createTransactionRepository()
const getTransactionByIdFn = getTransactionById(transactionRepository)

export default function useGetTransaction(id: number | null) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['transaction', id],
    queryFn: () => getTransactionByIdFn(id!),
    enabled: !!id && id > 0,
  })

  return { data, isLoading, error }
}
