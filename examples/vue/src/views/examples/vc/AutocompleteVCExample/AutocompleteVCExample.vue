<script setup lang="ts">
import { ref } from 'vue'

import { WppAutocomplete, WppListItem, WppButton } from '@platform-ui-kit/components-library-vue'
import type { BasicOption } from '@/views/examples/AutocompleteExample/options'
import SelectedValues from '@/views/examples/AutocompleteExample/SelectedValues.vue'
import { fruitOptions } from '@/views/examples/AutocompleteExample/options'
import type { AutocompleteDefaultOption } from '@platform-ui-kit/components-library'

const SUGGESTIONS_SAMPLE_1: AutocompleteDefaultOption[] = [
  {
    id: 1,
    label: 'Avacado',
  },
  {
    id: 2,
    label: 'Blueberry',
  },
  {
    id: 3,
    label: 'Cherry',
  },
  {
    id: 4,
    label: 'Durian',
  },
  {
    id: 5,
    label: 'Elderberry',
  },
]

const SUGGESTIONS_SAMPLE_2: AutocompleteDefaultOption[] = [
  {
    id: 10,
    label: 'Grapefruit',
  },
  {
    id: 11,
    label: 'Watermelon',
  },
  {
    id: 12,
    label: 'All the fruits in the world mixed into a SUPER FRUIT MIX! Trimmed to the edge of the universe -_-',
  },
  {
    id: 13,
    label: 'Pear',
  },
]

const handleBasicValue = (event: CustomEvent) => {
  basicValue.value = event.detail.value
}

const handleBasicValue1 = (event: CustomEvent) => {
  basicValue1.value = event.detail.value
}

const handleBasicValue2 = (event: CustomEvent) => {
  basicValue2.value = event.detail.value
}

const handleBasicValue3 = (event: CustomEvent) => {
  basicValue3.value = event.detail.value
}

const handleBasicValue4 = (event: CustomEvent) => {
  basicValue4.value = event.detail.value
}

const handleBasicValue5 = (event: CustomEvent) => {
  basicValue5.value = event.detail.value
}

const handleBasicValue6 = (event: CustomEvent) => {
  basicValue6.value = event.detail.value
}

const handleBasicValue7 = (event: CustomEvent) => {
  basicValue7.value = event.detail.value
}

const handleBasicValue8 = (event: CustomEvent) => {
  basicValue8.value = event.detail.value
}

const handleBasicValue9 = (event: CustomEvent) => {
  console.log('Change event:', event.detail.name)

  basicValue9.value = event.detail.value
}

const handleMultipleDefaultValues = (event: CustomEvent) => {
  multipleDefaultValues.value = event.detail.value
}

const handleMultipleDefaultValues1 = (event: CustomEvent) => {
  multipleDefaultValues1.value = event.detail.value
}

const handleMultipleDefaultValues2 = (event: CustomEvent) => {
  multipleDefaultValues2.value = event.detail.value
}

const handleMultipleDefaultValues3 = (event: CustomEvent) => {
  multipleDefaultValues3.value = event.detail.value
}

const handleMultipleDefaultValues4 = (event: CustomEvent) => {
  multipleDefaultValues4.value = event.detail.value
}

const handleMultipleDefaultValues5 = (event: CustomEvent) => {
  console.log('Change event:', event.detail.name)

  multipleDefaultValues5.value = event.detail.value
}

const handleMultipleDefaultValues6 = (event: CustomEvent) => {
  console.log('Change event:', event.detail.name)

  multipleDefaultValues6.value = event.detail.value
}

const basicValue = ref<BasicOption[]>([
  {
    id: 5,
    label: 'Elderberry',
  },
])

const basicValue1 = ref<BasicOption[]>([
  {
    id: 5,
    label: 'Elderberry',
  },
])

const basicValue2 = ref<BasicOption[]>([
  {
    id: 5,
    label: 'Elderberry',
  },
])

const basicValue3 = ref<BasicOption[]>([
  {
    id: 5,
    label: 'Elderberry',
  },
])

const basicValue4 = ref<BasicOption[]>([
  {
    id: 5,
    label: 'Elderberry',
  },
])

const basicValue5 = ref<BasicOption[]>([
  {
    id: 5,
    label: 'Elderberry',
  },
])

