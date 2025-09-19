<script setup lang="ts">
import { WppDatepicker, WppSelect } from '@platform-ui-kit/components-library-vue'
import { SAMPLE_LIST_MULTIPLE } from '../../../SingleSelect/consts'

function onChangeMultiple(e: CustomEvent) {
  console.log('On Change multiple', e.detail)
}
</script>

<template>
  <div slot="header">Scenario 01</div>

  <div slot="body" class="dropdownsContent">
    <WppDatepicker name="datepicker-small" size="s" />

    <WppSelect
      withFolder
      name="select-component"
      class="selectItem"
      data-testid="default-multiple-select-scenario-1"
      type="multiple"
      :labelConfig="{ text: 'Size M' }"
      placeholder="Choose option"
      :value="[]"
      :list="SAMPLE_LIST_MULTIPLE"
      @wppChange="onChangeMultiple"
    />
  </div>
</template>

<style scoped>
.dropdownsContent {
  padding: 20px;
}

.selectItem {
  margin-top: 10px;
}
</style>
