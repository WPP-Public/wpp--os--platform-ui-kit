```ts
@Component({
  ...
})
export class TabControlExample {
  public navigationData: INavigation[] = [
    {
      label: 'Learning',
      value: 'learning',
      children: [
        {
          label: 'Guided tour',
          value: 'guidedTour',
          link: '/learning/guided-tour',
        },
      ],
    },
    {
      label: 'Marketplace',
      value: 'marketplace',
      link: '/marketplace',
    },
  ]

  public initialValue: string = 'community'

  public handleTopbarItemChange(event: Event): void {
    this.initialValue = (event as CustomEvent).detail.value
    this.router.navigate(event.detail.link)
  }
}
```

```html
<wpp-topbar
  [navigation]='navigationData'
  [value]='initialValue'
  (wppChange)="handleTopbarItemChange($event)"
>
  <div slot="app" class="app">
    <img
      src="https://easydrawingguides.com/wp-content/uploads/2018/09/Impossible-Triangle-09.png"
      class="image"
    />
    <wpp-typography type="m-body-accent" tag="h3" class='app-name'>APP Name</wpp-typography>
  </div>
</wpp-topbar>
```
