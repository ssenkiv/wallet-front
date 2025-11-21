'use client'

import { ColumnDef } from '@tanstack/react-table'
import styles from './page.module.css'
import Table from '@/components/Table/Table'
import Card from '@/components/Card/Card'
import Button from '@/components/Button/Button'
import { Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import useDeleteWallet from '@/hooks/wallets/useDeleteWallet'
import { useRouter } from 'next/navigation'
import { Wallet } from '@/modules/wallets/domain/wallet'
import { useGetAllWallets } from '@/hooks/wallets/useGetAllWallets'

export default function WalletsPage () {
  const router = useRouter()
  const { mutate } = useDeleteWallet()
  const { data, isLoading, isError } = useGetAllWallets()

  const handleRowClick = (walletId: number) => {
    router.push(`/wallets/${walletId}`)
  }

  const handleDeleteClick = (walletId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    mutate(walletId)
  }

  const columns: ColumnDef<Wallet>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 20,
      cell: ({ row }) => (
        <span className={styles.idCell}>#{row.original.id}</span>
      ),
    },
    {
      accessorKey: 'accountId',
      header: 'Account ID',
      size: 120,
      cell: ({ row }) => (
        <span className={styles.accountIdCell}>#{row.original.accountId}</span>
      ),
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      size: 20,
      cell: ({ row }) => (
        <span className={styles.amountCell}>
          {row.original.amount}
        </span>
      ),
    },
    {
      accessorKey: 'currency',
      header: 'Currency',
      size: 20,
      cell: ({ row }) => (
        <span className={styles.currencyCell}>{row.original.currency}</span>
      ),
    },

    {
      id: 'actions',
      header: 'Actions',
      size: 50,
      cell: ({ row }) => (
        <div className={styles.actionsCell}>
          <Button
            variant="danger"
            size="sm"
            onClick={(e) => handleDeleteClick(row.original.id, e)}
            icon={<Trash2 size={16}/>}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ]

  if (isError) {
    return (
      <Card>
        <div className={styles.errorState}>
          <h2>Error Loading Wallets</h2>
          <p>Failed to load wallets. Please try again.</p>
        </div>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Loading wallets...</p>
        </div>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <div className={styles.header}>
          <h1 className={styles.title}>Wallets</h1>
          <Link href={'/wallets/create'}>
            <Button variant="primary" size="sm" icon={<Plus size={20}/>}>
              Create Wallet
            </Button>
          </Link>
        </div>
        <Table
          data={data ?? []}
          columns={columns}
          variant="default"
          size="md"
          hoverable
          emptyMessage="No wallets found"
          enablePagination
          onRowClick={(row) => handleRowClick(row.id)}
        />
      </Card>
    </>
  )
}