const basicValue6 = ref<BasicOption[]>([
  {
    id: 5,
    label: 'Elderberry',
  },
])

const basicValue7 = ref<BasicOption[]>([
  {
    id: 5,
    label: 'Elderberry',
  },
])

const basicValue8 = ref<BasicOption[]>([])

const basicValue9 = ref<BasicOption[]>([
  {
    id: 5,
    label: 'Elderberry',
  },
])

const multipleDefaultValues = ref<AutocompleteDefaultOption[]>([
  {
    id: 5,
    label: 'Elderberry',
  },
  {
    id: 15,
    label: 'Banana',
  },
  {
    id: 13,
    label: 'Pear',
  },
  {
    id: 10,
    label: 'Grapefruit',
  },
  {
    id: 6,
    label: 'Сarambola',
  },
])

const multipleDefaultValues1 = ref<AutocompleteDefaultOption[]>([
  {
    id: 5,
    label: 'Elderberry',
  },
  {
    id: 15,
    label: 'Banana',
  },
  {
    id: 13,
    label: 'Pear',
  },
  {
    id: 10,
    label: 'Grapefruit',
  },
  {
    id: 6,
    label: 'Сarambola',
  },
])

const multipleDefaultValues2 = ref<AutocompleteDefaultOption[]>([
  {
    id: 5,
    label: 'Elderberry',
  },
  {
    id: 15,
    label: 'Banana',
  },
  {
    id: 13,
    label: 'Pear',
  },
  {
    id: 10,
    label: 'Grapefruit',
  },
  {
    id: 6,
    label: 'Сarambola',
  },
])

const multipleDefaultValues3 = ref<AutocompleteDefaultOption[]>([
  {
    id: 5,
    label: 'Elderberry',
  },
  {
    id: 15,
    label: 'Banana',
  },
  {
    id: 13,
    label: 'Pear',
  },
  {
    id: 10,
    label: 'Grapefruit',
  },
  {
    id: 6,
    label: 'Сarambola',
  },
])

const multipleDefaultValues4 = ref<AutocompleteDefaultOption[]>([])
const multipleDefaultValues5 = ref<AutocompleteDefaultOption[]>([])
const multipleDefaultValues6 = ref<AutocompleteDefaultOption[]>([])

const dynamicSuggestions = ref<AutocompleteDefaultOption[]>([])

const staticSuggestions = ref<AutocompleteDefaultOption[]>([
  { id: 1, label: 'Avacado' },
  {
    id: 2,
    label: 'Blueberry',
  },
  { id: 3, label: 'Cherry' },
  { id: 4, label: 'Durian' },
  { id: 5, label: 'Elderberry' },
  {
    id: 12,
    label: 'All the fruits in the world mixed into a SUPER FRUIT MIX! Trimmed to the edge of the universe -_-',
  },
])

const helperCreateElement = (type: string, props?: any, children?: any) => ({
  type,
  props: props || {},
  ...(children && { children: Array.isArray(children) ? children : [children] }),
})

