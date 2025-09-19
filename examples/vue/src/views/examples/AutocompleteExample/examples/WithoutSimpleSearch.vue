<script lang="ts">
import { WppAutocomplete, WppListItem, WppButton } from '@platform-ui-kit/components-library-vue'
import type { AutocompleteDefaultOption } from '@platform-ui-kit/components-library'

import { defineComponent } from 'vue'
import { delay } from '@platform-ui-kit/react-example/src/utils'
import SelectedValues from '@/views/examples/AutocompleteExample/SelectedValues.vue'

export default defineComponent({
  name: 'WithoutSimpleSearch',
  components: {
    WppAutocomplete: WppAutocomplete,
    WppListItem: WppListItem,
    WppButton: WppButton,
    SelectedValues: SelectedValues,
  },
  data() {
    return {
      isMultiple: true,
      value: [] as AutocompleteDefaultOption[],
      initialOptions: [] as AutocompleteDefaultOption[],
      options: [] as AutocompleteDefaultOption[],
      isLoading: false,
      timer: null,
    }
  },
  methods: {
    createSingleOption: (label: string): AutocompleteDefaultOption => ({ id: label, label }),

    handleSearchChange: (event: CustomEvent<string>) => {
      const searchString = event.detail

      this.isLoading = true

      delay(1000)
      this.options = this.initialOptions.filter(option => option.label.toLowerCase().includes(searchString.toLowerCase()))

      this.isLoading = false
    },
  },
})
</script>

<template>
  <div class="item">
    <WppButton
      @click="() => {
       isMultiple = !isMultiple
       value = []
      }"
    >
      {{ isMultiple ? 'Multiple' : 'Single' }} mode
    </WppButton>
    <WppAutocomplete
      required
      :loading="isLoading"
      :labelConfig="{ text: `Server load without simple search in a ${isMultiple ? 'Multiple' : 'Single'} mode` }"
      placeholder="Type"
      :value="value"
      @wppSearchValueChange="handleSearchChange"
      @wppChange="e => value(e.detail.value as AutocompleteDefaultOption[])"
      :multiple="isMultiple"
      showCreateNewElement
      v-for="option in options"
    >
      <WppListItem :key="option.id" :value="option" :label="option.label">
        <p slot="label">{{ option.label }}</p>
      </WppListItem>
      <SelectedValues
        :values="value"
        @closeClick="clickedValue => value(value.filter(i => i.id !== clickedValue))"
      />
    </WppAutocomplete>
  </div>
</template>
