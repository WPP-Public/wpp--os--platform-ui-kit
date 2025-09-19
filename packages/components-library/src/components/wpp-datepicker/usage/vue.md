```vue
<script setup lang="ts">
import { ref } from "vue";

import { WppDatepicker } from "@platform-ui-kit/components-library-vue";

const datepickerValue = ref(null);

const handleChange = (ev: CustomEvent) => {
  datepickerValue.value = ev.detail.checked;
};

const handleBlur = (event: CustomEvent<FocusEvent>) => {
  console.log("event_blur :>> ", event);
};

const handleFocus = (event: CustomEvent<FocusEvent>) => {
  console.log("event_focus :>> ", event);
};
</script>

<template>
  <WppDatepicker
    :locale="{
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
      dateLocale: 'en-US',
    }"
    static
    :value="datepickerValue.value"
    @wppBlur="handleBlur"
    @wppFocus="handleFocus"
    @wppChange="handleChange"
  />
</template>

```
