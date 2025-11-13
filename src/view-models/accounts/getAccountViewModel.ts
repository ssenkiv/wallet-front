import { Account } from '@/modules/accounts/domain/Account';
import { AccountViewModel } from './AccountViewModel';

const DEFAULT_AVATAR = '/Shevchenko_Taras.jpg';


export default function getAccountViewModel(account: Account): AccountViewModel {
  const fullName = `${account.firstName} ${account.lastName}`.trim();
  const initials = `${account.firstName.charAt(0)}${account.lastName.charAt(0)}`.toUpperCase();
  const avatarUrl = account.profilePictureUrl || DEFAULT_AVATAR;

  const formattedCreatedAt = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(account.createdAt);

  return {
    id: account.id,
    fullName,
    firstName: account.firstName,
    lastName: account.lastName,
    initials,
    email: account.email,
    avatarUrl,
    createdAt: account.createdAt,
    formattedCreatedAt,
  };
}
