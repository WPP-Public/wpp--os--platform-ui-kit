```html
<wpp-checkbox></wpp-checkbox>

<wpp-checkbox
  [disabled]='disabled'
  [checked]='checked'
  [indeterminate]='indeterminate'
  [labelConfig]='labelConfig'
  name='options'
  (wppChange)="handleChange($event)"
></wpp-checkbox>

<wpp-checkbox [labelConfig]='labelConfig' [(ngModel)]='checked'></wpp-checkbox>

<form [formGroup]="form" (ngSubmit)="submit()">
  <wpp-checkbox formControlName="options" [labelConfig]='labelConfig' name='options'></wpp-checkbox>
</form>
```
