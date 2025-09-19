<script lang="ts">
import { defineComponent, ref } from 'vue'

import { WppInput } from '@platform-ui-kit/components-library-vue'
import type { WppInputCustomEvent } from '@platform-ui-kit/components-library/dist/types/components'
import type { InputChangeEventDetail } from '@platform-ui-kit/components-library'

// const inputValues = ref<string | undefined>(undefined)
export default defineComponent({
  components: {
    WppInput: WppInput,
  },
  data() {
    return {
      size: 'm' as string,
      labelText:
        'Decimal Input with minimum and maximum length validations. Default error messages. Value must be between [3, 8] to be valid.' as string,
      className: '' as string,
      inputValues: '' as string | undefined,
    }
  },
  methods: {
    validateLength(event: WppInputCustomEvent<InputChangeEventDetail>) {
      this.inputValues = event.detail.value
    },
  },
})
</script>

<template>
  <div>
    <WppInput
      :labelConfig="{
        text: this.labelText,
      }"
      required
      :className="className"
      type="decimal"
      :size="size"
      data-testid="boundaries-values-input"
      @wppChange="validateLength"
      :value="inputValues"
      minLength="3"
      maxLength="8"
      placeholder="12,23"
    />
  </div>
</template>

<style scoped></style>
