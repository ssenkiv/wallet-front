'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useForm } from '@tanstack/react-form'
import Modal from '@/components/Modal/Modal'
import Button from '@/components/Button/Button'
import Avatar from '@/components/Avatar/Avatar'
import FormField from '@/components/FormField/FormField'
import useGetAccount from '@/hooks/accounts/useGetAccount'
import useUpdateAccount from '@/hooks/accounts/useUpdateAccount'
import useDeleteAccount from '@/hooks/accounts/useDeleteAccount'
import { accountValidators } from '@/utils/formValidators'
import { X } from 'lucide-react'
import styles from './AccountDetailsModal.module.css'

export interface AccountDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountId: number | null;
}

enum ModalMode {
  VIEW = 'view',
  EDIT = 'edit',
}

export default function AccountDetailsModal ({
  isOpen,
  onClose,
  accountId,
}: Readonly<AccountDetailsModalProps>) {
  const [mode, setMode] = useState<ModalMode>(ModalMode.VIEW)

  const { data: account, isLoading, error } = useGetAccount(accountId ?? 0)
  const { mutate: updateAccount, isPending } = useUpdateAccount()
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount()

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      profilePictureUrl: '',
    },
    onSubmit: async ({ value }) => {
      if (!account) return

      updateAccount(
        {
          id: account.id,
          updateAccount: {
            firstName: value.firstName,
            lastName: value.lastName,
            email: value.email,
            profilePictureUrl: value.profilePictureUrl || undefined,
          },
        },
        {
          onSuccess: () => {
            toast.success('Account updated successfully!')
            setMode(ModalMode.VIEW)
          },
          onError: (error) => {
            toast.error(error instanceof Error
              ? error.message
              : 'Failed to update account')
          },
        },
      )
    },
  })

  useEffect(() => {
    if (account) {
      form.reset()
      form.setFieldValue('firstName', account.firstName)
      form.setFieldValue('lastName', account.lastName)
      form.setFieldValue('email', account.email)
      form.setFieldValue('profilePictureUrl', account.avatarUrl || '')
    }
  })

  const handleCancel = () => {
    if (account) {
      form.setFieldValue('firstName', account.firstName)
      form.setFieldValue('lastName', account.lastName)
      form.setFieldValue('email', account.email)
      form.setFieldValue('profilePictureUrl', account.avatarUrl || '')
    }
    setMode(ModalMode.VIEW)
  }

  const handleClose = () => {
    setMode(ModalMode.VIEW)
    onClose()
  }

  const handleDelete = () => {
    if (!account) return

    const confirmed = globalThis.confirm(
      `Are you sure you want to delete the account for ${account.firstName} ${account.lastName}? This action cannot be undone.`,
    )

    if (!confirmed) return

    deleteAccount(account.id, {
      onSuccess: () => {
        toast.success('Account deleted successfully!')
        onClose()
      },
      onError: (error) => {
        toast.error(
          error instanceof Error ? error.message : 'Failed to delete account')
      },
    })
  }

  if (!isOpen || !accountId) {
    return null
  }

  const fullName = account
    ? `${account.firstName} ${account.lastName}`
    : 'Loading...'
  const initials = account
    ? `${account.firstName[0]}${account.lastName[0]}`
    : ''

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Account Details"
           size="md">
      {isLoading && (
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Loading account details...</p>
        </div>
      )}

      {error && (
        <div className={styles.errorState}>
          <h2>Error Loading Account</h2>
          <p>{error.message}</p>
        </div>
      )}

      {account && !isLoading && (
        <div className={styles.content}>
          <div className={styles.header}>
            <Avatar
              src={account.avatarUrl}
              alt={fullName}
              fallback={initials}
              size="lg"
            />
            <div className={styles.headerInfo}>
              <h2 className={styles.name}>{fullName}</h2>
              <p className={styles.id}>Account #{account.id}</p>
            </div>
          </div>

          {mode === ModalMode.VIEW ? (
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
                  {account.avatarUrl || 'Not provided'}
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
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={handleClose}
                  disabled={isDeleting}
                >
                  Close
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={() => setMode(ModalMode.EDIT)}
                  disabled={isDeleting}
                >
                  Edit
                </Button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
              }}
              className={styles.editMode}
            >
              <div className={styles.formGrid}>
                <FormField
                  form={form}
                  name="firstName"
                  label="First Name"
                  placeholder="Enter first name"
                  validator={accountValidators.firstName}
                  required
                  disabled={isPending}
                />

                <FormField
                  form={form}
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter last name"
                  validator={accountValidators.lastName}
                  required
                  disabled={isPending}
                />
              </div>

              <FormField
                form={form}
                name="email"
                label="Email"
                type="email"
                placeholder="Enter email address"
                validator={accountValidators.email}
                required
                disabled={isPending}
              />

              <FormField
                form={form}
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
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                  {([canSubmit]) => (
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      disabled={!canSubmit || isPending}
                    >
                      {isPending ? 'Saving...' : 'Save Changes'}
                    </Button>
                  )}
                </form.Subscribe>
              </div>
            </form>
          )}
        </div>
      )}
    </Modal>
  )
}
