// examples/react/src/pages/Bugfixes/29273/index.tsx

import { useCallback, useState } from 'react'
import { WppButton, WppSideModal, WppRichtext, WppTypography } from '@platform-ui-kit/components-library-react'

import styles from './index.module.scss'
import { WppRichtextCustomEvent } from '@platform-ui-kit/components-library/dist/types/components'
import { RichtextChangeEventDetail, RichtextSelectionChangeEventDetail } from '@platform-ui-kit/components-library'

const modules = JSON.stringify({
  toolbar: {
    aliases: {
      embed: ['link'],
    },
  },
})

export const RichTextEditorLinkTooltipHidden = () => {
  const [isSideModalOpen, setSideModalOpen] = useState(false)
  const [value, setValue] = useState('')

  const handleChange = useCallback((e: WppRichtextCustomEvent<RichtextChangeEventDetail>) => {
    console.log('wppChange', e)
    setValue(e.detail.value)
  }, [])

  const handleSelectionChange = useCallback((e: WppRichtextCustomEvent<RichtextSelectionChangeEventDetail>) => {
    console.log('wppSelectionChange', { ...e.detail.range }, e)
  }, [])

  const handleOpenSideModal = () => setSideModalOpen(true)
  const handleCloseSideModal = () => setSideModalOpen(false)
  const handleSideModalCloseComplete = (event: CustomEvent) => {
    console.log('sideModalCloseComplete', event)
  }

  return (
    <>
      <WppTypography className={styles.subheading} type="2xl-heading">
        Rich Text Editor in Side Modal
      </WppTypography>
      <div className={styles.container}>
        <WppButton onClick={handleOpenSideModal}>Open Side Modal with Editor</WppButton>
        <WppSideModal
          open={isSideModalOpen}
          onWppSideModalClose={() => setSideModalOpen(false)}
          onWppSideModalCloseComplete={handleSideModalCloseComplete}
          onWppSideModalOpen={handleOpenSideModal}
          size="s"
        >
          <h5 slot="header">Fix hidden link in Editor</h5>
          <div slot="body">
            <WppRichtext
              name="editor-content"
              value={value}
              modules={modules}
              onWppChange={handleChange}
              onWppSelectionChange={handleSelectionChange}
              required
              charactersLimit={500}
              warningThreshold={480}
              labelConfig={{ text: 'Content:' }}
              message={'You have reached the character limit'}
              placeholder={'Insert text here...'}
              bounds="self"
            />
          </div>
          <div slot="actions" className={styles.buttons}>
            <WppButton variant="secondary" onClick={handleCloseSideModal}>
              Cancel
            </WppButton>
            <WppButton variant="primary" onClick={() => alert('Content saved!')}>
              Save
            </WppButton>
          </div>
        </WppSideModal>
      </div>
    </>
  )
}
