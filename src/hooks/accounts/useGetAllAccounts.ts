import getAllAccounts from '@/modules/accounts/application/getAll';
import {
  mockApiRepository
} from '@/modules/accounts/infra/MockAccountRepository';
import { useQuery } from '@tanstack/react-query';

const getAll = getAllAccounts(mockApiRepository)

export default function useGetAllAccounts() {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: () => getAll(),
  });
}