```tsx
import { ActionButtonData } from '@wppopen/components-library';
import { WppFloatingToolbar } from '@wppopen/components-library-react';

export const FloatingToolbarExample = () => {
  const actionButtonsConfig: ActionButtonData[] = [{
    icon: 'add', onClick: () => console.log('Add button clicked')
  }, {
    icon: 'edit',
  },]

  return (
    <>
      <WppFloatingToolbar actionButtonsConfig={actionButtonsConfig} />
    </>
  )
}
```
