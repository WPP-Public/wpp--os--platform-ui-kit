import { WppButton, WppInput } from '@platform-ui-kit/components-library-react'
import styles from './index.module.scss'
import { useRef } from 'react'

export const InputsWithWppChangeExtraEvent = () => {
  const refs = {
    // Decimal inputs
    decimalMask: useRef<any>(null),
    currencyMask: useRef<any>(null),
    percentageMask: useRef<any>(null),
    // Text inputs
    creditCardMask: useRef<any>(null),
    timeMask: useRef<any>(null),
    fixedCurrency: useRef<any>(null),
    fixedCurrencyMask: useRef<any>(null),
    creditCardPlaceholder: useRef<any>(null),
    timePlaceholder: useRef<any>(null),
    // Tel inputs
    telDefault: useRef<any>(null),
    telCustom: useRef<any>(null),
    telPlaceholder: useRef<any>(null),
  }

  const handleWppChangeExtra = (event: any) => {
    console.log('[wppChangeExtra] raw:', event.detail.raw, 'formatted:', event.detail.formatted)
  }

  const handleWppChange = (event: any) => {
    console.log('[wppChange] input:', event.detail.value)
  }

  return (
    <div data-testid="masks-inputs-container">
      <h1 className={styles.title}>Inputs with Masks</h1>
      <p className={styles.subtitle}>
        New event <code>wppChangeExtra</code> emits both raw and formatted values.
      </p>
      <div data-testid="masks-inputs-container" className={styles.container}>
        {/* Decimal Inputs Section */}
        <div className={styles.form}>
          <h2 className={styles.sectionTitle}>Decimal Inputs</h2>
          <WppButton size="s" className={styles.item} onClick={() => refs.decimalMask.current?.setValue('567890')}>
            Update Decimal Mask
          </WppButton>
          <WppInput
            labelConfig={{ text: 'Decimal Input with mask pattern' }}
            required
            ref={refs.decimalMask}
            value="123456"
            onWppChangeExtra={handleWppChangeExtra}
            onWppChange={handleWppChange}
            type="decimal"
            size="m"
            placeholder="123.123,12"
            maskOptions={{
              decimalPatternOptions: {
                decimalSeparator: ',',
                thousandSeparator: '.',
                precision: 2,
              },
            }}
            className={styles.item}
            data-testid="custom-decimal-mask-input"
          />

          <WppButton size="s" className={styles.item} onClick={() => refs.currencyMask.current?.setValue('5678')}>
            Update Currency Mask
          </WppButton>
          <WppInput
            labelConfig={{ text: 'Decimal Input with currency mask pattern' }}
            required
            ref={refs.currencyMask}
            value="1234"
            onWppChangeExtra={handleWppChangeExtra}
            onWppChange={handleWppChange}
            type="decimal"
            size="m"
            placeholder="$100.12"
            maskOptions={{
              decimalPatternOptions: {
                precision: 2,
                decimalSeparator: '.',
                min: 0,
                prefix: '$',
              },
            }}
            className={styles.item}
            data-testid="currency-mask-input"
          />

          <WppButton size="s" className={styles.item} onClick={() => refs.percentageMask.current?.setValue('56.78')}>
            Update Percentage Mask
          </WppButton>
          <WppInput
            labelConfig={{ text: 'Decimal Input with percentage mask pattern' }}
            required
            ref={refs.percentageMask}
            value="12.34"
            onWppChangeExtra={handleWppChangeExtra}
            onWppChange={handleWppChange}
            type="decimal"
            size="m"
            placeholder="Ex: 97%"
            maskOptions={{
              decimalPatternOptions: {
                postfix: '%',
                min: 0,
                max: 100,
                precision: 2,
              },
            }}
            className={styles.item}
            data-testid="percentage-mask-input"
          />
        </div>

        {/* Text Inputs Section */}
        <div className={styles.form}>
          <h2 className={styles.sectionTitle}>Text Inputs</h2>
          <WppButton
            size="s"
            className={styles.item}
            onClick={() => refs.creditCardMask.current?.setValue('5678121112359876')}
          >
            Update Credit Card Mask
          </WppButton>
          <WppInput
            labelConfig={{ text: 'Text Input with credit card mask pattern' }}
            required
            ref={refs.creditCardMask}
            value="1234567890123456"
            onWppChangeExtra={handleWppChangeExtra}
            onWppChange={handleWppChange}
            type="text"
            size="m"
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
            className={styles.item}
            data-testid="credit-card-mask-input"
          />

          <WppButton size="s" className={styles.item} onClick={() => refs.timeMask.current?.setValue('567812')}>
            Update Time Mask
          </WppButton>
          <WppInput
            labelConfig={{ text: 'Text Input with Time mask pattern' }}
            required
            ref={refs.timeMask}
            value="123456"
            onWppChangeExtra={handleWppChangeExtra}
            onWppChange={handleWppChange}
            type="text"
            size="m"
            placeholder="Enter HH:MM:SS"
            maskOptions={{
              customPatternOptions: {
                mask: [/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/],
              },
            }}
            className={styles.item}
            data-testid="time-mask-input"
          />

          <WppButton
            size="s"
            className={styles.item}
            onClick={() => refs.fixedCurrencyMask.current?.setValue('567812')}
          >
            Update Fixed Currency Mask
          </WppButton>
          <WppInput
            labelConfig={{ text: 'Text Input with currency and fixed digits mask pattern ($xxx.xx)' }}
            required
            ref={refs.fixedCurrencyMask}
            value="123456"
            onWppChangeExtra={handleWppChangeExtra}
            onWppChange={handleWppChange}
            type="text"
            size="m"
            placeholder="Enter $xxx.xx"
            maskOptions={{
              customPatternOptions: {
                mask: ['$', /\d/, /\d/, /\d/, '.', /\d/, /\d/],
              },
            }}
            className={styles.item}
            data-testid="fixed-length-currency-mask-input"
          />

          <WppButton
            size="s"
            className={styles.item}
            onClick={() => refs.creditCardPlaceholder.current?.setValue('5678121112359876')}
          >
            Update Credit Card (Placeholder)
          </WppButton>
          <WppInput
            labelConfig={{ text: 'Text Input with credit card mask pattern (with placeholder)' }}
            required
            ref={refs.creditCardPlaceholder}
            value="1234567890123456"
            onWppChangeExtra={handleWppChangeExtra}
            onWppChange={handleWppChange}
            type="text"
            size="m"
            placeholder="xxxx xxxx xxxx xxxx"
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
            className={styles.item}
            data-testid="text-input-custom-mask-4"
          />

          <WppButton size="s" className={styles.item} onClick={() => refs.timePlaceholder.current?.setValue('567812')}>
            Update Time (Placeholder)
          </WppButton>
          <WppInput
            labelConfig={{ text: 'Text Input with Time mask pattern (with placeholder)' }}
            required
            ref={refs.timePlaceholder}
            value="123456"
            onWppChangeExtra={handleWppChangeExtra}
            onWppChange={handleWppChange}
            type="text"
            size="m"
            placeholder="HH:MM:SS"
            maskOptions={{
              maskPlaceholder: 'HH:MM:SS',
              customPatternOptions: {
                mask: [/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/],
              },
            }}
            className={styles.item}
            data-testid="text-input-custom-mask-5"
          />

          <WppButton size="s" className={styles.item} onClick={() => refs.fixedCurrency.current?.setValue('56781')}>
            Update fixed Currency
          </WppButton>
          <WppInput
            labelConfig={{ text: 'Text Input with currency and fixed digits mask pattern' }}
            required
            onWppChangeExtra={handleWppChangeExtra}
            onWppChange={handleWppChange}
            type="text"
            size="m"
            ref={refs.fixedCurrency}
            value="12345"
            placeholder="Enter $xxx.xx"
            maskOptions={{
              maskPlaceholder: '$xxx.xx',
              customPatternOptions: {
                mask: ['$', /\d/, /\d/, /\d/, '.', /\d/, /\d/],
              },
            }}
            className={styles.item}
            data-testid="text-input-custom-mask-6"
          />
        </div>

        {/* Tel Inputs Section */}
        <div className={styles.form}>
          <h2 className={styles.sectionTitle}>Tel Inputs</h2>
          <WppButton size="s" className={styles.item} onClick={() => refs.telDefault.current?.setValue('801234768')}>
            Update Tel Default
          </WppButton>
          <WppInput
            labelConfig={{ text: 'Phone Input with default mask' }}
            required
            ref={refs.telDefault}
            value="729165805"
            onWppChangeExtra={handleWppChangeExtra}
            onWppChange={handleWppChange}
            type="tel"
            size="m"
            placeholder="+40 729 165-805"
            maskOptions={{
              telPatternOptions: {
                countryCode: 'RO',
              },
            }}
            className={styles.item}
            data-testid="phone-input-default-mask"
          />

          <WppButton size="s" className={styles.item} onClick={() => refs.telCustom.current?.setValue('801234768')}>
            Update Tel Custom
          </WppButton>
          <WppInput
            labelConfig={{ text: 'Phone Input with custom mask pattern' }}
            required
            ref={refs.telCustom}
            value="729165805"
            onWppChangeExtra={handleWppChangeExtra}
            onWppChange={handleWppChange}
            type="tel"
            size="m"
            placeholder="+40 (xxx) xxx-xxx"
            maskOptions={{
              telPatternOptions: {
                countryPhoneCode: '+40',
                mask: ['+', '4', '0', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
              },
            }}
            className={styles.item}
            data-testid="phone-mask-input"
          />

          <WppButton
            size="s"
            className={styles.item}
            onClick={() => refs.telPlaceholder.current?.setValue('801234768')}
          >
            Update Tel Placeholder
          </WppButton>
          <WppInput
            labelConfig={{ text: 'Phone Input with mask placeholder' }}
            required
            ref={refs.telPlaceholder}
            value="729165805"
            onWppChangeExtra={handleWppChangeExtra}
            onWppChange={handleWppChange}
            type="tel"
            size="m"
            placeholder="+40 (xxx) xxx-xxx"
            maskOptions={{
              maskPlaceholder: '+40 (xxx) xxx-xxx',
              telPatternOptions: {
                countryPhoneCode: '+40',
                mask: ['+', '4', '0', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
              },
            }}
            className={styles.item}
            data-testid="phone-input-custom-mask-2"
          />
        </div>
      </div>
    </div>
  )
}

export default InputsWithWppChangeExtraEvent