const staticSuggestionWithSlots = ref<AutocompleteDefaultOption[]>([
  {
    id: 1,
    label: 'Avacado',
  },
  {
    id: 2,
    label: 'Blueberry',
    slots: [helperCreateElement('wpp-icon-mail', { slot: 'left' })],
  },
  {
    id: 3,
    label: 'Cherry',
    slots: [
      helperCreateElement('wpp-icon-available-checkmark', { slot: 'left' }),
      helperCreateElement(
        'wpp-action-button',
        {
          slot: 'right',
          variant: 'secondary',
        },
        helperCreateElement('wpp-icon-plus', { slot: 'icon-start' }),
      ),
    ],
  },
  {
    id: 4,
    label: 'Durian',
    slots: [helperCreateElement('wpp-icon-chevron', { slot: 'right' })],
  },
  {
    id: 5,
    label: 'Elderberry',
    slots: [
      helperCreateElement('wpp-action-button', {
        slot: 'right',
        variant: 'secondary',
      }),
    ],
  },
  {
    id: 6,
    label: 'Сarambola',
    slots: [
      helperCreateElement('wpp-avatar', {
        slot: 'left',
        size: 'xs',
        src: 'https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028',
      }),
    ],
  },
  {
    id: 7,
    label: 'Grape',
    slots: [
      helperCreateElement(
        'wpp-action-button',
        {
          slot: 'right',
          variant: 'secondary',
        },
        helperCreateElement('wpp-icon-plus', { slot: 'icon-start' }),
      ),
      helperCreateElement('wpp-avatar', {
        slot: 'left',
        size: 'xs',
        src: 'https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028',
      }),
    ],
  },
  {
    id: 8,
    label: 'Orange',
    slots: [
      helperCreateElement('wpp-avatar', {
        slot: 'left',
        size: 'xs',
        variant: 'square',
        src: 'https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028',
      }),
    ],
  },
  {
    id: 9,
    label: 'Apple',
    slots: [
      helperCreateElement('wpp-avatar', {
        slot: 'left',
        size: 'xs',
        src: 'https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028',
      }),
      helperCreateElement('wpp-tag', { slot: 'right', label: 'Positive', variant: 'positive' }),
    ],
  },
  {
    id: 10,
    label: 'Grapefruit',
    slots: [helperCreateElement('span', { slot: 'caption', children: 'Caption' })],
  },
  {
    id: 11,
    label: 'Watermelon',
    slots: [
      helperCreateElement('span', { slot: 'caption', children: 'Caption' }),
      helperCreateElement('wpp-avatar', {
        slot: 'left',
        size: 's',
        variant: 'square',
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU',
      }),
      helperCreateElement('wpp-tag', { slot: 'right', label: 'Positive', variant: 'positive' }),
    ],
  },
  {
    id: 13,
    label: 'Pear',
    slots: [
      helperCreateElement('span', { slot: 'caption', children: 'Caption' }),
      helperCreateElement('wpp-avatar', {
        slot: 'left',
        size: 's',
        variant: 'square',
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU',
      }),
      helperCreateElement(
        'wpp-typography',
        {
          slot: 'right',
          type: 's-body',
        },
        helperCreateElement('span', { children: 'Text' }),
      ),
    ],
  },
])

const handleBasicValuePillCloseClick1 = (selectedValue: number) => {
  basicValue1.value = basicValue1.value.filter(i => i.id !== selectedValue)
}

const handleBasicValuePillCloseClick2 = (selectedValue: number) => {
  basicValue2.value = basicValue2.value.filter(i => i.id !== selectedValue)
}

const handleBasicValuePillCloseClick3 = (selectedValue: number) => {
  basicValue3.value = basicValue3.value.filter(i => i.id !== selectedValue)
}

const handleBasicValuePillCloseClick4 = (selectedValue: number) => {
  basicValue4.value = basicValue4.value.filter(i => i.id !== selectedValue)
}

const handleBasicValuePillCloseClick5 = (selectedValue: number) => {
  basicValue5.value = basicValue5.value.filter(i => i.id !== selectedValue)
}

const handleBasicValuePillCloseClick6 = (selectedValue: number) => {
  basicValue6.value = basicValue6.value.filter(i => i.id !== selectedValue)
}

const handleBasicValuePillCloseClick7 = (selectedValue: number) => {
  basicValue7.value = basicValue7.value.filter(i => i.id !== selectedValue)
}

const handleMultipleValuePillCloseClick1 = (selectedValues: number) => {
  multipleDefaultValues1.value = multipleDefaultValues1.value.filter(i => i.id !== selectedValues)
}

const handleMultipleValuePillCloseClick3 = (selectedValues: number) => {
  multipleDefaultValues3.value = multipleDefaultValues3.value.filter(i => i.id !== selectedValues)
}

const setDynamicSuggestions = (list: AutocompleteDefaultOption[]) => {
  dynamicSuggestions.value = list
}
</script>

