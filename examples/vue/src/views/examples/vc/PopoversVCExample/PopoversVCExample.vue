<script setup lang="ts">
import {
  WppPopover,
  WppInput,
  WppButton,
  WppTypography,
  WppDivider,
  WppActionButton,
  WppAvatar,
  WppListItem,
  WppInlineEdit,
  WppSelect,
} from '@platform-ui-kit/components-library-vue'
import { ref } from 'vue'
import { usersList } from './config'
import type { User } from './types'
import type {
  InputChangeEventDetail,
  ListItemChangeEventDetail,
  InlineEditMode,
} from '@platform-ui-kit/components-library'
import { SAMPLE_LIST_2 } from '../../SingleSelect/consts'

const defaultPopoverRef = ref<HTMLWppPopoverElement | null>(null)
const extendedPopoverRef = ref<HTMLWppPopoverElement | null>(null)
const currentUser = ref<User>(usersList[0])
const searchValue = ref('')
const users = ref(usersList)

const inputText1 = ref('')
const inputMode1 = ref<InlineEditMode>('read')

const persistantSearch = ref<boolean>(false)
const popoverSearchValue = ref<string>('')

const handleCloseButtonClick = () => {
  if (defaultPopoverRef?.value?.closePopover) {
    defaultPopoverRef?.value?.closePopover()
  }
}

const handleOpenPopover = () => {
  console.log('Popover', defaultPopoverRef.value)
  if (defaultPopoverRef?.value?.openPopover) {
    defaultPopoverRef?.value?.openPopover()
  }
}

const handleSubmitButtonClick = () => {
  alert('Some message')
}

const handleInputChange = (event: CustomEvent<InputChangeEventDetail>) => {
  const newSearchValue = event.detail.value as string

  searchValue.value = newSearchValue

  users.value = newSearchValue
    ? usersList.filter(user => user.name.toLowerCase().includes(newSearchValue.toLowerCase()))
    : usersList
}

const handleListItemChecked = (event: CustomEvent<ListItemChangeEventDetail>, src: string) => {
  const userName = event.detail.label as string

  currentUser.value = { name: userName, src }
  searchValue.value = ''

  setTimeout(() => {
    users.value = usersList
  }, 300)

  extendedPopoverRef?.value?.closePopover()
}

const handleSearchChange = (event: CustomEvent) => {
  console.log('On Change search event:', event)

  popoverSearchValue.value = event.detail.value
}

const setPopoverSearchValue = () => {
  popoverSearchValue.value = 'Test'
}

const setPersistantSearch = () => {
  persistantSearch.value = !persistantSearch.value
}

const setPopoverRef = (node: any) => {
  console.log('Node', node)
  defaultPopoverRef.value = node as HTMLWppPopoverElement
}

const setExtendedPopoverRef = (node: any) => {
  extendedPopoverRef.value = node as HTMLWppPopoverElement
}

const setInputMode1 = (mode: InlineEditMode) => {
  inputMode1.value = mode
}

const setInputText1 = (text: string) => {
  inputText1.value = text
}

const onChangeInlineEdit = (event: CustomEvent) => {
  console.log(event.detail)
  setInputMode1(event.detail.mode)
  if (event.detail.mode === 'read') {
    event.detail.closePopover()
  }
}

const onChangeSelect = (e: CustomEvent) => {
  console.log('On Change', e.detail)
}

const onSearchChangePopover = (event: CustomEvent) => {
  console.log('On Change search event:', event)
}
</script>

