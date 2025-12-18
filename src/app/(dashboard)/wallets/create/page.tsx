'use client'

import useCreateWallet from '@/hooks/wallets/useCreateWallet'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { CreateWalletCommand } from '@/modules/wallets/types/createWalletCommand'
import Card from '@/components/Card/Card'
import FormInput from '@/components/FormInput/FormInput'
import Button from '@/components/Button/Button'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'

export default function CreateWalletPage() {
  const { mutate } = useCreateWallet()
  const router = useRouter()
  const [currencyV, setCurrencyV] = useState('')
  const handleCurrencyChange = (event: SelectChangeEvent<typeof currencyV>) => {
    const {
      target: { value },
    } = event
    setCurrencyV(value ?? '')
  }
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<CreateWalletCommand>()

  const onHandle = (data: CreateWalletCommand) => {
    if (isDirty) {
      mutate(data)
      router.push('/wallets')
    }
  }

  return (
    <Card radius="md" className={styles.formContainer}>
      <h1>Create Wallet</h1>
      <form className={styles.form} onSubmit={handleSubmit(onHandle)}>
        <FormInput
          type="text"
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
          <label htmlFor={'currency'} className={styles.label}>Currency<span>*</span></label>
          <Select
            id="currency"
            value={currencyV}
            sx={{ borderRadius: '20px' }}
            className={styles.select}
            {...register('currency', { required: true, onChange: handleCurrencyChange })}
          >
            <MenuItem value={'USD'}>USD</MenuItem>
            <MenuItem value={'EUR'}>EUR</MenuItem>
            <MenuItem value={'UAH'}>UAH</MenuItem>

          </Select>
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
