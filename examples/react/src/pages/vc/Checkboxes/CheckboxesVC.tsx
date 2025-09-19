import { WppCheckbox } from '@platform-ui-kit/components-library-react'
import styles from './CheckboxesVC.module.scss'
import { CheckboxChangeEvent, WppCheckboxCustomEvent } from '@platform-ui-kit/components-library/dist/types/components'

export const CheckboxesVCPage = () => (
  <div className="checkboxes">
    <h3> With Label</h3>
    <WppCheckbox
      className={styles.checkbox}
      labelConfig={{ text: 'Option 1' }}
      name="checkbox1"
      required
      autoFocus
      data-testid="focus-checkbox"
      onWppChange={(e: WppCheckboxCustomEvent<CheckboxChangeEvent>) => {
        console.log(`Checkbox ${e.detail.name} clicked`)
      }}
    />

    <WppCheckbox
      className={styles.checkbox}
      labelConfig={{
        icon: 'wpp-icon-info',
        text: 'Option 1',
        description: 'Description',
        locales: {
          optional: 'Optional',
        },
      }}
      name="checkbox2"
      required
      onWppChange={(e: WppCheckboxCustomEvent<CheckboxChangeEvent>) => {
        console.log(`Checkbox ${e.detail.name} clicked`)
      }}
    />

    <WppCheckbox
      className={styles.checkbox}
      labelConfig={{ text: 'Option 1' }}
      name="checkbox3"
      onWppChange={(e: WppCheckboxCustomEvent<CheckboxChangeEvent>) => {
        console.log(`Checkbox ${e.detail.name} clicked`)
      }}
    />

    <WppCheckbox
      className={styles.checkbox}
      labelConfig={{ text: 'Option 1' }}
      name="checkbox4"
      disabled
      required
      onWppChange={(e: WppCheckboxCustomEvent<CheckboxChangeEvent>) => {
        console.log(`Checkbox ${e.detail.name} clicked`)
      }}
    />

    <WppCheckbox
      className={styles.checkbox}
      labelConfig={{ text: 'Option 1' }}
      name="checkbox5"
      checked
      required
      onWppChange={(e: WppCheckboxCustomEvent<CheckboxChangeEvent>) => {
        console.log(`Checkbox ${e.detail.name} clicked`)
      }}
    />

    <WppCheckbox
      className={styles.checkbox}
      labelConfig={{ text: 'Option 1' }}
      name="checkbox6"
      checked
      disabled
      required
      onWppChange={(e: WppCheckboxCustomEvent<CheckboxChangeEvent>) => {
        console.log(`Checkbox ${e.detail.name} clicked`)
      }}
    />

    <WppCheckbox
      className={styles.checkbox}
      labelConfig={{ text: 'Option 1' }}
      name="checkbox7"
      indeterminate
      required
      onWppChange={(e: WppCheckboxCustomEvent<CheckboxChangeEvent>) => {
        console.log(`Checkbox ${e.detail.name} clicked`)
      }}
    />

    <WppCheckbox
      className={styles.checkbox}
      labelConfig={{ text: 'Option 1' }}
      name="checkbox8"
      indeterminate
      disabled
      required
      onWppChange={(e: WppCheckboxCustomEvent<CheckboxChangeEvent>) => {
        console.log(`Checkbox ${e.detail.name} clicked`)
      }}
    />

    <WppCheckbox
      className={styles.checkbox}
      labelConfig={{ text: 'Hover test' }}
      data-testid="hover-checkbox"
      name="checkbox9"
      required
      onWppChange={(e: WppCheckboxCustomEvent<CheckboxChangeEvent>) => {
        console.log(`Checkbox ${e.detail.name} clicked`)
      }}
    />

    <WppCheckbox
      className={styles.checkbox}
      labelConfig={{ text: 'Option 1' }}
      name="checkbox10"
      required
      messageType="error"
      message="Error message"
      onWppChange={(e: WppCheckboxCustomEvent<CheckboxChangeEvent>) => {
        console.log(`Checkbox ${e.detail.name} clicked`)
      }}
    />

    <WppCheckbox
      className={styles.checkbox}
      labelConfig={{ text: 'Option 1' }}
      name="checkbox11"
      required
      messageType="error"
      message="Error message"
      maxMessageLength={10}
      onWppChange={(e: WppCheckboxCustomEvent<CheckboxChangeEvent>) => {
        console.log(`Checkbox ${e.detail.name} clicked`)
      }}
    />

    <WppCheckbox
      className={styles.checkbox}
      labelConfig={{ text: 'Option 1' }}
      name="checkbox12"
      required
      messageType="warning"
      message="Warning message"
      onWppChange={(e: WppCheckboxCustomEvent<CheckboxChangeEvent>) => {
        console.log(`Checkbox ${e.detail.name} clicked`)
      }}
    />

    <WppCheckbox
      className={styles.checkbox}
      labelConfig={{ text: 'Option 1' }}
      name="checkbox13"
      required
      messageType="warning"
      message="Warning message"
      maxMessageLength={10}
      onWppChange={(e: WppCheckboxCustomEvent<CheckboxChangeEvent>) => {
        console.log(`Checkbox ${e.detail.name} clicked`)
      }}
    />

    <WppCheckbox
      className={styles.checkbox}
      labelConfig={{ text: 'Option 1' }}
      name="checkbox14"
      required
      message="Info message"
      onWppChange={(e: WppCheckboxCustomEvent<CheckboxChangeEvent>) => {
        console.log(`Checkbox ${e.detail.name} clicked`)
      }}
    />

    <WppCheckbox
      className={styles.checkbox}
      labelConfig={{ text: 'Option 1' }}
      name="checkbox15"
      required
      message="Info message"
      maxMessageLength={10}
      onWppChange={(e: WppCheckboxCustomEvent<CheckboxChangeEvent>) => {
        console.log(`Checkbox ${e.detail.name} clicked`)
      }}
    />

    <h3> Without Label</h3>
    <WppCheckbox
      className={styles.checkbox}
      name="checkbox16"
      required
      onWppChange={(e: WppCheckboxCustomEvent<CheckboxChangeEvent>) => {
        console.log(`Checkbox ${e.detail.name} clicked`)
      }}
    />

    <WppCheckbox
      className={styles.checkbox}
      name="checkbox17"
      onWppChange={(e: WppCheckboxCustomEvent<CheckboxChangeEvent>) => {
        console.log(`Checkbox ${e.detail.name} clicked`)
      }}
    />

    <WppCheckbox
      className={styles.checkbox}
      name="checkbox18"
      disabled
      required
      onWppChange={(e: WppCheckboxCustomEvent<CheckboxChangeEvent>) => {
        console.log(`Checkbox ${e.detail.name} clicked`)
      }}
    />

    <WppCheckbox
      className={styles.checkbox}
      name="checkbox19"
      checked
      required
      onWppChange={(e: WppCheckboxCustomEvent<CheckboxChangeEvent>) => {
        console.log(`Checkbox ${e.detail.name} clicked`)
      }}
    />

    <WppCheckbox
      className={styles.checkbox}
      name="checkbox20"
      checked
      disabled
      required
      onWppChange={(e: WppCheckboxCustomEvent<CheckboxChangeEvent>) => {
        console.log(`Checkbox ${e.detail.name} clicked`)
      }}
    />

    <WppCheckbox
      className={styles.checkbox}
      name="checkbox21"
      indeterminate
      required
      onWppChange={(e: WppCheckboxCustomEvent<CheckboxChangeEvent>) => {
        console.log(`Checkbox ${e.detail.name} clicked`)
      }}
    />

    <WppCheckbox
      className={styles.checkbox}
      name="checkbox22"
      indeterminate
      disabled
      required
      onWppChange={(e: WppCheckboxCustomEvent<CheckboxChangeEvent>) => {
        console.log(`Checkbox ${e.detail.name} clicked`)
      }}
    />

    <WppCheckbox
      className={styles.checkbox}
      name="checkbox23"
      required
      messageType="error"
      message="Error message"
      onWppChange={(e: WppCheckboxCustomEvent<CheckboxChangeEvent>) => {
        console.log(`Checkbox ${e.detail.name} clicked`)
      }}
    />

    <WppCheckbox
      className={styles.checkbox}
      name="checkbox24"
      required
      messageType="error"
      message="Error message"
      maxMessageLength={10}
      onWppChange={(e: WppCheckboxCustomEvent<CheckboxChangeEvent>) => {
        console.log(`Checkbox ${e.detail.name} clicked`)
      }}
    />

    <WppCheckbox
      className={styles.checkbox}
      name="checkbox25"
      required
      messageType="warning"
      message="Warning message"
      onWppChange={(e: WppCheckboxCustomEvent<CheckboxChangeEvent>) => {
        console.log(`Checkbox ${e.detail.name} clicked`)
      }}
    />

    <WppCheckbox
      className={styles.checkbox}
      name="checkbox26"
      required
      messageType="warning"
      message="Warning message"
      maxMessageLength={10}
      onWppChange={(e: WppCheckboxCustomEvent<CheckboxChangeEvent>) => {
        console.log(`Checkbox ${e.detail.name} clicked`)
      }}
    />

    <WppCheckbox
      className={styles.checkbox}
      name="checkbox27"
      required
      message="Info message"
      onWppChange={(e: WppCheckboxCustomEvent<CheckboxChangeEvent>) => {
        console.log(`Checkbox ${e.detail.name} clicked`)
      }}
    />

    <WppCheckbox
      className={styles.checkbox}
      name="checkbox28"
      required
      message="Info message"
      maxMessageLength={10}
      onWppChange={(e: WppCheckboxCustomEvent<CheckboxChangeEvent>) => {
        console.log(`Checkbox ${e.detail.name} clicked`)
      }}
    />
  </div>
)
