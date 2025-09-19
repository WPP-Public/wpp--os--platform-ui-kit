import React, { useState } from 'react'
import styles from './index.module.scss'
import { WppInput } from '@platform-ui-kit/components-library-react'

const InputFieldTooltipIssue: React.FC = () => {
  const [inputValue, setInputValue] = useState('')
  const [longText, setLongText] = useState('This is a very long text that will be truncated with an ellipsis')

  return (
    <div className={styles.container}>
      <h2>Bug WPPLONOP-27613: Input Field and Tooltip Issue</h2>
      <p>
        Description: When entering long text into the input field, the text gets truncated with an ellipsis (`...`), and
        the input loses focus, making it difficult to edit further.
      </p>

      <section className={styles.demo}>
        <WppInput
          name="buggy-input"
          placeholder="Enter long text..."
          value={inputValue}
          onInput={(e: any) => setInputValue(e.target.value)}
        />
        <p className={styles.note}>Try entering longer text</p>
      </section>

      <section className={styles.demo}>
        <WppInput
          labelConfig={{ text: 'Search Input - Bug 3' }}
          required
          name="wpp-input-with-search"
          type="search"
          size="m"
          placeholder="Enter search query"
          data-testid="search-input"
        />
      </section>

      <section className={styles.demo}>
        <WppInput
          labelConfig={{ text: 'Pre filled long text - Bug 4' }}
          name="long-input"
          placeholder="Enter long text..."
          value={longText}
          onInput={(e: any) => setLongText(e.target.value)}
          required
        />
      </section>
    </div>
  )
}

export default InputFieldTooltipIssue
