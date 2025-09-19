import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DatePickerClearEventDetail } from '@platform-ui-kit/components-library'

@Component({
  selector: 'app-datepickers',
  templateUrl: './datepickerVC.html',
  styleUrls: ['./datepickerVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerVC {
  public datepickerTodayDate: null | string = null
  public datepickerValue = true
  public spanishLocale = {
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
  }
  public newFormat = {
    dateFormat: 'dd/MM/yyyy',
  }
  public localeWithDay = {
    dateFormat: 'EEEE dd MMMM yyyy',
  }

  public labelConfig = {
    icon: 'wpp-icon-info',
    text: 'Datepicker',
    description: 'Description',
    locales: {
      optional: 'Optionale',
    },
  }

  public handleChange = (ev: Event) => {
    this.datepickerValue = (ev as CustomEvent).detail.checked
  }

  public getFormattedDateInfo = (date: Date) => [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/')

  public handleTodayChange = (ev: Event) => {
    const date = new Date((ev as CustomEvent).detail.date)

    this.datepickerTodayDate = this.getFormattedDateInfo(date)
  }

  public handleButtonDateClick = async () => {
    const currDate = new Date()

    this.datepickerTodayDate = this.getFormattedDateInfo(currDate)
  }

  public handleBlur = (event: Event) => {
    console.log('event_blur :>> ', event as CustomEvent<FocusEvent>)
  }

  public handleFocus = (event: Event) => {
    console.log('event_focus :>> ', event as CustomEvent<FocusEvent>)
  }

  public handleClearAll = (event: Event) => {
    console.log('event_clear_all :>>', event as CustomEvent<DatePickerClearEventDetail>)
  }
}
