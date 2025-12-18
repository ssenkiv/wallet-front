import { WalletRepository } from '@/modules/wallets/domain/walletRepository'

export function deleteById (walletRepository: WalletRepository) {
  return async (id: number) => {
    return walletRepository.deleteWallet(id);
  }
}
