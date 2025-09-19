import { WppAutocomplete, WppButton, WppListItem, WppTypography } from '@platform-ui-kit/components-library-react'
import { AutocompleteDefaultOption } from '@platform-ui-kit/components-library'
import styles from './index.module.scss'
import { useEffect, useRef, useState } from 'react'
import { COUNTDOWN, initialSelectedValues, memberOptions, INFO_TEXT } from './config'
import { SelectedValues } from '../../Autocomplete/SelectedValues'

const AutocompleteOnBlur = () => {
  const autocompleteRef = useRef<HTMLWppAutocompleteElement | null>(null)
  const [memberValues, setMemberValues] = useState<AutocompleteDefaultOption[]>(initialSelectedValues)
  const [timeRemaining, setTimeRemaining] = useState<number>(0)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prevTime => {
          const currentTimeValue = prevTime - 1

          if (currentTimeValue === 0) {
            autocompleteRef?.current?.blur()
          }

          return currentTimeValue
        })
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [timeRemaining])

  const setTimer = (): void => {
    setTimeRemaining(COUNTDOWN)
  }

  return (
    <div>
      <div>
        <h1 style={{ textDecoration: 'underline' }}>
          <a href="https://jira.uhub.biz/browse/WPPLONOP-13719">
            Bugfix #13719 - Autocomplete: ref.current?.blur() autofocus method does not work
          </a>
        </h1>
      </div>
      <div className={styles.page}>
        <div className={styles.container}>
          <WppButton class={styles.startBtn} onClick={setTimer}>
            Start timer
          </WppButton>
          <WppTypography type="l-strong">Timer: {timeRemaining}</WppTypography>
        </div>
        <WppTypography type="m-strong" class={styles.infoText}>
          {INFO_TEXT}
        </WppTypography>
        <WppAutocomplete
          ref={autocompleteRef}
          required
          name="basic"
          labelConfig={{
            text: 'Members',
            description: 'Description',
          }}
          placeholder="Select member(s)"
          value={memberValues}
          onWppChange={(e: CustomEvent) => setMemberValues(e.detail.value as AutocompleteDefaultOption[])}
          data-testid="basic-autocomplete"
          type="extended"
          multiple
          simpleSearch
          onWppBlur={(e: CustomEvent) => console.log('On Blur', e)}
        >
          {memberOptions.map(option => (
            <WppListItem key={option.id} value={option} label={option.label}>
              <p slot="label">{option.label}</p>
            </WppListItem>
          ))}
          <SelectedValues
            values={memberValues}
            onCloseClick={value => setMemberValues(memberValues.filter(i => i.id !== value))}
          />
        </WppAutocomplete>
      </div>
    </div>
  )
}

export default AutocompleteOnBlur
