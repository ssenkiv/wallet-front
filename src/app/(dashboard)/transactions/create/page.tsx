'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import Card from '@/components/Card/Card'
import FormInput from '@/components/FormInput/FormInput'
import Button from '@/components/Button/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import useDeposit from '@/hooks/transactions/useDeposit'
import useWithdraw from '@/hooks/transactions/useWithdraw'
import useTransfer from '@/hooks/transactions/useTransfer'
import DepositCommand from '@/modules/transactions/types/depositCommand'
import WithdrawCommand from '@/modules/transactions/types/withdrawCommand'
import TransferCommand from '@/modules/transactions/types/transferCommand'
import { Currency } from '@/modules/wallets/domain/currency'
import styles from './page.module.css'

type TransactionMode = 'deposit' | 'withdraw' | 'transfer'

interface DepositFormData {
  accountIdTo: string
  amount: string
  currency: Currency
  description?: string
}

interface WithdrawFormData {
  accountIdFrom: string
  amount: string
  currency: Currency
  description?: string
}

interface TransferFormData {
  accountIdFrom: string
  accountIdTo: string
  amount: string
  currency: Currency
  description?: string
}

export default function CreateTransactionPage() {
  const router = useRouter()
  const [mode, setMode] = useState<TransactionMode>('deposit')

  const depositMutation = useDeposit()
  const withdrawMutation = useWithdraw()
  const transferMutation = useTransfer()

  const depositForm = useForm<DepositFormData>()
  const withdrawForm = useForm<WithdrawFormData>()
  const transferForm = useForm<TransferFormData>()

  const handleModeChange = (newMode: TransactionMode) => {
    setMode(newMode)
    depositForm.reset()
    withdrawForm.reset()
    transferForm.reset()
  }

  const onDepositSubmit = (data: DepositFormData) => {
    const command: DepositCommand = {
      accountIdTo: Number.parseInt(data.accountIdTo),
      amount: Number.parseFloat(data.amount),
      currency: data.currency,
      description: data.description || undefined,
    }
    depositMutation.mutate(command, {
      onSuccess: () => router.push('/transactions'),
    })
  }

  const onWithdrawSubmit = (data: WithdrawFormData) => {
    const command: WithdrawCommand = {
      accountIdFrom: Number.parseInt(data.accountIdFrom),
      amount: Number.parseFloat(data.amount),
      currency: data.currency,
      description: data.description || undefined,
    }
    withdrawMutation.mutate(command, {
      onSuccess: () => router.push('/transactions'),
    })
  }

  const onTransferSubmit = (data: TransferFormData) => {
    const command: TransferCommand = {
      accountIdFrom: Number.parseInt(data.accountIdFrom),
      accountIdTo: Number.parseInt(data.accountIdTo),
      amount: Number.parseFloat(data.amount),
      currency: data.currency,
      description: data.description || undefined,
    }
    transferMutation.mutate(command, {
      onSuccess: () => router.push('/transactions'),
    })
  }

  return (
    <Card radius="md" className={styles.formContainer}>
      <h1>New Transaction</h1>

      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${mode === 'deposit' ? styles.activeTab : ''}`}
          onClick={() => handleModeChange('deposit')}
        >
          Deposit
        </button>
        <button
          type="button"
          className={`${styles.tab} ${mode === 'withdraw' ? styles.activeTab : ''}`}
          onClick={() => handleModeChange('withdraw')}
        >
          Withdraw
        </button>
        <button
          type="button"
          className={`${styles.tab} ${mode === 'transfer' ? styles.activeTab : ''}`}
          onClick={() => handleModeChange('transfer')}
        >
          Transfer
        </button>
      </div>

      {mode === 'deposit' && (
        <form className={styles.form} onSubmit={depositForm.handleSubmit(onDepositSubmit)}>
          <FormInput
            type="number"
            label="To Account ID"
            required={true}
            {...depositForm.register('accountIdTo', {
              required: 'Account ID is required',
              min: { value: 1, message: 'Account ID must be positive' },
            })}
            error={depositForm.formState.errors.accountIdTo?.message}
          />
          <FormInput
            type="number"
            label="Amount"
            required={true}
            {...depositForm.register('amount', {
              required: 'Amount is required',
              min: { value: 0.01, message: 'Amount must be greater than 0' },
            })}
            error={depositForm.formState.errors.amount?.message}
          />
          <div className={styles.formGroup}>
            <label htmlFor="deposit-currency" className={styles.label}>
              Currency<span className={styles.required}>*</span>
            </label>
            <Controller
              name="currency"
              control={depositForm.control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  id="deposit-currency"
                  value={field.value || ''}
                  sx={{ borderRadius: '20px' }}
                  className={styles.select}
                >
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="UAH">UAH</MenuItem>
                </Select>
              )}
            />
            {depositForm.formState.errors.currency && (
              <span className={styles.error}>Currency is required</span>
            )}
          </div>
          <FormInput
            type="text"
            label="Description (optional)"
            {...depositForm.register('description')}
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={depositMutation.isPending}
          >
            {depositMutation.isPending ? 'Processing...' : 'Make Deposit'}
          </Button>
          {depositMutation.isError && (
            <p className={styles.error}>{depositMutation.error?.message}</p>
          )}
        </form>
      )}

      {mode === 'withdraw' && (
        <form className={styles.form} onSubmit={withdrawForm.handleSubmit(onWithdrawSubmit)}>
          <FormInput
            type="number"
            label="From Account ID"
            required={true}
            {...withdrawForm.register('accountIdFrom', {
              required: 'Account ID is required',
              min: { value: 1, message: 'Account ID must be positive' },
            })}
            error={withdrawForm.formState.errors.accountIdFrom?.message}
          />
          <FormInput
            type="number"
            label="Amount"
            required={true}
            {...withdrawForm.register('amount', {
              required: 'Amount is required',
              min: { value: 0.01, message: 'Amount must be greater than 0' },
            })}
            error={withdrawForm.formState.errors.amount?.message}
          />
          <div className={styles.formGroup}>
            <label htmlFor="withdraw-currency" className={styles.label}>
              Currency<span className={styles.required}>*</span>
            </label>
            <Controller
              name="currency"
              control={withdrawForm.control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  id="withdraw-currency"
                  value={field.value || ''}
                  sx={{ borderRadius: '20px' }}
                  className={styles.select}
                >
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="UAH">UAH</MenuItem>
                </Select>
              )}
            />
            {withdrawForm.formState.errors.currency && (
              <span className={styles.error}>Currency is required</span>
            )}
          </div>
          <FormInput
            type="text"
            label="Description (optional)"
            {...withdrawForm.register('description')}
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={withdrawMutation.isPending}
          >
            {withdrawMutation.isPending ? 'Processing...' : 'Make Withdrawal'}
          </Button>
          {withdrawMutation.isError && (
            <p className={styles.error}>{withdrawMutation.error?.message}</p>
          )}
        </form>
      )}

      {mode === 'transfer' && (
        <form className={styles.form} onSubmit={transferForm.handleSubmit(onTransferSubmit)}>
          <FormInput
            type="number"
            label="From Account ID"
            required={true}
            {...transferForm.register('accountIdFrom', {
              required: 'Source Account ID is required',
              min: { value: 1, message: 'Account ID must be positive' },
            })}
            error={transferForm.formState.errors.accountIdFrom?.message}
          />
          <FormInput
            type="number"
            label="To Account ID"
            required={true}
            {...transferForm.register('accountIdTo', {
              required: 'Destination Account ID is required',
              min: { value: 1, message: 'Account ID must be positive' },
            })}
            error={transferForm.formState.errors.accountIdTo?.message}
          />
          <FormInput
            type="number"
            label="Amount"
            required={true}
            {...transferForm.register('amount', {
              required: 'Amount is required',
              min: { value: 0.01, message: 'Amount must be greater than 0' },
            })}
            error={transferForm.formState.errors.amount?.message}
          />
          <div className={styles.formGroup}>
            <label htmlFor="transfer-currency" className={styles.label}>
              Currency<span className={styles.required}>*</span>
            </label>
            <Controller
              name="currency"
              control={transferForm.control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  id="transfer-currency"
                  value={field.value || ''}
                  sx={{ borderRadius: '20px' }}
                  className={styles.select}
                >
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="UAH">UAH</MenuItem>
                </Select>
              )}
            />
            {transferForm.formState.errors.currency && (
              <span className={styles.error}>Currency is required</span>
            )}
          </div>
          <FormInput
            type="text"
            label="Description (optional)"
            {...transferForm.register('description')}
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={transferMutation.isPending}
          >
            {transferMutation.isPending ? 'Processing...' : 'Make Transfer'}
          </Button>
          {transferMutation.isError && (
            <p className={styles.error}>{transferMutation.error?.message}</p>
          )}
        </form>
      )}
    </Card>
  )
}
