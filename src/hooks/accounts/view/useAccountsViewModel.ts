import useGetAllAccounts from '@/hooks/accounts/useGetAllAccounts';
import {
  getAccountsViewModel
} from '@/view-models/accounts/getAccountsViewModel';
import { AccountViewModel } from '@/view-models/accounts/AccountViewModel';

export default function useAccountsViewModel() {
  const {data, isLoading, error} = useGetAllAccounts();

  const viewModels: AccountViewModel[] = data === undefined
      ? []
      : getAccountsViewModel(data);

  return {
    data: viewModels,
    isLoading,
    error
  };
}