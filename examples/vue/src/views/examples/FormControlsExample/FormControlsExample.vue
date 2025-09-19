<script lang="ts">
import { WppTabs, WppTab } from '@platform-ui-kit/components-library-vue'
import { FormVanillaJs } from './components/FormVanillaJs/FormVanillaJs.vue'
import { ref } from 'vue'

const currentTab = ref('regularForm')

const handleTabChange = (event: CustomEvent) => {
  currentTab.value = event.detail.value
}
</script>

<template>
  <div class="wrapper">
    <WppTabs :value="currentTab" @wppChange="handleTabChange">
      <WppTab value="regularForm">Regular Forms</WppTab>
      <WppTab value="wizardForm" data-testid="wizard-tab">
        Wizard Form
      </WppTab>
    </WppTabs>
    <div class="content">
      {
      {
      regularForm: <RegularForms />,
      wizardForm: <FormWizard />,
      }[currentTab]
      }
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  padding: 20px;
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  width: 500px;
  margin: auto;
  padding: 16px;
  text-align: left;
  border: 1px solid rgb(0 0 0 / 12%);
  border-radius: 4px;
}

.button {
  margin-top: 20px;
  margin-right: 10px;
  text-align: center;
}

.errorText { /* stylelint-disable-line */
  margin: 6px 0;
  font-weight: 600;
  font-size: 12px;
  font-family: Inter, Roboto, sans-serif;
}

.avatar {
  margin-top: 20px;

  --wpp-file-upload-item-max-width: 500px;
}

.topMargin { /* stylelint-disable-line */
  margin-top: 20px;
}

.label {
  margin-bottom: 8px;
  color: var(--wpp-grey-color-800);
  font-weight: 600;
  font-size: 14px;
  font-family: var(--wpp-font-family);
  font-style: normal;
  line-height: 22px;
}

.radioGroup { /* stylelint-disable-line */
  display: flex;
  flex-direction: column;
}

.radioGroup > * + * { /* stylelint-disable-line */
  margin-top: 4px;
}
</style>
