'use client';

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ColumnDef } from '@tanstack/react-table'
import Avatar from '@/components/Avatar/Avatar'
import useAccountsViewModel from '@/hooks/accounts/view/useAccountsViewModel'
import { AccountViewModel } from '@/view-models/accounts/AccountViewModel'
import styles from './page.module.css'
import Table from '@/components/Table/Table'
import Card from '@/components/Card/Card'
import Button from '@/components/Button/Button'
import AccountCreateModal
  from '@/sections/accounts/AccountCreateModal/AccountCreateModal'
import AccountDetailsModal
  from '@/sections/accounts/AccountDetailsModal/AccountDetailsModal'
import { Plus, ExternalLink } from 'lucide-react'

export default function AccountsPage() {
  const router = useRouter()
  const { data, isLoading, error } = useAccountsViewModel();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(
    null)

  const handleRowClick = (account: AccountViewModel) => {
    setSelectedAccountId(account.id)
    setIsDetailsModalOpen(true)
  }

  const handleFullDetailsClick = (accountId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/accounts/${accountId}`)
  }

  const columns = useMemo<ColumnDef<AccountViewModel>[]>(() => [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 60,
      cell: ({row}) => (
          <span className={styles.idCell}>#{row.original.id}</span>
      ),
    },
    {
      accessorKey: 'fullName',
      header: 'User',
      size: 250,
      cell: ({row}) => (
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
      cell: ({row}) => (
          <span className={styles.dateCell}>
          {row.original.formattedCreatedAt}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      size: 150,
      cell: ({row}) => (
        <div className={styles.actionsCell}>
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => handleFullDetailsClick(row.original.id, e)}
            icon={<ExternalLink size={16} />}
          >
            Full Details
          </Button>
        </div>
      ),
    },
  ], [router]);

  if (error) {
    return (
        <Card>
          <div className={styles.errorState}>
            <h2>Error Loading Accounts</h2>
            <p>{error.message}</p>
          </div>
        </Card>
    );
  }

  if (isLoading) {
    return (
        <Card>
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Loading accounts...</p>
          </div>
        </Card>
    );
  }

  return (
    <>
      <Card>
        <div className={styles.header}>
          <h1 className={styles.title}>Accounts</h1>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsCreateModalOpen(true)}
            icon={<Plus size={20}/>}
          >
            Create Account
          </Button>
        </div>
        <Table
          data={data}
          columns={columns}
          variant="default"
          size="md"
          hoverable
          emptyMessage="No accounts found"
          enablePagination
          initialPageSize={5}
          pageSizeOptions={[5, 10, 20]}
          onRowClick={handleRowClick}
        />
      </Card>

      <AccountCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <AccountDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        accountId={selectedAccountId}
      />
    </>
  );
}
