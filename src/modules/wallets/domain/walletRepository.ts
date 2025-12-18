import { Wallet } from '@/modules/wallets/domain/wallet'
import { CreateWalletCommand } from '@/modules/wallets/types/createWalletCommand'
import { UpdateWalletCommand } from '@/modules/wallets/types/updateWalletCommand'

export interface WalletRepository {
  getAllWallets: () => Promise<Wallet[]>;
  getWalletById: (walletId: number) => Promise<Wallet>;
  deleteWallet: (walletId: number) => Promise<void>;
  createWallet: (data: CreateWalletCommand) => Promise<Wallet>;
  updateWallet: (updateWalletCommand: UpdateWalletCommand) => Promise<Wallet>
}
