import { WppIconCross, WppIconSearch, WppInput } from '@platform-ui-kit/components-library-react'
import styles from './InputsVC.module.scss'
import DecimalInput from './components/DecimalInput'
import { useState } from 'react'
import { InputChangeEventDetail } from '@platform-ui-kit/components-library'
import { WppInputCustomEvent } from '@platform-ui-kit/components-library/dist/types/components'

export const InputsVCPage = () => {
  const [isLoadingM, setIsLoadingM] = useState(false)
  const [isLoadingS, setIsLoadingS] = useState(false)

  const handleInputChangeM = (event: WppInputCustomEvent<InputChangeEventDetail>) => {
    const e = event.detail

    console.log('🚀 ~ InputsVCPage ~ isLoadingM:', isLoadingM)

    console.log('🚀 ~ handleInputChangeM ~ e.target.name:', e.name)

    if (e.value) {
      setIsLoadingM(true)
      setTimeout(() => {
        setIsLoadingM(false)
      }, 2000)
    } else {
      setIsLoadingM(false)
    }
  }
  const handleInputChangeS = (event: WppInputCustomEvent<InputChangeEventDetail>) => {
    const e = event.detail

    console.log('🚀 ~ InputsVCPage ~ isLoadingS:', isLoadingS)

    console.log('🚀 ~ handleInputChangeS ~ e.target.name:', e.name)

    if (e.value) {
      setIsLoadingS(true)
      setTimeout(() => {
        setIsLoadingS(false)
      }, 2000)
    } else {
      setIsLoadingS(false)
    }
  }

  return (
    <div>
      <h1 className={styles.title}>Inputs</h1>
      <h2 className={styles.title}>Size M</h2>
      <div className={styles.size} data-testid="m-size-inputs">
        <div className={styles.inputs}>
          <h3>Regular Inputs</h3>

          <WppInput
            labelConfig={{ text: 'Normal Password Input with autocomplete on' }}
            placeholder="Enter text"
            autocomplete="on"
            data-testid="regular-password-m-input"
            type="password"
            name="name"
            required
          />

          <WppInput
            name="name"
            placeholder="Enter text"
            data-testid="regular-m-input"
            defaultValue="Default Value"
            required
            autoFocus
            autocomplete="on"
            labelConfig={{
              icon: 'wpp-icon-info',
              text: 'Normal Input with autocomplete on and `defaultValue`',
              description: 'Description',
              locales: {
                optional: 'Optional',
              },
            }}
            onWppChange={(event: WppInputCustomEvent<InputChangeEventDetail>) => {
              console.log(event)
            }}
          />

          <WppInput
            name="name"
            labelConfig={{ text: 'Disabled Input' }}
            placeholder="Enter text"
            disabled
            data-testid="disabled-m-input"
            required
          />

          <WppInput
            name="name"
            labelConfig={{ text: 'Normal Input with Message' }}
            placeholder="Enter text"
            data-testid="message-m-input"
            message="Info message"
            required
          />

          <WppInput
            name="name"
            labelConfig={{ text: 'Warning Input' }}
            placeholder="Enter text"
            messageType="warning"
            message="Warning message"
            data-testid="warning-m-input"
            required
          />

          <WppInput
            name="name"
            labelConfig={{ text: 'Error Input' }}
            placeholder="Enter text"
            messageType="error"
            message="Error message"
            data-testid="error-m-input"
            required
          />
        </div>

        <div className={styles.inputs}>
          <h3>Inputs with Icons</h3>
          <WppInput
            name="name"
            labelConfig={{ text: 'Normal Input with Search Icon' }}
            placeholder="Enter text"
            data-testid="search-icon-m-input"
            required
          >
            <WppIconSearch slot="icon-start" />
          </WppInput>

          <WppInput
            name="name"
            labelConfig={{ text: 'Disabled Input with Search Icon' }}
            placeholder="Enter text"
            disabled
            data-testid="disabled-search-icon-m-input"
            required
          >
            <WppIconSearch slot="icon-start" />
          </WppInput>

          <WppInput
            name="name"
            labelConfig={{ text: 'Normal Input with Message and Icon' }}
            placeholder="Enter text"
            message="Info message"
            data-testid="search-icon-with-message-m-input"
            required
          >
            <WppIconSearch slot="icon-start" />
          </WppInput>

          <WppInput
            name="name"
            labelConfig={{ text: 'Warning Input with Search Icon' }}
            placeholder="Enter text"
            messageType="warning"
            message="Warning message"
            data-testid="search-icon-warning-m-input"
            required
          >
            <WppIconSearch slot="icon-start" />
          </WppInput>

          <WppInput
            name="name"
            labelConfig={{ text: 'Error Input with Search Icon' }}
            placeholder="Enter text"
            messageType="error"
            message="Error message"
            data-testid="search-icon-error-m-input"
            required
          >
            <WppIconSearch slot="icon-start" />
          </WppInput>

          <WppInput
            name="name"
            labelConfig={{ text: 'Normal Input with Cross Icon' }}
            placeholder="Enter text"
            data-testid="cross-icon-m-input"
            required
          >
            <WppIconCross slot="icon-end" />
          </WppInput>
        </div>
        <div>
          <h3>Inputs with Icons</h3>
          <WppInput
            name="name"
            labelConfig={{ text: 'Disabled Input with Cross Icon' }}
            placeholder="Enter text"
            disabled
            data-testid="disabled-cross-icon-m-input"
            required
          >
            <WppIconCross slot="icon-end" />
          </WppInput>

          <WppInput
            name="name"
            labelConfig={{ text: 'Warning Input with Cross Icon' }}
            placeholder="Enter text"
            messageType="warning"
            message="Warning message"
            data-testid="cross-icon-warning-m-input"
            required
          >
            <WppIconCross slot="icon-end" />
          </WppInput>

          <WppInput
            name="name"
            labelConfig={{ text: 'Error Input with Cross Icon' }}
            placeholder="Enter text"
            messageType="error"
            message="Error message"
            data-testid="cross-icon-error-m-input"
            required
          >
            <WppIconCross slot="icon-end" />
          </WppInput>

          <WppInput
            labelConfig={{ text: 'All In Input with Both Icons' }}
            name="name"
            value="All In"
            placeholder="Enter text"
            message="General message"
            type="password"
            messageType="warning"
            data-testid="all-in-m-input"
          >
            <WppIconSearch slot="icon-start" />
            <WppIconCross slot="icon-end" />
          </WppInput>

          <WppInput
            labelConfig={{ text: 'All In Input with Both Icons Disabled' }}
            name="name"
            value="All In"
            placeholder="Enter text"
            message="General message"
            required
            type="password"
            messageType="error"
            disabled
            data-testid="disabled-all-in-m-input"
          >
            <WppIconSearch slot="icon-start" />
            <WppIconCross slot="icon-end" />
          </WppInput>
        </div>
      </div>

      <h2 className={styles.title}>Size S</h2>
      <div className={styles.size} data-testid="s-size-inputs">
        <div className={styles.inputs}>
          <h3>Regular Inputs</h3>

          <WppInput
            name="name"
            labelConfig={{ text: 'Normal Input' }}
            placeholder="Enter text"
            data-testid="regular-s-input"
            size="s"
            required
          />

          <WppInput
            labelConfig={{ text: 'Normal Password Input' }}
            placeholder="Enter text"
            data-testid="regular-password-s-input"
            type="password"
            name="password"
            size="s"
          />

          <WppInput
            name="name"
            labelConfig={{ text: 'Disabled Input' }}
            placeholder="Enter text"
            disabled
            data-testid="disabled-s-input"
            size="s"
            required
          />

          <WppInput
            name="name"
            labelConfig={{ text: 'Normal Input with Message' }}
            placeholder="Enter text"
            data-testid="message-s-input"
            message="Info message"
            size="s"
            required
          />

          <WppInput
            name="name"
            labelConfig={{ text: 'Warning Input' }}
            placeholder="Enter text"
            messageType="warning"
            message="Warning message"
            data-testid="warning-s-input"
            size="s"
            required
          />

          <WppInput
            name="name"
            labelConfig={{ text: 'Error Input' }}
            placeholder="Enter text"
            messageType="error"
            message="Error message"
            data-testid="error-s-input"
            size="s"
            required
          />
        </div>

        <div className={styles.inputs}>
          <h3>Inputs with Icons</h3>
          <WppInput
            name="name"
            labelConfig={{ text: 'Normal Input with Search Icon' }}
            placeholder="Enter text"
            data-testid="search-icon-s-input"
            size="s"
            required
          >
            <WppIconSearch slot="icon-start" />
          </WppInput>

          <WppInput
            name="name"
            labelConfig={{ text: 'Disabled Input with Search Icon' }}
            placeholder="Enter text"
            disabled
            data-testid="disabled-search-icon-s-input"
            size="s"
            required
          >
            <WppIconSearch slot="icon-start" />
          </WppInput>

          <WppInput
            name="name"
            labelConfig={{ text: 'Normal Input with Message and Icon' }}
            placeholder="Enter text"
            data-testid="search-icon-with-message-s-input"
            message="Info message"
            size="s"
            required
          >
            <WppIconSearch slot="icon-start" />
          </WppInput>

          <WppInput
            name="name"
            labelConfig={{ text: 'Warning Input with Search Icon' }}
            placeholder="Enter text"
            messageType="warning"
            message="Warning message"
            data-testid="search-icon-warning-s-input"
            size="s"
            required
          >
            <WppIconSearch slot="icon-start" />
          </WppInput>

          <WppInput
            name="name"
            labelConfig={{ text: 'Error Input with Search Icon' }}
            placeholder="Enter text"
            messageType="error"
            message="Error message"
            data-testid="search-icon-error-s-input"
            size="s"
            required
          >
            <WppIconSearch slot="icon-start" />
          </WppInput>

          <WppInput
            name="name"
            labelConfig={{ text: 'Normal Input with Cross Icon' }}
            placeholder="Enter text"
            data-testid="cross-icon-regular-s-input"
            size="s"
            required
          >
            <WppIconCross slot="icon-end" />
          </WppInput>
        </div>

        <div>
          <h3>Input with Icons</h3>
          <WppInput
            name="name"
            labelConfig={{ text: 'Disabled Input with Cross Icon' }}
            placeholder="Enter text"
            disabled
            data-testid="disabled-cross-icon-s-input"
            size="s"
            required
          >
            <WppIconCross slot="icon-end" />
          </WppInput>

          <WppInput
            name="name"
            labelConfig={{ text: 'Warning Input with Cross Icon' }}
            placeholder="Enter text"
            messageType="warning"
            message="Warning message"
            data-testid="cross-icon-warning-s-input"
            size="s"
            required
          >
            <WppIconCross slot="icon-end" />
          </WppInput>

          <WppInput
            name="name"
            labelConfig={{ text: 'Error Input with Cross Icon' }}
            placeholder="Enter text"
            messageType="error"
            message="Error message"
            data-testid="cross-icon-error-s-input"
            size="s"
            required
          >
            <WppIconCross slot="icon-end" />
          </WppInput>

          <WppInput
            labelConfig={{ text: 'All In Input with Both Icons' }}
            name="allInSmallInput"
            value="All In"
            placeholder="Enter text"
            message="General message"
            type="password"
            messageType="warning"
            size="s"
            data-testid="all-in-s-input"
          >
            <WppIconSearch slot="icon-start" />
            <WppIconCross slot="icon-end" />
          </WppInput>

          <WppInput
            labelConfig={{ text: 'All In Input with Both Icons Disabled' }}
            name="allInSmallInput"
            value="All In"
            placeholder="Enter text"
            message="General message"
            required
            type="password"
            messageType="error"
            size="s"
            disabled
            data-testid="disabled-all-in-s-input"
          >
            <WppIconSearch slot="icon-start" />
            <WppIconCross slot="icon-end" />
          </WppInput>
        </div>
      </div>

      <div data-testid="search-inputs-container">
        <h1 className={styles.title}>Search Inputs</h1>
        <div className={styles.container}>
          <div className={styles.form}>
            <h2 className={styles.title}>Size M</h2>
            <WppInput
              labelConfig={{ text: 'Search Input' }}
              required
              name="name"
              type="search"
              size="m"
              placeholder="Enter search query"
              data-testid="search-input"
            />

            <WppInput
              name="name"
              labelConfig={{ text: 'Search Input with text' }}
              className={styles.item}
              required
              type="search"
              size="m"
              placeholder="Enter search query"
              data-testid="input-with-text"
            />

            <WppInput
              labelConfig={{ text: 'Disabled Search Input' }}
              required
              className={styles.item}
              name="name"
              type="search"
              size="m"
              placeholder="Enter search query"
              disabled
            />

            <WppInput
              labelConfig={{ text: 'Search Input with info message' }}
              required
              className={styles.item}
              name="name"
              type="search"
              size="m"
              placeholder="Enter search query"
              message="Info message"
            />

            <WppInput
              labelConfig={{ text: 'Warning Search Input' }}
              required
              className={styles.item}
              name="name"
              type="search"
              size="m"
              placeholder="Enter search query"
              message="Warning message"
              messageType="warning"
            />

            <WppInput
              labelConfig={{ text: 'Error Search Input' }}
              required
              className={styles.item}
              name="name"
              type="search"
              size="m"
              placeholder="Enter search query"
              message="Error message"
              messageType="error"
            />

            <WppInput
              labelConfig={{ text: 'Disabled Warning Search Input' }}
              required
              className={styles.item}
              name="name"
              type="search"
              size="m"
              placeholder="Enter search query"
              message="Warning message"
              messageType="warning"
              disabled
            />

            <WppInput
              labelConfig={{ text: 'Disabled Error Search Input' }}
              required
              className={styles.item}
              name="name"
              type="search"
              size="m"
              placeholder="Enter search query"
              message="Error message"
              messageType="error"
              disabled
            />
          </div>

          <div className={styles.form}>
            <h2 className={styles.title}>Size S</h2>
            <WppInput
              labelConfig={{ text: 'Search Input' }}
              required
              name="name"
              type="search"
              size="s"
              placeholder="Enter search query"
            />

            <WppInput
              labelConfig={{ text: 'Disabled Search Input' }}
              required
              className={styles.item}
              name="name"
              type="search"
              size="s"
              placeholder="Enter search query"
              disabled
            />

            <WppInput
              labelConfig={{ text: 'Search Input with info message' }}
              required
              className={styles.item}
              name="name"
              type="search"
              size="s"
              placeholder="Enter search query"
              message="Info message"
            />

            <WppInput
              labelConfig={{ text: 'Warning Search Input' }}
              required
              className={styles.item}
              name="name"
              type="search"
              size="s"
              placeholder="Enter search query"
              message="Warning message"
              messageType="warning"
            />

            <WppInput
              labelConfig={{ text: 'Error Search Input' }}
              required
              className={styles.item}
              name="name"
              type="search"
              size="s"
              placeholder="Enter search query"
              message="Error message"
              messageType="error"
            />

            <WppInput
              labelConfig={{ text: 'Disabled Warning Search Input' }}
              required
              className={styles.item}
              name="name"
              type="search"
              size="s"
              placeholder="Enter search query"
              message="Warning message"
              messageType="warning"
              disabled
            />

            <WppInput
              labelConfig={{ text: 'Disabled Error Search Input' }}
              required
              className={styles.item}
              name="name"
              type="search"
              size="s"
              placeholder="Enter search query"
              message="Error message"
              messageType="error"
              disabled
            />
          </div>
        </div>
      </div>

      <div data-testid="number-inputs-container">
        <h1 className={styles.title}>Number Inputs</h1>
        <div className={styles.container}>
          <div className={styles.form}>
            <h2 className={styles.title}>Size M</h2>
            <WppInput
              labelConfig={{ text: 'Number Input' }}
              required
              name="name"
              type="number"
              size="m"
              placeholder="Enter number"
              data-testid="number-input"
            />

            <WppInput
              labelConfig={{ text: 'Disabled Number Input' }}
              required
              className={styles.item}
              name="name"
              type="number"
              size="m"
              placeholder="Enter number"
              disabled
            />

            <WppInput
              labelConfig={{ text: 'Number Input with info message' }}
              required
              className={styles.item}
              name="name"
              type="number"
              size="m"
              placeholder="Enter number"
              message="Info message"
            />

            <WppInput
              labelConfig={{ text: 'Warning Number Input' }}
              required
              className={styles.item}
              name="name"
              type="number"
              size="m"
              placeholder="Enter number"
              message="Warning message"
              messageType="warning"
            />

            <WppInput
              labelConfig={{ text: 'Error Number Input' }}
              required
              className={styles.item}
              name="name"
              type="number"
              size="m"
              placeholder="Enter number"
              message="Error message"
              messageType="error"
            />

            <WppInput
              labelConfig={{ text: 'Disabled Warning Number Input' }}
              required
              className={styles.item}
              name="name"
              type="number"
              size="m"
              placeholder="Enter number"
              message="Warning message"
              messageType="warning"
              disabled
            />

            <WppInput
              labelConfig={{ text: 'Disabled Error Number Input' }}
              required
              className={styles.item}
              name="name"
              type="number"
              size="m"
              placeholder="Enter number"
              message="Error message"
              messageType="error"
              disabled
            />
          </div>

          <div className={styles.form}>
            <h2 className={styles.title}>Size S</h2>
            <WppInput
              labelConfig={{ text: 'Number Input' }}
              required
              name="name"
              type="number"
              size="s"
              placeholder="Enter number"
            />

            <WppInput
              labelConfig={{ text: 'Disabled Number Input' }}
              required
              className={styles.item}
              name="name"
              type="number"
              size="s"
              placeholder="Enter number"
              disabled
            />

            <WppInput
              labelConfig={{ text: 'Number Input with info message' }}
              required
              className={styles.item}
              name="name"
              type="number"
              size="s"
              placeholder="Enter number"
              message="Info message"
            />

            <WppInput
              labelConfig={{ text: 'Warning Number Input' }}
              required
              className={styles.item}
              name="name"
              type="number"
              size="s"
              placeholder="Enter number"
              message="Warning message"
              messageType="warning"
            />

            <WppInput
              labelConfig={{ text: 'Error Number Input' }}
              required
              className={styles.item}
              name="name"
              type="number"
              size="s"
              placeholder="Enter number"
              message="Error message"
              messageType="error"
            />

            <WppInput
              labelConfig={{ text: 'Disabled Warning Number Input' }}
              required
              className={styles.item}
              name="name"
              type="number"
              size="s"
              placeholder="Enter number"
              message="Warning message"
              messageType="warning"
              disabled
            />

            <WppInput
              labelConfig={{ text: 'Disabled Error Number Input' }}
              required
              className={styles.item}
              name="name"
              type="number"
              size="s"
              placeholder="Enter number"
              message="Error message"
              messageType="error"
              disabled
            />
          </div>
        </div>
      </div>

      <div data-testid="decimal-inputs-container">
        <h1 className={styles.title}>Decimal Inputs</h1>
        <div className={styles.container}>
          <div className={styles.form}>
            <h2 className={styles.title}>Size M</h2>

            <DecimalInput
              size={'m'}
              labelText="Decimal Input with minimum and maximum length validations. Default error messages. Value must be between [3, 8] to be valid."
              className={styles.item}
            />
            <WppInput
              labelConfig={{
                text: 'Decimal Input with minimum and maximum length validations. Error messages provided by user.',
              }}
              required
              name={'wpp-decimal-input-2'}
              className={styles.item}
              type="decimal"
              size={'s'}
              placeholder="Enter number"
              minLength={3}
              maxLength={8}
              data-testid="diff-separator-input"
              locales={{
                minLengthErrorMessage(minLength: number) {
                  return `Minimum length must be ${minLength}`
                },
                maxLengthErrorMessage(maxLength: number) {
                  return `Maximum length must be ${maxLength}`
                },
              }}
            />
          </div>
          <div className={styles.form}>
            <h2 className={styles.title}>Size S</h2>

            <DecimalInput
              size={'s'}
              labelText="Decimal Input with minimum and maximum length validations. Value must be between [3, 8] to be valid."
              className={styles.item}
            />

            <WppInput
              labelConfig={{
                text: 'Decimal Input with minimum and maximum length validations. Error messages provided by user.',
              }}
              required
              name={'wpp-decimal-input-2'}
              className={styles.item}
              type="decimal"
              size={'s'}
              placeholder="12,23"
              data-testid="number-input"
              minLength={3}
              maxLength={8}
              locales={{
                minLengthErrorMessage(minLength: number) {
                  return `Minimum length must be ${minLength}`
                },
                maxLengthErrorMessage(maxLength: number) {
                  return `Maximum length must be ${maxLength}`
                },
              }}
            />
          </div>
        </div>
      </div>

      <div data-testid="masks-inputs-container">
        <h1 className={styles.title}>Inputs with Masks</h1>
        <div className={styles.container}>
          <div className={styles.form}>
            <h2 className={styles.title}>Decimal Inputs</h2>

            <WppInput
              labelConfig={{
                text: 'Decimal Input with mask pattern',
              }}
              required
              className={styles.item}
              type="decimal"
              size={'m'}
              data-testid="custom-decimal-mask-input"
              placeholder="123.123,12"
              maskOptions={{
                decimalPatternOptions: {
                  decimalSeparator: ',',
                  thousandSeparator: '.',
                  precision: 2,
                },
              }}
            />
            <WppInput
              labelConfig={{
                text: 'Decimal Input with currency mask pattern',
              }}
              required
              className={styles.item}
              type="decimal"
              size={'m'}
              data-testid="currency-mask-input"
              placeholder="$100.12"
              maskOptions={{
                decimalPatternOptions: {
                  precision: 2,
                  decimalSeparator: '.',
                  min: 0,
                  prefix: '$',
                },
              }}
            />
            <WppInput
              labelConfig={{
                text: 'Decimal Input with percentage mask pattern',
              }}
              required
              className={styles.item}
              type="decimal"
              size={'m'}
              data-testid="percentage-mask-input"
              placeholder="Ex: 97%"
              maskOptions={{
                decimalPatternOptions: {
                  postfix: '%',
                  min: 0,
                  max: 100,
                  precision: 2,
                },
              }}
            />
          </div>
          <div className={styles.form}>
            <h2 className={styles.title}>Text Inputs</h2>
            <WppInput
              labelConfig={{
                text: 'Text Input with credit card mask pattern ',
              }}
              required
              className={styles.item}
              type="text"
              size={'m'}
              data-testid="credit-card-mask-input"
              placeholder="Enter credit card number: xxxx xxxx xxxx xxxx"
              maskOptions={{
                customPatternOptions: {
                  mask: [
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    ' ',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    ' ',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    ' ',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ],
                },
              }}
            />
            <WppInput
              labelConfig={{
                text: 'Text Input with Time mask pattern',
              }}
              required
              className={styles.item}
              type="text"
              size={'m'}
              data-testid="time-mask-input"
              placeholder="Enter HH:MM:SS"
              maskOptions={{
                customPatternOptions: {
                  mask: [/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/],
                },
              }}
            />
            <WppInput
              labelConfig={{
                text: 'Text Input with currency and fixed number of digits mask pattern ($xxx.xx)',
              }}
              required
              className={styles.item}
              type="text"
              size={'m'}
              data-testid="fixed-length-currency-mask-input"
              placeholder="Enter $xxx.xx"
              maskOptions={{
                customPatternOptions: {
                  mask: ['$', /\d/, /\d/, /\d/, '.', /\d/, /\d/],
                },
              }}
            />

            <h2 className={styles.title}>with Mask Placeholder</h2>

            <WppInput
              labelConfig={{
                text: 'Text Input with credit card mask pattern',
              }}
              required
              className={styles.item}
              type="text"
              size={'m'}
              data-testid="text-input-custom-mask-4"
              placeholder="Enter credit card number: xxxx xxxx xxxx xxxx"
              maskOptions={{
                maskPlaceholder: 'xxxx xxxx xxxx xxxx',
                customPatternOptions: {
                  mask: [
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    ' ',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    ' ',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    ' ',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ],
                },
              }}
            />
            <WppInput
              labelConfig={{
                text: 'Text Input with Time mask pattern',
              }}
              required
              className={styles.item}
              type="text"
              size={'m'}
              data-testid="text-input-custom-mask-5"
              placeholder="Enter HH:MM:SS"
              maskOptions={{
                maskPlaceholder: 'HH:MM:SS',
                customPatternOptions: {
                  mask: [/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/],
                },
              }}
            />
            <WppInput
              labelConfig={{
                text: 'Text Input with currency and fixed number of digits mask pattern',
              }}
              required
              className={styles.item}
              type="text"
              size={'m'}
              data-testid="text-input-custom-mask-6"
              placeholder="Enter $xxx.xx"
              maskOptions={{
                maskPlaceholder: '$xxx.xx',
                customPatternOptions: {
                  mask: ['$', /\d/, /\d/, /\d/, '.', /\d/, /\d/],
                },
              }}
            />
          </div>
          <div className={styles.form}>
            <h2 className={styles.title}>Tel Inputs</h2>
            <WppInput
              labelConfig={{
                text: 'Phone Input with countryCode = "RO". Default phone mask applied when only countryCode provided',
              }}
              required
              name="name"
              type="tel"
              size="m"
              data-testid="phone-input-default-mask"
              placeholder="+40 729 165-805"
              maskOptions={{
                telPatternOptions: {
                  countryCode: 'RO',
                },
              }}
              className={styles.item}
            />
            <WppInput
              labelConfig={{ text: 'Phone Input with mask pattern' }}
              required
              name="name"
              type="tel"
              size="m"
              data-testid="phone-mask-input"
              placeholder="+40 (xxx) xxx-xxx"
              maskOptions={{
                telPatternOptions: {
                  countryPhoneCode: '+40',
                  mask: ['+', '4', '0', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
                },
              }}
              className={styles.item}
            />

            <h2 className={styles.title}>with Mask Placeholder</h2>
            <WppInput
              labelConfig={{ text: 'Phone Input with mask pattern' }}
              required
              name="name"
              type="tel"
              size="m"
              data-testid="phone-input-custom-mask-2"
              placeholder="+40 (xxx) xxx-xxx"
              maskOptions={{
                maskPlaceholder: '+40 (xxx) xxx-xxx',
                telPatternOptions: {
                  countryPhoneCode: '+40',
                  mask: ['+', '4', '0', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
                },
              }}
              className={styles.item}
            />
          </div>
        </div>
      </div>

      <div data-testid="search-inputs-container">
        <h1 className={styles.title}>Search Inputs - Loading</h1>
        <div className={styles.container}>
          <div className={styles.form}>
            <h2 className={styles.title}>Size M</h2>
            <WppInput
              labelConfig={{ text: 'Search Input' }}
              required
              name="wpp-input-Size-M"
              type="search"
              size="m"
              placeholder="Type to see the loading state"
              data-testid="search-input"
              loading={isLoadingM}
              onWppChange={handleInputChangeM}
            />
          </div>
          <div className={styles.form}>
            <h2 className={styles.title}>Size S</h2>
            <WppInput
              labelConfig={{ text: 'Search Input' }}
              required
              name="wpp-input-Size-S"
              type="search"
              size="s"
              data-testid="search-input"
              placeholder="Type to see the loading state"
              loading={isLoadingS}
              onWppChange={handleInputChangeS}
            />
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.form}>
            <h2 className={styles.title}>Size M</h2>
            <WppInput
              labelConfig={{ text: 'Search Input' }}
              required
              name="name"
              type="search"
              size="m"
              placeholder="Enter search query"
              data-testid="search-input"
              loading
            />
          </div>
          <div className={styles.form}>
            <h2 className={styles.title}>Size S</h2>
            <WppInput
              labelConfig={{ text: 'Search Input' }}
              required
              name="name"
              type="search"
              size="s"
              data-testid="search-input"
              placeholder="Enter search query"
              loading
            />
          </div>
        </div>
      </div>

      <div>
        <h1 className={styles.title}>Input with Message length auto</h1>
        <div className={styles.container}>
          <div className={styles.form} style={{ maxWidth: '492px', width: '100%' }}>
            <WppInput
              name="name"
              labelConfig={{ text: 'Normal Input with Message' }}
              placeholder="Enter text"
              data-testid="message-m-input"
              message="Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquid"
              maxMessageLength="auto"
              required
            />
          </div>
        </div>
      </div>
    </div>
  )
}
