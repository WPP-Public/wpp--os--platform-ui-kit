export const CONFIG_CASE_1 = (loading: boolean, disabled: boolean) => [
  {
    label: 'Submit',
    variant: 'primary',
    onClick: () => {
      console.log('Primary click')
    },
    type: 'submit',
    name: 'submit-primary-btn',
    loading,
    disabled,
    ariaProps: { label: 'submit btn' },
  },
]

export const CONFIG_CASE_2 = (loading: boolean, disabled: boolean, handleClose: () => void) => [
  {
    label: 'Close',
    variant: 'secondary',
    onClick: handleClose,
    name: 'close-secondary-btn',
    loading,
    disabled,
    ariaProps: { label: 'close btn' },
  },
  {
    label: 'Submit',
    variant: 'primary',
    onClick: () => {
      console.log('Primary click')
    },
    type: 'submit',
    name: 'submit-primary-btn',
    loading,
    disabled,
    ariaProps: { label: 'submit btn' },
  },
]

export const CONFIG_CASE_3 = (loading: boolean, disabled: boolean, handleClose: () => void) => [
  {
    label: 'Close',
    variant: 'secondary',
    onClick: handleClose,
    name: 'close-secondary-btn',
    loading,
    disabled,
    ariaProps: { label: 'close btn' },
  },
  {
    label: 'Submit',
    variant: 'primary',
    onClick: () => {
      console.log('Primary click')
    },
    type: 'submit',
    name: 'submit-primary-btn',
    loading,
    disabled,
    ariaProps: { label: 'submit btn' },
  },
  {
    label: 'Remove',
    variant: 'destructive',
    onClick: () => {
      console.log('Remove click')
    },
    icon: 'wpp-icon-remove-circle',
    name: 'remove-destructive-btn',
    loading,
    disabled,
    ariaProps: { label: 'remove btn' },
  },
]
