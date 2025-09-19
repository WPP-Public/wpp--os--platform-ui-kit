import { Dispatch, FC, SetStateAction, useState } from 'react'

import {
  WppAutocomplete,
  WppButton,
  WppCheckbox,
  WppDatepicker,
  WppInput,
  WppListItem,
  WppPill,
  WppRichtext,
  WppSelect,
} from '@platform-ui-kit/components-library-react'
import {
  AutocompleteDefaultOption,
  AutocompleteOption,
  DatePickerEventDetail,
  form2object,
} from '@platform-ui-kit/components-library'

import styles from '../../FormControls.module.scss'

const nameRegValidation = /^[A-Za-z\s]+$/
const emailRegValidation = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i
const contentRegValidation = /.+/
const ageRegValidation = /^[0-9]+$/

interface ActivityOption {
  id: number
  label: string
  disabled?: boolean
}

interface TransformedOption {
  number: number
  name: string
  disabled?: boolean
}

const activityOptions: ActivityOption[] = [
  {
    id: 1,
    label: 'Running',
  },
  {
    id: 2,
    label: 'Watching TV',
    disabled: true,
  },
  {
    id: 3,
    label: 'Cycling',
  },
  {
    id: 4,
    label: 'Reading',
  },
  {
    id: 5,
    label: 'Football',
  },
  {
    id: 6,
    label: 'Skiing',
  },
  {
    id: 7,
    label: 'Swimming',
  },
  {
    id: 8,
    label: 'Skating',
  },
]

