```ts
@Component({
  ...
})
export class FloatingToolbarExample {
  actionButtonsConfig: ActionButtonData[] = [
    {
      icon: 'add',
      onClick: () => console.log('Add button clicked')
    }, {
      icon: 'edit',
    },
  ]
```

```html
<wpp-floating-toolbar [actionButtonsConfig]="actionButtonsConfig" />
```
