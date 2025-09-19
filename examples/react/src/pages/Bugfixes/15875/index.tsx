import { WppButton, WppListItem, WppSearch, WppSideModal } from '@platform-ui-kit/components-library-react'

import styles from './index.module.scss'
import { useRef, useState } from 'react'
import { fruitOptions } from '../../vc/Search/SearchVC'
import { SearchDefaultOption } from '@platform-ui-kit/components-library'

const AutofocusInModal = () => {
  const wppSearchRef = useRef<HTMLWppSearchElement>(null)
  const [isSideModalOpen, setIsSideModalOpen] = useState(false)
  const [basicValue, setBasicValue] = useState<SearchDefaultOption[]>([
    {
      id: 5,
      label: 'Pineapple',
    },
  ])

  const handleSideModalOpenComplete = () => {
    if (isSideModalOpen) {
      wppSearchRef.current?.setFocus()
    }
  }

  return (
    <div className={styles.page}>
      <WppButton onClick={() => setIsSideModalOpen(true)}>Open Modal (size s)</WppButton>
      <WppSideModal
        onWppSideModalClose={() => setIsSideModalOpen(false)}
        onWppSideModalOpen={() => setIsSideModalOpen(true)}
        onWppSideModalOpenStart={handleSideModalOpenComplete}
        open={isSideModalOpen}
        size="m"
      >
        <div slot="header">Test Autofocus in Modal</div>
        <div slot="body">
          <WppSearch
            ref={wppSearchRef}
            required
            className={styles.item}
            labelConfig={{
              text: 'Regular Search',
            }}
            placeholder="Select fruits"
            value={basicValue}
            onWppChange={(e: CustomEvent) => setBasicValue(e.detail.value as SearchDefaultOption[])}
            simpleSearch
            data-testid="regular-search"
          >
            {fruitOptions.map(option => (
              <WppListItem key={option.id} value={option} label={option.label}>
                <p slot="label">{option.label}</p>
              </WppListItem>
            ))}
          </WppSearch>
        </div>
        <div slot="actions">
          <WppButton variant="destructive" onClick={() => setIsSideModalOpen(false)}>
            Close
          </WppButton>
        </div>
      </WppSideModal>
    </div>
  )
}

export default AutofocusInModal
