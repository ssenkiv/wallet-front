'use client'

import { ColumnDef } from '@tanstack/react-table'
import Avatar from '@/components/Avatar/Avatar'
import useAccountsViewModel from '@/hooks/accounts/view/useAccountsViewModel'
import { AccountViewModel } from '@/view-models/accounts/accountViewModel'
import styles from './page.module.css'
import Table from '@/components/Table/Table'
import Card from '@/components/Card/Card'
import Button from '@/components/Button/Button'
import { Edit, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import useDeleteAccount from '@/hooks/accounts/useDeleteAccount'
import { useRouter } from 'next/navigation'

export default function AccountsPage() {
  const router = useRouter()
  const { mutate } = useDeleteAccount()
  const { data, isLoading, error } = useAccountsViewModel()

  const handleRowClick = (accountId: number) => {
    router.push(`/accounts/${accountId}`)
  }

  const handleEditClick = (accountId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/accounts/${accountId}/update`)
  }

  const handleDeleteClick = (accountId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    mutate(accountId)
  }

  const columns: ColumnDef<AccountViewModel>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 60,
      cell: ({ row }) => (
        <span className={styles.idCell}>#{row.original.id}</span>
      ),
    },
    {
      accessorKey: 'fullName',
      header: 'User',
      size: 250,
      cell: ({ row }) => (
        <Link href={`/accounts/${row.original.id}`}>
          <div className={styles.userCell}>
            <Avatar
              src={row.original.avatarUrl}
              alt={row.original.fullName}
              fallback={row.original.initials}
              size="sm"
            />
            <div className={styles.userInfo}>
              <div className={styles.userName}>{row.original.fullName}</div>
              <div className={styles.userEmail}>{row.original.email}</div>
            </div>
          </div>
        </Link>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      size: 250,
    },
    {
      accessorKey: 'formattedCreatedAt',
      header: 'Joined',
      size: 150,
      cell: ({ row }) => (
        <span className={styles.dateCell}>
          {row.original.formattedCreatedAt}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      size: 200,
      cell: ({ row }) => (
        <div className={styles.actionsCell}>
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => handleEditClick(row.original.id, e)}
            icon={<Edit size={16} />}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={(e) => handleDeleteClick(row.original.id, e)}
            icon={<Trash2 size={16} />}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ]

  if (error) {
    return (
      <Card>
        <div className={styles.errorState}>
          <h2>Error Loading Accounts</h2>
          <p>{error.message}</p>
        </div>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Loading accounts...</p>
        </div>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <div className={styles.header}>
          <h1 className={styles.title}>Accounts</h1>
          <Link href={'/accounts/create'}>
            <Button variant="primary" size="sm" icon={<Plus size={20} />}>
              Create Account
            </Button>
          </Link>
        </div>
        <Table
          data={data}
          columns={columns}
          variant="default"
          size="md"
          hoverable
          emptyMessage="No accounts found"
          enablePagination
          onRowClick={(row) => handleRowClick(row.id)}
        />
      </Card>
    </>
  )
}
