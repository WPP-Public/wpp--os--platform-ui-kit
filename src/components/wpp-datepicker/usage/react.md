```tsx
import React from 'react'

import { WppDatepicker } from '@wppopen/components-library-react'

export const DatepickerExample = () => {
  return (
  <div>
    <h3 className={styles.text}>Single select</h3>
    <WppDatepicker />
    <h3 className={styles.text}>Range</h3>
    <WppDatepicker range={true} />
    <h3 className={styles.text}>Min and max date</h3>
    <WppDatepicker minDate="07/04/2022" maxDate="07/20/2022" />
    <h3 className={styles.text}>Locale</h3>
    <WppDatepicker locale={{
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
          }}
 />
  </div>
  )
}
```
