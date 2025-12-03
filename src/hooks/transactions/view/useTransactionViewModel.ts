import { useMemo } from 'react'
import useGetTransaction from '@/hooks/transactions/useGetTransaction'
import { TransactionViewModel } from '@/view-models/transactions/transactionViewModel'
import getTransactionViewModel from '@/view-models/transactions/getTransactionViewModel'

export default function useTransactionViewModel(id: number | null) {
  const { data, isLoading, error } = useGetTransaction(id)

  const viewModel = useMemo<TransactionViewModel | undefined>(() => {
    if (!data) return undefined
    return getTransactionViewModel(data)
  }, [data])

  return {
    data: viewModel,
    isLoading,
    error,
  }
}
