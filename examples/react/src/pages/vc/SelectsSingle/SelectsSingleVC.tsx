import { WppIconClock, WppSelect, WppTypography } from '@platform-ui-kit/components-library-react'

import styles from './SelectsSingleVC.module.scss'
import { SAMPLE_LIST_1 } from '../../SingleSelect/consts'
import { useState } from 'react'
import { CUSTOM_LIST, LIST, message } from './consts'

export const SelectsSingleVCPage = () => {
  const [value, setValue] = useState('')
  const [value2, setValue2] = useState(1)
  const [value3, setValue3] = useState(1)

  return (
    <div>
      <h2>Single Selects</h2>
      <div className={styles.selects} data-testid="single-selects">
        <div className={styles.size}>
          <h3>M Size</h3>
          <WppSelect
            name="wpp-select"
            size="m"
            placeholder="Choose option"
            className={styles.item}
            required
            labelConfig={{ text: 'Regular Single' }}
            autoFocus
            data-testid="focus-single-select"
          />

          <WppSelect
            size="m"
            className={styles.item}
            placeholder="Choose option"
            required
            labelConfig={{ text: 'Disabled Regular Single Select' }}
            disabled
          />

          <WppSelect
            size="m"
            placeholder="Choose option"
            className={styles.item}
            required
            labelConfig={{ text: 'Info Single Select' }}
            message="Info message"
          />

          <WppSelect
            size="m"
            placeholder="Choose option"
            className={styles.item}
            required
            labelConfig={{ text: 'Warning Single Select' }}
            message="Warning message"
            messageType="warning"
          />

          <WppSelect
            size="m"
            placeholder="Choose option"
            className={styles.item}
            required
            labelConfig={{ text: 'Error Single Select' }}
            message="Error message"
            messageType="error"
          />

          <WppSelect
            size="m"
            placeholder="Choose option"
            className={styles.item}
            required
            labelConfig={{ text: 'Info Single Select with max message length' }}
            message={message}
            maxMessageLength={50}
          />

          <WppSelect
            size="m"
            placeholder="Choose option"
            className={styles.item}
            required
            labelConfig={{ text: 'Warning Single Select with max message length' }}
            message={message}
            messageType="warning"
            maxMessageLength={50}
          />

          <WppSelect
            size="m"
            placeholder="Choose option"
            className={styles.item}
            required
            labelConfig={{ text: 'Error Single Select with max message length' }}
            message={message}
            messageType="error"
            maxMessageLength={50}
          />

          <WppSelect
            size="m"
            placeholder="Choose option"
            className={styles.item}
            required
            labelConfig={{ text: 'Disabled Info Single Select' }}
            message="Info message"
            disabled
          />

          <WppSelect
            size="m"
            placeholder="Choose option"
            className={styles.item}
            required
            labelConfig={{ text: 'Disabled Warning Single Select' }}
            message="Warning message"
            messageType="warning"
            disabled
          />

          <WppSelect
            size="m"
            placeholder="Choose option"
            className={styles.item}
            required
            labelConfig={{ text: 'Disabled Error Single Select' }}
            message="Error message"
            messageType="error"
            disabled
          />

          <WppSelect
            size="m"
            placeholder="Choose option"
            className={styles.item}
            labelConfig={{ text: 'Optional Single Select' }}
          />

          <WppTypography type="s-body">Text Select without Label (required)</WppTypography>

          <WppSelect size="m" placeholder="Choose option" className={styles.item} required />
        </div>

        <div className={styles.size}>
          <h3>S Size</h3>
          <WppSelect
            name="wpp-select"
            size="s"
            placeholder="Choose option"
            className={styles.item}
            required
            labelConfig={{ text: 'Regular Single Select' }}
            value={value}
            onWppChange={(event: CustomEvent) => setValue(event.detail.value)}
            list={SAMPLE_LIST_1}
          ></WppSelect>

          <WppSelect
            size="s"
            placeholder="Choose option"
            className={styles.item}
            required
            labelConfig={{ text: 'Disabled Regular Single Select' }}
            disabled
          />

          <WppSelect
            size="s"
            placeholder="Choose option"
            className={styles.item}
            required
            labelConfig={{ text: 'Info Single Select' }}
            message="Info message"
          />

          <WppSelect
            size="s"
            placeholder="Choose option"
            className={styles.item}
            required
            labelConfig={{ text: 'Warning Single Select' }}
            message="Warning message"
            messageType="warning"
          />

          <WppSelect
            size="s"
            placeholder="Choose option"
            className={styles.item}
            required
            labelConfig={{ text: 'Error Single Select' }}
            message="Error message"
            messageType="error"
          />

          <WppSelect
            size="s"
            placeholder="Choose option"
            className={styles.item}
            required
            labelConfig={{ text: 'Info Single Select with max message length' }}
            message={message}
            maxMessageLength={50}
          />

          <WppSelect
            size="s"
            placeholder="Choose option"
            className={styles.item}
            required
            labelConfig={{ text: 'Warning Single Select with max message length' }}
            message={message}
            messageType="warning"
            maxMessageLength={50}
          />

          <WppSelect
            size="s"
            placeholder="Choose option"
            className={styles.item}
            required
            labelConfig={{ text: 'Error Single Select with max message length' }}
            message={message}
            messageType="error"
            maxMessageLength={50}
          />

          <WppSelect
            size="s"
            placeholder="Choose option"
            className={styles.item}
            required
            labelConfig={{ text: 'Disabled Info Single Select' }}
            message="Info message"
            disabled
          />

          <WppSelect
            size="s"
            placeholder="Choose option"
            className={styles.item}
            required
            labelConfig={{ text: 'Disabled Warning Single Select' }}
            message="Warning message"
            messageType="warning"
            disabled
          />

          <WppSelect
            size="s"
            placeholder="Choose option"
            className={styles.item}
            required
            labelConfig={{ text: 'Disabled Error Single Select' }}
            message="Error message"
            messageType="error"
            disabled
          />

          <WppSelect
            size="s"
            placeholder="Choose option"
            className={styles.item}
            labelConfig={{ text: 'Optional Single Select' }}
          />

          <WppTypography type="s-body">Text Select without Label (required)</WppTypography>

          <WppSelect size="s" placeholder="Choose option" className={styles.item} required />

          {/* Single Select with Avatar Logos and Subtitles */}
          <WppSelect
            name="wpp-select"
            size="s"
            placeholder="Choose option"
            className={styles.item}
            required
            labelConfig={{ text: 'Single Select with Avatars and Subtitles' }}
            autoFocus
            value={value2}
            onWppChange={(event: CustomEvent) => setValue2(event.detail.value)}
            data-testid="select-with-avatars-subtitles"
            list={CUSTOM_LIST}
          ></WppSelect>
        </div>

        <div className={styles.expanded}>
          <h3>Select With Items and left Icon</h3>
          <WppSelect
            size="m"
            placeholder="Choose option"
            className={styles.item}
            required
            labelConfig={{
              icon: 'wpp-icon-info',
              text: 'Single Select With Items and left Icon',
              description: 'Description',
              locales: {
                optional: 'Optional',
              },
            }}
            value={value3}
            onWppChange={(event: CustomEvent) => setValue3(event.detail.value)}
            data-testid="select-with-items"
            list={LIST}
          >
            <WppIconClock slot="icon-start" />
          </WppSelect>
        </div>
      </div>
    </div>
  )
}
