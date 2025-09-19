```html
<wpp-tooltip text='Message'>
  <span>Anchor</span>
</wpp-tooltip>

<wpp-tooltip placement='left' header='Title' text='Message' value='42'>
  <wpp-button>Apply</wpp-button>
</wpp-tooltip>

<wpp-tooltip is-error placement='bottom' text='Should be a valid email'>
  <wpp-input [labelConfig]="labelConfig" [(ngModel)]='value'></wpp-input>
</wpp-tooltip>
```
