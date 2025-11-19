'use client'

import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Edit,
  Mail,
  User,
  Image as ImageIcon,
  Trash2,
} from 'lucide-react'
import Button from '@/components/Button/Button'
import Card from '@/components/Card/Card'
import styles from './page.module.css'
import useGetAccount from '@/hooks/accounts/useGetAccount'
import Link from 'next/link'

export default function AccountDetailsPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const accountId = Number.parseInt(id)

  const { data, isLoading, error } = useGetAccount(accountId)

  const handleBack = () => {
    router.back()
  }

  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log('Delete account:', accountId)
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
        <h1 className={styles.title}>Account Details</h1>
        <p>Loading account data...</p>
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
        <h1 className={styles.title}>Account Details</h1>
        <p className={styles.error}>Failed to load account data</p>
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
        <h1 className={styles.title}>Account Details</h1>
      </div>

      <Card className={styles.detailsCard}>
        <div className={styles.detailItem}>
          <div className={styles.detailLabel}>
            <User size={18} />
            <span>First Name</span>
          </div>
          <p className={styles.detailValue}>{data.firstName}</p>
        </div>

        <div className={styles.detailItem}>
          <div className={styles.detailLabel}>
            <User size={18} />
            <span>Last Name</span>
          </div>
          <p className={styles.detailValue}>{data.lastName}</p>
        </div>

        <div className={styles.detailItem}>
          <div className={styles.detailLabel}>
            <Mail size={18} />
            <span>Email</span>
          </div>
          <p className={styles.detailValue}>{data.email}</p>
        </div>

        <div className={styles.detailItem}>
          <div className={styles.detailLabel}>
            <ImageIcon size={18} />
            <span>Profile Picture</span>
          </div>
          <p className={styles.detailValue}>
            {data.profilePictureUrl ?? 'Not yet added'}
          </p>
          <div className={styles.actionButtons}>
            <Link href={`/accounts/${id}/update`}>
              <Button
                type="button"
                variant="primary"
                size="sm"
                icon={<Edit size={16} />}
              >
                Edit Account
              </Button>
            </Link>
            <Button
              type="button"
              variant="danger"
              size="sm"
              icon={<Trash2 size={16} />}
              onClick={handleDelete}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </Card>
    </section>
  )
}
