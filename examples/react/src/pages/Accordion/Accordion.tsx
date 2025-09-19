import React, { useEffect, useState } from 'react'
import {
  WppAccordion,
  WppAutocomplete,
  WppButton,
  WppSelect,
  WppListItem,
  WppSideModal,
  WppTypography,
  WppIconPlus,
  WppActionButton,
} from '@platform-ui-kit/components-library-react'
import { AutocompleteDefaultOption } from '@platform-ui-kit/components-library'
import { fruitOptions } from '../Autocomplete/options'

import styles from './Accordion.module.scss'
import { SAMPLE_LIST_1 } from '../SingleSelect/consts'

const DynamicAccordion = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [count, setCount] = useState<number>(2)
  const [disable, setDisable] = useState(true)
  const [basicValue, setBasicValue] = useState<AutocompleteDefaultOption[]>([
    {
      id: 5,
      label: 'Pineapple',
    },
    {
      id: 3,
      label: 'Kiwi',
    },
    {
      id: 13,
      label: 'Pear',
    },
  ])
  const [blockHeight, setBlockHeight] = useState('0')

  const handleAddNewParagraph = () => setCount(count + 1)

  const handleDisableAccordion = () => setDisable(current => !current)

  useEffect(() => {
    setTimeout(() => setBlockHeight('100px'), 2000)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.accordion}>
        <h2 className={styles.title}>Dynamic height accordion</h2>
        <WppAccordion size="s" expanded counter={3} text="Dynamic content" slot="body">
          <div>
            <WppButton onClick={handleAddNewParagraph}>Add new title</WppButton>
            <WppAutocomplete
              name="basic"
              labelConfig={{ text: 'Basic with initial values' }}
              placeholder="Select fruits"
              value={basicValue}
              onWppChange={(e: CustomEvent) => setBasicValue(e.detail.value as AutocompleteDefaultOption[])}
              data-testid="basic-autocomplete"
            >
              {fruitOptions.map(option => (
                <WppListItem key={option.id} value={option}>
                  <span slot="label">{option.label}</span>
                </WppListItem>
              ))}
            </WppAutocomplete>
            <div>
              {Array(count)
                .fill(null)
                .map((_, index: number) => (
                  <h4 key={`other-title-${index}`}>Added new title</h4>
                ))}
              <WppSelect
                placeholder="Choose item"
                id="select"
                dropdownConfig={{ triggerElementWidth: true }}
                list={SAMPLE_LIST_1}
              ></WppSelect>
            </div>
          </div>
        </WppAccordion>
        <WppSideModal
          open={isOpen}
          onWppSideModalClose={() => setIsOpen(false)}
          onWppSideModalOpen={() => setIsOpen(true)}
        >
          <WppTypography type="xl-heading" slot="header">
            Header
          </WppTypography>
          <WppAccordion size="s" expanded={true} counter={3} text="Dynamic content" slot="body">
            <div>
              <WppButton onClick={handleAddNewParagraph}>Add new title</WppButton>
              <div>
                {Array(count)
                  .fill(null)
                  .map((_, index: number) => (
                    <h4 key={`Title-${index}`}>Added new title</h4>
                  ))}
                <WppSelect
                  placeholder="Choose item"
                  id="select"
                  dropdownConfig={{ triggerElementWidth: true }}
                  list={SAMPLE_LIST_1}
                ></WppSelect>
              </div>
            </div>
          </WppAccordion>
        </WppSideModal>
        <WppButton onClick={() => setIsOpen(true)}> Open Side Modal with Accordion</WppButton>
      </div>
      <div className={styles.accordion}>
        <WppAccordion expanded expandedByDefault>
          <WppTypography type="m-strong" slot="header">
            Accordion with expanded=true and expandedByDefault=true
          </WppTypography>
          <div style={{ height: blockHeight }}>No height animation on this block</div>
        </WppAccordion>
        <WppButton style={{ margin: '10px' }} onClick={handleDisableAccordion}>
          {disable ? 'Enable' : 'Disable'} Accordion
        </WppButton>
        <WppAccordion disabled={disable} expandedByDefault>
          <WppTypography type="m-strong" slot="header">
            Accordion disabled expandedByDefault
          </WppTypography>
          <WppActionButton variant="secondary" slot="actions" disabled={disable}>
            Action Button
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <WppTypography type="s-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus euismod, fermentum nunc nec,
            ultricies
          </WppTypography>
        </WppAccordion>
        <WppAccordion expanded>
          <WppTypography type="m-strong" slot="header">
            Accordion with expanded=true
          </WppTypography>
          <div style={{ height: blockHeight }}>With height animation</div>
        </WppAccordion>
      </div>
    </div>
  )
}

export const AccordionPage = () => <DynamicAccordion />
