```ts
@Component({
  ...
})
export class CardGroupExample {
  public multipleValue: CardValue[] = ['item-a', 'item-b']
  public singleValue: CardValue = 'item-c'
  public withRadioOrCheckbox: boolean = false

  public handleMultipleCardGroupChange(event: Event): void {
    console.log('event.detail => ', (event as CustomEvent<CardGroupChangeEventDetail>).detail.value)
  }

  public handleSingleCardGroupChange(event: Event): void {
    console.log('event.detail => ', (event as CustomEvent<CardGroupChangeEventDetail>).detail.value)
  }
}
```

```html
<wpp-card-group multiple [value]="multipleValue" (wppChange)="handleMultipleCardGroupChange($event)">
  <wpp-card value="item-a">
    <div>
      Information about item a
    </div>
    <wpp-typography slot="header">Item A</wpp-typography>
  </wpp-card>
  <wpp-card value="item-b">
    <div>
      Information about item b
    </div>
    <wpp-typography slot="header">Item B</wpp-typography>
  </wpp-card>
  <wpp-card value="item-c">
    <div>
      Information about item c
    </div>
    <wpp-typography slot="header">Item C</wpp-typography>
  </wpp-card>
</wpp-card-group>

<wpp-card-group [value]="singleValue" [withRadioOrCheckbox]="withRadioOrCheckbox" (wppChange)="handleSingleCardGroupChange($event)">
  <wpp-card value="item-a">
    <wpp-typography slot="header">Item A</wpp-typography>
  </wpp-card>
  <wpp-card value="item-b">
    <wpp-typography slot="header">Item B</wpp-typography>
  </wpp-card>
  <wpp-card value="item-c">
    <wpp-typography slot="header">Item C</wpp-typography>
  </wpp-card>
</wpp-card-group>
```
