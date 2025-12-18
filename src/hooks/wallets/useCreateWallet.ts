import { create } from '@/modules/wallets/application/create';
import { mockWalletRepository } from '@/modules/wallets/infra/mockWalletRepository'
import { CreateWalletCommand } from '@/modules/wallets/types/createWalletCommand'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const createFn = create(mockWalletRepository);

export default function useCreateWallet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (createCommand: CreateWalletCommand) => createFn(createCommand),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['wallets']})
    }
  });
}
