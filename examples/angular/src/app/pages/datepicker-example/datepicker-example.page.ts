import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-datepicker-example',
  templateUrl: './datepicker-example.page.html',
  styleUrls: ['./datepicker-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerExamplePage {
  public handleBlur = (event: Event) => {
    console.log('event_blur :>> ', event as CustomEvent<FocusEvent>)
  }

  public handleFocus = (event: Event) => {
    console.log('event_focus :>> ', event as CustomEvent<FocusEvent>)
  }

  public generatePreset = (days: number) => {
    const today = new Date()
    const endDate = today.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })

    const startDate = new Date(today)

    startDate.setDate(startDate.getDate() - days + 1)

    const formattedStartDate = startDate.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })

    return {
      label: `Last ${days} Days`,
      value: [formattedStartDate, endDate],
    }
  }

  public singleValue = '07/07/2023'
  public rangeValue = ['07/07/2023', '07/09/2023']
  public rangeValuePresets = this.generatePreset(3).value
  public presets = [this.generatePreset(7), this.generatePreset(14), this.generatePreset(30), this.generatePreset(90)]

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
  }

  public initialValue = ['19/02/2023', '21/02/2023']
  public initialValueNewFormat = ['04/11/2023', '04/30/2023']

  public labelConfig = {
    icon: 'wpp-icon-info',
    text: 'Datepicker',
    description: 'Description',
    locales: {
      optional: 'Optionale',
    },
  }

  public modifiedDataFormat = {
    dateFormat: 'MM/dd/yyyy',
    firstDay: 1,
  }

  public customLocalePrimary = {
    dateFormat: 'EEEE dd MMM, yyyy',
  }

  public customLocaleSecondary = {
    dateFormat: 'dd MMM yyyy',
  }

  public customLocaleTernary = {
    dateFormat: 'MMMM dd EEEE, yyyy',
  }

  public customDateFormat = {
    dateFormat: 'dd/MM/yy',
  }
}
