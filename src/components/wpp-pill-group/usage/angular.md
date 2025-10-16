```ts
@Component({
  ...
})
export class PillGroupExample {
  public multipleValue: PillValue[] = ['item-a', 'item-b']
  public singleValue: PillValue = 'item-c'

  public handlePillGroupChange(event: Event): void {
    console.log('event.detail => ', (event as CustomEvent<PillGroupChangeEvent>).detail.value)
  }

  public handlePillClose = () => {
    console.log('onWppClose')
  }

  public handlePillDragPress = (event: CustomEvent<MouseEvent>) => {
    console.log('event.detail =>', event.detail)
  }
}
```

```html
<wpp-pill-group type="multiple" [value]="multipleValue" (wppChange)="handlePillGroupChange($event)">
  <wpp-pill label="Item A" value="item-a"></wpp-pill>
  <wpp-pill label="Item B" value="item-b"></wpp-pill>
  <wpp-pill label="Item C" value="item-c"></wpp-pill>
</wpp-pill-group>

<wpp-pill-group type="single" [value]="singleValue" (wppChange)="handlePillGroupChange($event)">
  <wpp-pill label="Item A" value="item-a"></wpp-pill>
  <wpp-pill label="Item B" value="item-b"></wpp-pill>
  <wpp-pill label="Item C" value="item-c"></wpp-pill>
</wpp-pill-group>

<wpp-pill-group type="display" [value]="singleValue" (wppChange)="handlePillGroupChange($event)">
  <wpp-pill label="Item A" value="item-a" removable="true" (onWppClose)="handlePillClose"></wpp-pill>
  <wpp-pill label="Item B" value="item-b" removable="false"></wpp-pill>
</wpp-pill-group>

<wpp-pill-group type="draggable" [value]="singleValue" (wppChange)="handlePillGroupChange($event)">
  <wpp-pill label="Item A" value="item-a" removable="true" (onWppClose)="handlePillClose"></wpp-pill>
  <wpp-pill label="Item B" value="item-b" removable="true" (onWppDragPress)="handlePillDragPress"></wpp-pill>
</wpp-pill-group>
```
