import { WppRadio } from '@platform-ui-kit/components-library-react'
import styles from './RadioButtonsVC.module.scss'
import { RadioChangeEvent, WppRadioCustomEvent } from '@platform-ui-kit/components-library/dist/types/components'

export const RadioButtonsVCPage = () => (
  <div className="radioButtons">
    <h3>With Label</h3>
    <WppRadio
      name="wpp-radio-1"
      className={styles.item}
      labelConfig={{ text: 'Option 1' }}
      required
      autoFocus
      data-testid="focus-radio-button"
      onWppChange={(event: WppRadioCustomEvent<RadioChangeEvent>) => {
        const { name } = event.detail

        console.log('Event name', name)
      }}
    />

    <WppRadio
      name="wpp-radio-2"
      className={styles.item}
      labelConfig={{
        icon: 'wpp-icon-info',
        text: 'Option 2',
        description: 'Description',
        locales: {
          optional: 'Optional',
        },
      }}
      required
      onWppChange={(event: WppRadioCustomEvent<RadioChangeEvent>) => {
        const { name } = event.detail

        console.log('Event name', name)
      }}
    />

    <WppRadio
      className={styles.item}
      name="wpp-radio-1 optional"
      labelConfig={{ text: 'Option 1' }}
      onWppChange={(event: WppRadioCustomEvent<RadioChangeEvent>) => {
        const { name } = event.detail

        console.log('Event name', name)
      }}
    />

    <WppRadio
      name="wpp-radio-3"
      className={styles.item}
      labelConfig={{ text: 'Option 1' }}
      disabled
      required
      onWppChange={(event: WppRadioCustomEvent<RadioChangeEvent>) => {
        const { name } = event.detail

        console.log('Event name', name)
      }}
    />

    <WppRadio
      name="wpp-radio-4"
      className={styles.item}
      labelConfig={{ text: 'Option 1' }}
      checked
      required
      onWppChange={(event: WppRadioCustomEvent<RadioChangeEvent>) => {
        const { name } = event.detail

        console.log('Event name', name)
      }}
    />

    <WppRadio
      name="wpp-radio-5"
      className={styles.item}
      labelConfig={{ text: 'Option 1' }}
      checked
      disabled
      required
      onWppChange={(event: WppRadioCustomEvent<RadioChangeEvent>) => {
        const { name } = event.detail

        console.log('Event name', name)
      }}
    />

    <WppRadio
      name="wpp-radio-6"
      className={styles.item}
      labelConfig={{ text: 'Hover test' }}
      data-testid="hover-radio-button"
      required
      onWppChange={(event: WppRadioCustomEvent<RadioChangeEvent>) => {
        const { name } = event.detail

        console.log('Event name', name)
      }}
    />

    <h3>Without Label</h3>
    <WppRadio
      className={styles.item}
      name="wpp-radio-7"
      required
      onWppChange={(event: WppRadioCustomEvent<RadioChangeEvent>) => {
        const { name } = event.detail

        console.log('Event name', name)
      }}
    />

    <WppRadio
      name="wpp-radio-8"
      className={styles.item}
      onWppChange={(event: WppRadioCustomEvent<RadioChangeEvent>) => {
        const { name } = event.detail

        console.log('Event name', name)
      }}
    />

    <WppRadio
      name="wpp-radio-9"
      className={styles.item}
      disabled
      required
      onWppChange={(event: WppRadioCustomEvent<RadioChangeEvent>) => {
        const { name } = event.detail

        console.log('Event name', name)
      }}
    />

    <WppRadio
      name="wpp-radio-10"
      className={styles.item}
      checked
      required
      onWppChange={(event: WppRadioCustomEvent<RadioChangeEvent>) => {
        const { name } = event.detail

        console.log('Event name', name)
      }}
    />

    <WppRadio
      name="wpp-radio-11"
      className={styles.item}
      checked
      disabled
      required
      onWppChange={(event: WppRadioCustomEvent<RadioChangeEvent>) => {
        const { name } = event.detail

        console.log('Event name', name)
      }}
    />
  </div>
)
