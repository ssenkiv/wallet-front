import { Wallet } from '@/modules/wallets/domain/wallet'
import getWalletViewModel from '@/view-models/wallets/getWalletViewModel'

export function getWalletsViewModel(wallets: Wallet[]) {
  return wallets.map((wallet) => getWalletViewModel(wallet))
}
