'use client'

import { ColumnDef } from '@tanstack/react-table'
import styles from './page.module.css'
import Table from '@/components/Table/Table'
import Card from '@/components/Card/Card'
import Button from '@/components/Button/Button'
import {
  Plus,
  Eye,
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useTransactionsViewModel from '@/hooks/transactions/view/useTransactionsViewModel'
import { TransactionViewModel } from '@/view-models/transactions/transactionViewModel'

const TYPE_ICONS = {
  deposit: ArrowDownToLine,
  withdraw: ArrowUpFromLine,
  transfer: ArrowLeftRight,
}

export default function TransactionsPage() {
  const router = useRouter()
  const { data, isLoading, error } = useTransactionsViewModel()

  const handleRowClick = (transactionId: number) => {
    router.push(`/transactions/${transactionId}`)
  }

  const columns: ColumnDef<TransactionViewModel>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 60,
      cell: ({ row }) => (
        <span className={styles.idCell}>#{row.original.id}</span>
      ),
    },
    {
      accessorKey: 'type',
      header: 'Type',
      size: 120,
      cell: ({ row }) => {
        const Icon = TYPE_ICONS[row.original.type]
        return (
          <div className={styles.typeCell}>
            <Icon size={16} />
            <span>{row.original.typeLabel}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'accountsDisplay',
      header: 'Accounts',
      size: 150,
      cell: ({ row }) => (
        <span className={styles.accountsCell}>{row.original.accountsDisplay}</span>
      ),
    },
    {
      accessorKey: 'formattedAmount',
      header: 'Amount',
      size: 120,
      cell: ({ row }) => (
        <span className={styles.amountCell}>{row.original.formattedAmount}</span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      size: 100,
      cell: ({ row }) => (
        <span className={`${styles.statusBadge} ${styles[row.original.statusColor]}`}>
          {row.original.statusLabel}
        </span>
      ),
    },
    {
      accessorKey: 'formattedCreatedAt',
      header: 'Date',
      size: 150,
      cell: ({ row }) => (
        <span className={styles.dateCell}>{row.original.formattedCreatedAt}</span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      size: 80,
      cell: ({ row }) => (
        <div className={styles.actionsCell}>
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/transactions/${row.original.id}`)
            }}
            icon={<Eye size={16} />}
          >
            View
          </Button>
        </div>
      ),
    },
  ]

  if (error) {
    return (
      <Card>
        <div className={styles.errorState}>
          <h2>Error Loading Transactions</h2>
          <p>Failed to load transactions. Please try again.</p>
        </div>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Loading transactions...</p>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <div className={styles.header}>
        <h1 className={styles.title}>Transactions</h1>
        <Link href="/transactions/create">
          <Button variant="primary" size="sm" icon={<Plus size={20} />}>
            New Transaction
          </Button>
        </Link>
      </div>
      <Table
        data={data}
        columns={columns}
        variant="default"
        size="md"
        hoverable
        emptyMessage="No transactions found"
        enablePagination
        onRowClick={(row) => handleRowClick(row.id)}
      />
    </Card>
  )
}
