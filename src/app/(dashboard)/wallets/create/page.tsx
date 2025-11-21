'use client'

import useCreateWallet from '@/hooks/wallets/useCreateWallet'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { CreateWalletRequest } from '@/modules/wallets/types/createWalletRequest'
import Card from '@/components/Card/Card'
import FormInput from '@/components/FormInput/FormInput'
import Button from '@/components/Button/Button'

export default function CreateWalletPage() {
  const { mutate } = useCreateWallet()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<CreateWalletRequest>()

  const onHandle = (data: CreateWalletRequest) => {
    if (isDirty) {
      console.log('Start wallet creation')
      mutate(data)
      router.push('/wallets')
    }
  }

  return (
    <Card radius="md" className={styles.formContainer}>
      <h1>Create Wallet</h1>
      <form className={styles.form} onSubmit={handleSubmit(onHandle)}>
        <FormInput
          type="number"
          label="Account ID"
          required={true}
          {...register('accountId', {
            required: true,
            valueAsNumber: true,
            min: {
              value: 1,
              message: 'Account ID must be a positive number'
            }
          })}
          error={errors.accountId?.message}
        />
        <div className={styles.formGroup}>
          <label htmlFor="currency" className={styles.label}>
            Currency <span className={styles.required}>*</span>
          </label>
          <select
            id="currency"
            className={styles.select}
            {...register('currency', { required: true })}
          >
            <option value="">Select currency</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="UAH">UAH</option>
          </select>
          {errors.currency && (
            <span className={styles.error}>Currency is required</span>
          )}
        </div>
        <Button type="submit" variant="primary" size="md">
          Create Wallet
        </Button>
      </form>
    </Card>
  )
}
