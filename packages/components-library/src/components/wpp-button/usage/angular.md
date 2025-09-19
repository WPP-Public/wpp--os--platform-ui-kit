```html
<wpp-button>Primary</wpp-button>
<wpp-button variant='secondary'>Secondary</wpp-button>
<wpp-button variant='destructive'>Destructive</wpp-button>
<wpp-button variant='destructive-secondary'>Destructive secondary</wpp-button>
<wpp-button size='s'>Size s</wpp-button>
<wpp-button width='150px'>Width 150px</wpp-button>
<wpp-button>
  <wpp-icon-plus slot='icon-start'></wpp-icon-plus>
  Left Icon
</wpp-button>
<wpp-button>
  Right Icon
  <wpp-icon-chevron slot='icon-end'></wpp-icon-chevron>
</wpp-button>

<wpp-button inverted>Primary Inverted</wpp-button>
<wpp-button inverted variant='secondary'>Secondary Inverted</wpp-button>

<wpp-button
  [disabled]='disabled'
  [loading]='loading'
>Button</wpp-button>

<a href='https://savelife.in.ua/en/donate'>
  <wpp-button>Button</wpp-button>
</a>

<form [formGroup]="form" (ngSubmit)="submit()">
  <wpp-button type="submit">Submit</wpp-button>
</form>
```
