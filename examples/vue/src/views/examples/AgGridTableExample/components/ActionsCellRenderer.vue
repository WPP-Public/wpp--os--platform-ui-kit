<script lang="ts">
import { defineComponent } from 'vue'

import { WppMenuContext, WppListItem, WppActionButton, WppIconMore } from '@platform-ui-kit/components-library-vue'

export default defineComponent({
  components: {
    WppMenuContext: WppMenuContext,
    WppListItem: WppListItem,
    WppActionButton: WppActionButton,
    WppIconMore: WppIconMore,
  },
  setup(props) {
    const { data } = props.params

    return {
      id: data.id,
      dropdownConfig: {
        appendTo: () => document.body,
        placement: 'right',
      },
    }
  },
  methods: {
    handleItemClick(action: string) {
      alert(`${action} user with id: ${this.id}`)
    },
  },
})
</script>

<template>
  <div class="column-data">
    <WppMenuContext :dropdownConfig="dropdownConfig">
      <WppActionButton slot="trigger-element">
        <WppIconMore direction="horizontal" color="var(--wpp-color-primary-500)" slot="icon-start" />
      </WppActionButton>
      <div>
        <WppListItem class="centered" @wppChangeListItem="() => handleItemClick('Edit')">
          <p slot="label">Edit</p>
        </WppListItem>
        <WppListItem class="centered" @wppChangeListItem="() => handleItemClick('Delete')">
          <p slot="label">Delete</p>
        </WppListItem>
      </div>
    </WppMenuContext>
  </div>
</template>

<style scoped></style>
