import { useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  getPaginationRowModel,
  PaginationState,
} from '@tanstack/react-table'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import styles from './Table.module.css'

export interface TableProps<TData> {
  data: TData[]
  columns: ColumnDef<TData>[]
  variant?: 'default' | 'striped' | 'bordered'
  size?: 'sm' | 'md' | 'lg'
  hoverable?: boolean
  emptyMessage?: string
  enablePagination?: boolean
  initialPageNumber?: number
  onRowClick?: (data: TData) => void
}

export default function Table<TData>({
  data,
  columns,
  variant = 'default',
  size = 'md',
  hoverable = true,
  emptyMessage = 'No data available',
  enablePagination = false,
  initialPageNumber = 1,
  onRowClick,
}: Readonly<TableProps<TData>>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: initialPageNumber - 1,
    pageSize: 10,
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
    onPaginationChange: enablePagination ? setPagination : undefined,
    state: enablePagination ? { pagination } : undefined,
    autoResetPageIndex: false,
  })

  const tableClasses = [
    styles.table,
    styles[variant],
    styles[`size-${size}`],
    hoverable && styles.hoverable,
  ]
    .filter(Boolean)
    .join(' ')
  return (
    <div className={styles.wrapper}>
      <div className={styles.tableContainer}>
        <table className={tableClasses}>
          <thead className={styles.thead}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className={styles.headerRow}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={styles.th}
                    style={{
                      width:
                        header.getSize() === 150 ? undefined : header.getSize(),
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className={styles.tbody}>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className={styles.emptyState}>
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={styles.bodyRow}
                  onClick={() => onRowClick?.(row.original)}
                  style={{ cursor: onRowClick ? 'pointer' : undefined }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={styles.td}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {enablePagination && (
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            <span className={styles.paginationText}>
              Showing {pagination.pageIndex * pagination.pageSize + 1} to{' '}
              {Math.min(
                (pagination.pageIndex + 1) * pagination.pageSize,
                table.getRowCount()
              )}{' '}
              of {table.getRowCount()} entries
            </span>
          </div>

          <div className={styles.paginationControls}>
            <button
              className={styles.paginationButton}
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label="Go to first page"
            >
              <ChevronsLeft size={18} />
            </button>
            <button
              className={styles.paginationButton}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label="Go to previous page"
            >
              <ChevronLeft size={18} />
            </button>

            <div className={styles.pageNumbers}>
              {Array.from({ length: table.getPageCount() }, (_, i) => (
                <button
                  key={i}
                  className={`${styles.pageNumber} ${
                    pagination.pageIndex === i ? styles.pageNumberActive : ''
                  }`}
                  onClick={() => table.setPageIndex(i)}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              className={styles.paginationButton}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              aria-label="Go to next page"
            >
              <ChevronRight size={18} />
            </button>
            <button
              className={styles.paginationButton}
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
              aria-label="Go to last page"
            >
              <ChevronsRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