// TODO: Refactor this
export const FormVanillaJs: FC = () => {
  const [nameValue, setNameValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [contentValue, setContentValue] = useState('')
  const [ageValue, setAgeValue] = useState<string>()
  const [dateValue, setDateValue] = useState('')
  const [isDateValid, setDateValid] = useState<boolean | null>(null)
  const [item, setItem] = useState<string | null | undefined>(undefined)
  const [items, setItems] = useState<any[] | undefined>([])
  const [activities, setActivities] = useState<AutocompleteDefaultOption[]>([])
  const [mainActivity, setMainActivity] = useState<AutocompleteDefaultOption[]>([])
  const [isNameValid, setNameValidStatus] = useState<boolean | null>(null)
  const [isEmailValid, setEmailValidStatus] = useState<boolean | null>(null)
  const [isContentValid, setContentValidStatus] = useState<boolean | null>(null)
  const [isAgeValid, setAgeValidStatus] = useState<boolean | null>(null)
  const [isCheckboxClick, setCheckboxStatus] = useState(false)
  const [isClickButton, setClickButtonStatus] = useState(false)
  const [isChosenItem, setChosenItem] = useState<boolean | null>(null)
  const [isMainActivitySelected, setIsMainActivitySelected] = useState<boolean | null>(null)
  const [isNotEnoughActivities, setIsNotEnoughActivities] = useState<boolean | null>(null)
  const [isNotEnoughSelectItems, setIsNotEnoughSelectItems] = useState<boolean | null>(null)

  const validationInput = ({
    value,
    regValidation,
    isClickFromButton,
    setInputStatusFunc,
  }: {
    value: string
    regValidation: RegExp
    isClickFromButton?: boolean
    setInputStatusFunc: Dispatch<SetStateAction<boolean | null>>
  }) => {
    if (!value?.length && !isClickFromButton) return setInputStatusFunc(null)

    if (!regValidation.test(value) && (isClickButton || isClickFromButton)) return setInputStatusFunc(false)

    return setInputStatusFunc(true)
  }

  const handleValidationName = (event: CustomEvent) => {
    const { value } = event.detail

    setNameValue(value)
    validationInput({
      value,
      regValidation: nameRegValidation,
      setInputStatusFunc: setNameValidStatus,
    })
  }
  const handleValidationEmail = (event: CustomEvent) => {
    const { value } = event.detail

    setEmailValue(value)
    validationInput({
      value,
      regValidation: emailRegValidation,
      setInputStatusFunc: setEmailValidStatus,
    })
  }

  const handleValidationContent = (event: CustomEvent) => {
    const { value } = event.detail

    setContentValue(value)
    validationInput({
      value,
      regValidation: contentRegValidation,
      setInputStatusFunc: setContentValidStatus,
    })
  }

  const handleValidationAge = (event: CustomEvent) => {
    const { value } = event.detail

    setAgeValue(value)
    validationInput({
      value,
      regValidation: ageRegValidation,
      setInputStatusFunc: setAgeValidStatus,
    })
  }

  const handleValidateDate = (event: CustomEvent<DatePickerEventDetail>) => {
    const date = event.detail.date

    if (!date) {
      setDateValue('')
      setDateValid(null)

      return
    }

    if (!Array.isArray(date)) {
      const currentYear = new Date().getFullYear()

      setDateValue(date.toDateString())
      setDateValid(currentYear - date.getDate() >= 18)
    }
  }

  const handleSelectInput = (event: CustomEvent) => {
    setItem(event.detail.value)
    setChosenItem(true)
  }

  const handleSelectMultipleInput = (event: CustomEvent) => {
    if (Array.isArray(event.detail.value)) {
      setItems(event.detail.value)
      setIsNotEnoughSelectItems(event.detail.value.length >= 2)
    }
  }

  const handleSelectActivities = (event: CustomEvent<any>) => {
    if (Array.isArray(event.detail.value)) {
      setActivities(event.detail.value)
      setIsNotEnoughActivities(event.detail.value.length < 2)
    }
  }

  const handleSelectMainActivity = (event: CustomEvent<any>) => {
    if (Array.isArray(event.detail.value)) {
      setMainActivity(event.detail.value)
      setIsMainActivitySelected(!!event.detail.value.length)
    }
  }

  const submitForm = (event: any) => {
    event.preventDefault()

    setClickButtonStatus(true)

    if (item === '' || item === undefined) setChosenItem(false)
    if (!isDateValid) setDateValid(false)

    validationInput({
      value: nameValue,
      regValidation: nameRegValidation,
      isClickFromButton: true,
      setInputStatusFunc: setNameValidStatus,
    })
    validationInput({
      value: emailValue,
      regValidation: emailRegValidation,
      isClickFromButton: true,
      setInputStatusFunc: setEmailValidStatus,
    })
    validationInput({
      value: contentValue,
      regValidation: contentRegValidation,
      isClickFromButton: true,
      setInputStatusFunc: setContentValidStatus,
    })

    const isActivitiesValueValid = activities.length > 1
    const isMainActivityValueValid = !!mainActivity.length

    setIsNotEnoughActivities(!isActivitiesValueValid)
    setIsMainActivitySelected(isMainActivityValueValid)

    if (
      isNameValid &&
      isEmailValid &&
      isContentValid &&
      isCheckboxClick &&
      isActivitiesValueValid &&
      isMainActivitySelected &&
      isDateValid
    ) {
      alert(
        `Submit form
        name: ${nameValue}
        email: ${emailValue}
        content: ${contentValue}
        date: ${dateValue}
        item value:${item}
        activities: [
        ${activities.map(activity => activityOptions.find(i => i.id === activity.id)!.label).join('\n')}
        ]
        mainActivity: ${activityOptions.find(i => i.id === mainActivity[0].number)!.label}`,
      )
    }
    console.info('Native FormData:', form2object(event.target))
  }

  const handleCheckboxClick = () => {
    setCheckboxStatus(!isCheckboxClick)
  }

  const handleResetClick = () => {
    setNameValue('')
    setEmailValue('')
    setContentValue('')
    setAgeValue(undefined)
    setItem(undefined)
    setItems([])
    setDateValue('')
    setActivities([])
    setMainActivity([])
    setCheckboxStatus(false)
  }

  const transformedOptions: TransformedOption[] = activityOptions.map(({ id, label, disabled }) => ({
    disabled,
    number: id,
    name: label,
  }))

  return (
    <form className={styles.form} onSubmit={submitForm} data-testid="vanilla-form">
      <WppInput
        name="name"
        onWppChange={handleValidationName}
        message={isNameValid === false ? 'Name error' : undefined}
        messageType={isNameValid === false ? 'error' : undefined}
        placeholder="Name"
        labelConfig={{ text: 'Your name' }}
        value={nameValue}
        data-testid="name-input"
        required
      />
      <WppInput
        name="email"
        onWppChange={handleValidationEmail}
        message={isEmailValid === false ? 'Email error' : undefined}
        messageType={isEmailValid === false ? 'error' : undefined}
        placeholder="Email"
        labelConfig={{ text: 'Your email' }}
        value={emailValue}
        className={styles.topMargin}
      />
      <WppRichtext
        className={styles.topMargin}
        name="content"
        placeholder="Type content here..."
        labelConfig={{ text: 'Content' }}
        onWppChange={handleValidationContent}
        message={isContentValid === false ? 'Content is invalid' : undefined}
        messageType={isContentValid === false ? 'error' : undefined}
        charactersLimit={200}
        warningThreshold={180}
        required
      />
      <WppInput
        className={styles.topMargin}
        name="age"
        type="number"
        message={isAgeValid === false ? 'Age error' : undefined}
        messageType={isAgeValid === false ? 'error' : undefined}
        placeholder="Age"
        labelConfig={{ text: 'Your age' }}
        value={ageValue}
        onWppChange={handleValidationAge}
      />
      <WppDatepicker
        className={styles.topMargin}
        name="datepicker"
        labelConfig={{ text: 'Birthday' }}
        required
        onWppChange={handleValidateDate}
        message={isDateValid === false ? 'Should be more than 18 years old' : undefined}
        value={dateValue}
      />
      <div className={styles.topMargin}>
        <label htmlFor="select" className={styles.label}>
          Select item
        </label>
        <WppSelect
          placeholder="Choose item"
          message={isChosenItem === false ? 'Choose item' : undefined}
          messageType={isChosenItem === false ? 'error' : undefined}
          onWppChange={handleSelectInput}
          id="select"
          value={item}
          data-testid="item-select-vanilla"
          list={[
            { value: 1, label: 'Car' },
            { value: 2, label: 'House' },
            { value: 3, label: 'Bus' },
            { value: 4, label: 'Train' },
          ]}
        ></WppSelect>
      </div>
      <div className={styles.topMargin}>
        <label htmlFor="select-multiple" className={styles.label}>
          Select items
        </label>
        <WppSelect
          placeholder="Choose items"
          message={isNotEnoughSelectItems === false ? 'Select at least 2 items' : undefined}
          messageType={isNotEnoughSelectItems === false ? 'error' : undefined}
          onWppChange={handleSelectMultipleInput}
          id="select-multiple"
          type="multiple"
          value={items}
          data-testid="items-select-vanilla"
          list={[
            { value: 1, label: 'Item 1' },
            { value: 2, label: 'Item 2' },
            { value: 3, label: 'Item 3' },
            { value: 4, label: 'Item 4' },
            { value: 5, label: 'Item 5' },
          ]}
        ></WppSelect>
      </div>
      <WppAutocomplete
        className={styles.topMargin}
        name="activities"
        labelConfig={{ text: 'Preferred Activities' }}
        placeholder="Select activities"
        message={isNotEnoughActivities ? 'Select at least 2 activities' : undefined}
        messageType={isNotEnoughActivities ? 'error' : undefined}
        value={activities}
        onWppChange={handleSelectActivities}
        data-testid="activities-select-vanilla"
        multiple
      >
        {activityOptions.map(item => (
          <WppListItem key={item.id} disabled={!!item.disabled} value={item} label={item.label}>
            <p slot="label">{item.label}</p>
          </WppListItem>
        ))}
        <div slot="selected-values">
          {activities.map(selectedActivity => (
            <WppPill
              key={selectedActivity.id}
              label={activityOptions.find(option => option.id === selectedActivity.id)!.label}
              removable
              value={selectedActivity.label}
              onWppClose={() => setActivities(activities.filter(val => val !== selectedActivity))}
              type="display"
            ></WppPill>
          ))}
        </div>
      </WppAutocomplete>
      <WppAutocomplete
        className={styles.topMargin}
        name="mainActivity"
        labelConfig={{ text: 'Main activity' }}
        placeholder="Select main activity"
        message={isMainActivitySelected === false ? 'Select main activity' : undefined}
        messageType={isMainActivitySelected === false ? 'error' : undefined}
        value={mainActivity}
        onWppChange={handleSelectMainActivity}
        data-testid="main-activity-select-vanilla"
        getOptionId={(option: AutocompleteOption) => option.number}
        getOptionLabel={(option: AutocompleteOption) => option.name}
      >
        {transformedOptions.map(item => (
          <WppListItem key={item.number} disabled={!!item.disabled} value={item} label={item.name}>
            <p slot="label">{item.name}</p>
          </WppListItem>
        ))}
        <div slot="selected-values">
          {mainActivity.map(selectedActivity => (
            <WppPill
              key={selectedActivity.number}
              label={transformedOptions.find(option => option.number === selectedActivity.number)!.name}
              removable
              value={selectedActivity.number}
              onWppClose={() => setMainActivity(mainActivity.filter(val => val !== selectedActivity))}
              type="display"
            ></WppPill>
          ))}
        </div>
      </WppAutocomplete>
      <WppCheckbox
        onClick={handleCheckboxClick}
        checked={isCheckboxClick}
        className={styles.topMargin}
        labelConfig={{ text: 'Do you agree to submit form' }}
      />
      <div>
        <WppButton
          type="reset"
          variant="secondary"
          className={styles.button}
          onClick={handleResetClick}
          data-testid="reset-vanilla"
        >
          Reset form
        </WppButton>
        <WppButton type="submit" className={styles.button} data-testid="submit-button">
          Submit form
        </WppButton>
      </div>
    </form>
  )
}
