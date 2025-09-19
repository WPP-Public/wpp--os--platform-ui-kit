import { WppAccordion, WppButton, WppSelect } from '@platform-ui-kit/components-library-react'
import { useState } from 'react'

import styles from '../Selects/Selects.module.scss'
import { SAMPLE_LIST_1, SAMPLE_LIST_2, SAMPLE_LIST_MULTIPLE } from '../SingleSelect/consts'

export const SelectsPage = () => {
  const [multipleItems, setMultipleItems] = useState<string[]>([])
  const [multipleItems2, setMultipleItems2] = useState<string[]>([])
  const [multipleItems3, setMultipleItems3] = useState<string[]>([])
  const [singleItems, setSingleItems] = useState<string>('')
  const [textItems, setTextItems] = useState<string>('house')

  const handleResetClick = () => {
    setMultipleItems([])
  }

  return (
    <div className={styles.container}>
      <div className={styles.flexRow}>
        <div data-testid="left-column-selects">
          <WppSelect
            placeholder="Choose options"
            type="multiple"
            required
            withFolder
            withSearch
            labelConfig={{ text: 'Multiple Select with search' }}
            data-testid="focus-multiple-select"
            autoFocus
            onWppChange={(e: CustomEvent) => setMultipleItems(e.detail.value)}
            className={styles.item}
            value={multipleItems}
            name="My custom select"
            list={SAMPLE_LIST_MULTIPLE}
          ></WppSelect>
          <div style={{ marginTop: '20px' }}>
            <WppButton variant="secondary" onClick={handleResetClick} data-testid="reset-button">
              Reset
            </WppButton>
          </div>

          <WppAccordion className={styles.accordion} expanded text="Test Accordion">
            <WppSelect
              placeholder="Choose options"
              required
              type="multiple"
              withFolder
              withSearch
              labelConfig={{ text: 'Multiple Select' }}
              data-testid="select-in-accordion"
              className={styles.item}
              name="My custom select 2"
              value={multipleItems2}
              onWppChange={(e: CustomEvent) => setMultipleItems2(e.detail.value)}
              list={SAMPLE_LIST_MULTIPLE}
            ></WppSelect>
          </WppAccordion>

          <WppSelect
            type="multiple"
            required
            labelConfig={{ text: 'Select with top dropdown list' }}
            data-testid="multiple-top-dropdown-select"
            className={styles.top}
            name="My custom select 3"
            value={multipleItems3}
            onWppChange={(e: CustomEvent) => setMultipleItems3(e.detail.value)}
            list={SAMPLE_LIST_MULTIPLE}
          ></WppSelect>
        </div>

        <div data-testid="central-column-selects">
          <WppSelect
            placeholder="Choose option"
            type="single"
            required
            withSearch
            labelConfig={{ text: 'Single Select with search' }}
            data-testid="single-select"
            onWppChange={(e: CustomEvent) => setSingleItems(e.detail.value)}
            className={styles.item}
            value={singleItems}
            name="My custom select 4"
            list={SAMPLE_LIST_2}
          ></WppSelect>

          <WppAccordion className={styles.accordion} expanded text="Test Accordion">
            <WppSelect
              placeholder="Choose option"
              required
              type="single"
              withFolder
              withSearch
              labelConfig={{ text: 'Single Select' }}
              data-testid="single-select-in-accordion"
              className={styles.item}
              onWppChange={(e: CustomEvent) => console.log('onWppChange', e)}
              name="My custom select 5"
              list={SAMPLE_LIST_2}
            ></WppSelect>
          </WppAccordion>

          <WppSelect
            required
            labelConfig={{ text: 'Select with top dropdown list' }}
            data-testid="single-top-dropdown-select"
            value={[]}
            className={styles.top}
            name="My custom select 6"
            list={SAMPLE_LIST_2}
          ></WppSelect>
        </div>

        <div>
          <div>
            <h5>Text Select</h5>
            <WppSelect
              placeholder="Choose option"
              type="text"
              required
              data-testid="text-select"
              onWppChange={(e: CustomEvent) => setTextItems(e.detail.value)}
              className={styles.text}
              value={textItems}
              name="My custom select 7"
              list={SAMPLE_LIST_1}
            ></WppSelect>
          </div>

          <div>
            <WppAccordion className={styles.accordion} expanded text="Test Accordion">
              <WppSelect
                placeholder="Choose option"
                required
                type="text"
                data-testid="text-select-in-accordion"
                className={styles.item}
                list={SAMPLE_LIST_1}
              ></WppSelect>
            </WppAccordion>
          </div>

          <div>
            <h5 className={styles.top}>Text Select</h5>
            <WppSelect
              type="text"
              required
              placeholder="Choose option"
              name="My custom select 9"
              data-testid="text-top-dropdown-select"
              list={SAMPLE_LIST_1}
            ></WppSelect>
          </div>
        </div>
      </div>
    </div>
  )
}
