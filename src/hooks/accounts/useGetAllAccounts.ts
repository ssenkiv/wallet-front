import { useQuery } from '@tanstack/react-query';
import getAllAccounts from '@/modules/accounts/application/getAll';
import { mockApiRepository } from '@/modules/accounts/infra/mockAccountRepository';

const getAll = getAllAccounts(mockApiRepository);

export default function useGetAllAccounts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => getAll(),
  });

  return {
    data,
    isLoading,
    error,
  };
}