<script setup lang="ts">
import { WppSelect, WppListItem } from '@platform-ui-kit/components-library-vue'
import { ref } from 'vue'
import { SAMPLE_LIST_COMBINED } from '../../SingleSelect/consts'

const valueEur = ref('eur')
const valueUsd = ref('usd')
const valueUah = ref('uah')

const handleChangeValueUsd = (event: CustomEvent) => {
  valueUsd.value = event.detail.value
}

const handleChangeValueEur = (event: CustomEvent) => {
  valueEur.value = event.detail.value
}

const handleChangeValueUah = (event: CustomEvent) => {
  valueUah.value = event.detail.value
}
</script>

<template>
  <div data-testid="combined-selects">
    <h2>Combined Inputs</h2>
    <h3>M Size</h3>
    <WppSelect
      class="select"
      type="combined"
      placeholder="Placeholder"
      :labelConfig="{ text: 'Donate sum' }"
      :value="valueUsd"
      @wppChange="handleChangeValueUsd"
      inputValue="100"
      :list="SAMPLE_LIST_COMBINED"
    >
    </WppSelect>

    <WppSelect
      class="select"
      type="combined"
      placeholder="Placeholder"
      :labelConfig="{ text: 'Regular' }"
      :value="valueEur"
      @wppChange="handleChangeValueEur"
      required
      data-testid="combined-input"
      :list="SAMPLE_LIST_COMBINED"
    >
    </WppSelect>

    <WppSelect
      class="select"
      type="combined"
      placeholder="Placeholder"
      :labelConfig="{ text: 'Disabled' }"
      :value="valueEur"
      @wppChange="handleChangeValueEur"
      required
      disabled
      :list="SAMPLE_LIST_COMBINED"
    >
    </WppSelect>

    <WppSelect
      class="select"
      type="combined"
      placeholder="Placeholder"
      :labelConfig="{ text: 'Disabled' }"
      :value="valueEur"
      @wppChange="handleChangeValueEur"
      disabled
      :list="SAMPLE_LIST_COMBINED"
    >
    </WppSelect>

    <WppSelect
      class="select"
      type="combined"
      placeholder="Placeholder"
      :value="valueUah"
      @wppChange="handleChangeValueUah"
      required
      message="Info message"
      :labelConfig="{
        icon: 'wpp-icon-info',
        text: 'Info',
        description: 'Description',
        locales: {
          optional: 'Optional',
        },
      }"
      :list="SAMPLE_LIST_COMBINED"
    >
    </WppSelect>

    <WppSelect
      class="select"
      type="combined"
      placeholder="Placeholder"
      :labelConfig="{ text: 'Error' }"
      :value="valueUsd"
      @wppChange="handleChangeValueUsd"
      message="Error message"
      messageType="error"
      required
      :list="SAMPLE_LIST_COMBINED"
    >
    </WppSelect>

    <WppSelect
      class="select"
      type="combined"
      placeholder="Placeholder"
      :labelConfig="{ text: 'Warning' }"
      :value="valueUsd"
      @wppChange="handleChangeValueUsd"
      message="Warning message"
      messageType="warning"
      required
      :list="SAMPLE_LIST_COMBINED"
    >
    </WppSelect>

    <WppSelect
      class="select"
      type="combined"
      placeholder="Placeholder"
      :labelConfig="{ text: 'Error disabled' }"
      :value="valueUsd"
      @wppChange="handleChangeValueUsd"
      message="Error message"
      messageType="error"
      required
      disabled
      :list="SAMPLE_LIST_COMBINED"
    >
    </WppSelect>

    <WppSelect
      class="select"
      type="combined"
      placeholder="Placeholder"
      :labelConfig="{ text: 'Warning disabled' }"
      :value="valueUsd"
      @wppChange="handleChangeValueUsd"
      message="Warning message"
      messageType="warning"
      required
      disabled
      :list="SAMPLE_LIST_COMBINED"
    >
    </WppSelect>

    <WppSelect
      class="select"
      type="combined"
      :labelConfig="{ text: 'Long value' }"
      :value="valueUsd"
      @wppChange="handleChangeValueUsd"
      required
      inputValue="10000000000000000000000000000000000000000000000000"
      :list="SAMPLE_LIST_COMBINED"
    >
    </WppSelect>

    <WppSelect
      class="select"
      type="combined"
      placeholder="Placeholder"
      :labelConfig="{ text: 'Message truncation' }"
      :value="valueUsd"
      @wppChange="handleChangeValueUsd"
      message="Warning message"
      messageType="warning"
      required
      :maxMessageLength="10"
      data-testid="combined-select"
      :list="SAMPLE_LIST_COMBINED"
    >
    </WppSelect>

    <WppSelect
      class="select"
      type="combined"
      :value="valueEur"
      @wppChange="handleChangeValueEur"
      name="min-params"
      autoFocus
      data-testid="focus-combined-select"
      :list="SAMPLE_LIST_COMBINED"
    >
    </WppSelect>

    <h3>S Size</h3>
    <WppSelect
      class="select"
      type="combined"
      :value="valueEur"
      @wppChange="handleChangeValueEur"
      size="s"
      :labelConfig="{
        icon: 'wpp-icon-info',
        text: 'Input with Icon',
        description: 'Description',
        locales: {
          optional: 'Optional',
        },
      }"
      :list="SAMPLE_LIST_COMBINED"
    >
    </WppSelect>

    <WppSelect
      class="select"
      type="combined"
      :value="valueEur"
      @wppChange="handleChangeValueEur"
      size="s"
      disabled
      :labelConfig="{ text: 'Disabled Combined Input' }"
      :list="SAMPLE_LIST_COMBINED"
    >
    </WppSelect>

    <WppSelect
      class="select"
      type="combined"
      placeholder="Placeholder"
      size="s"
      :labelConfig="{ text: 'Combined Input with warning' }"
      :value="valueUsd"
      @wppChange="handleChangeValueUsd"
      message="Warning message"
      messageType="warning"
      required
      :list="SAMPLE_LIST_COMBINED"
    >
    </WppSelect>

    <WppSelect
      class="select"
      type="combined"
      placeholder="Placeholder"
      size="s"
      :labelConfig="{ text: 'Combined Input with error' }"
      :value="valueUsd"
      @wppChange="handleChangeValueUsd"
      message="Error message"
      messageType="error"
      required
      :list="SAMPLE_LIST_COMBINED"
    >
    </WppSelect>
  </div>
</template>

<style scoped>
.select {
  margin-right: 15px;
  margin-bottom: 15px;
}
</style>
