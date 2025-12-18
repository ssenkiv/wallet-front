import { WalletRepository } from '@/modules/wallets/domain/walletRepository'
import { CreateWalletCommand } from '@/modules/wallets/types/createWalletCommand'

export function create (walletRepository: WalletRepository) {
  return async (createWalletCommand: CreateWalletCommand) => {
    return walletRepository.createWallet(createWalletCommand)
  }
}