<template>
  <div class="popoversPage">
    <div class="item" data-testid="default-popover">
      <WppPopover class="defaultPopover" closable :ref="setPopoverRef">
        <WppButton variant="secondary" slot="trigger-element"> Trigger button to open Popover </WppButton>
        <div class="defaultContent" data-testid="popover-content">
          <div class="header">
            <WppTypography type="m-strong">Title</WppTypography>
          </div>
          <WppDivider class="divider" />
          <div class="body">
            <WppTypography class="text">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            </WppTypography>
          </div>
          <WppDivider class="divider" />
          <div class="actions">
            <WppActionButton variant="secondary" class="secondaryButton" @click="handleCloseButtonClick">
              Close
            </WppActionButton>
            <WppActionButton @click="handleSubmitButtonClick">Submit</WppActionButton>
          </div>
        </div>
      </WppPopover>

      <WppButton className="openBtn" @click="handleOpenPopover">Open Popover</WppButton>
    </div>

    <div class="item" data-testid="custom-popover">
      <WppPopover :ref="setExtendedPopoverRef">
        <div slot="trigger-element" class="triggerWrapper">
          <WppAvatar size="s" :src="currentUser.src" class="avatar" />
          <WppTypography type="s-strong" class="description">
            {{ currentUser.name }}
          </WppTypography>
        </div>
        <div class="extendedContent">
          <div class="header">
            <WppInput
              :value="searchValue"
              placeholder="Search"
              type="search"
              class="searchInput"
              @WppChange="handleInputChange"
            />
            <WppDivider class="divider" />
          </div>
          <div class="body">
            <WppListItem
              v-for="user in users"
              class="userItem"
              @wppChangeListItem="(event: CustomEvent<ListItemChangeEventDetail>) => handleListItemChecked(event, user.src)"
              :checked="currentUser?.name === user.name"
            >
              <p slot="label">{{ user.name }}</p>
              <WppAvatar size="xs" :src="user.src" :name="user.name" slot="left" />
            </WppListItem>
            <WppListItem class="userItem" disabled v-if="users.length === 0">
              <p slot="label">Nothing Found</p>
            </WppListItem>
          </div>
        </div>
      </WppPopover>
    </div>

    <div class="withSearch">
      <WppTypography class="withSearchTitle" type="l-body"> Popover with `withSearch=true` property </WppTypography>
      <WppPopover
        with-search
        :persistant-search="persistantSearch"
        search-name="Dropdown Input with no content"
        :search-value="popoverSearchValue"
        @wpp-search-change="handleSearchChange"
      >
        <WppButton slot="trigger-element" variant="secondary"> With no content </WppButton>
      </WppPopover>

      <WppPopover
        with-search
        :persistant-search="persistantSearch"
        search-name="Dropdown Input with content"
        :search-value="popoverSearchValue"
        @wpp-search-change="handleSearchChange"
      >
        <WppButton slot="trigger-element" variant="secondary"> With content </WppButton>
        <div class="withSearchContent">
          <WppTypography class="contentText" type="m-body"> Content inside the popover. </WppTypography>
        </div>
      </WppPopover>

      <WppButton @click="setPopoverSearchValue">Set search value to: 'Test'</WppButton>
      <WppButton @click="setPersistantSearch">
        Toggle persistantSearch: {{ persistantSearch ? 'disable' : 'enable' }}
      </WppButton>
    </div>

    <div class="scenario">
      <WppTypography class="title" type="xl-heading">
        Scenario 01: Placing other components with dropdowns inside the popover
      </WppTypography>

      <WppTypography class="subTitle" type="m-body">
        - Note: The popover's dropdown should close only when clicking outside of the popover. The dropdown of the
        select is considered as part of the popover's dropdown.
      </WppTypography>

      <div class="content">
        <WppPopover withSearch searchName="Popover with content" @wppSearchChange="onSearchChangePopover">
          <WppButton slot="trigger-element" variant="secondary"> With content </WppButton>
          <div class="withComponents">
            <WppTypography class="contentText" type="m-body"> Content inside the popover. </WppTypography>

            <WppSelect
              type="multiple"
              name="select-component"
              class="selectItem"
              :list="SAMPLE_LIST_2"
              :labelConfig="{
                text: 'Size M',
              }"
              placeholder="Choose option"
              :value="[]"
              @wppChange="onChangeSelect"
            />

            <WppInlineEdit
              :value="inputText1"
              :mode="inputMode1"
              inputWidth="150px"
              @wppModeChange="onChangeInlineEdit"
              data-testid="default-input-inline-edit"
            >
              <WppInput
                size="s"
                slot="form-element"
                name="test"
                :value="inputText1"
                @wppChange="(e: CustomEvent) => {
                    setInputText1(e.detail.value!)
                  }"
              />
            </WppInlineEdit>
          </div>
        </WppPopover>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.popoversPage {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding-left: 50px;

  .defaultPopover {
    margin-right: 200px;
  }
}

.defaultContent {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 260px;
  height: 200px;

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 8px 8px 7px 16px;
    max-width: calc(100% - 55px);
  }

  .divider {
    --divider-bg-color: var(--wpp-grey-color-300);
  }

  .body {
    display: flex;
    padding: 8px 12px 8px 16px;
    overflow-y: auto;

    .text {
      height: fit-content;
    }

    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    &::-webkit-scrollbar-thumb {
      border: 2px solid transparent;
      border-radius: 4px;
      box-shadow: inset 0 0 0 3px var(--wpp-grey-color-400);
    }
  }

  .actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 8px;

    .secondaryButton {
      margin-right: 4px;
    }
  }
}

.triggerWrapper {
  display: flex;
  align-items: center;
  cursor: pointer;

  .avatar {
    margin-right: 4px;
    cursor: pointer;
  }

  .description {
    cursor: pointer;
  }
}

.extendedContent {
  display: flex;
  flex-direction: column;
  width: 256px;
  height: fit-content;

  .header {
    display: flex;
    flex-direction: column;

    .searchInput {
      --text-input-border-color: '';
      --text-input-border-width: 0;

      &::part(input) {
        border-radius: 0;
      }
    }

    .divider {
      --divider-bg-color: var(--wpp-grey-color-300);
    }
  }

  .body {
    display: flex;
    flex-direction: column;
    max-height: 324px;
    padding: 5px 4px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    &::-webkit-scrollbar-thumb {
      border: 2px solid transparent;
      border-radius: 4px;
      box-shadow: inset 0 0 0 3px var(--wpp-grey-color-400);
    }

    .userItem {
      &:not(:last-child) {
        margin-bottom: 4px;
      }

      p {
        margin: 0;
      }
    }
  }

  .actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 8px;

    .secondaryButton {
      margin-right: 4px;
    }
  }
}

.item {
  width: 275px;
  margin-bottom: 40px;
  margin-right: 100px;
}

.openBtn {
  margin-top: 20px;
}

.withSearch {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 20px;
  // This padding to be removed when additional content is added on the page.
  // The only reason this was added was to have space below the element to test positioning of dropdown.
  padding-bottom: 100px;
}

.withSearchContent {
  padding: 10px 20px;
  box-sizing: border-box;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;

  .contentText {
    margin-bottom: 200px;
  }
}

.scenario {
  padding-bottom: 100px;

  .subTitle {
    margin: 20px 0;
  }
}

.withComponents {
  box-sizing: border-box;
  width: 300px;
  max-height: 400px;
  padding: 10px 20px;
  overflow-y: auto;

  .contentText {
    margin-bottom: 50px;
  }

  .selectItem {
    margin-bottom: 20px;
  }
}
</style>
