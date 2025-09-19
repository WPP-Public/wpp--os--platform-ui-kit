<script setup lang="ts">
import {
  WppInput,
  WppButton,
  WppCheckbox,
  WppAutocomplete,
  WppSelect,
  WppDatepicker,
  WppListItem,
  WppPill,
} from '@platform-ui-kit/components-library-vue'
import { ref } from 'vue'

import type { AutocompleteDefaultOption, DatePickerEventDetail } from '@platform-ui-kit/components-library'

const nameRegValidation = /^[A-Za-z\s]+$/
const emailRegValidation = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i
const ageRegValidation = /^[0-9]+$/

interface ActivityOption {
  id: number
  label: string
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

const nameValue = ref('')
const emailValue = ref('')
const ageValue = ref<string>()
const dateValue = ref('')
const isDateValid = ref<boolean | null>(null)
const item = ref<string | null | undefined>(undefined)
const items = ref<any[] | undefined>([])
const activities = ref<AutocompleteDefaultOption[]>([])
const mainActivity = ref<AutocompleteDefaultOption[]>([])
const isNameValid = ref<boolean | null>(null)
const isEmailValid = ref<boolean | null>(null)
const isAgeValid = ref<boolean | null>(null)
const isCheckboxClick = ref(false)
const isClickButton = ref(false)
const isChosenItem = ref<boolean | null>(null)
const isMainActivitySelected = ref<boolean | null>(null)
const isNotEnoughActivities = ref<boolean | null>(null)
const isNotEnoughSelectItems = ref<boolean | null>(null)

const validationInput = ({
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

  if (!regValidation.test(value) && (isClickButton || isClickFromButton)) return setInputStatusFunc(false)

  return setInputStatusFunc(true)
}

const handleValidationName = (event: CustomEvent) => {
  const { value } = event.detail

  nameValue.value = value
  validationInput({
    value,
    regValidation: nameRegValidation,
    setInputStatusFunc: isNameValid.value,
  })
}

const handleValidationEmail = (event: CustomEvent) => {
  const { value } = event.detail

  emailValue.value = value
  validationInput({
    value,
    regValidation: emailRegValidation,
    setInputStatusFunc: isEmailValid.value,
  })
}

const handleValidationAge = (event: CustomEvent) => {
  const { value } = event.detail

  ageValue.value = value
  validationInput({
    value,
    regValidation: ageRegValidation,
    setInputStatusFunc: isAgeValid.value,
  })
}

const handleValidateDate = (event: CustomEvent<DatePickerEventDetail>) => {
  const date = event.detail.date

  if (!Array.isArray(date)) {
    const currentYear = new Date().getFullYear()

    dateValue.value = date.toDateString()
    isDateValid.value = currentYear - date.getDate() >= 18 ? true : false
  }
}

const handleSelectInput = (event: CustomEvent) => {
  item.value = event.detail.value
  isChosenItem.value = true
}

const handleSelectMultipleInput = (event: CustomEvent) => {
  if (Array.isArray(event.detail.value)) {
    items.value = event.detail.value
    isNotEnoughSelectItems.value = event.detail.value.length >= 2
  }
}

const handleSelectActivities = (event: CustomEvent<any>) => {
  if (Array.isArray(event.detail.value)) {
    activities.value = event.detail.value
    isNotEnoughActivities.value = event.detail.value.length < 2
  }
}

const handleSelectMainActivity = (event: CustomEvent<any>) => {
  if (Array.isArray(event.detail.value)) {
    mainActivity.value = event.detail.value
    isMainActivitySelected.value = !!event.detail.value.length
  }
}

const submitForm = (event: any) => {
  event.preventDefault()

  isClickButton.value = true

  if (item.value === '' || item.value === undefined) isChosenItem.value = false
  if (!isDateValid.value) isDateValid.value = false

  validationInput({
    value: nameValue.value,
    regValidation: nameRegValidation,
    isClickFromButton: true,
    setInputStatusFunc: isNameValid.value,
  })
  validationInput({
    value: emailValue.value,
    regValidation: emailRegValidation,
    isClickFromButton: true,
    setInputStatusFunc: isEmailValid.value,
  })

  const isActivitiesValueValid = activities.value.length > 1
  const isMainActivityValueValid = !!mainActivity.value.length

  isNotEnoughActivities.value = !isActivitiesValueValid
  isMainActivitySelected.value = isMainActivityValueValid

  if (
    !isNameValid ||
    !isEmailValid ||
    !isCheckboxClick ||
    !isActivitiesValueValid ||
    !isMainActivitySelected ||
    !isDateValid
  )
    return
  alert(
    `Submit name:${nameValue}, email:${emailValue}, date ${dateValue} item value ${item}, activities: [${activities.value
      .map(activity => activityOptions.find(i => i.id === activity.id)!.label)
      .join(', ')}], mainActivity: ${activityOptions.find(i => i.id === mainActivity.value[0].number)!.label}`,
  )
}

const handleCheckboxClick = () => {
  isCheckboxClick.value = !isCheckboxClick
}

const handleResetClick = () => {
  nameValue.value = ''
  emailValue.value = ''
  item.value = undefined
  items.value = []
  dateValue.value = ''
  activities.value = []
  mainActivity.value = []
}

const transformedOptions = activityOptions.map(({ id, label, disabled }) => ({
  disabled,
  number: id,
  name: label,
}))

export class FormVanillaJs {}
</script>

<template>
  <form class="form" @submit="submitForm" data-testid="vanilla-form">
    <WppInput
      @wppChange="handleValidationName"
      :message="isNameValid === false ? 'Name error' : undefined"
      :messageType="isNameValid === false ? 'error' : undefined"
      placeholder="Name"
      :labelConfig="{ text: 'Your name' }"
      :value="nameValue"
    />
    <WppInput
      @wppChange="handleValidationEmail"
      :message="isEmailValid === false ? 'Email error' : undefined"
      :messageType="isEmailValid === false ? 'error' : undefined"
      placeholder="Email"
      :labelConfig="{ text: 'Your email' }"
      :value="emailValue"
      class="topMargin"
    />
    <WppInput
      type="number"
      :message="isAgeValid === false ? 'Age error' : undefined"
      :messageType="isAgeValid === false ? 'error' : undefined"
      placeholder="Age"
      :labelConfig="{ text: 'Your age' }"
      :value="ageValue"
      class="topMargin"
      @wppChange="handleValidationAge"
    />
    <WppDatepicker
      name="datepicker"
      :labelConfig="{ text: 'Birthday' }"
      required
      @wppChange="handleValidateDate"
      :message="isDateValid === false ? 'Should be more than 18 years old' : undefined"
      class="topMargin"
    />
    <div class="topMargin">
      <label for="select" class="label">Select item</label>
      <WppSelect
        placeholder="Choose item"
        :message="isChosenItem === false ? 'Choose item' : undefined"
        :messageType="isChosenItem === false ? 'error' : undefined"
        @wppChange="handleSelectInput"
        id="select"
        :value="item"
        data-testid="item-select-vanilla"
        :list="[
          {
            value: 1,
            label: 'Car',
          },
          {
            value: 2,
            label: 'House',
          },
          {
            value: 3,
            label: 'Bus',
          },
          {
            value: 4,
            label: 'Train',
          },
        ]"
      >
      </WppSelect>
    </div>
    <div class="topMargin">
      <label for="select-multiple" class="label">Select items</label>
      <WppSelect
        placeholder="Choose items"
        :message="isNotEnoughSelectItems === false ? 'Select at least 2 items' : undefined"
        :messageType="isNotEnoughSelectItems === false ? 'error' : undefined"
        @wppChange="handleSelectMultipleInput"
        id="select-multiple"
        type="multiple"
        :value="items"
        data-testid="items-select-vanilla"
        :list="[
          {
            value: '',
            label: 'None',
          },
          {
            value: 1,
            label: 'Item 1',
          },
          {
            value: 2,
            label: 'Item 2',
          },
          {
            value: 3,
            label: 'Item 3',
          },
          {
            value: 4,
            label: 'Item 4',
          },
          {
            value: 5,
            label: 'Item 5',
          },
        ]"
      >
      </WppSelect>
    </div>
    <WppAutocomplete
      class="topMargin"
      name="activities"
      :labelConfig="{ text: 'Preferred Activities' }"
      placeholder="Select activities"
      :message="isNotEnoughActivities ? 'Select at least 2 activities' : undefined"
      :messageType="isNotEnoughActivities ? 'error' : undefined"
      :value="activities"
      @wppChange="handleSelectActivities"
      data-testid="activities-select-vanilla"
      multiple
      v-for="item in activityOptions"
    >
      <WppListItem :key="item.id" :disabled="!!item.disabled" :value="item" :label="item.label">
        <p slot="label">{{ item.label }}</p>
      </WppListItem>
      <div slot="selected-values" v-for="selectedActivity in activities">
        <WppPill
          :key="selectedActivity.id"
          :label="activityOptions.find(option => option.id === selectedActivity.id)!.label"
          removable
          :value="selectedActivity.label"
          @wppClose="() => (activities.value = activities.filter(val => val !== selectedActivity))"
          type="display"
        ></WppPill>
      </div>
    </WppAutocomplete>
    <WppAutocomplete
      class="topMargin"
      name="mainActivity"
      :labelConfig="{ text: 'Main activity' }"
      placeholder="Select main activity"
      :message="isMainActivitySelected === false ? 'Select main activity' : undefined"
      :messageType="isMainActivitySelected === false ? 'error' : undefined"
      :value="mainActivity"
      @wppChange="handleSelectMainActivity"
      data-testid="main-activity-select-vanilla"
      :getOptionId="option => option.number"
      :getOptionLabel="option => option.name"
      v-for="item in transformedOptions"
    >
      <WppListItem :key="item.number" :disabled="!!item.disabled" :value="item" :label="item.name">
        <p slot="label">{{ item.name }}</p>
      </WppListItem>
      <div slot="selected-values" v-for="selectedActivity in mainActivity">
        <WppPill
          :key="selectedActivity.number"
          :label="transformedOptions.find(option => option.number === selectedActivity.number)!.name"
          removable
          :value="selectedActivity.number"
          @wppClose="() => (mainActivity.value = mainActivity.filter(val => val !== selectedActivity))"
          type="display"
        ></WppPill>
      </div>
    </WppAutocomplete>
    <WppCheckbox
      @click="handleCheckboxClick"
      :checked="isCheckboxClick"
      class="topMargin"
      :labelConfig="{ text: 'Do you agree to submit form' }"
    />
    <div>
      <WppButton variant="secondary" class="button" @click="handleResetClick" data-testid="reset-vanilla">
        Reset form
      </WppButton>
      <WppButton class="button" type="submit">Submit form</WppButton>
    </div>
  </form>
</template>
