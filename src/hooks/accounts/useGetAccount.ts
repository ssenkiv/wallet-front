import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { mockApiRepository } from '@/modules/accounts/infra/MockAccountRepository';
import { getById } from '@/modules/accounts/application/getById';
import getAccountViewModel from '@/view-models/accounts/getAccountViewModel';
import { AccountViewModel } from '@/view-models/accounts/AccountViewModel';

const getAccountById = getById(mockApiRepository);

export default function useGetAccount(id: number | null) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['account', id],
    queryFn: () => getAccountById(id!),
    enabled: !!id && id > 0,
  });

  const viewModel = useMemo<AccountViewModel | undefined>(() => {
    if (!data) return undefined;
    return getAccountViewModel(data);
  }, [data]);

  return {
    data: viewModel,
    isLoading,
    error,
  };
}