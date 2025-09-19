import styles from './DatepickerExample.module.scss'

import { DatepickerExample } from './DatepickerExample'
import React from 'react'

/*
 * - WppDatepicker component with a dateFormat of 'dd MMM yyyy' and an initial value of '01 Jan 2023'
 * - Initial render does not set the component with this value and opening the picker shows no selected date
 * - Selecting a date from the picker sets the value and triggers onWppChange with the expected date and formattedDate values
 * - Component also logs an "Unable to convert value "Invalid Date" to Date object" message to the console
 *
 * Note:
 * - Using a dateFormat of 'dd/MM/yyyy' and initial value of '01/01/2023' renders the initially selected date correctly
 *   and does not show the message in the console when a new date is selected
 */
const Index = () => (
  <div>
    <div>
      <h1 style={{ textDecoration: 'underline' }}>
        <a href="https://jira.uhub.biz/browse/WPPLONOP-16043">
          Bugfix #16043 - Datepicker: Initial render does not set the component with a dateFormat of 'dd MMM yyyy'
        </a>
      </h1>
    </div>
    <div className={styles.examplesRow}>
      <DatepickerExample dateFormat="dd/MM/yyyy" value="03/02/2023" rangeValue={['01/01/2023', '01/02/2023']} />
      <DatepickerExample dateFormat="MM/dd/yyyy" value="03/02/2023" rangeValue={['01/01/2023', '01/02/2023']} />
      <DatepickerExample dateFormat="MMM dd yyyy" value="May 02 2033" rangeValue={['01/01/2023', '01/02/2023']} />
      <DatepickerExample dateFormat="MMM dd yyyy" value="May 02 2033" rangeValue={['01/01/2023', '01/02/2023']} />
      <DatepickerExample dateFormat="dd/MM/yyyy" value="02/05/2023" rangeValue={['03/03/2023', '04/03/2023']} />
      <DatepickerExample dateFormat="dd.MM.yyyy" value="02.05.2023" rangeValue={['03.03.2023', '04.03.2023']} />
      <DatepickerExample dateFormat="MM.dd.yyyy" value="02.05.2023" rangeValue={['03.03.2023', '04.03.2023']} />
    </div>
  </div>
)

export default Index
