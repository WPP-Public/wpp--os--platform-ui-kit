<script lang="ts">
import SelectedValues from '@/views/examples/AutocompleteExample/SelectedValues.vue'
import { WppAutocomplete, WppButton, WppListItem } from '@platform-ui-kit/components-library-vue'
import type { AutocompleteDefaultOption } from '@platform-ui-kit/components-library'
import { defineComponent } from 'vue'
import { delay } from '@platform-ui-kit/react-example/src/utils'

export default defineComponent({
  name: 'ServerLoadSameOptionForDifferentSearch',
  components: {
    WppAutocomplete: WppAutocomplete,
    WppListItem: WppListItem,
    WppButton: WppButton,
    SelectedValues: SelectedValues,
  },
  data() {
    return {
      isLoading: false,
      value: [] as AutocompleteDefaultOption[],
      options: [] as AutocompleteDefaultOption[],
      timer: null,
    }
  },
  methods: {
    createOptions: (optionsNumber: number): AutocompleteDefaultOption[] => [
      {
        id: 'okta',
        label: '1Cloud Okta',
      },
      ...Array(Math.min(optionsNumber, 5))
        .fill(null)
        .map((_, index) => ({
          id: `opt${index}`,
          label: `Additional Option ${index + 1}`,
        })),
    ],

    handleSearchChange: async (event: CustomEvent<string>) => {
      const searchString = event.detail

      this.isLoading = true

      await delay(1000)
      this.options = this.createOptions(searchString.length)

      this.isLoading = false
    },
  },
})
</script>

<template>
  <div class="item">
    <WppAutocomplete
      required
      :loading="isLoading"
      :labelConfig="{ text: 'Server load same option for different search input (option - 1Cloud Okta)' }"
      placeholder='Type "1Cloud Okta"'
      :value="value"
      @wppSearchValueChange="handleSearchChange"
      @wppChange="e => value.value = e.detail.value"
      multiple
      showCreateNewElement
      simpleSearch
      infinite
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
