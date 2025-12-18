import { WalletRepository } from '@/modules/wallets/domain/walletRepository'

export function getAll(walletRepository: WalletRepository) {
  return async () => {
    return walletRepository.getAllWallets();
  }
}