import { useQuery } from '@tanstack/react-query'
import getAllTransactions from '@/modules/transactions/application/getAllTransactions'
import createTransactionRepository from '@/modules/transactions/infra/mockTransactionRepository'

const transactionRepository = createTransactionRepository()
const getAllTransactionsFn = getAllTransactions(transactionRepository)

export default function useGetAllTransactions() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => getAllTransactionsFn(),
  })

  return { data, isLoading, error }
}
