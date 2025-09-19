```html
<wpp-radio
  [disabled]='disabled'
  value="value"
  [checked]='checked'
  [labelConfig]='labelConfig'
  name='options'
  (wppChange)="handleChange($event)"
/>

<wpp-radio [labelConfig]='labelConfig' [(ngModel)]='checked'></wpp-radio>

<form [formGroup]="form" (ngSubmit)="submit()">
  <wpp-radio formControlName="options" [labelConfig]='labelConfig' name='options'></wpp-radio>
</form>
```
