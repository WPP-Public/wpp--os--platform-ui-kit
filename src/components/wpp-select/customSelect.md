## Custom select with WppTree

The following example contains a Custom Select (WppPopover + WppSelect) that has a WppTree in the dropdown.

## Usage

### React

```tsx
import React, { useRef, useState, useMemo } from 'react'
import styles from '../CustomSelect.module.scss'
import {
  WppPopover,
  WppTypography,
  WppSelect,
  WppTree,
  WppActionButton,
} from '@wppopen/components-library-react'
import { TreeChangeEventDetail, TreeType } from '@wppopen/components-library'
import { dataWithLongNames } from '../../vc/Tree/config'

const TreeInCustomSelect = () => {
  const treeRef = useRef<HTMLWppTreeElement | null>(null)

  // The text rendered in the select
  const [displayValue, setDisplayValue] = useState<string>('')
  // Controls the direction of the chevron icon in the select
  const [isOpened, setIsOpened] = useState<boolean>(false)
  // The data displayed in the tree
  const [treeData, setTreeData] = useState<TreeType[]>(dataWithLongNames)

  const [searchValue, setSearchValue] = useState<string>('')
  // Needed in order to correctly set the truncation on the first-level items in the tree when page loads.
  const [hasLoaded, setHasLoaded] = useState<boolean>(false)

  const memoConfig = useMemo(
    () => ({
      triggerElementWidth: true,
      onShow: () => {
        setIsOpened(true)
        setHasLoaded(true)

        if (treeRef.current) {
          treeRef.current.recalculateTreeWidth()
        }
      },
      onHidden: () => setIsOpened(false),
    }),
    [setIsOpened],
  )

  const handleTreeChange = (event: CustomEvent<TreeChangeEventDetail>) => {
    setTreeData(event.detail.treeState)

    setDisplayValue(event.detail.selectedItems?.map((item: TreeType | null) => item?.title || '').join(', ') || '')
  }

  const handleClearAll = () => {
    if (treeRef.current) {
      treeRef.current.clearAll()
    }
  }

  const handleSelectAll = () => {
    if (treeRef.current) {
      treeRef.current.selectAll()
    }
  }

  return (
    <div className={styles.scenario}>
      <WppTypography className={styles.title} type="xl-heading">
        Placing a WppTree inside a Custom Select (WppSelect + WppPopover). The search has persistantSearch="true"
      </WppTypography>

      <div className={styles.content}>
        <WppPopover
          withSearch
          searchValue={searchValue}
          persistantSearch
          searchName="Popover with content"
          onWppSearchChange={(event: CustomEvent) => {
            setSearchValue(event.detail.value)
          }}
          config={memoConfig}
        >
          <WppSelect
            className={styles.selectAnchor}
            displayValue={displayValue}
            slot="trigger-element"
            isDropdownOpen={isOpened}
            placeholder="Select action"
            labelConfig={{ text: 'Custom select using WppSelect + WppPoppover' }}
            required
          />

          <div className={styles.customSelectContent}>
            <div className={styles.customList}>
              <WppTree
                ref={treeRef}
                className={styles.tree}
                skeletonNumberItems={dataWithLongNames.length}
                loading={!hasLoaded}
                data={treeData}
                multiple
                withItemsTruncation
                search={searchValue}
                onWppChange={handleTreeChange}
                data-testid="multiple-tree"
              />
            </div>

            <div className={styles.customSelectActions}>
              <WppActionButton onClick={handleSelectAll} variant="secondary">
                Select All
              </WppActionButton>
              <WppActionButton onClick={handleClearAll} variant="secondary">
                Clear All
              </WppActionButton>
            </div>
          </div>
        </WppPopover>
      </div>
    </div>
  )
}

export default TreeInCustomSelect
```

