<script setup lang="ts">
import { ref } from "vue";

import {
  WppDatepicker,
  WppButton,
} from "@platform-ui-kit/components-library-vue";
import type { DatePickerClearEventDetail } from "@platform-ui-kit/components-library/src";

const datepickerTodayDate = ref<null | string>(null);
const datepickerValue = ref(true);

const handleChange = (ev: CustomEvent) => {
  datepickerValue.value = ev.detail.checked;
};

const getFormattedDateInfo = (date: Date) =>
  [date.getDate(), date.getMonth() + 1, date.getFullYear()].join("/");

const handleTodayChange = (ev: CustomEvent) => {
  const date = new Date(ev.detail.date);
  datepickerTodayDate.value = getFormattedDateInfo(date);
};

const handleButtonDateClick = async () => {
  const currDate = new Date();

  datepickerTodayDate.value = getFormattedDateInfo(currDate);
};

const handleBlur = (event: CustomEvent<FocusEvent>) => {
  console.log("event_blur :>> ", event);
};

const handleFocus = (event: CustomEvent<FocusEvent>) => {
  console.log("event_focus :>> ", event);
};

const handleClearAll = (event: CustomEvent<DatePickerClearEventDetail>) => {
  console.log("event_clear_all :>>", event);
};
</script>

<template>
  <div class="container" data-testid="datepickers">
    <div class="datepicker">
      <h3 class="text">Default Single select</h3>
      <WppDatepicker @wppBlur="handleBlur" @wppFocus="handleFocus" />

      <h3 class="text">Single select with S size</h3>
      <WppDatepicker size="s" />

      <h3 class="text">Default Range select</h3>
      <WppDatepicker range toggleSelected @wppDateClear="handleClearAll" data-testid="default-range-datepicker" />

      <h3 class="text">Range select with S size</h3>
      <WppDatepicker size="s" range />

      <h3 class="text">With Placeholder</h3>
      <WppDatepicker placeholder="Enter the date" />

      <h3 class="text">Single select initial date</h3>
      <WppDatepicker value="12/12/2022" />

      <h3 class="text">Range select initial date</h3>
      <WppDatepicker range :value="['07/12/2011', '07/21/2011']" />

      <h3 class="text">Range select input test</h3>
      <WppDatepicker range data-testid="datepicker" />
    </div>
    <div class="datepicker">
      <h3 class="text">Spanish locale</h3>
      <WppDatepicker :locale="{
          days: [
            'Domingo',
            'Lunes',
            'Martes',
            'Miércoles',
            'Jueves',
            'Viernes',
            'Sábado',
          ],
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
          monthsShort: [
            'Enero',
            'Feb',
            'Marzo',
            'Abr',
            'Mayo',
            'Jun',
            'Jul',
            'Agosto',
            'Sept',
            'Oct',
            'Nov',
            'Dic',
          ],
          today: 'Hoy',
          clear: 'Limpiar',
          dateFormat: 'dd/MM/yyyy',
          timeFormat: 'hh:mm aa',
          firstDay: 1,
}" static value="08/02/2022" @wppBlur="handleBlur" @wppFocus="handleFocus" @wppChange="handleChange" />
      <h3 class="text">Min and max - [04/07 - 20/07]</h3>
      <WppDatepicker minDate="04/07/2022" maxDate="20/07/2022" static />
      <h3 class="text">max date - 04/07/2022</h3>
      <WppDatepicker maxDate="04/07/2022" static />
      <h3 class="text">Min date - 20/07/2042</h3>
      <WppDatepicker minDate="20/07/2042" static />
    </div>
    <div class="datepicker">
      <h3 class="text">Date Locale Example - en-US</h3>
      <wpp-datepicker :locale="{
        dateLocale: 'en-US',
        firstDay: 3,
        dateFormat: 'dd/MM/yyyy'
      }" value="15/10/2023" />

      <h3 class="text">Date Locale Example - ar-SA</h3>
      <wpp-datepicker :locale="{
        dateLocale: 'ar-SA',
        dateFormat: 'dd/MM/yyyy'
      }" value="15/10/2023" />
    </div>
    <div class="datepicker">
      <h3 class="text">With error message</h3>
      <WppDatepicker messageType="error" message="Error message" />
      <h3 class="text">With error message (truncated)</h3>
      <WppDatepicker messageType="error" message="Error message" maxMessageLength="12" />
      <h3 class="text">With warning message</h3>
      <WppDatepicker messageType="warning" message="Warning message" />
      <h3 class="text">With warning message (truncated)</h3>
      <WppDatepicker messageType="warning" message="Warning message" maxMessageLength="12" />
      <h3 class="text">W/o messageType</h3>
      <WppDatepicker message="Info message" />
      <h3 class="text">W/o messageType (truncated)</h3>
      <WppDatepicker message="Information message" maxMessageLength="12" />
      <h3 class="text">Modified Date Format only</h3>
      <WppDatepicker placeholder="dd/MM/yyyy" value="20/08/2021" :locale="{
        dateFormat: 'dd/MM/yyyy',
      }" />
      <h3 class="text">With button</h3>
      <WppDatepicker :value="datepickerTodayDate" :key="datepickerTodayDate" :locale="{
        dateFormat: 'dd/MM/yyyy',
      }" @wppChange="handleTodayChange" />
      <WppButton class="button" @click="handleButtonDateClick">
        Set current date
      </WppButton>
      <h3 class="text">With info icon</h3>
      <WppDatepicker value="12/12/2022" :labelConfig="{
        icon: 'wpp-icon-info',
        text: 'Datepicker',
        description: 'Description',
        locales: {
          optional: 'Optionale',
        },
      }" />
      <h3 class="text">Disabled</h3>
      <WppDatepicker value="12/12/2022" disabled required />

      <h3 class="text">Format - EEEE dd MMMM yyyy</h3>
      <WppDatepicker value="12/12/2022" :locale="{
        dateFormat: 'EEEE dd MMMM yyyy',
      }" required />
    </div>
    <div class="datepicker">
      <h3 class="text">Auto Focus</h3>
      <WppDatepicker value="12/12/2020" autoFocus data-testid="focus-datepicker" />
    </div>
  </div>
</template>

<style scoped>
.text {
  margin: 20px 0;
}

.container {
  display: flex;
  flex-direction: row;
  padding-left: 10px;
}

.datepicker {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
}

.button {
  margin-top: 15px;
}
</style>
