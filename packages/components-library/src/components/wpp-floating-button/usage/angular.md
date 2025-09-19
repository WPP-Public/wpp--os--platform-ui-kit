```html
<wpp-floating-button></wpp-floating-button>
<wpp-floating-button>
  <wpp-icon-arrow></wpp-icon-arrow>
</wpp-floating-button>
<wpp-floating-button
  [disabled]='disabled'
  [loading]='loading'
>Button</wpp-floating-button>

<a href='https://savelife.in.ua/en/donate'>
  <wpp-floating-button></wpp-floating-button>
</a>

<form [formGroup]="form" (ngSubmit)="submit()">
  <wpp-floating-button type="submit"></wpp-floating-button>
</form>
```
