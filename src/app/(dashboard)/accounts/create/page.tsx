'use client'

import useCreateAccount from '@/hooks/accounts/useCreateAccount'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { AccountCreateRequest } from '@/modules/accounts/types/accountCreateRequest'
import Card from '@/components/Card/Card'
import FormInput from '@/components/FormInput/FormInput'
import Button from '@/components/Button/Button'

export default function CreatePage() {
  const { mutate } = useCreateAccount()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<AccountCreateRequest>()

  const onHandle = (data: AccountCreateRequest) => {
    if (isDirty) {
      console.log('Start creation')
      mutate(data)
      router.push('/accounts')
    }
  }

  return (
    <Card radius="md" className={styles.formContainer}>
      <h1>Account Create Form</h1>
      <form className={styles.form} onSubmit={handleSubmit(onHandle)}>
        <FormInput
          required={true}
          label="First Name"
          {...register('firstName', { required: true })}
          error={errors.firstName?.message}
        />
        <FormInput
          label="Last Name"
          required={true}
          {...register('lastName', { required: true })}
          error={errors.lastName?.message}
        />
        <FormInput
          type="text"
          label="Email"
          required={true}
          {...register('email', {
            required: true,
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: 'Please enter valid email.',
            },
          })}
          error={errors.email?.message}
        />
        <Button type="submit" variant="primary" size="md">
          Submit
        </Button>
      </form>
    </Card>
  )
}
