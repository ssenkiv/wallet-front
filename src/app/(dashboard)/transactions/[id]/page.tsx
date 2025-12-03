'use client'

import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  Calendar,
  DollarSign,
  FileText,
  User,
  CheckCircle,
} from 'lucide-react'
import Button from '@/components/Button/Button'
import Card from '@/components/Card/Card'
import styles from './page.module.css'
import useTransactionViewModel from '@/hooks/transactions/view/useTransactionViewModel'
import Link from 'next/link'

const TYPE_ICONS = {
  deposit: ArrowDownToLine,
  withdraw: ArrowUpFromLine,
  transfer: ArrowLeftRight,
}

export default function TransactionDetailsPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const transactionId = Number.parseInt(id)

  const { data, isLoading, error } = useTransactionViewModel(transactionId)

  const handleBack = () => {
    router.back()
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
        <h1 className={styles.title}>Transaction Details</h1>
        <p>Loading transaction data...</p>
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
        <h1 className={styles.title}>Transaction Details</h1>
        <p className={styles.error}>Failed to load transaction data</p>
      </section>
    )
  }

  const TypeIcon = TYPE_ICONS[data.type]

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
        <h1 className={styles.title}>Transaction #{data.id}</h1>
      </div>

      <Card className={styles.detailsCard}>
        <div className={styles.detailItem}>
          <div className={styles.detailLabel}>
            <TypeIcon size={18} />
            <span>Type</span>
          </div>
          <p className={styles.detailValue}>{data.typeLabel}</p>
        </div>

        <div className={styles.detailItem}>
          <div className={styles.detailLabel}>
            <CheckCircle size={18} />
            <span>Status</span>
          </div>
          <span className={`${styles.statusBadge} ${styles[data.statusColor]}`}>
            {data.statusLabel}
          </span>
        </div>

        <div className={styles.detailItem}>
          <div className={styles.detailLabel}>
            <DollarSign size={18} />
            <span>Amount</span>
          </div>
          <p className={styles.detailValue}>{data.formattedAmount}</p>
        </div>

        {data.accountIdFrom && (
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>
              <User size={18} />
              <span>From Account</span>
            </div>
            <p className={styles.detailValue}>
              <Link href={`/accounts/${data.accountIdFrom}`} className={styles.accountLink}>
                #{data.accountIdFrom}
              </Link>
            </p>
          </div>
        )}

        {data.accountIdTo && (
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>
              <User size={18} />
              <span>To Account</span>
            </div>
            <p className={styles.detailValue}>
              <Link href={`/accounts/${data.accountIdTo}`} className={styles.accountLink}>
                #{data.accountIdTo}
              </Link>
            </p>
          </div>
        )}

        <div className={styles.detailItem}>
          <div className={styles.detailLabel}>
            <Calendar size={18} />
            <span>Date</span>
          </div>
          <p className={styles.detailValue}>{data.formattedCreatedAt}</p>
        </div>

        {data.description && (
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>
              <FileText size={18} />
              <span>Description</span>
            </div>
            <p className={styles.detailValue}>{data.description}</p>
          </div>
        )}
      </Card>
    </section>
  )
}
