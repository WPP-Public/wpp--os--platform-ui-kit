<script lang="ts">
import { defineComponent } from 'vue'

import {
  WppInlineMessage,
  WppAvatar,
  WppSelect,
  WppListItem,
  WppTextareaInput,
  WppFileUpload,
  WppButton,
} from '@platform-ui-kit/components-library-vue'

export default defineComponent({
  name: 'FirstPage',
  components: {
    WppInlineMessage: WppInlineMessage,
    WppAvatar: WppAvatar,
    WppSelect: WppSelect,
    WppListItem: WppListItem,
    WppTextareaInput: WppTextareaInput,
    WppFileUpload: WppFileUpload,
    WppButton: WppButton,
  },
  methods: {
    handleCloseSideModal() {
      this.$emit('closeSideModal')
    },
    handleNextPage() {
      this.$emit('openNextPage')
    },
  },
})
</script>

<template>
  <div slot="header">First Page Title</div>
  <div slot="body">
    <WppInlineMessage
      size="m"
      message="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
      type="information"
    />
    <WppAvatar
      size="m"
      name="John Doe"
      withTooltip
      :tooltipConfig="{
        placement: 'left',
        popperOptions: {
          modifiers: [
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['left'],
              },
            },
          ],
        },
      }"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8huvp8b3bXl2v8ac6MSqz0Uk3zqauY2ttIA&usqp=CAU"
    />
    <p>First Page Body</p>
    <WppSelect
      placeholder="Placeholder"
      :list="[
        {
          value: 1,
          label: 'Car',
        },
        {
          value: 2,
          label: 'House',
          disabled: true,
        },
        {
          value: 3,
          label: 'Apartment',
        },
      ]"
    >
    </WppSelect>
    <WppTextareaInput
      placeholder="Enter text"
      value="Regular Text Area with Limit"
      :charactersLimit="10"
      required
      :labelConfig="{
        text: 'Regular Text Area with Limit',
      }"
    />
    <WppFileUpload />
  </div>
  <div slot="actions">
    <WppButton variant="secondary" size="m" @click="handleCloseSideModal"> Cancel </WppButton>
    <WppButton variant="destructive" class="margin" @click="handleNextPage"> Next Page </WppButton>
  </div>
</template>

<style scoped>
.margin {
  margin-left: 10px;
}

.message p {
  line-height: 1.3;
}
</style>
