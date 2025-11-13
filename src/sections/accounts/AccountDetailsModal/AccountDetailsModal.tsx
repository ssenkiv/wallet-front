'use client'

import Modal from '@/components/Modal/Modal'
import AccountDetailsContent from '@/sections/accounts/AccountDetailsContent/AccountDetailsContent'

export interface AccountDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountId: number | null;
}

export default function AccountDetailsModal ({
  isOpen,
  onClose,
  accountId,
}: Readonly<AccountDetailsModalProps>) {
  if (!isOpen || !accountId) {
    return null
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Account Details" size="md">
      <AccountDetailsContent accountId={accountId} onClose={onClose} />
    </Modal>
  )
}
