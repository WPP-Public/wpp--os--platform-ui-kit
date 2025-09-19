<script setup lang="ts">
import { WppInlineMessage, WppButton } from '@platform-ui-kit/components-library-vue'
import type { MessageTypes } from '@platform-ui-kit/components-library/src/types/common'
import { ref } from 'vue'

const isBtnHidden = ref(false)
const title = ref('Title')

const ITEMS = [
  {
    type: 'warning',
    message: 'Warning message',
  },
  {
    type: 'error',
    message: 'Error message',
  },
  {
    type: 'information',
    message: 'Information message',
  },
  {
    type: 'success',
    message: 'Success message',
  },
]

const handleCloseBtn = () => {
  console.log('Clicked Close')
}

const handleActionBtn = () => {
  console.log('Clicked Action Btn')
}

const handleClickBtn = () => {
  isBtnHidden.value = !isBtnHidden.value
}

const handleClickRemoveTitle = () => {
  title.value = title.value === '' ? 'Title' : ''
}
</script>

<template>
  <div class="container" data-testid="inline-messages-container">
    <div class="sizeL">
      <h3>L Size Messages</h3>

      <div v-for="item in ITEMS" :key="`${item.type}`">
        <WppInlineMessage
          class="item"
          size="l"
          actionBtnText="Action"
          :titleText="title"
          :hide-close-btn="isBtnHidden"
          :message="`${item.message}`"
          :type="`${item.type as MessageTypes}`"
          @wppClickCloseBtn="handleCloseBtn"
          @wppClickActionBtn="handleActionBtn"
        />
      </div>

      <WppInlineMessage
        class="item"
        size="l"
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        :titleText="title === '' ? '' : 'Title (auto)'"
        type="information"
      />

      <WppInlineMessage
        class="item"
        size="l"
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        :titleText="title === '' ? '' : 'Title (30 symbols)'"
        :showTooltipFrom="30"
        type="information"
        data-testid="hover-message"
      />

      <WppInlineMessage
        class="item"
        size="l"
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        :titleText="title"
        type="information"
        data-testid="hover-message"
      />

      <WppButton class="buttonItem" @click="handleClickBtn">{{ isBtnHidden ? 'Show' : 'Hide' }} close button</WppButton>
      <WppButton class="buttonItem" @click="handleClickRemoveTitle"
        >{{ title === '' ? 'Add' : 'Remove' }} title</WppButton
      >
    </div>

    <div class="size">
      <h3>M Size Messages</h3>
      <WppInlineMessage class="item" size="m" message="Warning message" type="warning" />

      <WppInlineMessage class="item" size="m" message="Error message" type="error" />

      <WppInlineMessage class="item" size="m" message="Info message" type="information" />

      <WppInlineMessage class="item" size="m" message="Success message" type="success" />

      <WppInlineMessage
        class="item"
        size="m"
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        type="information"
        data-testid="hover-message"
      />
    </div>

    <div class="size">
      <h3>S Size Messages</h3>
      <WppInlineMessage class="item" size="s" message="Warning message" type="warning" />

      <WppInlineMessage class="item" size="s" message="Error message" type="error" />

      <WppInlineMessage class="item" size="s" message="Info message" type="information" />

      <WppInlineMessage class="item" size="s" message="Success message" type="success" />

      <WppInlineMessage
        class="item"
        size="s"
        type="information"
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
      />

      <WppInlineMessage
        class="item"
        size="s"
        type="information"
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
}

.size,
.sizeL {
  width: 400px;
  margin-right: 30px;
}

.item {
  display: block;
  margin-bottom: 10px;
}

.sizeL {
  padding-bottom: 200px;
}

.buttonItem {
  margin-right: 10px;
}
</style>