```scss
// styles.scss
.scenario {
  margin-top: 50px;
  padding-bottom: 100px;

  .subTitle {
    margin: 20px 0;
  }

  .title {
    margin-bottom: 20px;
  }
}

.selectAnchor {
  width: 400px;
}

.customSelectContent {
  .customList {
    padding: 0 10px;

    max-height: 400px;
    overflow-y: auto;
  }

  .customSelectActions {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    box-sizing: border-box;
  }
}
```

```ts
// config.ts
export const dataWithLongNames: TreeType[] = [
  {
    title:
      'Cars Cars Cars Cars CarsCars Cars Cars Cars CarsCars Cars Cars Cars CarsCars Cars Cars Cars CarsCars Cars Cars Cars Cars Camry',
    iconsEnd: [
      { icon: `wpp-icon-arrow`, name: 'remove' },
      { icon: 'wpp-icon-cross', name: 'save' },
    ],
    iconEnd: {
      icon: 'wpp-icon-cross',
      name: 'edit',
    },
    id: 'test',
    children: [
      {
        title: 'Infinity',
        open: true,
        id: '0-0',
        isNotSelectable: true,
        indeterminate: true,
        children: [
          {
            id: '0-0-0',
            title:
              'Avalon Avalon Avalon Avalon AvalonAvalon Avalon Avalon Avalon AvalonAvalon Avalon Avalon Avalon Avalon',
            disabled: true,
          },
          {
            id: '0-0-1',
            title: 'Prius',
            disabled: true,
            iconsEnd: [
              {
                icon: 'wpp-icon-arrow',
                name: 'remove',
              },
              {
                icon: 'wpp-icon-cross',
                name: 'save',
              },
            ],
          },
          {
            id: '0-0-2',
            indeterminate: true,
            title:
              'Camry Variants Camry Variants Camry Variants Camry Variants Camry Variants Camry Variants Camry Variants Camry Variants',
            iconsEnd: [
              {
                icon: 'wpp-icon-arrow',
                name: 'remove',
              },
              {
                icon: 'wpp-icon-cross',
                name: 'save',
              },
            ],
            children: [
              {
                id: '0-0-0-0',
                title: 'Camry 3.5',
              },
              {
                id: '0-0-0-1',
                title: 'Camry Hybrid',
              },
            ],
          },
        ],
      },
      {
        title: 'skoda 12',
        id: '0-1',
        children: [
          {
            title: 'Kodiaq',
            id: '0-1-0',
            iconEnd: {
              icon: 'wpp-icon-pen',
              name: 'edit',
            },
          },
          {
            title: 'Superb',
            id: '0-1-1',
          },
          {
            title: 'Octavia',
            id: '0-1-2',
          },
          {
            title: 'Porshe',
            id: '0-1-3',
            children: [
              {
                title: 'Macan',
                id: '0-1-3-0',
              },
            ],
          },
        ],
      },
      {
        title: 'Volkswagen',
        id: '0-2',
        endContent: {
          contentType: 'text',
          props: {
            text: 'Due in 3 days',
          },
        },
        children: [
          {
            title: 'Passat',
            id: '0-2-0',
            endContent: {
              contentType: 'tag',
              props: {
                label: 'Positive',
                variant: 'positive',
                icon: 'wpp-icon-trend-ascend',
                className: 'tree-end-content-tag',
              },
            },
          },
          {
            title: 'Tiguan',
            id: '0-2-1',
            endContent: {
              contentType: 'avatar',
              props: {
                src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiB6O_lfxeRec_iL5xnCkXpYVSKcbR2ouoMA&usqp=CAU',
                alt: 'User Avatar',
                name: 'User 1',
                color: 'var(--wpp-dataviz-color-cat-dark-1)',
              },
            },
          },
          {
            title: 'Touareg',
            id: '0-2-2',
            endContent: {
              contentType: 'avatarGroup',
              props: {
                avatars: [
                  {
                    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiB6O_lfxeRec_iL5xnCkXpYVSKcbR2ouoMA&usqp=CAU',
                    name: 'User 1',
                  },
                  { src: '', name: 'User 2' },
                  { src: '', name: 'User 3' },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Motorcycle',
    id: '1',
  },
  {
    title: 'Planes',
    id: '2',
    children: [
      {
        id: '2-0',
        title: 'B-52',
      },
      {
        id: '2-1',
        title: 'MIG-21',
      },
    ],
  },
]
```

