import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AutocompleteDefaultOption, DatePickerEventDetail } from '@platform-ui-kit/components-library'
import { ActivityOption } from '../activity-option'

@Component({
  selector: 'form-vanilla-example',
  templateUrl: './form-vanilla.html',
  styleUrls: ['./../../form-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormVanilla {
  public nameRegValidation = /^[A-Za-z\s]+$/
  public emailRegValidation = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i
  public ageRegValidation = /^[0-9]+$/
  public LIST = [
    { value: 1, label: 'Car' },
    { value: 2, label: 'House' },
    { value: 3, label: 'Bus' },
    { value: 4, label: 'Train' },
  ]

  public activityOptions: ActivityOption[] = [
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

  public nameValue = ''
  public emailValue = ''
  public ageValue: string = ''
  public dateValue = ''
  public isDateValid: boolean | null = null
  public item: string | null | undefined = undefined
  public items: any[] | undefined = []
  public activities: AutocompleteDefaultOption[] = []
  public mainActivity: AutocompleteDefaultOption[] = []
  public isNameValid: boolean | null = null
  public isEmailValid: boolean | null = null
  public isAgeValid: boolean | null = null
  public isCheckboxClick = false
  public isClickButton = false
  public isChosenItem: boolean | null = null
  public isMainActivitySelected: boolean | null = null
  public isNotEnoughActivities: boolean | null = null
  public isNotEnoughSelectItems: boolean | null = null

  public validationInput = ({
    value,
    regValidation,
    isClickFromButton,
    setInputStatusFunc,
  }: {
    value: string
    regValidation: RegExp
    isClickFromButton?: boolean
    setInputStatusFunc: any
  }) => {
    if (!value.length && !isClickFromButton) return setInputStatusFunc(null)

    if (!regValidation.test(value) && (this.isClickButton || isClickFromButton)) return setInputStatusFunc(false)

    return setInputStatusFunc(true)
  }

  public handleValidationName = (event: Event) => {
    const value = (event as CustomEvent).detail.value

    this.nameValue = value
    this.validationInput({
      value,
      regValidation: this.nameRegValidation,
      setInputStatusFunc: this.isNameValid,
    })
  }

  public handleValidationEmail = (event: Event) => {
    const value = (event as CustomEvent).detail.value

    this.emailValue = value
    this.validationInput({
      value,
      regValidation: this.emailRegValidation,
      setInputStatusFunc: this.isEmailValid,
    })
  }

  public handleValidationAge = (event: Event) => {
    const value = (event as CustomEvent).detail.value

    this.ageValue = value
    this.validationInput({
      value,
      regValidation: this.ageRegValidation,
      setInputStatusFunc: this.isAgeValid,
    })
  }

  public handleValidateDate = (event: Event) => {
    const date = (event as CustomEvent<DatePickerEventDetail>).detail.date

    if (!Array.isArray(date)) {
      const currentYear = new Date().getFullYear()

      this.dateValue = date.toDateString()
      this.isDateValid = currentYear - date.getDate() >= 18
    }
  }

  public handleSelectInput = (event: Event) => {
    this.item = (event as CustomEvent).detail.value
    this.isChosenItem = true
  }

  public handleSelectMultipleInput = (event: Event) => {
    if (Array.isArray((event as CustomEvent).detail.value)) {
      this.items = (event as CustomEvent).detail.value
      this.isNotEnoughSelectItems = (event as CustomEvent).detail.value.length >= 2
    }
  }

  public handleSelectActivities = (event: Event) => {
    if (Array.isArray((event as CustomEvent).detail.value)) {
      this.activities = (event as CustomEvent).detail.value
      this.isNotEnoughActivities = (event as CustomEvent).detail.value.length < 2
    }
  }

  public handleSelectMainActivity = (event: Event) => {
    if (Array.isArray((event as CustomEvent).detail.value)) {
      this.mainActivity = (event as CustomEvent).detail.value
      this.isMainActivitySelected = !!(event as CustomEvent).detail.value.length
    }
  }

  public submitForm = (event: any) => {
    event.preventDefault()

    this.isClickButton = true

    if (this.item === '' || this.item === undefined) this.isChosenItem = false
    if (!this.isDateValid) this.isDateValid = false

    this.validationInput({
      value: this.nameValue,
      regValidation: this.nameRegValidation,
      isClickFromButton: true,
      setInputStatusFunc: this.isNameValid,
    })
    this.validationInput({
      value: this.emailValue,
      regValidation: this.emailRegValidation,
      isClickFromButton: true,
      setInputStatusFunc: this.isEmailValid,
    })

    const isActivitiesValueValid = this.activities.length > 1
    const isMainActivityValueValid = !!this.mainActivity.length

    this.isNotEnoughActivities = !isActivitiesValueValid
    this.isMainActivitySelected = isMainActivityValueValid

    if (
      !this.isNameValid ||
      !this.isEmailValid ||
      !this.isCheckboxClick ||
      !isActivitiesValueValid ||
      !this.isMainActivitySelected ||
      !this.isDateValid
    )
      return
    alert(
      `Submit name:${this.nameValue}, email:${this.emailValue}, date ${this.dateValue} item value ${
        this.item
      }, activities: [${this.activities
        .map(activity => this.activityOptions.find(i => i.id === activity.id)!.label)
        .join(', ')}], mainActivity: ${this.activityOptions.find(i => i.id === this.mainActivity[0].number)!.label}`,
    )
  }

  public handleCheckboxClick = () => {
    this.isCheckboxClick = !this.isCheckboxClick
  }

  public handleResetClick = () => {
    this.nameValue = ''
    this.emailValue = ''
    this.item = undefined
    this.items = []
    this.dateValue = ''
    this.activities = []
    this.mainActivity = []
  }

  public transformedOptions = this.activityOptions.map(({ id, label, disabled }) => ({
    disabled,
    number: id,
    name: label,
  }))

  public getLabelConfig = (text: string) => ({
    text,
  })

  public handleSelectedActivity = (selectedActivity: AutocompleteDefaultOption) => {
    this.activities = this.activities.filter(val => val !== selectedActivity)
  }

  public handleFindNumberLabel = (selectedActivity: AutocompleteDefaultOption) =>
    this.transformedOptions.find(option => option.number === selectedActivity.number)!.name

  public handleFindIDLabel = (selectedActivity: AutocompleteDefaultOption) =>
    this.activityOptions.find(option => option.id === selectedActivity.id)!.label

  public getOptionID = (option: any) => option.number
  public getOptionLabel = (option: any) => option.label
}
