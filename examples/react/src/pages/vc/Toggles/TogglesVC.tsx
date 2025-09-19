import { WppToggle } from '@platform-ui-kit/components-library-react'
import styles from './TogglesVC.module.scss'
import { ToggleChangeEvent } from '@platform-ui-kit/components-library'
import { WppToggleCustomEvent } from '@platform-ui-kit/components-library/dist/types/components'

export const TogglesVCPage = () => {
  const labelConfig = {
    text: 'Label Text',
  }
  const labelConfigHover = {
    icon: 'wpp-icon-info',
    text: 'Hover Test',
    description: 'Description',
    locales: {
      optional: 'Optional',
    },
  }

  const handleToggleChange = (event: WppToggleCustomEvent<ToggleChangeEvent>) => {
    const { name, value } = event.detail

    console.log(`Toggle changed - name: ${name}, value: ${value ?? false}`)
  }

  return (
    <div className="toggles">
      <h3>With Label</h3>
      <WppToggle
        name="focus-toggle"
        className={styles.item}
        labelConfig={labelConfig}
        required
        autoFocus
        data-testid="focus-toggle"
        onWppChange={handleToggleChange}
      />

      <WppToggle
        name="hover-toggle"
        className={styles.item}
        labelConfig={labelConfigHover}
        data-testid="hover-toggle"
        required
        onWppChange={handleToggleChange}
      />

      <WppToggle
        name="disabled-required"
        className={styles.item}
        labelConfig={labelConfig}
        disabled
        required
        onWppChange={handleToggleChange}
      />

      <WppToggle
        name="checked-required"
        className={styles.item}
        labelConfig={labelConfig}
        checked
        required
        onWppChange={handleToggleChange}
      />

      <WppToggle
        name="disabled-checked-required"
        className={styles.item}
        labelConfig={labelConfig}
        disabled
        checked
        required
        onWppChange={handleToggleChange}
      />

      <WppToggle name="with-label" className={styles.item} labelConfig={labelConfig} onWppChange={handleToggleChange} />

      <h3>Without Label</h3>
      <WppToggle
        ariaProps={{ label: 'no label' }}
        name="no-label"
        className={styles.item}
        onWppChange={handleToggleChange}
      />

      <WppToggle
        ariaProps={{ label: 'no label' }}
        name="disabled"
        className={styles.item}
        disabled
        onWppChange={handleToggleChange}
      />

      <WppToggle
        ariaProps={{ label: 'no label' }}
        name="checked"
        className={styles.item}
        checked
        onWppChange={handleToggleChange}
      />

      <WppToggle
        ariaProps={{ label: 'no label' }}
        name="disabled-checked"
        className={styles.item}
        disabled
        checked
        onWppChange={handleToggleChange}
      />

      <WppToggle
        ariaProps={{ label: 'no label' }}
        name="required-only"
        className={styles.item}
        required
        onWppChange={handleToggleChange}
      />
    </div>
  )
}
