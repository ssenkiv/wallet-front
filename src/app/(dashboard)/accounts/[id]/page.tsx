'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Button from '@/components/Button/Button'
import AccountDetailsContent from '@/sections/accounts/AccountDetailsContent/AccountDetailsContent'
import styles from './page.module.css'

export default function AccountDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const accountId = Number.parseInt(id, 10)

  const handleBack = () => {
    router.back()
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={handleBack}
          icon={<ArrowLeft size={18} />}
        >
          Back
        </Button>
        <h1 className={styles.title}>Account Details</h1>
      </div>

      <div className={styles.content}>
        <AccountDetailsContent
          accountId={Number.isNaN(accountId) ? null : accountId}
          showCloseButton={false}
        />
      </div>
    </div>
  )
}
