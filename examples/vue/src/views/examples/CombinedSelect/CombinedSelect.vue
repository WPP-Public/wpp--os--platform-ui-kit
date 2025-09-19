<script setup>
import { ref } from 'vue'
import { WppSelect, WppTypography } from '@platform-ui-kit/components-library-vue'
import { SAMPLE_LIST_COMBINED } from './consts'

const value = ref('')

const handleChange = event => {
  console.log('On Change single', event.detail)
  value.value = event.detail.value
}
</script>

<template>
  <div class="container">
    <div class="section">
      <WppTypography type="2xl-heading">Default Select</WppTypography>

      <div class="content">
        <WppSelect
          type="combined"
          name="select-component"
          class="selectItem"
          data-testid="default-combined-select-m"
          :list="SAMPLE_LIST_COMBINED"
          :label-config="{ text: 'Size M' }"
          placeholder="Choose option"
          :value="value"
          autoFocus
          @wppChange="handleChange"
        />

        <WppSelect
          type="combined"
          name="select-component"
          class="selectItem"
          data-testid="default-combined-select-s"
          :list="SAMPLE_LIST_COMBINED"
          :label-config="{ text: 'Size S' }"
          placeholder="Choose option"
          :value="value"
          autoFocus
          size="s"
          @wppChange="handleChange"
        />
      </div>
    </div>

    <div class="section">
      <WppTypography type="2xl-heading">Disabled Select</WppTypography>

      <div class="content">
        <WppSelect
          type="combined"
          name="select-component"
          class="selectItem"
          data-testid="disabled-combined-select-m"
          disabled
          :list="SAMPLE_LIST_COMBINED"
          :label-config="{ text: 'Size M' }"
          placeholder="Choose option"
          :value="value"
        />

        <WppSelect
          type="combined"
          name="select-component"
          class="selectItem"
          data-testid="disabled-combined-select-s"
          disabled
          :list="SAMPLE_LIST_COMBINED"
          :label-config="{ text: 'Size S' }"
          placeholder="Choose option"
          :value="value"
          size="s"
        />
      </div>
    </div>

    <div class="section">
      <WppTypography type="2xl-heading">Error Select</WppTypography>

      <div class="content">
        <WppSelect
          type="combined"
          name="select-component"
          class="selectItem"
          data-testid="error-combined-select-m"
          :list="SAMPLE_LIST_COMBINED"
          :label-config="{ text: 'Size M' }"
          placeholder="Choose option"
          :value="value"
          message="Error message"
          messageType="error"
        />

        <WppSelect
          type="combined"
          name="select-component"
          class="selectItem"
          data-testid="error-combined-select-s"
          :list="SAMPLE_LIST_COMBINED"
          :label-config="{ text: 'Size S' }"
          placeholder="Choose option"
          :value="value"
          size="s"
          message="Error message"
          messageType="error"
        />
      </div>
    </div>

    <div class="section">
      <WppTypography type="2xl-heading">Error Select with Tooltip Error Message</WppTypography>

      <div class="content">
        <WppSelect
          type="combined"
          name="select-component"
          class="selectItem"
          data-testid="error-combined-select-m"
          :list="SAMPLE_LIST_COMBINED"
          :label-config="{ text: 'Size M' }"
          placeholder="Choose option"
          :value="value"
          message="Error message"
          messageType="error"
          messageInTooltip
        />

        <WppSelect
          type="combined"
          name="select-component"
          class="selectItem"
          data-testid="error-combined-select-s"
          :list="SAMPLE_LIST_COMBINED"
          :label-config="{ text: 'Size S' }"
          placeholder="Choose option"
          :value="value"
          size="s"
          message="Error message"
          messageType="error"
          messageInTooltip
        />
      </div>
    </div>

    <div class="section">
      <WppTypography type="2xl-heading">Warning Select</WppTypography>

      <div class="content">
        <WppSelect
          type="combined"
          name="select-component"
          class="selectItem"
          data-testid="warning-combined-select-m"
          :list="SAMPLE_LIST_COMBINED"
          :label-config="{ text: 'Size M' }"
          placeholder="Choose option"
          :value="value"
          message="Warning message"
          messageType="warning"
        />

        <WppSelect
          type="combined"
          name="select-component"
          class="selectItem"
          data-testid="warning-combined-select-s"
          :list="SAMPLE_LIST_COMBINED"
          :label-config="{ text: 'Size S' }"
          placeholder="Choose option"
          :value="value"
          size="s"
          message="Warning message"
          messageType="warning"
        />
      </div>
    </div>

    <div class="section">
      <WppTypography type="2xl-heading">Warning Select with Tooltip Warning Message</WppTypography>

      <div class="content">
        <WppSelect
          type="combined"
          name="select-component"
          class="selectItem"
          data-testid="warning-combined-select-m"
          :list="SAMPLE_LIST_COMBINED"
          :label-config="{ text: 'Size M' }"
          placeholder="Choose option"
          :value="value"
          message="Warning message"
          messageType="warning"
          messageInTooltip
        />

        <WppSelect
          type="combined"
          name="select-component"
          class="selectItem"
          data-testid="warning-combined-select-s"
          :list="SAMPLE_LIST_COMBINED"
          :label-config="{ text: 'Size S' }"
          placeholder="Choose option"
          :value="value"
          size="s"
          message="Warning message"
          messageType="warning"
          messageInTooltip
        />
      </div>
    </div>

    <div class="section">
      <WppTypography type="2xl-heading">Required Select</WppTypography>

      <div class="content">
        <WppSelect
          type="combined"
          required
          name="select-component"
          class="selectItem"
          data-testid="required-combined-select-m"
          :list="SAMPLE_LIST_COMBINED"
          :label-config="{ text: 'Size M', icon: 'wpp-icon-info', description: 'Description' }"
          message="Text message"
          placeholder="Choose option"
          :value="value"
        />

        <WppSelect
          type="combined"
          required
          name="select-component"
          class="selectItem"
          data-testid="required-combined-select-s"
          :list="SAMPLE_LIST_COMBINED"
          :label-config="{ text: 'Size S', icon: 'wpp-icon-info', description: 'Description' }"
          message="Text message"
          placeholder="Choose option"
          :value="value"
          size="s"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 50px;
}

.item {
  margin-bottom: 20px;
}

.section {
  width: 900px;
  margin-bottom: 40px;
}

.content {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.selectItem {
  width: 300px;
}
</style>
