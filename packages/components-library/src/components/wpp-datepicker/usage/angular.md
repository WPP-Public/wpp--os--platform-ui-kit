#### datepicker-example.page.html
```html
<div class="container" data-testid="datepickers">
  <div class="datepicker">
    <wpp-typography type="xl-heading" class="text">Default Single select</wpp-typography>
    <wpp-datepicker (wppBlur)="handleBlur($event)" (wppFocus)="handleFocus($event)"></wpp-datepicker>

    <wpp-typography type="xl-heading" class="text">Single select with S size</wpp-typography>
    <wpp-datepicker size="s"></wpp-datepicker>

    <wpp-typography type="xl-heading" class="text">Default Range select</wpp-typography>
    <wpp-datepicker range></wpp-datepicker>

    <wpp-typography type="xl-heading" class="text">Range select with S size</wpp-typography>
    <wpp-datepicker size="s" range></wpp-datepicker>

    <wpp-typography type="xl-heading" class="text">With Placeholder</wpp-typography>
    <wpp-datepicker placeholder="Enter the date"></wpp-datepicker>

    <wpp-typography type="xl-heading" class="text">Single select initial date</wpp-typography>
    <wpp-datepicker value="12/12/2022"></wpp-datepicker>

    <wpp-typography type="xl-heading" class="text">Range select initial date</wpp-typography>
    <wpp-datepicker range [value]='initialValue'></wpp-datepicker>

    <wpp-typography type="xl-heading" class="text">Range select input test</wpp-typography>
    <wpp-datepicker range data-testid="datepicker"></wpp-datepicker>
  </div>
  <div class="datepicker">
    <wpp-typography type="xl-heading" class="text">Spanish locale</wpp-typography>
    <wpp-datepicker static value="08/02/2022" [locale]='locale'></wpp-datepicker>

    <wpp-typography type="xl-heading" class="text">Min and max - [07/04 - 07/20]</wpp-typography>
    <wpp-datepicker min-date="07/04/2022" max-date="07/20/2022" static></wpp-datepicker>

    <wpp-typography type="xl-heading" class="text">max date - 07/04/2022</wpp-typography>
    <wpp-datepicker max-date="07/04/2022" static></wpp-datepicker>

    <wpp-typography type="xl-heading" class="text">Min date - 07/20/2042</wpp-typography>
    <wpp-datepicker min-date="07/20/2042" static></wpp-datepicker>
  </div>
  <div class="datepicker">
    <wpp-typography type="xl-heading" class="text">With error message</wpp-typography>
    <wpp-datepicker message-type="error" message="Error message"></wpp-datepicker>

    <wpp-typography type="xl-heading" class="text">With error message (truncated)</wpp-typography>
    <wpp-datepicker message-type="error" message="Error message" max-message-length="12"></wpp-datepicker>

    <wpp-typography type="xl-heading" class="text">With warning message</wpp-typography>
    <wpp-datepicker message-type="warning" message="Warning message"></wpp-datepicker>

    <wpp-typography type="xl-heading" class="text">With warning message (truncated)</wpp-typography>
    <wpp-datepicker message-type="warning" message="Warning message" max-message-length="12"></wpp-datepicker>

    <wpp-typography type="xl-heading" class="text">W/o messageType</wpp-typography>
    <wpp-datepicker message="Info message"></wpp-datepicker>

    <wpp-typography type="xl-heading" class="text">W/o messageType (truncated)</wpp-typography>
    <wpp-datepicker message="Information message" [maxMessageLength]="12"></wpp-datepicker>

    <wpp-typography type="xl-heading" class="text">Modified Date Format only</wpp-typography>
    <wpp-datepicker
      placeholder="dd/MM/yyyy"
      value="20/08/2021"
      [locale]='modifiedDataFormat'
    ></wpp-datepicker>

    <wpp-typography type="xl-heading" class="text">With info icon</wpp-typography>
    <wpp-datepicker
      value="12/12/2022"
      [labelConfig]='labelConfig'
    ></wpp-datepicker>

    <wpp-typography type="xl-heading" class="text">Disabled</wpp-typography>
    <wpp-datepicker value="12/12/2022" disabled required></wpp-datepicker>
  </div>
</div>
```

#### datepicker-example.page.ts
```tsx
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-datepicker-example',
  templateUrl: './datepicker-example.page.html',
  styleUrls: ['./datepicker-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerExamplePage {
  public handleBlur = (event: any) => {
    console.log('event_blur :>> ', event)
  }

  public handleFocus = (event: any) => {
    console.log('event_focus :>> ', event)
  }

  public locale = {
    days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    daysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    daysMin: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    months: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    monthsShort: ['Enero', 'Feb', 'Marzo', 'Abr', 'Mayo', 'Jun', 'Jul', 'Agosto', 'Sept', 'Oct', 'Nov', 'Dic'],
    today: 'Hoy',
    clear: 'Limpiar',
    dateFormat: 'dd/MM/yyyy',
    timeFormat: 'hh:mm aa',
    firstDay: 1,
    dateLocale: 'en-US',
  }

  public initialValue = ['07/12/2011', '07/21/2011']

  public labelConfig = {
    icon: 'wpp-icon-info',
    text: 'Datepicker',
    description: 'Description',
    locales: {
      optional: 'Optionale',
    },
  }

  public modifiedDataFormat = {
    dateFormat: 'dd/MM/yyyy',
  }
}
```