### Vue

```vue
<template>
  <div class="scenario">
    <WppTypography class="title" type="xl-heading">
      Placing a WppTree inside a Custom Select (WppSelect + WppPopover). The search has persistantSearch="true"
    </WppTypography>

    <div class="content">
      <WppPopover
        withSearch
        searchName="Popover with content"
        :searchValue="searchValue"
        persistantSearch
        @wppSearchChange="onSearchChange"
        :config="popoverConfig"
      >
        <WppSelect
          class="selectAnchor"
          slot="trigger-element"
          :displayValue="displayValue"
          :isDropdownOpen="isOpened"
          placeholder="Select action"
          :labelConfig="{ text: 'Custom select using WppSelect + WppPoppover' }"
          required
        />

        <div class="customSelectContent">
          <div class="customList">
            <WppTree
              ref="treeRef"
              class="tree"
              :data="treeData"
              :loading="!hasLoaded"
              :skeletonNumberItems="treeData.length"
              multiple
              withItemsTruncation
              :search="searchValue"
              @wppChange="handleTreeChange"
              data-testid="multiple-tree"
            />
          </div>

          <div class="customSelectActions">
            <WppActionButton variant="secondary" @click="handleSelectAll"> Select All </WppActionButton>
            <WppActionButton variant="secondary" @click="handleClearAll"> Clear All </WppActionButton>
          </div>
        </div>
      </WppPopover>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { WppTypography, WppPopover, WppSelect, WppActionButton, WppTree } from '@wppopen/components-library-vue'
import type { TreeType } from '@wppopen/components-library'
import { dataWithLongNames } from './consts'

const treeRef = ref<HTMLWppTreeElement | null>(null)

// The text rendered in the select
const displayValue = ref('')
// Controls the direction of the chevron icon in the select
const isOpened = ref(false)
// The data displayed in the tree
const treeData = ref(dataWithLongNames)

const searchValue = ref('')
// Needed in order to correctly set the truncation on the first-level items in the tree when page loads.
const hasLoaded = ref(false)

// Handle the tree change event
const handleTreeChange = (event: CustomEvent) => {
  treeData.value = event.detail.treeState
  displayValue.value = (event.detail.selectedItems?.map((item: TreeType) => item?.title ?? '') || []).join(', ')
}

const onSearchChange = (event: CustomEvent) => {
  searchValue.value = event.detail.value
}

const handleClearAll = () => {
  if (treeRef.value.$el) {
    treeRef.value.$el.clearAll()
  }
}

const handleSelectAll = () => {
  if (treeRef.value.$el) {
    treeRef.value.$el.selectAll()
  }
}

const popoverConfig = {
  triggerElementWidth: true,
  onShow: () => {
    isOpened.value = true
    hasLoaded.value = true

    if (treeRef.value.$el) {
      treeRef.value.$el.recalculateTreeWidth()
    }
  },
  onHidden: () => {
    isOpened.value = false
  },
}
</script>
<style scoped>
.scenario {
  margin-top: 50px;
  padding-bottom: 100px;
}

.subTitle {
  margin: 20px 0;
}

.title {
  margin-bottom: 20px;
}

.selectAnchor {
  width: 400px;
}

.customList {
  padding: 0 10px;
  max-height: 400px;
  overflow-y: auto;
}

.customSelectActions {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
}
</style>
```

### Angular

