'use client';

import { toast } from 'react-toastify';
import { useForm } from '@tanstack/react-form';
import Modal from '@/components/Modal/Modal';
import Button from '@/components/Button/Button';
import FormField from '@/components/FormField/FormField';
import useCreateAccount from '@/hooks/accounts/useCreateAccount';
import { accountValidators } from '@/utils/formValidators';
import styles from './AccountCreateModal.module.css';

export interface AccountCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccountCreateModal({
  isOpen,
  onClose,
}: Readonly<AccountCreateModalProps>) {
  const { mutate: createAccount, isPending } = useCreateAccount();

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      profilePictureUrl: '',
    },
    onSubmit: async ({ value }) => {
      createAccount(
        {
          firstName: value.firstName,
          lastName: value.lastName,
          email: value.email,
          password: value.password,
          profilePictureUrl: value.profilePictureUrl || undefined,
        },
        {
          onSuccess: () => {
            toast.success('Account created successfully!');
            handleClose();
          },
          onError: (error) => {
            toast.error(error instanceof Error ? error.message : 'Failed to create account');
          },
        }
      );
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Account" size="md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className={styles.form}
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
          name="password"
          label="Password"
          type="password"
          placeholder="Enter password"
          validator={accountValidators.password}
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
            onClick={handleClose}
            disabled={isPending}
          >
            Cancel
          </Button>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit]) => (
              <Button type="submit" variant="primary" disabled={!canSubmit || isPending}>
                {isPending ? 'Creating...' : 'Create Account'}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </Modal>
  );
}
