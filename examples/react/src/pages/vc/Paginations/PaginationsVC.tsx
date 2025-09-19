import { WppPagination, WppPaginationSelect, WppCard } from '@platform-ui-kit/components-library-react'
import styles from './PaginationsVC.module.scss'

export const PaginationsVCPage = () => (
  <div>
    <div className={styles.container} data-testid="paginations">
      <div>
        <h3>Pagination Select</h3>
        <WppPaginationSelect className={styles.item} count={8} activePageNumber={1} pageSelectThreshold={5} />

        <WppPaginationSelect className={styles.item} count={8} activePageNumber={4} pageSelectThreshold={5} />

        <WppPaginationSelect count={8} activePageNumber={8} pageSelectThreshold={5} />
      </div>

      <div>
        <h3>Pagination Select (pageSelectThreshold exceeds the pages amount)</h3>
        <WppPaginationSelect className={styles.item} count={8} activePageNumber={1} pageSelectThreshold={11} />

        <WppPaginationSelect className={styles.item} count={8} activePageNumber={5} pageSelectThreshold={11} />

        <WppPaginationSelect count={8} activePageNumber={8} pageSelectThreshold={11} />
      </div>

      <div>
        <h3>Pagination</h3>
        <WppPagination count={8} itemsPerPage={[3, 5, 8]} activePageNumber={1} pageSelectThreshold={1} />

        <WppPagination count={8} itemsPerPage={[3, 5, 8]} activePageNumber={2} pageSelectThreshold={1} />

        <WppPagination count={8} itemsPerPage={[3, 5, 8]} activePageNumber={3} pageSelectThreshold={1} />

        <WppPagination count={8} itemsPerPage={[3, 5, 8]} activePageNumber={1} pageSelectThreshold={9} />

        <WppPagination count={8} itemsPerPage={[3, 5, 8]} activePageNumber={2} pageSelectThreshold={9} />

        <WppPagination count={8} itemsPerPage={[3, 5, 8]} activePageNumber={3} pageSelectThreshold={9} />

        <WppPagination count={8} itemsPerPage={[3, 5, 8]} pageSelectThreshold={1} selectedItemPerPage={8} />

        <WppPagination count={8} itemsPerPage={[3, 5, 8]} pageSelectThreshold={9} selectedItemPerPage={8} />

        <WppPagination
          count={8}
          itemsPerPage={[3, 5, 8]}
          activePageNumber={1}
          pageSelectThreshold={9}
          data-testid="pagination-list"
        />

        <WppCard>
          <WppPagination
            count={8}
            itemsPerPage={[3, 5, 8]}
            activePageNumber={1}
            pageSelectThreshold={9}
            dropdownConfig={{ popperOptions: { strategy: 'fixed' } }}
            data-testid="pagination-in-card"
          />
        </WppCard>
      </div>
    </div>
  </div>
)
