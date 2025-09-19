<script lang="ts">
import { defineComponent, ref } from 'vue'
import { WppSelect } from '@platform-ui-kit/components-library-vue'

export default defineComponent({
  components: {
    WppSelect,
  },
  setup() {
    const value = ref('')

    const handleWppChange = (event: CustomEvent) => {
      console.log('WppSelect changed to:', event)
      value.value = event.detail.value
    }

    return {
      value,
      handleWppChange,
    }
  },
})
</script>

<template>
  <div class="gender-cell">
    <WppSelect
      :list="[
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Polygender', label: 'Polygender' },
        { value: 'Agender', label: 'Agender' },
      ]"
      :value="value"
      @wppChange="handleWppChange"
      placeholder="Select user gender"
      id="select"
    />
  </div>
</template>

<style scoped></style>
