```html
<wpp-toggle
  [disabled]='disabled'
  value="value"
  [checked]='checked'
  [labelConfig]="labelConfig"
  name='options'
  (wppChange)="handleChange($event)"
/>

<wpp-toggle [labelConfig]="labelConfig" [(ngModel)]='checked'></wpp-toggle>

<form [formGroup]="form" (ngSubmit)="submit()">
  <wpp-toggle formControlName="options" [labelConfig]="labelConfig" name='options'></wpp-toggle>
</form>
```
