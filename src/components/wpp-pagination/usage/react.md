```tsx
import { useState } from 'react'
import {
  WppTable,
  WppTableCell,
  WppTableHeadCell,
  WppTableRow,
  WppAvatar,
  WppPagination,
} from '@platform-ui-kit/components-library-react'
import { PaginationChangeEventDetail } from '@platform-ui-kit/components-library'

import { dataList } from './consts'

import './Table.css'

export const PaginationExample = () => {
  const itemsPerPage = [3, 5, 10]

  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(itemsPerPage[0])

  const handlePaginationChange = (event: CustomEvent<PaginationChangeEventDetail>) => {
    setPage(event.detail.page)
    setPerPage(event.detail.itemsPerPage)
  }

  const dataToDisplay = [...dataList.slice((page - 1) * perPage, page * perPage)]

  return (
    <div className="table-page">
      <WppTable>
        <WppTableRow slot="table-head">
          <WppTableHeadCell>
            <p className="text">ID</p>
          </WppTableHeadCell>
          <WppTableHeadCell>
            <p className="text">First Name</p>
          </WppTableHeadCell>
          <WppTableHeadCell>
            <p className="text">Height</p>
          </WppTableHeadCell>
        </WppTableRow>
        {dataToDisplay.map(user => (
          <WppTableRow slot="table-body">
            <WppTableCell>
              <p className="text">{user.id}</p>
            </WppTableCell>
            <WppTableCell>
              <WppAvatar name={user.firstName} className="avatar" />
              <p className="text">{user.firstName}</p>
            </WppTableCell>
            <WppTableCell>
              <p className="text">{user.height}</p>
            </WppTableCell>
          </WppTableRow>
        ))}
      </WppTable>
      <WppPagination
        count={dataList.length}
        itemsPerPage={itemsPerPage}
        onWppChange={handlePaginationChange}
      />
    </div>
  )
}
```
