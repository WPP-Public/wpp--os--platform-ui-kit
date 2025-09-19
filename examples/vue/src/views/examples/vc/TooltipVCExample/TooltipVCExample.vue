<script setup lang="ts">
import { createSSRApp, ref } from 'vue'
import { WppButton, WppTooltip, WppTypography, WppListItem } from '@platform-ui-kit/components-library-vue'
import { renderToString } from 'vue/server-renderer'

const placement = ref<'top' | 'bottom'>('top')
const theme = ref('dark')

const handleCopyBtnClick = () => {
  placement.value = placement.value === 'top' ? 'bottom' : 'top'

  console.log('placement.value: ', placement.value)
}

const handleShow = (instance: 'top' | 'bottom') => {
  console.log('Tooltip instance', instance)
}

const handleChangeTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div data-testid="tooltips">
    <div class="container">
      <h2 class="title">Tooltips</h2>
      <div class="containerTooltips">
        <WppTooltip
          :config="{ placement: 'right' }"
          header="Header Text"
          text="Tooltip Message"
          value="$100,000"
          data-testid="right-tooltip-button"
        >
          <WppButton class="button">Right</WppButton>
        </WppTooltip>

        <WppTooltip :config="{ placement: 'top' }" text="Price" value="$100,000" data-testid="top-tooltip-button">
          <WppButton class="button">Top</WppButton>
        </WppTooltip>

        <WppTooltip :config="{ placement: 'left' }" header="Header Only" data-testid="left-tooltip-button">
          <WppButton class="button">Left</WppButton>
        </WppTooltip>

        <WppTooltip
          :config="{ placement: 'top' }"
          :text="`Price\n\nAnd then another row and a row that is really really long because why not we can have such\n\nAnd the Last row`"
          value="$100,000"
          data-testid="top-tooltip-button"
        >
          <WppButton class="button">With word-break: break-word</WppButton>
        </WppTooltip>

        <WppTooltip
          :config="{ placement: 'top' }"
          :wordBreak="'break-all'"
          :text="`Price\n\nAnd then another row and a row that is really really long because why not we can have such\n\nAnd the Last row`"
          value="$100,000"
          data-testid="top-tooltip-button"
        >
          <WppButton class="button">With word-break: break-all</WppButton>
        </WppTooltip>

        <WppTooltip
          :config="{ placement: 'top' }"
          :wordBreak="'auto-phrase'"
          :text="`Price\n\nAnd then another row and a row that is really really long because why not we can have such\n\nAnd the Last row`"
          value="$100,000"
          data-testid="top-tooltip-button"
        >
          <WppButton class="button">With word-break: auto-phrase</WppButton>
        </WppTooltip>

        <WppTooltip
          :config="{
            placement,
            hideOnClick: false,
            onShow: handleShow,
          }"
          text="Tooltip info"
        >
          <WppButton @click="handleCopyBtnClick" data-testid="tippyButton"> Click to update position</WppButton>
        </WppTooltip>
      </div>

      <div class="customTooltipContainer">
        <WppTypography class="customContentTitle" type="2xl-heading"> Tooltips with custom content </WppTypography>
        <WppTooltip :theme="theme" :config="{ placement: 'right', allowHTML: true }">
          <WppButton class="button" data-testid="allow-html-tooltip-button"> Custom Content Tooltip </WppButton>
          <div slot="tooltip-content" class="customContentContainer" :class="{ light: theme === 'light' }">
            <WppListItem class="item">
              <span slot="label">List Item</span>
            </WppListItem>

            <WppListItem class="item">
              <span slot="label">List Item</span>
            </WppListItem>

            <WppListItem class="item">
              <span slot="label">List Item</span>
            </WppListItem>
          </div>
        </WppTooltip>

        <div class="theme-container">
          <WppButton class="changeBtn" @click="handleChangeTheme" data-testid="change-theme-of-tooltip">
            Change theme
          </WppButton>
          <WppTypography type="l-strong">Current theme: {{ theme }}</WppTypography>
        </div>
      </div>

      <div class="otherTooltipsContainer">
        <h2 class="title">Other types of Tooltips</h2>
        <WppTooltip :config="{ placement: 'bottom' }" text="Warning Message" warning data-testid="warning-tooltip">
          <WppButton variant="primary" class="button"> Warning Tooltip </WppButton>
        </WppTooltip>
        <WppTooltip :config="{ placement: 'bottom' }" text="Error Message" error data-testid="error-tooltip">
          <WppButton variant="destructive" class="button"> Error Tooltip </WppButton>
        </WppTooltip>
      </div>
      <div class="otherTooltipsContainer">
        <h4 class="title">Title + Text</h4>
        <WppTooltip :config="{ placement: 'bottom' }" text="Warning Message" header="Title" warning data-testid="warning-tooltip">
          <WppButton variant="primary" class="button"> Warning Tooltip </WppButton>
        </WppTooltip>
        <WppTooltip :config="{ placement: 'bottom' }" text="Error Message" header="Title" error data-testid="error-tooltip">
          <WppButton variant="destructive" class="button"> Error Tooltip </WppButton>
        </WppTooltip>
      </div>
    </div>
  </div>
  `
</template>

<style lang="scss" scoped>
.container {
  margin-top: 20px;
}

.containerTooltips {
  margin-bottom: 20px;
}

.button {
  margin-right: 12px;
}

.title {
  padding-top: 30px;
}

.otherTooltipsContainer {
  padding-bottom: 150px;
}

.customTooltipContainer {
  display: flex;
  flex-direction: column;
  margin-top: 50px;

  .customContentTitle {
    margin-bottom: 20px;
  }

  .theme-container {
    margin-top: 20px;
    display: flex;
    align-items: center;
    flex-direction: row;

    .changeBtn {
      margin-right: 10px;
    }
  }
}

.customContentContainer:not(.light) {
  .item {
    margin-bottom: 4px;

    &::part(item) {
      &:hover {
        background-color: var(--wpp-grey-color-500);
      }
    }

    &::part(label) {
      color: var(--wpp-grey-color-000);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.otherTooltipsContainer {
  padding-bottom: 150px;
}

.customTooltipContainer {
  display: flex;
  flex-direction: column;
  margin-top: 50px;

  .customContentTitle {
    margin-bottom: 20px;
  }

  .theme-container {
    margin-top: 20px;
    display: flex;
    align-items: center;
    flex-direction: row;

    .changeBtn {
      margin-right: 10px;
    }
  }
}

.customContentContainer:not(.light) {
  .item {
    margin-bottom: 4px;

    &::part(item) {
      &:hover {
        background-color: var(--wpp-grey-color-500);
      }
    }

    &::part(label) {
      color: var(--wpp-grey-color-000);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
