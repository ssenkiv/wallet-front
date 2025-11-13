'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useForm, SubmitHandler } from 'react-hook-form'
import Button from '@/components/Button/Button'
import Avatar from '@/components/Avatar/Avatar'
import FormField from '@/components/FormField/FormField'
import useGetAccount from '@/hooks/accounts/useGetAccount'
import useUpdateAccount from '@/hooks/accounts/useUpdateAccount'
import useDeleteAccount from '@/hooks/accounts/useDeleteAccount'
import { X } from 'lucide-react'
import styles from './AccountDetailsContent.module.css'

export interface AccountDetailsContentProps {
  accountId: number | null;
  onClose?: () => void;
  showCloseButton?: boolean;
}

enum ViewMode {
  VIEW = 'view',
  EDIT = 'edit',
}

interface AccountUpdateFormData {
  firstName: string;
  lastName: string;
  email: string;
  profilePictureUrl?: string;
}

export default function AccountDetailsContent ({
  accountId,
  onClose,
  showCloseButton = true,
}: Readonly<AccountDetailsContentProps>) {
  const [mode, setMode] = useState<ViewMode>(ViewMode.VIEW)

  const { data: account, isLoading, error } = useGetAccount(accountId)
  const { mutate: updateAccount, isPending } = useUpdateAccount()
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<AccountUpdateFormData>({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      profilePictureUrl: '',
    },
  });

  useEffect(() => {
    if (account) {
      reset({
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        profilePictureUrl: account.profilePictureUrl || '',
      });
    }
  }, [account, reset]);

  const onSubmit: SubmitHandler<AccountUpdateFormData> = (data) => {
    if (!account) return

    updateAccount(
      {
        id: account.id,
        updateAccount: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          profilePictureUrl: data.profilePictureUrl || undefined,
        },
      },
      {
        onSuccess: () => {
          toast.success('Account updated successfully!')
          setMode(ViewMode.VIEW)
        },
        onError: (error) => {
          toast.error(error instanceof Error
            ? error.message
            : 'Failed to update account')
        },
      },
    )
  };

  const handleCancel = () => {
    if (account) {
      reset({
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        profilePictureUrl: account.profilePictureUrl || '',
      });
    }
    setMode(ViewMode.VIEW)
  }

  const handleDelete = () => {
    if (!account) return

    const confirmed = globalThis.confirm(
      `Are you sure you want to delete the account for ${account.firstName} ${account.lastName}? This action cannot be undone.`,
    )

    if (!confirmed) return

    if (onClose) {
      onClose()
    }

    deleteAccount(account.id, {
      onSuccess: () => {
        toast.success('Account deleted successfully!')
      },
      onError: (error) => {
        toast.error(
          error instanceof Error ? error.message : 'Failed to delete account')
      },
    })
  }

  if (!accountId) {
    return (
      <div className={styles.errorState}>
        <h2>No Account Selected</h2>
        <p>Please select an account to view its details.</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.spinner}></div>
        <p>Loading account details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.errorState}>
        <h2>Error Loading Account</h2>
        <p>{error.message}</p>
      </div>
    )
  }

  if (!account) {
    return (
      <div className={styles.errorState}>
        <h2>Account Not Found</h2>
        <p>The requested account could not be found.</p>
      </div>
    )
  }

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <Avatar
          src={account.profilePictureUrl}
          alt={`${account.firstName} ${account.lastName}`}
          fallback={`${account.firstName[0]}${account.lastName[0]}`}
          size="lg"
        />
        <div className={styles.headerInfo}>
          <h2 className={styles.name}>{`${account.firstName} ${account.lastName}`}</h2>
          <p className={styles.id}>Account #{account.id}</p>
        </div>
      </div>

      {mode === ViewMode.VIEW ? (
        <div className={styles.viewMode}>
          <div className={styles.field}>
            <span className={styles.label}>First Name</span>
            <p className={styles.value}>{account.firstName}</p>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Last Name</span>
            <p className={styles.value}>{account.lastName}</p>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Email</span>
            <p className={styles.value}>{account.email}</p>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Profile Picture URL</span>
            <p className={styles.value}>
              {account.profilePictureUrl || 'Not provided'}
            </p>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Member Since</span>
            <p className={styles.value}>
              {new Date(account.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          <div className={styles.actions}>
            <Button
              type="button"
              variant="danger"
              size="md"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
            {showCloseButton && onClose && (
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={onClose}
                disabled={isDeleting}
              >
                Close
              </Button>
            )}
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={() => setMode(ViewMode.EDIT)}
              disabled={isDeleting}
            >
              Edit
            </Button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.editMode}
        >
          <div className={styles.formGrid}>
            <FormField
              register={register}
              errors={errors}
              name="firstName"
              label="First Name"
              placeholder="Enter first name"
              required
              disabled={isPending}
              validation={{
                validate: (value) => value.trim() ? true : 'First name is required',
              }}
            />

            <FormField
              register={register}
              errors={errors}
              name="lastName"
              label="Last Name"
              placeholder="Enter last name"
              required
              disabled={isPending}
              validation={{
                validate: (value) => value.trim() ? true : 'Last name is required',
              }}
            />
          </div>

          <FormField
            register={register}
            errors={errors}
            name="email"
            label="Email"
            type="email"
            placeholder="Enter email address"
            required
            disabled={isPending}
            validation={{
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address',
              },
            }}
          />

          <FormField
            register={register}
            errors={errors}
            name="profilePictureUrl"
            label="Profile Picture URL"
            placeholder="Enter profile picture URL (optional)"
            disabled={isPending}
          />

          <div className={styles.actions}>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleCancel}
              disabled={isPending}
              icon={<X size={18}/>}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={!isValid || isPending}
            >
              {isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
