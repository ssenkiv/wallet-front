import { create } from '@/modules/wallets/application/create';
import { mockWalletRepository } from '@/modules/wallets/infra/mockWalletRepository'
import { CreateWalletRequest } from '@/modules/wallets/types/createWalletRequest'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const createFn = create(mockWalletRepository);

export default function useCreateWallet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (createRequest: CreateWalletRequest) => createFn(createRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['wallets']})
    }
  });
}