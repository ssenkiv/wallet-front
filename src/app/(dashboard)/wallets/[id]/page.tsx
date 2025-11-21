'use client'

import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Edit,
  Trash2,
  DollarSign,
  CreditCard,
  User,
} from 'lucide-react'
import Button from '@/components/Button/Button'
import Card from '@/components/Card/Card'
import styles from './page.module.css'
import { useGetWallet } from '@/hooks/wallets/useGetWallet'
import useDeleteWallet from '@/hooks/wallets/useDeleteWallet'
import Link from 'next/link'

export default function WalletDetailsPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const walletId = Number.parseInt(id)

  const { data, isLoading, error } = useGetWallet(walletId)
  const { mutate } = useDeleteWallet()

  const handleBack = () => {
    router.back()
  }

  const handleDelete = () => {
    mutate(walletId)
    router.push('/wallets')
  }

  if (isLoading) {
    return (
      <section className={styles.content}>
        <Button
          className={styles.button}
          type="button"
          variant="secondary"
          size="sm"
          onClick={handleBack}
          icon={<ArrowLeft size={18} />}
        >
          Back
        </Button>
        <h1 className={styles.title}>Wallet Details</h1>
        <p>Loading wallet data...</p>
      </section>
    )
  }

  if (error || !data) {
    return (
      <section className={styles.content}>
        <Button
          className={styles.button}
          type="button"
          variant="secondary"
          size="sm"
          onClick={handleBack}
          icon={<ArrowLeft size={18} />}
        >
          Back
        </Button>
        <h1 className={styles.title}>Wallet Details</h1>
        <p className={styles.error}>Failed to load wallet data</p>
      </section>
    )
  }

  return (
    <section className={styles.content}>
      <Button
        className={styles.button}
        type="button"
        variant="secondary"
        size="sm"
        onClick={handleBack}
        icon={<ArrowLeft size={18} />}
      >
        Back
      </Button>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Wallet Details</h1>
      </div>

      <Card className={styles.detailsCard}>
        <div className={styles.detailItem}>
          <div className={styles.detailLabel}>
            <CreditCard size={18} />
            <span>Wallet ID</span>
          </div>
          <p className={styles.detailValue}>#{data.id}</p>
        </div>

        <div className={styles.detailItem}>
          <div className={styles.detailLabel}>
            <DollarSign size={18} />
            <span>Currency</span>
          </div>
          <p className={styles.detailValue}>{data.currency}</p>
        </div>

        <div className={styles.detailItem}>
          <div className={styles.detailLabel}>
            <DollarSign size={18} />
            <span>Amount</span>
          </div>
          <p className={styles.detailValue}>{data.amount}</p>
        </div>

        <div className={styles.detailItem}>
          <div className={styles.detailLabel}>
            <User size={18} />
            <span>Account ID</span>
          </div>
          <p className={styles.detailValue}>#{data.accountId}</p>
          <div className={styles.actionButtons}>
            <Button
              type="button"
              variant="danger"
              size="sm"
              icon={<Trash2 size={16} />}
              onClick={handleDelete}
            >
              Delete Wallet
            </Button>
          </div>
        </div>
      </Card>
    </section>
  )
}