<template>
  <div>
    <h2>Autocomplete - without suggestions</h2>
    <div class="container" data-testid="autocomplete">
      <div>
        <div>
          <WppAutocomplete
            class="item"
            required
            :labelConfig="{
              text: 'Single Autocomplete with search',
            }"
            placeholder="Select fruits"
            :value="basicValue"
            @wppChange="handleBasicValue"
            data-testid="single-autocomplete"
            showCreateNewElement
            simpleSearch
          >
            <WppListItem v-for="option in fruitOptions" :key="option.id" :value="option" :label="option.label">
              <p slot="label">{{ option.label }}</p>
            </WppListItem>
          </WppAutocomplete>
        </div>

        <div class="bottomItem" data-testid="extended-autocomplete-area">
          <WppAutocomplete
            class="item"
            required
            :labelConfig="{ text: 'Extended Multiple Autocomplete' }"
            placeholder="Select fruits"
            :value="basicValue1"
            @wppChange="handleBasicValue1"
            data-testid="extended-autocomplete"
            type="extended"
            multiple
            simpleSearch
          >
            <WppListItem v-for="option in fruitOptions" :key="option.id" :value="option" :label="option.label">
              <p slot="label">{{ option.label }}</p>
            </WppListItem>
            <SelectedValues :values="basicValue1" @closeClick="value => handleBasicValuePillCloseClick1(value)" />
          </WppAutocomplete>
        </div>
      </div>

      <div>
        <div>
          <WppAutocomplete
            class="item"
            required
            :labelConfig="{
              text: 'Single Autocomplete without search',
            }"
            placeholder="Select fruits"
            @wppChange="handleBasicValue2"
            data-testid="single-autocomplete-without-search"
          >
            <WppListItem v-for="option in fruitOptions" :key="option.id" :value="option" :label="option.label">
              <p slot="label">{{ option.label }}</p>
            </WppListItem>
            <SelectedValues :values="basicValue2" @closeClick="value => handleBasicValuePillCloseClick2(value)" />
          </WppAutocomplete>
        </div>

        <div class="bottomItem" data-testid="regular-autocomplete-area">
          <WppAutocomplete
            class="item"
            required
            :labelConfig="{ text: 'Regular Multiple Autocomplete' }"
            placeholder="Select fruits"
            :value="basicValue3"
            @wppChange="handleBasicValue3"
            type="regular"
            multiple
            simpleSearch
            data-testid="regular-autocomplete"
          >
            <WppListItem v-for="option in fruitOptions" :key="option.id" :value="option" :label="option.label">
              <p slot="label">{{ option.label }}</p>
              <SelectedValues :values="basicValue3" @closeClick="value => handleBasicValuePillCloseClick3(value)" />
            </WppListItem>
          </WppAutocomplete>
        </div>
      </div>

      <div data-testid="s-size-autocompletes">
        <div>
          <WppAutocomplete
            class="item"
            required
            :labelConfig="{ text: 'Regular Autocomplete S size' }"
            placeholder="Select fruits"
            :value="multipleDefaultValues"
            @wppChange="handleMultipleDefaultValues"
            showCreateNewElement
            simpleSearch
            multiple
            size="s"
          >
            <WppListItem v-for="option in fruitOptions" :key="option.id" :value="option" :label="option.label">
              <p slot="label">{{ option.label }}</p>
            </WppListItem>
          </WppAutocomplete>
        </div>

        <div class="bottomItem">
          <WppAutocomplete
            class="item"
            required
            :labelConfig="{ text: 'Extended Autocomplete S size' }"
            placeholder="Select fruits"
            :value="multipleDefaultValues1"
            @wppChange="handleMultipleDefaultValues1"
            data-testid="extended-s-size-autocomplete"
            type="extended"
            multiple
            size="s"
            simpleSearch
          >
            <WppListItem v-for="option in fruitOptions" :key="option.id" :value="option" :label="option.label">
              <p slot="label">{{ option.label }}</p>
            </WppListItem>
            <SelectedValues
              :values="multipleDefaultValues1"
              @closeClick="value => handleMultipleValuePillCloseClick1(value)"
            />
          </WppAutocomplete>
        </div>
      </div>

      <div class="inlineAutocompletes" data-testid="inline-messages-autocompletes">
        <div>
          <WppAutocomplete
            class="item"
            required
            :labelConfig="{ text: 'Autocomplete with error message' }"
            placeholder="Select fruits"
            message="Error message"
            messageType="error"
            data-testid="error-autocomplete"
            loading
          ></WppAutocomplete>
        </div>

        <div :style="{ marginTop: '5px' }">
          <WppAutocomplete
            class="item"
            required
            :labelConfig="{ text: 'Autocomplete with warning message' }"
            placeholder="Select fruits"
            message="Warning message"
            messageType="warning"
          ></WppAutocomplete>
        </div>
      </div>
    </div>
    <h2>Autocomplete - with suggestions</h2>
    <div class="container" data-testid="autocomplete">
      <div>
        <div>
          <WppAutocomplete
            class="item"
            required
            :labelConfig="{
              text: 'Single Autocomplete with search',
            }"
            placeholder="Select fruits"
            :value="basicValue4"
            :suggestions="staticSuggestions"
            @wppChange="handleBasicValue4"
            data-testid="single-autocomplete"
            showCreateNewElement
            simpleSearch
          >
            <WppListItem v-for="option in fruitOptions" :key="option.id" :value="option" :label="option.label">
              <p slot="label">{{ option.label }}</p>
            </WppListItem>
            <SelectedValues :values="basicValue4" @closeClick="value => handleBasicValuePillCloseClick4(value)" />
          </WppAutocomplete>
        </div>

        <div class="bottomItem" data-testid="extended-autocomplete-area">
          <WppAutocomplete
            class="item"
            required
            :labelConfig="{ text: 'Extended Multiple Autocomplete' }"
            placeholder="Select fruits"
            :value="basicValue5"
            :suggestions="staticSuggestions"
            @wppChange="handleBasicValue5"
            data-testid="extended-autocomplete"
            type="extended"
            multiple
            simpleSearch
          >
            <WppListItem v-for="option in fruitOptions" :key="option.id" :value="option" :label="option.label">
              <p slot="label">{{ option.label }}</p>
            </WppListItem>
            <SelectedValues :values="basicValue5" @closeClick="value => handleBasicValuePillCloseClick5(value)" />
          </WppAutocomplete>
        </div>
      </div>

      <div>
        <div>
          <WppAutocomplete
            class="item"
            required
            :labelConfig="{
              text: 'Single Autocomplete without search',
            }"
            placeholder="Select fruits"
            :value="basicValue6"
            @wppChange="handleBasicValue6"
            :suggestions="staticSuggestions"
            data-testid="single-autocomplete-without-search"
          >
            <WppListItem v-for="option in fruitOptions" :key="option.id" :value="option" :label="option.label">
              <p slot="label">{{ option.label }}</p>
            </WppListItem>
            <SelectedValues :values="basicValue6" @closeClick="value => handleBasicValuePillCloseClick6(value)" />
          </WppAutocomplete>
        </div>

        <div class="bottomItem" data-testid="regular-autocomplete-area">
          <WppAutocomplete
            class="item"
            required
            :labelConfig="{ text: 'Regular Multiple Autocomplete' }"
            placeholder="Select fruits"
            :value="basicValue7"
            :suggestions="staticSuggestions"
            @wppChange="handleBasicValue7"
            type="regular"
            multiple
            simpleSearch
            data-testid="regular-autocomplete"
          >
            <WppListItem v-for="option in fruitOptions" :key="option.id" :value="option" :label="option.label">
              <p slot="label">{{ option.label }}</p>
              <SelectedValues :values="basicValue7" @closeClick="value => handleBasicValuePillCloseClick7(value)" />
            </WppListItem>
          </WppAutocomplete>
        </div>
      </div>

      <div data-testid="s-size-autocompletes">
        <div>
          <WppAutocomplete
            class="item"
            required
            :labelConfig="{ text: 'Regular Autocomplete S size' }"
            placeholder="Select fruits"
            :value="multipleDefaultValues2"
            :suggestions="staticSuggestions"
            @wppChange="handleMultipleDefaultValues2"
            showCreateNewElement
            simpleSearch
            multiple
            size="s"
          >
            <WppListItem v-for="option in fruitOptions" :key="option.id" :value="option" :label="option.label">
              <p slot="label">{{ option.label }}</p>
            </WppListItem>
          </WppAutocomplete>
        </div>

        <div class="bottomItem">
          <WppAutocomplete
            class="item"
            required
            :labelConfig="{ text: 'Extended Autocomplete S size' }"
            placeholder="Select fruits"
            :value="multipleDefaultValues3"
            :suggestions="staticSuggestions"
            @wppChange="handleMultipleDefaultValues3"
            data-testid="extended-s-size-autocomplete"
            type="extended"
            multiple
            size="s"
            simpleSearch
          >
            <WppListItem v-for="option in fruitOptions" :key="option.id" :value="option" :label="option.label">
              <p slot="label">{{ option.label }}</p>
            </WppListItem>
            <SelectedValues
              :values="multipleDefaultValues3"
              @closeClick="value => handleMultipleValuePillCloseClick3(value)"
            />
          </WppAutocomplete>
        </div>
      </div>

      <div>
        <div>
          <WppAutocomplete
            class="item"
            required
            :labelConfig="{ text: 'Multiple Autocomplete with slot suggestions' }"
            placeholder="Select fruits"
            :value="multipleDefaultValues4"
            :suggestions="staticSuggestionWithSlots"
            @wppChange="handleMultipleDefaultValues4"
            data-testid="extended-s-size-autocomplete"
            multiple
          >
            <WppListItem v-for="option in fruitOptions" :key="option.id" :value="option" :label="option.label">
              <p slot="label">{{ option.label }}</p>
            </WppListItem>
          </WppAutocomplete>
        </div>
      </div>

      <div>
        <div>
          <WppAutocomplete
            class="dynamicItem"
            :labelConfig="{
              text: 'Single Autocomplete with dynamic suggestions',
            }"
            name="Single Autocomplete with dynamic suggestions"
            placeholder="Select fruits"
            :value="basicValue9"
            :suggestions="dynamicSuggestions"
            @wppChange="handleBasicValue9"
            data-testid="single-autocomplete-dynamic-suggestions"
          >
            <WppListItem v-for="option in fruitOptions" :key="option.id" :value="option" :label="option.label">
              <p slot="label">{{ option.label }}</p>
            </WppListItem>
          </WppAutocomplete>
        </div>
        <div>
          <WppAutocomplete
            class="dynamicItem"
            :labelConfig="{
              text: 'Multiple Autocomplete with dynamic suggestions',
            }"
            name="Multiple Autocomplete with dynamic suggestions"
            placeholder="Select fruits"
            :value="multipleDefaultValues5"
            :suggestions="dynamicSuggestions"
            @wppChange="handleMultipleDefaultValues5"
            multiple
            data-testid="multiple-autocomplete-dynamic-suggestions"
          >
            <WppListItem v-for="option in fruitOptions" :key="option.id" :value="option" :label="option.label">
              <p slot="label">{{ option.label }}</p>
            </WppListItem>
          </WppAutocomplete>
        </div>

        <div>
          <WppAutocomplete
            class="dynamicItem"
            :labelConfig="{
              text: 'Multiple Autocomplete with dynamic suggestions and persistant search',
            }"
            name="Multiple Autocomplete with dynamic suggestions and persitant searc"
            placeholder="Select fruits"
            :value="multipleDefaultValues6"
            @wppChange="handleMultipleDefaultValues6"
            :suggestions="dynamicSuggestions"
            multiple
            persistentSearch
            data-testid="multiple-autocomplete-dynamic-suggestions-search"
          >
            <WppListItem v-for="option in fruitOptions" :key="option.id" :value="option" :label="option.label">
              <p slot="label">{{ option.label }}</p>
            </WppListItem>
          </WppAutocomplete>
        </div>

        <WppButton
          @click="
            () => setDynamicSuggestions(dynamicSuggestions.length === 5 ? SUGGESTIONS_SAMPLE_2 : SUGGESTIONS_SAMPLE_1)
          "
        >
          Update suggestions
        </WppButton>
      </div>
    </div>
    <h2>Autocomplete - rest</h2>
    <div class="container">
      <div>
        <WppAutocomplete
          class="item"
          required
          :labelConfig="{
            text: 'Single Autocomplete with persistent search',
          }"
          placeholder="Select fruits"
          :value="basicValue8"
          @wppChange="handleBasicValue8"
          simpleSearch
          persistentSearch
        >
          <WppListItem v-for="option in fruitOptions" :key="option.id" :value="option" :label="option.label">
            <p slot="label">{{ option.label }}</p>
          </WppListItem>
        </WppAutocomplete>
      </div>

      <div>
        <WppAutocomplete
          class="item"
          required
          :labelConfig="{
            text: 'Single Autocomplete with Infinity loading',
          }"
          placeholder="Select fruits"
          loading
          simpleSearch
        />
      </div>
    </div>
  </div>
</template>

<style>
.item {
  width: 500px;
  margin-right: 20px;
}

.inlineItem {
  width: 300px;
  margin-right: 20px;
}

.inlineAutocompletes {
  height: 200px;
}

.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 300px;
}

.bottomItem {
  height: 200px;
  margin-top: 30px;
}

.dynamicItem {
  margin-bottom: 20px;
}
</style>
