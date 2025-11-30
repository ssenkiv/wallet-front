import { WalletRepository } from '@/modules/wallets/domain/walletRepository'

export function getById(walletRepository: WalletRepository) {
  return async (id: number) => {
    return walletRepository.getWalletById(id);
  }
}