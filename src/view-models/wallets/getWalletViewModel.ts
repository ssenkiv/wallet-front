import { Wallet } from '@/modules/wallets/domain/wallet'
import { WalletViewModel } from './WalletViewModel'

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  UAH: '₴',
}

export default function getWalletViewModel(wallet: Wallet): WalletViewModel {
  const currencySymbol = CURRENCY_SYMBOLS[wallet.currency] || wallet.currency
  const formattedAmount = `${currencySymbol}${wallet.amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

  return {
    id: wallet.id,
    accountId: wallet.accountId,
    currency: wallet.currency,
    amount: wallet.amount,
    formattedAmount,
  }
}
