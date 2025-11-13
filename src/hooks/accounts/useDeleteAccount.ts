import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteAccount from '@/modules/accounts/application/delete';
import {
  mockApiRepository
} from '@/modules/accounts/infra/MockAccountRepository';

const delAcc = deleteAccount(mockApiRepository);

export default function useDeleteAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteAccount'],
    mutationFn: (id: number) => delAcc(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: ['account', id] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    }
  })
}
