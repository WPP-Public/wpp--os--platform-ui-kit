<script setup lang="ts">
import {
  WppActionButton,
  WppAccordion,
  WppAutocomplete,
  WppButton,
  WppIconPlus,
  WppSelect,
  WppListItem,
  WppTypography,
  WppSideModal,
} from '@platform-ui-kit/components-library-vue'
import { onMounted, ref } from 'vue'
import type { AutocompleteDefaultOption } from '@platform-ui-kit/components-library'
import { fruitOptions } from '@/views/examples/AutocompleteExample/options'

const isOpen = ref(false)
const disable = ref(false)
const count = ref(2)
const items = ref<string[]>(['Added new title', 'Added new title'])
const selectValue1 = ref('')
const selectValue2 = ref('')
const basicValue = ref<AutocompleteDefaultOption[]>([
  {
    id: 5,
    label: 'Pineapple',
  },
  {
    id: 3,
    label: 'Kiwi',
  },
  {
    id: 13,
    label: 'Pear',
  },
])
const blockHeight = ref('0')
const handleAddNewParagraph = () => {
  count.value = count.value + 1
  items.value = Array(count.value)
    .fill(null)
    .map(() => 'Added new title')
}

const handleBasicValue = (event: CustomEvent) => {
  basicValue.value = event.detail.value as AutocompleteDefaultOption[]
}

const handeOpenSideModal = () => {
  isOpen.value = true
}

const handleDisableAccordion = () => {
  disable.value = !disable.value
}

const handeCloseSideModal = () => {
  isOpen.value = false
}

onMounted(() => {
  setTimeout(() => {
    blockHeight.value = '100px'
  }, 2000)
})

const handleChangeSelect1 = (event: CustomEvent) => {
  selectValue1.value = event.detail.value
}

const handleChangeSelect2 = (event: CustomEvent) => {
  selectValue2.value = event.detail.value
}
</script>

<template>
  <div class="container">
    <div class="accordion">
      <h2 class="title">Dynamic height accordion</h2>
      <WppAccordion size="s" expanded :counter="3" text="Dynamic content" slot="body">
        <div>
          <WppButton @click="handleAddNewParagraph"> Add new title</WppButton>
          <WppAutocomplete
            name="basic"
            :labelConfig="{ text: 'Basic with initial values' }"
            placeholder="Select fruits"
            :value="basicValue"
            @wppChange="handleBasicValue"
            data-testid="basic-autocomplete"
          >
            <WppListItem v-for="option in fruitOptions" :key="option.id" :value="option" :label="option.label">
              <p slot="label">{{ option.label }}</p>
            </WppListItem>
          </WppAutocomplete>
          <div>
            <h4 v-for="item in items">{{ item }}</h4>
            <WppSelect
              :list="[
                {
                  value: 1,
                  label: 'Car',
                },
                {
                  value: 2,
                  label: 'House',
                },
                {
                  value: 3,
                  label: 'Aparment',
                },
              ]"
              placeholder="Choose item"
              id="select"
              :value="selectValue1"
              :dropdownConfig="{ triggerElementWidth: true }"
              @wpp-change="handleChangeSelect1"
            >
            </WppSelect>
          </div>
        </div>
      </WppAccordion>
      <WppSideModal :open="isOpen" @wppSideModalClose="handeCloseSideModal" @wppSideModalOpen="handeOpenSideModal">
        <WppTypography type="xl-heading" slot="header"> Header </WppTypography>
        <WppAccordion size="s" expanded :counter="3" text="Dynamic content" slot="body">
          <div>
            <WppButton @click="handleAddNewParagraph">Add new title</WppButton>
            <div>
              <h4 v-for="item in items">{{ item }}</h4>
              <WppSelect
                :list="[
                  {
                    value: 1,
                    label: 'Car',
                  },
                  {
                    value: 2,
                    label: 'House',
                  },
                  {
                    value: 3,
                    label: 'Aparment',
                  },
                ]"
                placeholder="Choose item"
                id="select"
                :value="selectValue2"
                :dropdownConfig="{ triggerElementWidth: true }"
                @wpp-change="handleChangeSelect2"
              >
              </WppSelect>
            </div>
          </div>
        </WppAccordion>
      </WppSideModal>
      <WppButton @click="handeOpenSideModal"> Open Side Modal with Accordion</WppButton>
    </div>

    <div class="accordion">
      <WppAccordion expanded expandedByDefault>
        <WppTypography type="m-strong" slot="header">
          Accordion with expanded=true and expandedByDefault=true
        </WppTypography>
        <div :style="{ height: blockHeight }">No height animation on this block</div>
      </WppAccordion>
      <WppButton @click="handleDisableAccordion">{disable ? 'Enable' : 'Disable'} Accordion</WppButton>
      <WppAccordion disabled expandedByDefault>
        <WppTypography type="m-strong" slot="header">Accordion disabled expandedByDefault</WppTypography>
        <WppActionButton variant="secondary" slot="actions" disabled>
          Action Button
          <WppIconPlus slot="icon-start" />
        </WppActionButton>
        <WppTypography type="s-body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus euismod, fermentum nunc nec,
          ultricies
        </WppTypography>
      </WppAccordion>
      <WppAccordion expanded>
        <WppTypography type="m-strong" slot="header"> Accordion with expanded=true </WppTypography>
        <div :style="{ height: blockHeight }">With height animation</div>
      </WppAccordion>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
}

.accordion {
  width: 500px;
  margin-right: 20px;
  padding: 10px;
  text-align: left;
  border: 1px solid rgb(0 0 0 / 12%);
  border-radius: 1px;
}

.title {
  text-align: center;
}
</style>
