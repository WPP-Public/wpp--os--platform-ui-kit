```html
<wpp-segmented-control [value]='activeItem' variant='icon'>
  <wpp-segmented-control-item variant='icon' value='item-1'>
    <wpp-icon-home></wpp-icon-home>
  </wpp-segmented-control-item>
  <wpp-segmented-control-item variant='icon' value='item-2'>
    <wpp-icon-board></wpp-icon-board>
  </wpp-segmented-control-item>
</wpp-segmented-control>

<wpp-segmented-control [value]='activeItem' hugContentOff width='300px' size='s'>
  <wpp-segmented-control-item value='item-1'>Item 1</wpp-segmented-control-item>
  <wpp-segmented-control-item value='item-2'>Item 2</wpp-segmented-control-item>
</wpp-segmented-control>

<wpp-segmented-control [value]='activeItem' formControlName="segment">
  <wpp-segmented-control-item value='item-1'>Item 1</wpp-segmented-control-item>
  <wpp-segmented-control-item value='item-2' [disabled]='disabled'>Item 2</wpp-segmented-control-item>
</wpp-segmented-control>

<wpp-segmented-control [value]='activeItem' [(ngModel)]='segment'>
  <wpp-segmented-control-item value='item-1'>Item 1</wpp-segmented-control-item>
  <wpp-segmented-control-item value='item-2' [counter]='counter'>Item 2</wpp-segmented-control-item>
</wpp-segmented-control>
```
