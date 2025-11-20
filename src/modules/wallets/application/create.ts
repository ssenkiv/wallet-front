import { WalletRepository } from '@/modules/wallets/domain/walletRepository'
import { CreateWalletRequest } from '@/modules/wallets/types/createWalletRequest'

export function create (walletRepository: WalletRepository) {
  return async (createWalletRequest: CreateWalletRequest) => {
    return walletRepository.createWallet(createWalletRequest)
  }
}
