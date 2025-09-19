```html
<wpp-action-button>Primary</wpp-action-button>
<wpp-action-button variant='secondary'>Secondary</wpp-action-button>
<wpp-action-button variant='destructive'>Destructive</wpp-action-button>
<wpp-action-button>
  <wpp-icon-plus slot='icon-start'></wpp-icon-plus>
  Left Icon
</wpp-action-button>
<wpp-action-button>
  Right Icon
  <wpp-icon-plus slot='icon-end'></wpp-icon-plus>
</wpp-action-button>

<wpp-action-button
  [disabled]='disabled'
  [loading]='loading'
>Button</wpp-action-button>

<form [formGroup]="form" (ngSubmit)="submit()">
  <wpp-action-button type="submit">Submit</wpp-action-button>
</form>
```
