import { useRef, useState } from 'react'
import { WppButton, WppDatepicker } from '@platform-ui-kit/components-library-react'
import styles from './DatepickerVC.module.scss'
import { DatePickerClearEventDetail } from '@platform-ui-kit/components-library'

export const DatepickerVC = () => {
  const [minMaxDate, setMinMaxDate] = useState<[string, string]>(['04/07/2022', '20/07/2022'])

  const datepickerRef = useRef<null | HTMLWppDatepickerElement>(null)
  const datepickerRef2 = useRef<null | HTMLWppDatepickerElement>(null)
  const handleButtonDateClick = async () => {
    const datepickerInstance = await datepickerRef?.current?.getInstance()

    datepickerInstance?.selectDate(datepickerInstance?.viewDate)
  }

  const handleBlur = (event: CustomEvent<FocusEvent>) => {
    console.log('event_blur :>> ', event)
  }

  const handleFocus = (event: CustomEvent<FocusEvent>) => {
    console.log('event_focus :>> ', event)
  }

  const handleClearAll = (event: CustomEvent<DatePickerClearEventDetail>) => {
    console.log('event_clear_all :>>', event)
  }

  const handleFocusDatepicker = () => {
    if (datepickerRef2.current) {
      datepickerRef2.current.setFocus()
    }
  }

  const changeMinMaxDate = () => {
    setMinMaxDate(['15/07/2022', '29/07/2022'])
  }

  return (
    <div className={styles.container} data-testid="datepickers">
      <div className={styles.datepicker}>
        <h3 className={styles.text}>Default Single select</h3>
        <WppDatepicker name="datepicker-default" onWppBlur={handleBlur} onWppFocus={handleFocus} />

        <h3 className={styles.text}>Single select with S size</h3>
        <WppDatepicker name="datepicker-small" size="s" />

        <h3 className={styles.text}>Default Range select</h3>
        <WppDatepicker
          name="datepicker-range-default"
          range
          toggleSelected
          onWppDateClear={handleClearAll}
          data-testid="default-range-datepicker"
        />

        <h3 className={styles.text}>Range select with S size</h3>
        <WppDatepicker name="datepicker-range-small" size="s" range />

        <h3 className={styles.text}>With Placeholder</h3>
        <WppDatepicker name="datepicker-placeholder" placeholder="Enter the date" />

        <h3 className={styles.text}>Single select initial date</h3>
        <WppDatepicker name="datepicker-initial-single" value="12/12/2022" />

        <h3 className={styles.text}>Range select initial date</h3>
        <WppDatepicker name="datepicker-initial-range" range value={['07/12/2011', '07/21/2011']} />

        <h3 className={styles.text}>Range select input test</h3>
        <WppDatepicker name="datepicker-range-input" range data-testid="datepicker" />
      </div>
      {/* Usage of new dateLocale prop */}
      <div className={styles.datepicker}>
        <h3 className={styles.text}>Date Locale Example - en-US</h3>
        <WppDatepicker
          name="datepicker-locale-en"
          locale={{
            dateLocale: 'en-US',
            firstDay: 3,
            dateFormat: 'dd/MM/yyyy',
          }}
          value="15/10/2023"
        />

        <h3 className={styles.text}>Date Locale Example - ar-SA</h3>
        <WppDatepicker
          name="datepicker-locale-ar"
          locale={{
            dateLocale: 'ar-SA',
            dateFormat: 'dd/MM/yyyy',
          }}
          value="15/10/2023"
        />
      </div>
      <div className={styles.datepicker}>
        <h3 className={styles.text}>Spanish locale</h3>
        <WppDatepicker
          name="datepicker-spanish"
          locale={{
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
          }}
          range
          static
          value={['08/02/2022', '12/02/2022']}
        />
        <h3 className={styles.text}>Min and max - [04/07 - 20/07]</h3>
        <WppDatepicker
          name="datepicker-minmax"
          onWppDateClear={e => console.log('Cleared', e)}
          range
          onWppChange={e => console.log(e)}
          minDate={minMaxDate[0]}
          maxDate={minMaxDate[1]}
          static
        />
        <WppButton className={styles.button} onClick={changeMinMaxDate}>
          Update limits
        </WppButton>
        <h3 className={styles.text}>max date - 04/07/2022</h3>
        <WppDatepicker name="datepicker-max" maxDate="04/07/2022" static />
        <h3 className={styles.text}>Min date - 20/07/2042</h3>
        <WppDatepicker name="datepicker-min" minDate="20/07/2042" static />
      </div>
      <div className={styles.datepicker}>
        <h3 className={styles.text}>With error message</h3>
        <WppDatepicker name="datepicker-error" messageType="error" message="Error message" />
        <h3 className={styles.text}>With error message (truncated)</h3>
        <WppDatepicker
          name="datepicker-error-trunc"
          messageType="error"
          message="Error message"
          maxMessageLength={12}
        />
        <h3 className={styles.text}>With warning message</h3>
        <WppDatepicker name="datepicker-warning" messageType="warning" message="Warning message" />
        <h3 className={styles.text}>With warning message (truncated)</h3>
        <WppDatepicker
          name="datepicker-warning-trunc"
          messageType="warning"
          message="Warning message"
          maxMessageLength={12}
        />
        <h3 className={styles.text}>W/o messageType</h3>
        <WppDatepicker name="datepicker-info" message="Info message" />
        <h3 className={styles.text}>W/o messageType (truncated)</h3>
        <WppDatepicker name="datepicker-info-trunc" message="Information message" maxMessageLength={12} />
        <h3 className={styles.text}>Modified Date Format only</h3>
        <WppDatepicker
          name="datepicker-modified-format"
          placeholder="dd/MM/yyyy"
          value="20/08/2021"
          locale={{
            dateFormat: 'dd/MM/yyyy',
          }}
        />
        <h3 className={styles.text}>With button</h3>
        <WppDatepicker name="datepicker-with-button" ref={datepickerRef} />
        <WppButton className={styles.button} onClick={handleButtonDateClick}>
          Set current date
        </WppButton>
        <h3 className={styles.text}>With info icon</h3>
        <WppDatepicker
          name="datepicker-info-icon"
          value="12/12/2022"
          labelConfig={{
            icon: 'wpp-icon-info',
            text: 'Datepicker',
            description: 'Description',
            locales: {
              optional: 'Optionale',
            },
          }}
        />
        <h3 className={styles.text}>Disabled</h3>
        <WppDatepicker name="datepicker-disabled" value="12/12/2022" disabled required />
        <h3 className={styles.text}>Format - EEEE dd MMMM yyyy</h3>
        <WppDatepicker
          name="datepicker-format"
          value="Tuesday 05 Sep, 2023"
          locale={{
            dateFormat: 'EEEE dd MMMM yyyy',
          }}
          required
        />
        <div className={styles.datepicker}>
          <h3 className={styles.text}>Auto Focus</h3>
          <WppDatepicker
            name="datepicker-autofocus"
            ref={datepickerRef2}
            range
            value={['08/02/2022', '12/02/2022']}
            data-testid="focus-datepicker"
          />
          <WppButton className={styles.focusBtn} onClick={handleFocusDatepicker}>
            Set Focus to Datepicker
          </WppButton>
        </div>
      </div>
    </div>
  )
}
