import useGetAllTransactions from '@/hooks/transactions/useGetAllTransactions'
import getTransactionsViewModel from '@/view-models/transactions/getTransactionsViewModel'
import { TransactionViewModel } from '@/view-models/transactions/transactionViewModel'

export default function useTransactionsViewModel() {
  const { data, isLoading, error } = useGetAllTransactions()

  const viewModels: TransactionViewModel[] =
    data === undefined ? [] : getTransactionsViewModel(data)

  return {
    data: viewModels,
    isLoading,
    error,
  }
}
