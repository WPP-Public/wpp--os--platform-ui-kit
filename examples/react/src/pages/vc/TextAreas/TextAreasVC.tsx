import { WppTextareaInput } from '@platform-ui-kit/components-library-react'
import styles from './TextAreasVC.module.scss'

export const TextAreasVCPage = () => {
  const messageText =
    'Probably, one of the longest and detailed warning messages ever met in the User Interface. Probably, one of the longest and detailed warning messages ever met in the User Interface. Probably, one of the long'

  return (
    <div>
      <h2 className={styles.title}>Text areas</h2>
      <div className={styles.inputs} data-testid="text-area-inputs">
        <WppTextareaInput
          placeholder="Enter text"
          name="Regular Text Area with Limit"
          charactersLimit={10}
          warningThreshold={5}
          data-testid="regular-limited-text-area"
          required
          autoFocus
          labelConfig={{
            icon: 'wpp-icon-info',
            text: 'Regular Text Area with Limit',
            description: 'Description',
            locales: {
              optional: 'Optional',
            },
          }}
          onWppChange={e => console.log('Event name: ', e.detail.name)}
        />

        <WppTextareaInput
          name="Regular Text Area w/o Limit"
          placeholder="Enter text"
          labelConfig={{ text: 'Regular Text Area w/o Limit' }}
          warningThreshold={5}
          data-testid="regular-limitless-text-area"
          required
          onWppChange={e => console.log('Event name: ', e.detail.name)}
        />

        <WppTextareaInput
          name="Disabled Regular Text Area"
          placeholder="Enter text"
          labelConfig={{ text: 'Disabled Regular Text Area' }}
          disabled
          warningThreshold={5}
          data-testid="disabled-limitless-text-area"
          required
          onWppChange={e => console.log('Event name: ', e.detail.name)}
        />

        <WppTextareaInput
          name="Limited Text Area with Error"
          placeholder="Enter text"
          labelConfig={{ text: 'Limited Text Area with Error' }}
          warningThreshold={5}
          charactersLimit={10}
          maxMessageLength={120}
          messageType="error"
          message={messageText}
          data-testid="limited-error-text-area"
          required
          onWppChange={e => console.log('Event name: ', e.detail.name)}
        />

        <WppTextareaInput
          name="Limitless Text Area with Error"
          placeholder="Enter text"
          labelConfig={{ text: 'Limitless Text Area with Error' }}
          warningThreshold={5}
          maxMessageLength={120}
          messageType="error"
          message={messageText}
          data-testid="limitless-error-text-area"
          required
          onWppChange={e => console.log('Event name: ', e.detail.name)}
        />

        <WppTextareaInput
          name="Limitless Text Area with Warning"
          placeholder="Enter text"
          labelConfig={{ text: 'Limitless Text Area with Warning' }}
          warningThreshold={5}
          maxMessageLength={120}
          messageType="warning"
          message={messageText}
          data-testid="limitless-warning-text-area"
          required
          onWppChange={e => console.log('Event name: ', e.detail.name)}
        />

        <WppTextareaInput
          name="Limited Text Area with Warning"
          labelConfig={{ text: 'Limited Text Area with Warning' }}
          warningThreshold={5}
          charactersLimit={10}
          maxMessageLength={120}
          messageType="warning"
          message={messageText}
          data-testid="limited-warning-text-area"
          required
          onWppChange={e => console.log('Event name: ', e.detail.name)}
        />

        <WppTextareaInput
          placeholder="Enter text"
          labelConfig={{ text: 'All In Text Area' }}
          charactersLimit={10}
          disabled
          warningThreshold={5}
          maxMessageLength={120}
          messageType="error"
          name="all-in-text-area"
          value="Test text"
          message={messageText}
          data-testid="all-in-text-area"
          onWppChange={e => console.log('Event name: ', e.detail.name)}
        />
      </div>
    </div>
  )
}
