import { WppButton, WppDatepicker, WppTypography } from '@platform-ui-kit/components-library-react'
import styles from '../Datepickers/Datepickers.module.scss'
import { useEffect, useState } from 'react'

export const DatepickersPage = () => {
  const [value, setValue] = useState<string[]>()

  const [singleValue, setSingleValue] = useState<string>('07/07/2023')
  const [rangeValue, setRangeValue] = useState<string[]>(['07/07/2023', '07/09/2023'])

  const handleBlur = (event: CustomEvent<FocusEvent>) => {
    console.log('event_blur :>> ', event)
  }

  const handleFocus = (event: CustomEvent<FocusEvent>) => {
    console.log('event_focus :>> ', event)
  }

  const handleSetSingleNewDate = () => setSingleValue('08/08/2023')

  const handleSingleChange = (event: CustomEvent) => setSingleValue(event.detail.formattedDate || '')

  const handleSetRangeNewDate = () => setRangeValue(['08/08/2023', '08/10/2023'])

  const handleRangeChange = (event: CustomEvent) => setRangeValue(event.detail.formattedDate || [])

  const generatePreset = (days: number) => {
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

  useEffect(() => {
    setValue(generatePreset(3).value)
  }, [])

  const handleClickBtn = () => {
    setValue(['08/05/2024', '10/05/2024'])
  }

  return (
    <div data-testid="datepickers">
      <div className={styles.row}>
        <div className={styles.datepicker}>
          <h3 data-testid="datepicker-test-label">Single select Datepicker</h3>
          <WppDatepicker
            onWppBlur={handleBlur}
            onWppFocus={handleFocus}
            value="21/02/2023"
            toggleSelected
            data-testid="single-select-datepicker"
          />
        </div>

        <div className={styles.datepicker}>
          <h3>With MM/dd/yyyy format</h3>
          <WppDatepicker
            locale={{
              dateFormat: 'MM/dd/yyyy',
              firstDay: 1,
            }}
            minDate="04/20/2022"
            maxDate="04/27/2022"
            value="04/23/2022"
            data-testid="overridden-date-format-datepicker"
          />
        </div>

        <div className={styles.datepicker}>
          <h3>Range datepicker</h3>
          <WppDatepicker range value={['19/02/2023', '21/02/2023']} data-testid="range-datepicker" />
        </div>

        <div className={styles.datepicker}>
          <h3>With MM/dd/yyyy format</h3>
          <WppDatepicker
            locale={{
              dateFormat: 'MM/dd/yyyy',
              firstDay: 1,
            }}
            range
            value={['04/11/2023', '04/30/2023']}
            data-testid="new-format-range-datepicker"
          />

          <p className={styles.belowCalendar} data-testid="clickout-label">
            Below click-out label
          </p>
        </div>

        <div className={styles.datepicker}>
          <h3>Datepicker with autofocus</h3>
          <WppDatepicker value="12/12/2022" autoFocus data-testid="init-date-datepicker" />
        </div>
      </div>
      <div className={styles.row} style={{ marginBottom: '50px' }}>
        <div className={styles.datepicker}>
          <h3 data-testid="datepicker-test-label">Disabled Single Datepicker</h3>
          <WppDatepicker
            onWppBlur={handleBlur}
            onWppFocus={handleFocus}
            disabled={true}
            value="21/02/2023"
            toggleSelected
            data-testid="disabled-single-select-datepicker"
          />
        </div>

        <div className={styles.datepicker}>
          <h3 data-testid="datepicker-test-label">Single Datepicker with no date</h3>
          <WppDatepicker
            onWppBlur={handleBlur}
            onWppFocus={handleFocus}
            toggleSelected
            data-testid="single-datepicker-no-value"
          />
        </div>
      </div>
      <div className={styles.otherRow}>
        <div className={styles.datepicker}>
          <h3>Range Datepicker with Presets</h3>
          <WppDatepicker
            presets={[generatePreset(7), generatePreset(14), generatePreset(30), generatePreset(90)]}
            range
            value={generatePreset(3).value}
            data-testid="range-datepicker-with-presets"
          />
        </div>
      </div>
      <div className={styles.staticPresets}>
        <div className={styles.datepicker}>
          <h3>Static Range Datepicker with Presets</h3>
          <WppDatepicker
            presets={[generatePreset(7), generatePreset(14), generatePreset(30), generatePreset(90)]}
            range
            static
            value={value}
            data-testid="range-datepicker-with-presets"
          />
        </div>

        <WppButton className={styles.setValueBtn} onClick={handleClickBtn} type="button" variant="primary">
          Set value to: 08/05/2024 - 10/05/2024
        </WppButton>
      </div>
      <div className={styles.customRow}>
        <WppTypography type="xl-heading">
          These datepickers have the following restrictions: minDate = 05/09/2023, maxDate = 14/05/2024 (dd/MM/yyyy)
        </WppTypography>
        <div className={styles.customRowContent}>
          <div className={styles.datepicker}>
            <h3>"EEEE dd MMM, yyyy" format</h3>
            <WppDatepicker
              locale={{
                dateFormat: 'EEEE dd MMM, yyyy',
              }}
              minDate="Tuesday 05 May, 2024"
              maxDate="Tuesday 27 May, 2024"
              value="Wednesday 14 May, 2024"
              data-testid="init-date-datepicker"
            />
          </div>
          <div className={styles.datepicker}>
            <h3>"dd MMM yyyy" format</h3>
            <WppDatepicker
              locale={{
                dateFormat: 'dd MMM yyyy',
              }}
              minDate="05 May 2024"
              maxDate="27 May 2024"
              value="14 May 2024"
              data-testid="init-date-datepicker"
            />
          </div>
          <div className={styles.datepicker}>
            <h3>"MMMM dd EEEE, yyyy" format</h3>
            <WppDatepicker
              locale={{
                dateFormat: 'MMMM dd EEEE, yyyy',
              }}
              minDate="May 05 Tuesday, 2024"
              maxDate="May 27 Tuesday, 2024"
              value="May 14 Wednesday, 2024"
              data-testid="init-date-datepicker"
            />
          </div>
        </div>
      </div>
      <div className={styles.customRow}>
        <WppTypography type="xl-heading">
          This datepicker has the following restrictions: minDate = 13/05/2024, maxDate = 28/05/2024 (dd/MM/yyyy)
        </WppTypography>
        <div className={styles.customRowContent}>
          <div className={styles.datepicker}>
            <h3>"dd/MM/yy" format</h3>
            <WppDatepicker
              locale={{
                dateFormat: 'dd/MM/yy',
              }}
              minDate="13/05/24"
              maxDate="28/05/24"
              value={'15/05/24'}
              data-testid="init-date-datepicker"
            />
          </div>
        </div>
      </div>
      <div className={styles.otherRow}>
        <div className={styles.datepicker}>
          <WppDatepicker
            onWppBlur={handleBlur}
            onWppFocus={handleFocus}
            onWppChange={handleSingleChange}
            value={singleValue}
            toggleSelected
          />
          <WppButton onClick={handleSetSingleNewDate}>Set new date</WppButton>
        </div>
        <div className={styles.datepicker}>
          <WppDatepicker
            onWppBlur={handleBlur}
            onWppFocus={handleFocus}
            onWppChange={handleRangeChange}
            value={rangeValue}
            range
            toggleSelected
          />
          <WppButton onClick={handleSetRangeNewDate}>Set new range</WppButton>
        </div>
      </div>
    </div>
  )
}
