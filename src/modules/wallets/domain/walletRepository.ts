import { Wallet } from '@/modules/wallets/domain/wallet'
import {
  CreateWalletRequest
} from '@/modules/wallets/types/createWalletRequest'
import UpdateWalletRequest from '@/modules/wallets/types/updateWalletRequest'

export interface WalletRepository {
  getAllWallets: () => Promise<Wallet[]>;
  getWalletById: (walletId: number) => Promise<Wallet>;
  deleteWallet: (walletId: number) => Promise<void>;
  createWallet: (data: CreateWalletRequest) => Promise<Wallet>;
  updateWallet: (updateWalletCommand: UpdateWalletRequest) => Promise<Wallet>
}