<script setup lang="ts">
import { WppSelect, WppButton, WppAccordion } from '@platform-ui-kit/components-library-vue'
import { ref } from 'vue'
import CustomDropdown from './Examples/CustomDropdown.vue'
import { SAMPLE_LIST_1, SAMPLE_LIST_MULTIPLE } from '../SingleSelect/consts'

const multipleItems = ref<any[]>(['car', 'long'])
const multipleItems2 = ref<any[]>([])
const multipleItems3 = ref<any[]>([])
const singleItems = ref('car')
const textItems = ref('house')
const textValue = ref('')

const handleResetClick = () => {
  multipleItems.value = []
}

const handleMultipleItems = (event: CustomEvent) => {
  multipleItems.value = event.detail.value
}

const handleMultipleItems2 = (event: CustomEvent) => {
  multipleItems2.value = event.detail.value
}

const handleMultipleItems3 = (event: CustomEvent) => {
  multipleItems3.value = event.detail.value
}

const handleSingleItems = (event: CustomEvent) => {
  singleItems.value = event.detail.value
}

const handleTextItems = (event: CustomEvent) => {
  textItems.value = event.detail.value
}

const handleTextValueChange = (event: CustomEvent) => {
  textValue.value = event.detail.value
}
</script>

<template>
  <div class="container">
    <div class="flexRow">
      <div data-testid="left-column-selects">
        <WppSelect
          placeholder="Choose options"
          type="multiple"
          required
          withFolder
          withSearch
          :labelConfig="{ text: 'Multiple Select with search' }"
          data-testid="focus-multiple-select"
          autoFocus
          @wppChange="handleMultipleItems"
          :list="SAMPLE_LIST_MULTIPLE"
          class="item"
          :value="multipleItems"
          name="My custom select"
        >
        </WppSelect>

        <div class="reset">
          <WppButton variant="secondary" @click="handleResetClick" data-testid="reset-button"> Reset </WppButton>
        </div>

        <WppAccordion class="accordion" expanded text="Test Accordion">
          <WppSelect
            placeholder="Choose option"
            required
            type="multiple"
            withFolder
            withSearch
            :labelConfig="{ text: 'Multiple Select' }"
            data-testid="select-in-accordion"
            class="item"
            name="My custom select 2"
            :value="multipleItems2"
            @wppChange="handleMultipleItems2"
            :list="SAMPLE_LIST_MULTIPLE"
          >
          </WppSelect>
        </WppAccordion>

        <CustomDropdown />

        <WppSelect
          type="multiple"
          required
          :labelConfig="{ text: 'Select with top dropdown list' }"
          data-testid="multiple-top-dropdown-select"
          class="top"
          name="My custom select 3"
          :value="multipleItems3"
          @wppChange="handleMultipleItems3"
          :list="SAMPLE_LIST_MULTIPLE"
        >
        </WppSelect>
      </div>

      <div data-testid="central-column-selects">
        <WppSelect
          placeholder="Choose options"
          type="single"
          required
          withSearch
          :labelConfig="{ text: 'Single Select with search' }"
          data-testid="single-select"
          class="item"
          :value="singleItems"
          @wppChange="handleSingleItems"
          name="My custom select 4"
          :list="SAMPLE_LIST_1"
        >
        </WppSelect>

        <WppAccordion class="accordion" expanded text="Test Accordion" :style="{ marginBottom: '80px' }">
          <WppSelect
            placeholder="Choose option"
            required
            type="single"
            withFolder
            withSearch
            :labelConfig="{ text: 'Single Select' }"
            data-testid="single-select-in-accordion"
            class="item"
            @wppChange="handleSingleItems"
            :value="singleItems"
            name="My custom select 5"
            :list="SAMPLE_LIST_1"
          >
          </WppSelect>
        </WppAccordion>

        <WppSelect
          required
          :labelConfig="{ text: 'Select with top dropdown list' }"
          data-testid="single-top-dropdown-select"
          class="top"
          name="My custom select 6"
          :list="SAMPLE_LIST_1"
          @wppChange="handleSingleItems"
          :value="singleItems"
        >
        </WppSelect>
      </div>

      <div>
        <div>
          <h5>Text Select</h5>
          <WppSelect
            placeholder="Choose options"
            type="text"
            required
            data-testid="text-select"
            @wppChange="handleTextItems"
            class="text"
            :value="textItems"
            name="My custom select 7"
            :list="SAMPLE_LIST_1"
          >
          </WppSelect>
        </div>

        <div>
          <WppAccordion class="accordion" expanded text="Test Accordion">
            <WppSelect
              placeholder="Choose option"
              required
              type="text"
              data-testid="text-select-in-accordion"
              class="item"
              name="My custom select 8"
              :list="SAMPLE_LIST_1"
              @wppChange="handleTextValueChange"
              :value="textValue"
            >
            </WppSelect>
          </WppAccordion>
        </div>

        <div>
          <h5 class="top">Text Select</h5>
          <WppSelect
            type="text"
            required
            placeholder="Choose option"
            data-testid="text-top-dropdown-select"
            name="My custom select 9"
            :list="SAMPLE_LIST_1"
            @wppChange="handleTextValueChange"
            :value="textValue"
          >
          </WppSelect>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.item p {
  margin: 0;
}

.item {
  width: 500px;
  margin-right: 20px;
}

.text {
  width: 200px;
  margin-right: 20px;
}

.text p {
  margin: 0;
}

.accordion {
  width: 300px;
  margin-top: 30px;
  margin-left: 15px;
}

.top {
  width: 200px;
  margin-top: 800px;
}

.container {
  display: flex;
  flex-direction: column;
}

.flexRow {
  display: flex;
  flex-direction: row;
  min-height: 480px;
  margin-bottom: 16px;
}

.reset {
  margin-top: 20px;
}
</style>
