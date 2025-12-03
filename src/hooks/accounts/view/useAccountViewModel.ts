import { useMemo } from 'react';
import useGetAccount from '@/hooks/accounts/useGetAccount';
import { AccountViewModel } from '@/view-models/accounts/accountViewModel';
import getAccountViewModel from '@/view-models/accounts/getAccountViewModel';

export default function useAccountViewModel(id: number) {
  const {data, isLoading, error} = useGetAccount(id);

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
