import React, { useState, useRef, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { ColDef } from 'ag-grid-community'
import { WppAvatar, WppTypography, WppSkeleton } from '@platform-ui-kit/components-library-react'
import 'ag-grid-community/styles/ag-grid.css'
import '@platform-ui-kit/components-library/dist/collection/ag-theme-wpp.css'

import { dataList } from '../AgGridTable/consts'

import styles from './Skeleton.module.scss'

// prettier-ignore
type TableDataItem = typeof dataList[0]

const columnDefs: ColDef[] = [
  {
    field: 'id',
    width: 200,
  },
  {
    field: 'firstName',
    width: 200,
  },
  {
    field: 'lastName',
    width: 200,
  },
  {
    field: 'linkedIn',
    width: 300,
  },
  {
    field: 'email',
    width: 250,
  },
  {
    field: 'gender',
    width: 250,
  },
  {
    field: 'avatar',
    width: 300,
    cellRenderer: ({ data, colDef, isLoading }: ColDef['cellRenderer']) => (
      <div className="avatar-cell">
        {isLoading ? (
          <>
            <WppSkeleton className={styles['avatar']} variant="circle" width={32} height={32} />
            <WppSkeleton width={colDef.width - 100} height={30} />
          </>
        ) : (
          <>
            <WppAvatar size="s" src={data.avatar} />
            <i>
              {data.firstName} {data.lastName}
            </i>
          </>
        )}
      </div>
    ),
  },
]

export const SkeletonPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const gridRef = useRef<AgGridReact<TableDataItem>>(null)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }, [])

  return (
    <div className={styles.container} data-testid="skeleton-table">
      <div style={{ height: '', width: '100%', marginBottom: 32 }} className="ag-theme-wpp">
        <AgGridReact
          ref={gridRef}
          rowData={dataList.slice(0, 10)}
          columnDefs={columnDefs}
          defaultColDef={{
            cellRendererParams: {
              width: 500,
              isLoading,
            },
            cellRenderer: ({ value, isLoading, colDef }: ColDef['cellRenderer']) => (
              <div className={styles['data-cell']}>
                {isLoading ? (
                  <WppSkeleton width={colDef.width - 50} height={30} />
                ) : (
                  <WppTypography type="s-body">{value}</WppTypography>
                )}
              </div>
            ),
          }}
          animateRows
          domLayout={'autoHeight'}
        />
      </div>
    </div>
  )
}
