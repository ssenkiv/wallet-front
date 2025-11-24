import { Currency } from '@/modules/wallets/domain/currency'

export default interface DepositCommand {
  accountIdTo: number;
  amount: number;
  currency: Currency;
}