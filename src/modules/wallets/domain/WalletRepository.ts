import { Wallet } from '@/modules/wallets/domain/Wallet';

export interface WalletRepository {
  getAllByAccount: (accountId: number) => Promise<Wallet[]>;
  getById : (walletId: string) => Promise<Wallet | undefined>;
  getByAccountAndCurrency: (accountId: number, currency: string) => Promise<Wallet | undefined>;
}