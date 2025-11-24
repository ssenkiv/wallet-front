import { Currency } from '@/modules/wallets/domain/currency'

export default interface TransferCommand {
  accountIdFrom: number,
  accountIdTo: number,
  amount: number,
  currency: Currency
}