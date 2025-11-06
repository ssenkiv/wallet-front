import {
  mockApiRepository,
} from '@/modules/accounts/infra/MockAccountRepository';
import { getById } from '@/modules/accounts/application/getById';
import { useQuery } from '@tanstack/react-query';

const getAccountById = getById(mockApiRepository);

export default function useGetAccount(id: number) {
  return useQuery({
        queryKey: ['account', id],
        queryFn: async () => {
          return await getAccountById(id);
        },
      },
  );
}