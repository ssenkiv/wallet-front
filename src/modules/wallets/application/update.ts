import { WalletRepository } from '@/modules/wallets/domain/walletRepository'
import { UpdateWalletCommand } from '@/modules/wallets/types/updateWalletCommand'

export function updateWallet(walletRepository: WalletRepository) {
  return (updateWalletCommand: UpdateWalletCommand) => walletRepository.updateWallet(updateWalletCommand);
}
