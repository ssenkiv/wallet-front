import { useGetAllWallets } from '@/hooks/wallets/useGetAllWallets'
import { getWalletsViewModel } from '@/view-models/wallets/getWalletsViewModel'
import { WalletViewModel } from '@/view-models/wallets/walletViewModel'

export default function useWalletsViewModel() {
  const { data, isLoading, error } = useGetAllWallets()

  const viewModels: WalletViewModel[] =
    data === undefined ? [] : getWalletsViewModel(data)

  return {
    data: viewModels,
    isLoading,
    error,
  }
}