```ts
import {
  Component,
  ViewChild,
  ElementRef,
  NgZone,
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import type { TreeType } from '@wppopen/components-library'
import { dataWithLongNames } from './consts'

@Component({
  selector: 'custom-select-example',
  templateUrl: './custom-select-example.page.html',
  styleUrls: ['./custom-select-example.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class TreeInCustomSelectComponent {
  @ViewChild('treeRef', { read: ElementRef }) treeRef?: ElementRef

  // The text rendered in the select
  displayValue = ''
  // Controls the direction of the chevron icon in the select
  isOpened = false
  // The data displayed in the tree
  treeData: TreeType[] = dataWithLongNames as TreeType[]

  searchValue = ''
  // Needed in order to correctly set the truncation on the first-level items in the tree when page loads.
  hasLoaded = false

  constructor(
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
  ) {}

  popoverConfig = {
    triggerElementWidth: true,
    onShow: () => {
      this.zone.run(() => {
        this.isOpened = true
        this.hasLoaded = true

        if (this.treeRef?.nativeElement) {
          this.treeRef.nativeElement.recalculateTreeWidth()
        }

        this.cdr.detectChanges()
      })
    },
    onHidden: () => {
      this.zone.run(() => {
        this.isOpened = false
        this.cdr.detectChanges()
      })
    },
  }

  handleTreeChange(event: Event) {
    this.treeData = (event as CustomEvent).detail.treeState
    const titles = (event as CustomEvent).detail.selectedItems?.map((item: TreeType) => item?.title ?? '') ?? []
    this.displayValue = titles.join(', ')
  }

  onSearchChange(event: Event) {
    this.searchValue = (event as CustomEvent).detail.value
  }

  handleClearAll() {
    if (this.treeRef?.nativeElement && this.treeRef?.nativeElement.clearAll) {
      this.treeRef?.nativeElement.clearAll()
    }
  }

  handleSelectAll() {
    if (this.treeRef?.nativeElement && this.treeRef?.nativeElement.selectAll) {
      this.treeRef?.nativeElement.selectAll()
    }
  }
}
```

```html
<div class="scenario">
  <wpp-typography class="title" type="xl-heading">
    Placing a WppTree inside a Custom Select (WppSelect + WppPopover). The search has persistantSearch="true"
  </wpp-typography>

  <div class="content">
    <!-- Popover wrapper -->
    <wpp-popover
      [withSearch]="true"
      searchName="Popover with content"
      [persistantSearch]="true"
      [searchValue]="searchValue"
      (wppSearchChange)="onSearchChange($event)"
      [config]="popoverConfig"
    >
      <!-- Trigger (WppSelect) -->
      <wpp-select
        class="selectAnchor"
        slot="trigger-element"
        [displayValue]="displayValue"
        [isDropdownOpen]="isOpened"
        placeholder="Select action"
        [labelConfig]="{ text: 'Custom select using WppSelect + WppPopover' }"
        required
      ></wpp-select>

      <!-- Popover content -->
      <div class="customSelectContent">
        <div class="customList">
          <wpp-tree
            #treeRef
            class="tree"
            [data]="treeData"
            multiple
            [loading]="!hasLoaded"
            [skeletonNumberItems]="treeData.length"
            [withItemsTruncation]="true"
            [search]="searchValue"
            (wppChange)="handleTreeChange($event)"
            data-testid="multiple-tree"
          ></wpp-tree>
        </div>

        <div class="customSelectActions">
          <wpp-action-button variant="secondary" (click)="handleSelectAll()"> Select All </wpp-action-button>
          <wpp-action-button variant="secondary" (click)="handleClearAll()"> Clear All </wpp-action-button>
        </div>
      </div>
    </wpp-popover>
  </div>
</div>
```

```scss
.scenario {
  margin-top: 50px;
  padding-bottom: 100px;

  .subTitle {
    margin: 20px 0;
  }

  .title {
    margin-bottom: 20px;
  }
}

.selectAnchor {
  width: 400px;
}

.customSelectContent {
  .customList {
    padding: 0 10px;

    max-height: 400px;
    overflow-y: auto;
  }

  .customSelectActions {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    box-sizing: border-box;
  }
}
```
