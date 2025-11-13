'use client';

import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';
import Modal from '@/components/Modal/Modal';
import Button from '@/components/Button/Button';
import FormField from '@/components/FormField/FormField';
import useCreateAccount from '@/hooks/accounts/useCreateAccount';
import styles from './AccountCreateModal.module.css';

export interface AccountCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AccountCreateFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePictureUrl?: string;
}

export default function AccountCreateModal({
  isOpen,
  onClose,
}: Readonly<AccountCreateModalProps>) {
  const { mutate: createAccount, isPending } = useCreateAccount();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<AccountCreateFormData>({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      profilePictureUrl: '',
    },
  });

  const onSubmit: SubmitHandler<AccountCreateFormData> = (data) => {
    createAccount(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        profilePictureUrl: data.profilePictureUrl || undefined,
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
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Account" size="md">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
          name="password"
          label="Password"
          type="password"
          placeholder="Enter password"
          required
          disabled={isPending}
          validation={{
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
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
            onClick={handleClose}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={!isValid || isPending}>
            {isPending ? 'Creating...' : 'Create Account'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
