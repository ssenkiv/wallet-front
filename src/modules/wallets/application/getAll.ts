import { WalletRepository } from '@/modules/wallets/domain/WalletRepository';
import { Wallet } from '@/modules/wallets/domain/Wallet';

export default function getAllByAccount(walletRepository: WalletRepository) {
  return async (accountId: number): Promise<Wallet[]> => {
    return await walletRepository.getAllByAccount(accountId);
  }
}