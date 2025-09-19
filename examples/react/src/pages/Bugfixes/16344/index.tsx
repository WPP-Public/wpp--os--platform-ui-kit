import {
  WppButton,
  WppFullScreenModal,
  WppListItem,
  WppModal,
  WppSearch,
  WppSelect,
  WppSideModal,
  WppTypography,
} from '@platform-ui-kit/components-library-react'
import styles from './index.module.scss'
import React, { useState } from 'react'
import { SearchDefaultOption } from '@platform-ui-kit/components-library'
import { fruitOptions } from '../../Autocomplete/options'
import { SAMPLE_LIST_2 } from '../../SingleSelect/consts'

const LastItemFromDropdown = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSideModalOpen, setIsSideModalOpen] = useState(false)
  const [isFullScreenModalOpen, setIsFullScreenModalOpen] = useState(false)
  const [basicValue, setBasicValue] = useState<SearchDefaultOption[]>([])
  const [singleItems, setSingleItems] = useState<string>('car')

  return (
    <div>
      <div className={styles.link}>
        <h1 style={{ textDecoration: 'underline' }}>
          <a href="https://jira.uhub.biz/browse/WPPLONOP-16344">
            Bugfix #16344 - The last item is not selected when the dropdown does have not enough space to flip on the
            top
          </a>
        </h1>
      </div>
      <div className={styles.page}>
        <div style={{ marginBottom: '20px' }}>
          <WppButton onClick={() => setIsSideModalOpen(true)} data-testid="side-modal-without-controls">
            Side Modal w/o Controls (L Size)
          </WppButton>
          <WppSideModal
            open={isSideModalOpen}
            onWppSideModalClose={() => setIsSideModalOpen(false)}
            onWppSideModalOpen={() => setIsSideModalOpen(true)}
            size="s"
          >
            <div slot="header">Add Brand</div>
            <div slot="body">
              <WppSearch
                required
                autoFocus
                labelConfig={{
                  text: 'Brand',
                }}
                highlight={false}
                placeholder="Select brand"
                value={basicValue}
                onWppChange={(e: CustomEvent) => setBasicValue(e.detail.value as SearchDefaultOption[])}
                simpleSearch
              >
                {fruitOptions.map(option => (
                  <WppListItem key={option.id} value={option} label={option.label}>
                    <p slot="label">{option.label}</p>
                  </WppListItem>
                ))}
              </WppSearch>
              <WppTypography className={styles.brandInfo} type="s-body">
                Can't find a Brand? Request new Brand.
              </WppTypography>
              <WppSelect
                placeholder="Choose options"
                type="single"
                required
                withSearch
                labelConfig={{ text: 'Category (Optional)' }}
                data-testid="single-select"
                onWppChange={(e: CustomEvent) => setSingleItems(e.detail.value)}
                className={styles.item}
                value={singleItems}
                list={SAMPLE_LIST_2}
              ></WppSelect>

              <WppSelect
                placeholder="Choose options"
                type="single"
                required
                withSearch
                data-testid="single-select"
                onWppChange={(e: CustomEvent) => setSingleItems(e.detail.value)}
                className={styles.item}
                value={singleItems}
                list={SAMPLE_LIST_2}
              ></WppSelect>
            </div>
            <div slot="actions" className={styles.buttons}>
              <WppButton variant="secondary" onClick={() => setIsSideModalOpen(false)} className={styles.button}>
                Cancel
              </WppButton>
            </div>
          </WppSideModal>

          <WppButton onClick={() => setIsFullScreenModalOpen(true)}>Full Screen Modal</WppButton>
          <WppFullScreenModal
            open={isFullScreenModalOpen}
            onWppFullScreenModalClose={() => setIsFullScreenModalOpen(false)}
            onWppFullScreenModalOpen={() => setIsFullScreenModalOpen(true)}
          >
            <div slot="header">Title</div>
            <div slot="body">
              <WppSearch
                required
                autoFocus
                labelConfig={{
                  text: 'Brand',
                }}
                highlight={false}
                placeholder="Select brand"
                value={basicValue}
                onWppChange={(e: CustomEvent) => setBasicValue(e.detail.value as SearchDefaultOption[])}
                simpleSearch
              >
                {fruitOptions.map(option => (
                  <WppListItem key={option.id} value={option} label={option.label}>
                    <p slot="label">{option.label}</p>
                  </WppListItem>
                ))}
              </WppSearch>
              <WppTypography className={styles.brandInfo} type="s-body">
                Can't find a Brand? Request new Brand.
              </WppTypography>
              <WppSelect
                placeholder="Choose options"
                type="single"
                required
                withSearch
                labelConfig={{ text: 'Category (Optional)' }}
                data-testid="single-select"
                onWppChange={(e: CustomEvent) => setSingleItems(e.detail.value)}
                className={styles.item}
                value={singleItems}
                list={SAMPLE_LIST_2}
              ></WppSelect>

              <WppSelect
                placeholder="Choose options"
                type="single"
                required
                withSearch
                data-testid="single-select"
                onWppChange={(e: CustomEvent) => setSingleItems(e.detail.value)}
                className={styles.item}
                value={singleItems}
                list={SAMPLE_LIST_2}
              ></WppSelect>
            </div>
            <div slot="actions">
              <WppButton variant="primary" size="s" onClick={() => setIsFullScreenModalOpen(false)}>
                Close
              </WppButton>
            </div>
          </WppFullScreenModal>

          <WppButton onClick={() => setIsModalOpen(true)}>Open Modal</WppButton>
          <WppModal
            open={isModalOpen}
            size="m"
            onWppModalClose={() => setIsModalOpen(false)}
            onWppModalOpen={() => setIsModalOpen(true)}
          >
            <div slot="header">Title</div>
            <div slot="body" className={styles.modalBody}>
              <WppSearch
                required
                autoFocus
                labelConfig={{
                  text: 'Brand',
                }}
                highlight={false}
                placeholder="Select brand"
                value={basicValue}
                onWppChange={(e: CustomEvent) => setBasicValue(e.detail.value as SearchDefaultOption[])}
                simpleSearch
              >
                {fruitOptions.map(option => (
                  <WppListItem key={option.id} value={option} label={option.label}>
                    <p slot="label">{option.label}</p>
                  </WppListItem>
                ))}
              </WppSearch>
              <WppTypography className={styles.brandInfo} type="s-body">
                Can't find a Brand? Request new Brand.
              </WppTypography>
              <WppSelect
                placeholder="Choose options"
                type="single"
                required
                withSearch
                labelConfig={{ text: 'Category (Optional)' }}
                data-testid="single-select"
                onWppChange={(e: CustomEvent) => setSingleItems(e.detail.value)}
                className={styles.item}
                value={singleItems}
                list={SAMPLE_LIST_2}
              ></WppSelect>

              <WppSelect
                placeholder="Choose options"
                type="single"
                required
                withSearch
                data-testid="single-select"
                onWppChange={(e: CustomEvent) => setSingleItems(e.detail.value)}
                className={styles.item}
                value={singleItems}
                list={SAMPLE_LIST_2}
              ></WppSelect>

              <WppTypography className={styles.brandInfo} type="s-body">
                Can't find a Brand? Request new Brand.
              </WppTypography>
            </div>
            <div slot="actions">
              <WppButton variant="primary" size="s" onClick={() => setIsModalOpen(false)}>
                Close
              </WppButton>
            </div>
          </WppModal>
        </div>
      </div>
    </div>
  )
}

export default LastItemFromDropdown
