<script setup lang="ts">
import {
  WppAccordion,
  WppAvatar,
  WppCheckbox,
  WppIconPlus,
  WppListItem,
  WppTypography,
  WppSelect,
  WppButton,
  WppTag,
} from '@platform-ui-kit/components-library-vue'
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')

const dropdownConfig = { popperOptions: { strategy: 'fixed' } }
const showTags = ref(false)
const toggleTags = () => {
  showTags.value = !showTags.value
}

const handleChangeValue1 = (event: CustomEvent) => {
  value1.value = event.detail.value
}

const handleChangeValue2 = (event: CustomEvent) => {
  value2.value = event.detail.value
}
</script>

<template>
  <div class="container" data-testid="accordions-container">
    <div class="button">
      <WppButton @click="toggleTags">{{ showTags ? 'Hide Tags' : 'Show Tags' }}</WppButton>
    </div>
    <div class="items">
      <div class="accordions">
        <h2 class="title">S Size Accordions</h2>
        <WppAccordion :withTag="showTags" text="Accordion with text" size="s">
          <template v-if="showTags">
            <WppTag slot="tags" label="Neutral" variant="neutral" />
          </template>
        </WppAccordion>

        <WppAccordion :withTag="showTags" text="Accordion expanded" size="s" expanded>
          <div class="expanded">
            <WppCheckbox :labelConfig="{ text: 'Option 1' }" required />
            <WppCheckbox :labelConfig="{ text: 'Option 2' }" />
            <WppCheckbox :labelConfig="{ text: 'Option 3' }" required />
          </div>
          <template v-if="showTags">
            <WppTag slot="tags" label="Neutral" variant="neutral" />
          </template>
        </WppAccordion>

        <WppAccordion :withTag="showTags" text="Accordion with single select" size="s">
          <WppSelect
            :value="value1"
            :dropdownConfig="dropdownConfig"
            :list="[
              {
                value: 'test',
                label: 'test',
              },
              {
                value: 'test2',
                label: 'test2',
              },
              {
                value: 'test3',
                label: 'test3',
              },
            ]"
            @wppChange="handleChangeValue1"
          >
          </WppSelect>
          <template v-if="showTags">
            <WppTag slot="tags" label="Neutral" variant="neutral" />
          </template>
        </WppAccordion>

        <WppAccordion :withTag="showTags" text="Accordion with counter" size="s" :counter="3" />

        <WppAccordion :withTag="showTags" text="Accordion w/o divider" size="s" :withDivider="false" />

        <WppAccordion :withTag="showTags" size="s">
          <template v-if="showTags">
            <WppTag slot="tags" label="Neutral" variant="neutral" />
          </template>
        </WppAccordion>

        <WppAccordion :withTag="showTags" size="s" expanded :counter="3" text="All In Accordion">
          <div>
            <WppCheckbox class="checkbox" :labelConfig="{ text: 'Option 1' }" required />
            <WppCheckbox class="checkbox" :labelConfig="{ text: 'Option 2' }" required />
            <WppCheckbox :labelConfig="{ text: 'Option 3' }" />
          </div>
          <template v-if="showTags">
            <WppTag slot="tags" label="Neutral" variant="neutral" />
          </template>
        </WppAccordion>

        <WppAccordion :withTag="showTags" size="s" data-testid="truncated-accordion">
          <div :style="{ display: 'inline-flex' }" slot="header">
            <WppTypography type="s-strong" class="truncation">
              Test Truncation Test Truncation Test Truncation Test Truncation Test Truncation
            </WppTypography>
          </div>
          <div class="expanded">
            <WppCheckbox :labelConfig="{ text: 'Option 1' }" required />
            <WppCheckbox :labelConfig="{ text: 'Option 2' }" />
            <WppCheckbox :labelConfig="{ text: 'Option 3' }" required />
          </div>
          <template v-if="showTags">
            <WppTag slot="tags" label="Neutral" variant="neutral" />
          </template>
        </WppAccordion>

        <WppAccordion :withTag="true" size="s" :disabled="true">
          <div slot="header">Accordion with disabled state</div>
          <WppTag slot="tags" label="Neutral" variant="positive" />
        </WppAccordion>
      </div>

      <div class="accordions">
        <h2 class="title">L Size Accordions</h2>
        <WppAccordion :withTag="showTags" text="Accordion with text" size="l">
          <template v-if="showTags">
            <WppTag slot="tags" label="Neutral" variant="neutral" />
          </template>
        </WppAccordion>

        <WppAccordion :withTag="showTags" text="Accordion expanded" size="l" expanded>
          <div class="expanded">
            <WppCheckbox :labelConfig="{ text: 'Option 1' }" required />
            <WppCheckbox :labelConfig="{ text: 'Option 2' }" />
            <WppCheckbox :labelConfig="{ text: 'Option 3' }" required />
          </div>
          <template v-if="showTags">
            <WppTag slot="tags" label="Neutral" variant="neutral" />
          </template>
        </WppAccordion>

        <WppAccordion :withTag="showTags" text="Accordion with counter" size="l" :counter="3" />

        <WppAccordion :withTag="showTags" text="Accordion w/o divider" size="l" :withDivider="false" />

        <WppAccordion :withTag="showTags" size="l">
          <template v-if="showTags">
            <WppTag slot="tags" label="Neutral" variant="neutral" />
          </template>
        </WppAccordion>

        <WppAccordion :withTag="showTags" size="l" expanded :counter="3" text="All In Accordion">
          <div>
            <WppCheckbox class="checkbox" :labelConfig="{ text: 'Option 1' }" required />
            <WppCheckbox class="checkbox" :labelConfig="{ text: 'Option 2' }" required />
            <WppCheckbox :labelConfig="{ text: 'Option 3' }" />
          </div>
          <template v-if="showTags">
            <WppTag slot="tags" label="Neutral" variant="neutral" />
          </template>
        </WppAccordion>
      </div>

      <div class="accordions">
        <h2 class="title">2XL Size Accordions</h2>
        <WppAccordion :withTag="showTags" text="Accordion with text" size="2xl">
          <template v-if="showTags">
            <WppTag slot="tags" label="Neutral" variant="neutral" />
          </template>
        </WppAccordion>

        <WppAccordion :withTag="showTags" text="Accordion expanded" size="2xl" expanded>
          <div class="expanded">
            <WppCheckbox :labelConfig="{ text: 'Option 1' }" required />
            <WppCheckbox :labelConfig="{ text: 'Option 2' }" />
            <WppCheckbox :labelConfig="{ text: 'Option 3' }" required />
          </div>
          <template v-if="showTags">
            <WppTag slot="tags" label="Neutral" variant="neutral" />
          </template>
        </WppAccordion>

        <WppAccordion :withTag="showTags" text="Accordion with counter" size="2xl" :counter="3" />

        <WppAccordion :withTag="showTags" text="Accordion w/o divider" size="2xl" :withDivider="false" />

        <WppAccordion :withTag="showTags" size="2xl">
          <template v-if="showTags">
            <WppTag slot="tags" label="Neutral" variant="neutral" />
          </template>
        </WppAccordion>

        <WppAccordion :withTag="showTags" size="2xl" expanded :counter="3" text="All In Accordion">
          <div>
            <WppCheckbox class="checkbox" :labelConfig="{ text: 'Option 1' }" required />
            <WppCheckbox class="checkbox" :labelConfig="{ text: 'Option 2' }" required />
            <WppCheckbox :labelConfig="{ text: 'Option 3' }" />
          </div>
          <template v-if="showTags">
            <WppTag slot="tags" label="Neutral" variant="neutral" />
          </template>
        </WppAccordion>
      </div>
    </div>

    <div class="items">
      <div class="accordions">
        <h2 class="title">M Size Accordions</h2>
        <WppAccordion :withTag="showTags" text="Accordion with text" size="m">
          <template v-if="showTags">
            <WppTag slot="tags" label="Neutral" variant="neutral" />
          </template>
        </WppAccordion>

        <WppAccordion :withTag="showTags" text="Accordion expanded" size="m" expanded>
          <div class="expanded">
            <WppCheckbox class="checkbox" :labelConfig="{ text: 'Option 1' }" required />
            <WppCheckbox class="checkbox" :labelConfig="{ text: 'Option 2' }" />
            <WppCheckbox required :labelConfig="{ text: 'Option 3' }" />
          </div>
          <template v-if="showTags">
            <WppTag slot="tags" label="Neutral" variant="neutral" />
          </template>
        </WppAccordion>

        <WppAccordion :withTag="showTags" text="Accordion with counter" size="m" :counter="3" />

        <WppAccordion :withTag="showTags" text="Accordion w/o divider" size="m" :withDivider="false" />

        <WppAccordion :withTag="showTags" size="m">
          <template v-if="showTags">
            <WppTag slot="tags" label="Neutral" variant="neutral" />
          </template>
        </WppAccordion>

        <WppAccordion :withTag="showTags" size="m" expanded :counter="1" text="List of users">
          <div class="list">
            <WppAvatar class="avatar" size="s" name="Sri Rani" color="var(--wpp-dataviz-color-cat-dark-1)" />
            <div class="info">
              <WppTypography type="s-body">Sri Rani</WppTypography>
              <WppTypography type="xs-body">sri.rani@groupm.com</WppTypography>
            </div>

            <WppSelect
              class="select"
              required
              data-testid="users"
              :value="value2"
              @wppChange="handleChangeValue2"
              :list="[
                {
                  value: 1,
                  label: 'Item 1',
                  slots: [{ type: 'wpp-icon-plus', props: { slot: 'left' } }],
                },
              ]"
            >
            </WppSelect>
          </div>
          <template v-if="showTags">
            <WppTag slot="tags" label="Neutral" variant="neutral" />
          </template>
        </WppAccordion>

        <WppAccordion :withTag="showTags" size="m" expanded :counter="3" text="All In Accordion">
          <div>
            <WppCheckbox class="checkbox" :labelConfig="{ text: 'Option 1' }" required />
            <WppCheckbox class="checkbox" :labelConfig="{ text: 'Option 2' }" required />
            <WppCheckbox :labelConfig="{ text: 'Option 3' }" />
          </div>
          <template v-if="showTags">
            <WppTag slot="tags" label="Neutral" variant="neutral" />
          </template>
        </WppAccordion>
      </div>

      <div class="accordions">
        <h2 class="title">XL Size Accordions</h2>
        <WppAccordion :withTag="showTags" text="Accordion with text" size="xl">
          <template v-if="showTags">
            <WppTag slot="tags" label="Neutral" variant="neutral" />
          </template>
        </WppAccordion>

        <WppAccordion :withTag="showTags" text="Accordion expanded" size="xl" expanded>
          <div class="expanded">
            <WppCheckbox class="checkbox" :labelConfig="{ text: 'Option 1' }" required />
            <WppCheckbox class="checkbox" :labelConfig="{ text: 'Option 2' }" />
            <WppCheckbox required :labelConfig="{ text: 'Option 3' }" />
          </div>
          <template v-if="showTags">
            <WppTag slot="tags" label="Neutral" variant="neutral" />
          </template>
        </WppAccordion>

        <WppAccordion :withTag="showTags" text="Accordion with counter" size="xl" :counter="3" />

        <WppAccordion :withTag="showTags" text="Accordion w/o divider" size="xl" :withDivider="false" />

        <WppAccordion :withTag="showTags" size="xl">
          <template v-if="showTags">
            <WppTag slot="tags" label="Neutral" variant="neutral" />
          </template>
        </WppAccordion>

        <WppAccordion :withTag="showTags" size="xl" expanded :counter="3" text="All In Accordion">
          <div>
            <WppCheckbox class="checkbox" :labelConfig="{ text: 'Option 1' }" required />
            <WppCheckbox class="checkbox" :labelConfig="{ text: 'Option 2' }" required />
            <WppCheckbox :labelConfig="{ text: 'Option 3' }" />
          </div>
          <template v-if="showTags">
            <WppTag slot="tags" label="Neutral" variant="neutral" />
          </template>
        </WppAccordion>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  padding: 10px;
  position: relative;
}

.truncation {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.button {
  margin: 10px;
  position: absolute;
}

.accordions {
  width: 450px;
  height: 900px;
  margin-right: 20px;
  margin-bottom: 30px;
  padding: 10px;
  text-align: left;
  border: 1px solid rgb(0 0 0 / 12%);
  border-radius: 1px;
}

.expanded {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80px;
  margin-bottom: 12px;
}

.title {
  text-align: center;
}

.checkbox {
  margin-right: 15px;
}

.list {
  display: flex;
  margin-top: 5px;
}

.avatar {
  margin-top: 5px;
  margin-right: 5px;
}

.info {
  display: flex;
  flex-direction: column;
}

.select {
  width: 200px;
  margin-left: 10px;
}
</style>
