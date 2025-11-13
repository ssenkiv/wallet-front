import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import getAllAccounts from '@/modules/accounts/application/getAll';
import { mockApiRepository } from '@/modules/accounts/infra/MockAccountRepository';
import { getAccountsViewModel } from '@/view-models/accounts/getAccountsViewModel';
import { AccountViewModel } from '@/view-models/accounts/AccountViewModel';

const getAll = getAllAccounts(mockApiRepository);

export default function useGetAllAccounts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => getAll(),
  });

  const viewModels = useMemo<AccountViewModel[]>(() => {
    return data === undefined ? [] : getAccountsViewModel(data);
  }, [data]);

  return {
    data: viewModels,
    isLoading,
    error,
  };
}