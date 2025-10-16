```vue
<script setup lang="ts">
import { ref } from "vue";

import {
  WppAutocomplete,
  WppTypography,
  WppListItem,
  WppPill,
} from "@wppopen/components-library-vue";

import type { CountryOption } from "./options";
import { countryOptions } from "./options";

const customOptionsValue = ref<CountryOption[]>([]);

const handleCustomOptionsValue = (event: CustomEvent) => {
  customOptionsValue.value = event.detail.value;
};

const suggestions = [
  { id: 101, label: 'Avocado' },
  { id: 102, label: 'Blueberry' },
  { id: 103, label: 'Cherry' },
  { id: 104, label: 'Durian' },
  { id: 105, label: 'Elderberry' },
];

const handleCustomValuePillCloseClick = (selectedValue: CountryOption) => {
  customOptionsValue.value = customOptionsValue.value.filter(
    (i) => i.id !== selectedValue.id
  );
};

</script>

<template>
  <WppAutocomplete
    required
    name="custom-option-labels"
    :labelConfig="{
            text: 'Custom option labels and modified number of tags shown when idle and with suggestions',
          }"
    placeholder="Select countries"
    :value="customOptionsValue"
    @wppChange="handleCustomOptionsValue"
    data-testid="custom-autocomplete"
    :suggestions="suggestions"
    autoFocus
    multiple
    showCreateNewElement
  >
    <WppListItem
      v-for="option in countryOptions"
      :key="option.id"
      :value="option"
      :label="option.label"
    >
      <div slot="label">
        <div class="primary">
          <span class="flag">{{ option.flag }}</span> {{ option.label }}
        </div>
      </div>
      <div class="secondary" slot="caption">
        {{ option.nativeName }}
      </div>
    </WppListItem>
    <div slot="selected-values" class="selected-values">
      <WppPill
        v-for="selectedValue in customOptionsValue"
        :label="selectedValue.label"
        :value="selectedValue.id"
        :key="selectedValue.id"
        type="display"
        @wppClose="() => handleCustomValuePillCloseClick(selectedValue)"
        removable
      >
        {{ selectedValue.label }}
      </WppPill>
    </div>
  </WppAutocomplete>
</template>

<style>
</style>

```
