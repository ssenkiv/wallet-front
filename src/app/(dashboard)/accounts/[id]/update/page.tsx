'use client'

import Button from '@/components/Button/Button'
import Card from '@/components/Card/Card'
import useGetAccount from '@/hooks/accounts/useGetAccount'
import useUpdateAccount from '@/hooks/accounts/useUpdateAccount'
import { AccountUpdateFormData } from '@/modules/accounts/types/AccountUpdateFormData'
import { useParams, useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './page.module.css'
import FormInput from '@/components/FormInput/FormInput'

export default function UpdatePage() {
  const { id } = useParams<{ id: string }>()
  const parsedAccountId = Number.parseInt(id, 10)
  const { data } = useGetAccount(parsedAccountId)
  const { mutate } = useUpdateAccount()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<AccountUpdateFormData>({
    defaultValues: {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
    },
  })

  const onSubmit: SubmitHandler<AccountUpdateFormData> = (data) => {
    console.log(data)
    if (isDirty) {
      console.log('Start mutation')
      mutate({
        id: parsedAccountId,
        updateAccount: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        },
      })
    }
    router.push('/accounts')
  }
  if (data !== undefined) {
    return (
      <Card className={styles.card} radius="md">
        <h1 className={styles.title}>Account Update Form</h1>
        <form
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            label="First Name"
            {...register('firstName', { required: true })}
            error={errors.firstName?.message}
          />
          <FormInput
            label="Last Name"
            {...register('lastName', { required: true })}
          />
          <FormInput label="Email" {...register('email', { required: true })} />
          <Button type="submit" variant="primary" size="md">
            Submit
          </Button>
        </form>
      </Card>
    )
  }
}
