import React from 'react';

export interface TableColumn<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  onRowClick?: (row: T) => void;
}

export const Table = <T extends { id: string | number }>({
  columns,
  data,
  isLoading = false,
  onRowClick,
}: TableProps<T>) => {
  return (
    <div
      style={{
        width: '100%',
        overflowX: 'auto',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)',
        backgroundColor: 'rgba(255, 255, 255, 0.55)', backdropFilter: 'blur(14px) saturate(180%)', WebkitBackdropFilter: 'blur(14px) saturate(180%)',
      }}
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          textAlign: 'left',
          fontSize: '0.875rem',
        }}
      >
        {/* Table Head */}
        <thead>
          <tr
            style={{
              borderBottom: '1px solid var(--border-light)',
              backgroundColor: '#F8FAFC',
            }}
          >
            {columns.map((col, index) => (
              <th
                key={index}
                style={{
                  padding: '1rem 1.5rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  fontSize: '0.775rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  width: col.width || 'auto',
                  textAlign: col.align || 'left',
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {isLoading ? (
            // Skeleton Loader State
            Array.from({ length: 4 }).map((_, rIdx) => (
              <tr
                key={rIdx}
                style={{
                  borderBottom: '1px solid var(--border-light)',
                }}
              >
                {columns.map((_, cIdx) => (
                  <td key={cIdx} style={{ padding: '1.25rem 1.5rem' }}>
                    <div className="skeleton-box" style={{ width: '80%', height: '1rem' }} />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            // Empty State
            <tr>
              <td
                colSpan={columns.length}
                style={{
                  padding: '3rem 1.5rem',
                  textAlign: 'center',
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem',
                }}
              >
                No records found.
              </td>
            </tr>
          ) : (
            // Data Rows
            data.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick && onRowClick(row)}
                style={{
                  borderBottom: '1px solid var(--border-light)',
                  cursor: onRowClick ? 'pointer' : 'default',
                  transition: 'background var(--transition-fast)',
                }}
                className={onRowClick ? 'crm-table-row-interactive' : ''}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {columns.map((col, cIdx) => {
                  const renderedVal =
                    typeof col.accessor === 'function'
                      ? col.accessor(row)
                      : (row[col.accessor] as React.ReactNode);

                  return (
                    <td
                      key={cIdx}
                      style={{
                        padding: '1.1rem 1.5rem',
                        color: 'var(--text-primary)',
                        textAlign: col.align || 'left',
                        verticalAlign: 'middle',
                      }}
                    >
                      {renderedVal}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
