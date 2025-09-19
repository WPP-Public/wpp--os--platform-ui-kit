import { FC, useCallback } from 'react'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import {
  WppAutocomplete,
  WppButton,
  WppRadio,
  WppRadioGroup,
  WppSelect,
  WppInput,
  WppToggle,
  WppFileUpload,
  WppListItem,
  WppPill,
  WppRichtext,
} from '@platform-ui-kit/components-library-react'
import {
  AutocompleteChangeEventDetail,
  AutocompleteDefaultOption,
  FileItemType,
  FileUploadEventDetail,
  AutocompleteOption,
} from '@platform-ui-kit/components-library'

import styles from '../../FormControls.module.scss'

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

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Email is not valid').required('Email is required'),
  content: Yup.string().required('Content is required'),
  age: Yup.number().nullable(),
  itemValue: Yup.number().nullable(),
  itemValues: Yup.array().min(2, 'Select at least 2 items'),
  activities: Yup.array().min(2, 'Select at least 2 activities'),
  mainActivity: Yup.array().min(1, 'Select main activity'),
  isToggleOn: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
  isChecked: Yup.boolean().oneOf([true], 'Must Confirm 18 years'),
})

export const FormFormik: FC = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      content: '',
      age: undefined,
      isToggleOn: false,
      isChecked: false,
      itemValue: undefined,
      itemValues: [],
      activities: [] as AutocompleteDefaultOption[],
      mainActivity: [] as AutocompleteDefaultOption[],
      date: '',
      avatars: [] as FileItemType[],
    },
    validationSchema,
    onSubmit: values => {
      alert(
        `
        Submit name: ${values.name},
        email: ${values.email},
        content: ${values.content},
        age: ${values.age},
        item value: ${values.itemValue},
        activities: [${values.activities
          .map(activity => activityOptions.find(i => i.id === activity.id)!.label)
          .join(', ')}],
        mainActivity: ${activityOptions.find(i => i.id === values?.mainActivity[0].number)!.label},
        avatars images: [${values.avatars.map(avatar => avatar.name).join(', ')}]`,
      )
    },
  })

  const handleToggleClick = () => {
    const currentToggleValue = formik.values.isToggleOn

    formik.setFieldValue('isToggleOn', !currentToggleValue)
  }

  const handleRadioChange = () => {
    const currentToggleValue = formik.values.isChecked

    formik.setFieldValue('isChecked', !currentToggleValue)
  }

  const handleMultipleItemChange = useCallback(
    (event: CustomEvent) => {
      formik.setFieldValue('itemValues', event.detail.value)
    },
    [formik.setFieldValue],
  )
  const handleItemChange = (event: CustomEvent) => {
    formik.setFieldValue('itemValue', event.detail.value)
  }

  const handleMainActivityChange = (event: CustomEvent<AutocompleteChangeEventDetail>) => {
    formik.setFieldValue('mainActivity', event.detail.value)
  }

  const handleResetClick = () => {
    formik.resetForm()
  }

  const transformedOptions = activityOptions.map(({ id, label, disabled }) => ({
    disabled,
    number: id,
    name: label,
  }))

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit} data-testid="formik-form">
      <WppInput
        id="name"
        name="name"
        labelConfig={{ text: 'Name' }}
        placeholder="Name"
        value={formik.values.name}
        onWppChange={formik.handleChange}
        message={formik.touched.name && Boolean(formik.errors.name) ? formik.errors.name : ''}
        messageType={formik.touched.name && Boolean(formik.errors.name) ? 'error' : undefined}
        required
      />

      <WppInput
        className={styles.topMargin}
        id="email"
        name="email"
        labelConfig={{ text: 'Email' }}
        placeholder="Email"
        value={formik.values.email}
        onWppChange={formik.handleChange}
        message={formik.touched.email && Boolean(formik.errors.email) ? formik.errors.email : ''}
        messageType={formik.touched.email && Boolean(formik.errors.email) ? 'error' : undefined}
        required
      />

      <WppRichtext
        className={styles.topMargin}
        id="content"
        name="content"
        placeholder="Type content here..."
        labelConfig={{ text: 'Content' }}
        value={formik.values.content}
        onWppChange={formik.handleChange}
        message={formik.touched.content && Boolean(formik.errors.content) ? formik.errors.content : ''}
        messageType={formik.touched.content && Boolean(formik.errors.content) ? 'error' : undefined}
        charactersLimit={200}
        warningThreshold={180}
        required
      />

      <WppInput
        className={styles.topMargin}
        id="age"
        name="age"
        labelConfig={{ text: 'Age' }}
        placeholder="Age"
        type="number"
        value={formik.values.age}
        message={formik.touched.age && Boolean(formik.errors.age) ? formik.errors.age : ''}
        messageType={formik.touched.age && Boolean(formik.errors.age) ? 'error' : undefined}
        required
        onWppChange={formik.handleChange}
      />

      <WppSelect
        id="select"
        className={styles.topMargin}
        labelConfig={{ text: 'Select Item' }}
        placeholder="Choose item"
        message={formik.touched.itemValue && Boolean(formik.errors.itemValue) ? formik.errors.itemValue : ''}
        messageType={formik.touched.itemValue && Boolean(formik.errors.itemValue) ? 'error' : undefined}
        required
        onWppChange={handleItemChange}
        value={formik.values.itemValue}
        data-testid="item-select-formik"
        list={[
          {
            value: undefined,
            label: 'None',
          },
          { value: 1, label: 'Car' },
          { value: 2, label: 'House' },
          { value: 3, label: 'Apartment' },
        ]}
      ></WppSelect>

      <WppSelect
        id="select"
        className={styles.topMargin}
        type="multiple"
        value={formik.values.itemValues}
        placeholder="Choose items"
        required
        labelConfig={{ text: 'Select Items' }}
        message={
          formik.touched.itemValues && Boolean(formik.errors.itemValues)
            ? typeof formik.errors.itemValues === 'string'
              ? formik.errors.itemValues
              : 'Incorrect value'
            : ''
        }
        messageType={formik.touched.itemValues && Boolean(formik.errors.itemValues) ? 'error' : undefined}
        onWppChange={handleMultipleItemChange}
        data-testid="items-select-formik"
        list={[
          { value: 1, label: 'Item 1' },
          { value: 2, label: 'Item 2' },
          { value: 3, label: 'Item 3' },
          { value: 4, label: 'Item 4' },
          { value: 5, label: 'Item 5' },
        ]}
      ></WppSelect>

      <WppAutocomplete
        className={styles.topMargin}
        name="activities"
        labelConfig={{ text: 'Preferred Activities' }}
        placeholder="Select activities"
        message={
          formik.touched.activities && Boolean(formik.errors.activities)
            ? typeof formik.errors.activities === 'string'
              ? formik.errors.activities
              : 'Incorrect value'
            : ''
        }
        messageType={formik.touched.activities && Boolean(formik.errors.activities) ? 'error' : undefined}
        value={formik.values.activities}
        onWppChange={formik.handleChange}
        data-testid="activities-select-formik"
        multiple
      >
        {activityOptions.map(item => (
          <WppListItem key={item.id} disabled={!!item.disabled} value={item} label={item.label}>
            <p slot="label">{item.label}</p>
          </WppListItem>
        ))}
        <div slot="selected-values">
          {formik.values.activities.map(selectedActivity => (
            <WppPill
              key={selectedActivity.id}
              label={selectedActivity.label}
              removable
              value={selectedActivity.id}
              onWppClose={() =>
                formik.setFieldValue(
                  'activities',
                  formik.values.activities.filter(val => val.id !== selectedActivity.id),
                )
              }
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
        value={formik.values.mainActivity}
        onWppChange={handleMainActivityChange}
        message={
          formik.touched.mainActivity && Boolean(formik.errors.mainActivity)
            ? typeof formik.errors.mainActivity === 'string'
              ? formik.errors.mainActivity
              : 'Incorrect value'
            : ''
        }
        messageType={formik.touched.mainActivity && Boolean(formik.errors.mainActivity) ? 'error' : undefined}
        data-testid="main-activity-select-formik"
        getOptionId={(option: AutocompleteOption) => option.number}
        getOptionLabel={(option: AutocompleteOption) => option.name}
      >
        {transformedOptions.map(item => (
          <WppListItem key={item.number} disabled={!!item.disabled} value={item} label={item.name}>
            <p slot="label">{item.name}</p>
          </WppListItem>
        ))}
        <div slot="selected-values">
          {formik.values.mainActivity.map(selectedActivity => (
            <WppPill
              key={selectedActivity.number}
              label={selectedActivity.name}
              removable
              value={selectedActivity.number}
              onWppClose={() =>
                formik.setFieldValue(
                  'mainActivity',
                  formik.values.mainActivity.filter(val => val.number !== selectedActivity.number),
                )
              }
              type="display"
            ></WppPill>
          ))}
        </div>
      </WppAutocomplete>

      <div className={styles.avatar}>
        <WppFileUpload
          name="avatars"
          value={formik.values.avatars}
          multiple={false}
          onWppChange={(event: CustomEvent<FileUploadEventDetail>) =>
            formik.setFieldValue(
              'avatars',
              event.detail.value?.map((item: any) => {
                item.disabled = true

                return item
              }),
            )
          }
        />
      </div>

      <WppToggle
        className={styles.topMargin}
        labelConfig={{ text: 'Do you agree to submit form' }}
        onWppChange={handleToggleClick}
        required
        checked={formik.values.isToggleOn}
      />
      <p className={styles.errorText}>{formik.errors.isToggleOn}</p>

      <div className={styles.topMargin}>
        <label htmlFor="select" className={styles.label}>
          Do you have 18 years ?
        </label>
        <WppRadioGroup
          className={styles.radioGroup}
          value={formik.values.isChecked ? 'true' : 'false'}
          onWppChange={handleRadioChange}
        >
          <WppRadio name="radio-btn" value="true" labelConfig={{ text: 'Yes' }} />
          <WppRadio name="radio-btn" value="false" labelConfig={{ text: 'No' }} />
        </WppRadioGroup>
      </div>
      <p className={styles.errorText}>{formik.errors.isChecked}</p>

      <div>
        <WppButton variant="secondary" className={styles.button} onClick={handleResetClick} data-testid="reset-formik">
          Reset form
        </WppButton>
        <WppButton className={styles.button} type="submit">
          Submit form
        </WppButton>
      </div>
    </form>
  )
}
