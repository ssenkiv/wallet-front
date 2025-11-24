import { Currency } from '@/modules/wallets/domain/currency'

export default interface WithdrawCommand {
  accountIdFrom: number,
  amount: number,
  currency: Currency,
}