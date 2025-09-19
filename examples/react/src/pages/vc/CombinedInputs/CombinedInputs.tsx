import { WppSelect } from '@platform-ui-kit/components-library-react'

import styles from './CombinedInputs.module.scss'
import { SAMPLE_LIST_COMBINED } from '../../SingleSelect/consts'
import { useState } from 'react'

export const CombinedInputsVCPage = () => {
  const [value, setValue] = useState('')
  const [valueEur, setValueEur] = useState('eur')
  const [valueUsd, setValueUsd] = useState('usd')
  const [valueUah, setValueUah] = useState('uah')

  return (
    <div>
      <div data-testid="combined-selects">
        <h2>Combined Inputs</h2>
        <h3>M Size</h3>
        <WppSelect
          className={styles.select}
          type="combined"
          placeholder="Placeholder"
          labelConfig={{ text: 'Donate sum' }}
          value={value}
          onWppChange={(event: CustomEvent) => setValue(event.detail.value)}
          inputValue="100"
          list={SAMPLE_LIST_COMBINED}
        ></WppSelect>

        <WppSelect
          className={styles.select}
          type="combined"
          placeholder="Placeholder"
          labelConfig={{ text: 'Regular' }}
          value={valueEur}
          onWppChange={(event: CustomEvent) => setValueEur(event.detail.value)}
          required
          data-testid="combined-input"
          list={SAMPLE_LIST_COMBINED}
        ></WppSelect>

        <WppSelect
          className={styles.select}
          type="combined"
          placeholder="Placeholder"
          labelConfig={{ text: 'Disabled' }}
          value={valueEur}
          onWppChange={(event: CustomEvent) => setValueEur(event.detail.value)}
          required
          disabled
          list={SAMPLE_LIST_COMBINED}
        ></WppSelect>

        <WppSelect
          className={styles.select}
          type="combined"
          placeholder="Placeholder"
          labelConfig={{ text: 'Disabled' }}
          value={valueEur}
          onWppChange={(event: CustomEvent) => setValueEur(event.detail.value)}
          disabled
          list={SAMPLE_LIST_COMBINED}
        ></WppSelect>

        <WppSelect
          className={styles.select}
          type="combined"
          placeholder="Placeholder"
          value={valueUah}
          onWppChange={(event: CustomEvent) => setValueUah(event.detail.value)}
          required
          message="Info message"
          labelConfig={{
            icon: 'wpp-icon-info',
            text: 'Info',
            description: 'Description',
            locales: {
              optional: 'Optional',
            },
          }}
          list={SAMPLE_LIST_COMBINED}
        ></WppSelect>

        <WppSelect
          className={styles.select}
          type="combined"
          placeholder="Placeholder"
          labelConfig={{ text: 'Error' }}
          value={valueUsd}
          onWppChange={(event: CustomEvent) => setValueUsd(event.detail.value)}
          message="Error message"
          messageType="error"
          required
          list={SAMPLE_LIST_COMBINED}
        ></WppSelect>

        <WppSelect
          className={styles.select}
          type="combined"
          placeholder="Placeholder"
          labelConfig={{ text: 'Warning' }}
          value={valueUsd}
          onWppChange={(event: CustomEvent) => setValueUsd(event.detail.value)}
          message="Warning message"
          messageType="warning"
          required
          list={SAMPLE_LIST_COMBINED}
        ></WppSelect>

        <WppSelect
          className={styles.select}
          type="combined"
          placeholder="Placeholder"
          labelConfig={{ text: 'Error disabled' }}
          value={valueUsd}
          onWppChange={(event: CustomEvent) => setValueUsd(event.detail.value)}
          message="Error message"
          messageType="error"
          required
          disabled
          list={SAMPLE_LIST_COMBINED}
        ></WppSelect>

        <WppSelect
          className={styles.select}
          type="combined"
          placeholder="Placeholder"
          labelConfig={{ text: 'Warning disabled' }}
          value={valueUsd}
          onWppChange={(event: CustomEvent) => setValueUsd(event.detail.value)}
          message="Warning message"
          messageType="warning"
          required
          disabled
          list={SAMPLE_LIST_COMBINED}
        ></WppSelect>

        <WppSelect
          className={styles.select}
          type="combined"
          labelConfig={{ text: 'Long value' }}
          value={valueUsd}
          onWppChange={(event: CustomEvent) => setValueUsd(event.detail.value)}
          required
          inputValue="10000000000000000000000000000000000000000000000000"
          list={SAMPLE_LIST_COMBINED}
        ></WppSelect>

        <WppSelect
          className={styles.select}
          type="combined"
          placeholder="Placeholder"
          labelConfig={{ text: 'Message truncation' }}
          value={valueUsd}
          onWppChange={(event: CustomEvent) => setValueUsd(event.detail.value)}
          message="Warning message"
          messageType="warning"
          required
          maxMessageLength={10}
          data-testid="combined-select"
          list={SAMPLE_LIST_COMBINED}
        ></WppSelect>

        <WppSelect
          className={styles.select}
          type="combined"
          value={valueEur}
          onWppChange={(event: CustomEvent) => setValueEur(event.detail.value)}
          name="min-params"
          autoFocus
          data-testid="focus-combined-select"
          list={SAMPLE_LIST_COMBINED}
        ></WppSelect>

        <h3>S Size</h3>
        <WppSelect
          className={styles.select}
          type="combined"
          value={valueEur}
          onWppChange={(event: CustomEvent) => setValueEur(event.detail.value)}
          size="s"
          labelConfig={{
            icon: 'wpp-icon-info',
            text: 'Input with Icon',
            description: 'Description',
            locales: {
              optional: 'Optional',
            },
          }}
          list={SAMPLE_LIST_COMBINED}
        ></WppSelect>

        <WppSelect
          className={styles.select}
          type="combined"
          value={valueEur}
          onWppChange={(event: CustomEvent) => setValueEur(event.detail.value)}
          size="s"
          disabled
          labelConfig={{ text: 'Disabled Combined Input' }}
          list={SAMPLE_LIST_COMBINED}
        ></WppSelect>

        <WppSelect
          className={styles.select}
          type="combined"
          placeholder="Placeholder"
          size="s"
          labelConfig={{ text: 'Combined Input with warning' }}
          value={valueUsd}
          onWppChange={(event: CustomEvent) => setValueUsd(event.detail.value)}
          message="Warning message"
          messageType="warning"
          required
          list={SAMPLE_LIST_COMBINED}
        ></WppSelect>

        <WppSelect
          className={styles.select}
          type="combined"
          placeholder="Placeholder"
          size="s"
          labelConfig={{ text: 'Combined Input with error' }}
          value={valueUsd}
          onWppChange={(event: CustomEvent) => setValueUsd(event.detail.value)}
          message="Error message"
          messageType="error"
          required
          list={SAMPLE_LIST_COMBINED}
        ></WppSelect>
      </div>
    </div>
  )
}
