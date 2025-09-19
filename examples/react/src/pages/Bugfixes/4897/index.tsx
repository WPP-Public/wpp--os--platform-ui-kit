import {
  WppAutocomplete,
  WppButton,
  WppCounter,
  WppDatepicker,
  WppInput,
  WppListItem,
  WppSelect,
  WppTextareaInput,
  WppTypography,
} from '@platform-ui-kit/components-library-react'
import styles from './index.module.scss'
import { useState } from 'react'
import { AutocompleteDefaultOption } from '@platform-ui-kit/components-library'
import { SelectedValues } from '../../Autocomplete/SelectedValues'
import { fruitOptions, initialFruitsList, initialShowElementsValues } from './config'
import { SAMPLE_LIST_1, SAMPLE_LIST_COMBINED, SAMPLE_LIST_MULTIPLE } from '../../SingleSelect/consts'

const AutoFocusInputs = () => {
  const [showElements, setShowElements] = useState({
    ...initialShowElementsValues,
  })
  const [multipleItems, setMultipleItems] = useState<any[] | undefined>(['car', 'long'])

  const [autocompleteValues, setAutocompleteValues] = useState<AutocompleteDefaultOption[]>(initialFruitsList)

  const handleBtnClick = (event: any) => {
    setShowElements({
      ...initialShowElementsValues,
      [event.target.name]: true,
    })
  }

  return (
    <div>
      <div className={styles.link}>
        <h1 style={{ textDecoration: 'underline' }}>
          <a href="https://jira.uhub.biz/browse/WPPLONOP-4897">
            Bugfix #4897 - Auto Focus prop doesn't work in FF browser
          </a>
        </h1>
      </div>
      <div className={styles.page}>
        <div className={styles.pageSection}>
          <div className={styles.buttons}>
            <WppButton name="datepicker" onClick={handleBtnClick}>
              Show Datepicker
            </WppButton>
            <WppButton name="autocomplete" onClick={handleBtnClick}>
              Show Autocomplete
            </WppButton>
            <WppButton name="counter" onClick={handleBtnClick}>
              Show Counter
            </WppButton>
            <WppButton name="textInput" onClick={handleBtnClick}>
              Show Text Input
            </WppButton>
            <WppButton name="textArea" onClick={handleBtnClick}>
              Show Text Area
            </WppButton>
            <WppButton name="singleSelect" onClick={handleBtnClick}>
              Show Single Select
            </WppButton>
            <WppButton name="multipleSelect" onClick={handleBtnClick}>
              Show Multiple Select
            </WppButton>
            <WppButton name="combinedSelect" onClick={handleBtnClick}>
              Show Combined Select
            </WppButton>
            <WppButton name="textSelect" onClick={handleBtnClick}>
              Show Text Select
            </WppButton>
          </div>
          {showElements.datepicker && (
            <div className={styles.elementContainer}>
              <WppTypography type="xl-heading">Datepicker with autofocus</WppTypography>
              <WppDatepicker value="12/12/2022" autoFocus data-testid="autofocus-datepicker" />
            </div>
          )}

          {showElements.autocomplete && (
            <div className={styles.elementContainer}>
              <WppTypography type="xl-heading">Autocomplete with autofocus</WppTypography>
              <WppAutocomplete
                required
                name="basic"
                labelConfig={{ text: 'Basic with initial values' }}
                placeholder="Select fruits"
                value={autocompleteValues}
                onWppChange={(e: CustomEvent) => setAutocompleteValues(e.detail.value as AutocompleteDefaultOption[])}
                data-testid="basic-autocomplete"
                dropdownConfig={{ popperOptions: { strategy: 'fixed' } }}
                multiple
                showCreateNewElement
                simpleSearch
                autoFocus
              >
                {fruitOptions.map(option => (
                  <WppListItem key={option.id} value={option} label={option.label}>
                    <p slot="label">{option.label}</p>
                  </WppListItem>
                ))}
                <SelectedValues
                  values={autocompleteValues}
                  onCloseClick={value => setAutocompleteValues(autocompleteValues.filter(i => i.id !== value))}
                />
              </WppAutocomplete>
            </div>
          )}

          {showElements.counter && (
            <div className={styles.elementContainer}>
              <WppTypography type="xl-heading">Counter with autofocus</WppTypography>
              <WppCounter value={5} autoFocus data-testid="focus-counter" />
            </div>
          )}

          {showElements.textInput && (
            <div className={styles.elementContainer}>
              <WppTypography type="xl-heading">Text Input with autofocus</WppTypography>
              <WppInput
                labelConfig={{ text: 'Normal Password Input' }}
                placeholder="Enter text"
                data-testid="regular-password-m-input"
                type="password"
                name="passwordInput"
                autoFocus
              />
            </div>
          )}

          {showElements.textArea && (
            <div className={styles.elementContainer}>
              <WppTypography type="xl-heading">Text Area with autofocus</WppTypography>
              <WppTextareaInput
                name="wpp-text-area"
                placeholder="Enter text"
                labelConfig={{ text: 'Regular Text Area w/o Limit' }}
                warningThreshold={5}
                data-testid="regular-limitless-text-area"
                autoFocus
              />
            </div>
          )}

          {showElements.singleSelect && (
            <div className={styles.elementContainer}>
              <WppTypography type="xl-heading">Single Select with autofocus</WppTypography>
              <WppSelect
                placeholder="Choose option"
                required
                type="single"
                withFolder
                withSearch
                labelConfig={{ text: 'Single Select' }}
                data-testid="single-select-in-accordion"
                onWppChange={(e: CustomEvent) => console.log('onWppChange', e)}
                autoFocus
                list={[
                  {
                    value: '',
                    label: 'None',
                  },
                  {
                    value: 'tree',
                    label: 'Tree',
                  },
                  {
                    value: 'car',
                    label: 'Car',
                    disabled: true,
                  },
                  {
                    value: 'house',
                    label: 'House',
                  },
                ]}
              ></WppSelect>
            </div>
          )}

          {showElements.multipleSelect && (
            <div className={styles.elementContainer}>
              <WppTypography type="xl-heading">Multiple Select with autofocus</WppTypography>
              <WppSelect
                placeholder="Choose options"
                type="multiple"
                required
                withFolder
                withSearch
                labelConfig={{ text: 'Multiple Select with search' }}
                autoFocus
                onWppChange={(e: CustomEvent) => setMultipleItems(e.detail.value)}
                className={styles.item}
                value={multipleItems}
                list={SAMPLE_LIST_MULTIPLE}
              ></WppSelect>
            </div>
          )}

          {showElements.combinedSelect && (
            <div className={styles.elementContainer}>
              <WppTypography type="xl-heading">Combined Select with autofocus</WppTypography>
              <WppSelect
                className={styles.select}
                type="combined"
                placeholder="Placeholder"
                labelConfig={{ text: 'Donate sum' }}
                value="usd"
                inputValue="100"
                autoFocus
                list={SAMPLE_LIST_COMBINED}
              ></WppSelect>
            </div>
          )}

          {showElements.textSelect && (
            <div className={styles.elementContainer}>
              <WppTypography type="xl-heading">Text Select with autofocus</WppTypography>
              <WppSelect list={SAMPLE_LIST_1} type="text" autoFocus placeholder="Placeholder"></WppSelect>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AutoFocusInputs
