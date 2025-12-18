import { WalletRepository } from '@/modules/wallets/domain/walletRepository'
import UpdateWalletRequest from '@/modules/wallets/types/updateWalletRequest'

export default function updateWallet(walletRepository: WalletRepository) {
  return (updateWalletRequest: UpdateWalletRequest) => walletRepository.updateWallet(updateWalletRequest);
}