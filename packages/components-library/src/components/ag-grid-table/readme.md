## AG Grid Table

#### The Table component is not an embedded part of the Open Components Library, but it includes a reference to AG Grid, which is proven to be one of the best industry solutions for tables.

#### Components Library provides all necessary means for the smooth integration with AG Grid: corresponding styles for Table in our theme file to adopt preferrable branding and React & Angular code examples of how to customise AG Grid code base to the Open Design System needs.

#### To create a Table, please refer to the examples below and the official AG Grid Documentation: [JavaScript](https://www.ag-grid.com/javascript-data-grid/), [React](https://www.ag-grid.com/react-data-grid/), [Angular](https://www.ag-grid.com/angular-data-grid/), [Vue](https://www.ag-grid.com/vue-data-grid/). The recommended major version of the library to use is v.28.x.x.

#### [AG Grid Community](https://www.ag-grid.com/archive/28.0.0/javascript-data-grid/getting-started/#getting-started-with-ag-grid-community) version provided for free covers the main needs of the Table components.

#### Corresponding styles for the Table can be found here: `@platform-ui-kit/components-library/dist/collection/ag-theme-wpp.css`

#### ./components/cell-renderer.ts
```tsx
import { Component } from '@angular/core'
import { ICellRendererAngularComp } from 'ag-grid-angular'
import { ICellRendererParams } from 'ag-grid-community'
import { capitalize } from '../../../../utils'

@Component({
  selector: 'app-ag-grid-table-avatar-renderer',
  templateUrl: './cell-renderer.html',
})
export class CellRenderer implements ICellRendererAngularComp {
  public value: string | undefined
  public firstPart: string | undefined
  public secondPart: string | undefined
  public search: string | undefined

  agInit(params: ICellRendererParams & { search: string; searchColumn: string }): void {
    if (params) {
      const { value, search: initSearch, column, searchColumn } = params

      this.value = value

      if (initSearch && column?.getColId() === searchColumn) {
        const splittedValue = value.toLowerCase().split(initSearch.toLowerCase())

        this.firstPart = splittedValue[0]
        this.secondPart = splittedValue[1]

        if (this.firstPart) {
          this.firstPart = capitalize(this.firstPart)
        }

        this.search = this.firstPart ? initSearch : capitalize(initSearch)
      }
    }
  }

  refresh() {
    return false
  }
}
```

#### ./components/cell-renderer.html
```html
<wpp-typography type="s-body" *ngIf="!search">{{ value }}</wpp-typography>
<wpp-typography type="s-body" *ngIf="search">
  {{ firstPart }}<span class="ag-search-highlight">{{search}}</span>{{ secondPart }}
</wpp-typography>
```

#### ./components/avatar-group-renderer.ts
```tsx
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-avatar-group-renderer',
  templateUrl: './avatar-group-renderer.html',
  styleUrls: ['./avatar-group-renderer.scss'],
})
export class AvatarGroupRenderer implements ICellRendererAngularComp {
  public avatars: string[] = [];
  public fullName: string | undefined;

  agInit(params: ICellRendererParams): void {
    this.avatars = params.data.avatarGroup;
    this.fullName = `${params.data.firstName} ${params.data.lastName}`;
  }

  refresh(): boolean {
    return false;
  }
}
```

#### ./components/avatar-group-renderer.html
```html
<div class="avatar-group-cell">
  <wpp-avatar-group
    size="s"
    [avatars]="avatars"
    maxAvatarsToDisplay="3"
  ></wpp-avatar-group>
  <i>{{ fullName }}</i>
</div>
```

#### ./components/custom-loading-overlay.ts
```tsx
import { Component } from '@angular/core'
import { ILoadingOverlayAngularComp } from 'ag-grid-angular'
import { ILoadingOverlayParams } from 'ag-grid-community'

@Component({
  selector: 'app-loading-overlay',
  template: '<wpp-spinner size="m"></wpp-spinner>',
})
export class CustomLoadingOverlay implements ILoadingOverlayAngularComp {
  public params: ILoadingOverlayParams | undefined

  agInit(params: ILoadingOverlayParams): void {
    this.params = params
  }
}
```

#### ./components/no-rows-overlay.ts
```tsx
import { Component } from '@angular/core'
import { INoRowsOverlayAngularComp } from 'ag-grid-angular'
import { INoRowsOverlayParams } from 'ag-grid-community'

@Component({
  selector: 'app-no-rows-overlay',
  template: '<div>No data overlay</div>',
})
export class NoRowsOverlay implements INoRowsOverlayAngularComp {
  public params: INoRowsOverlayParams | undefined

  agInit(params: INoRowsOverlayParams): void {
    this.params = params
  }
}
```

#### ./header-cell-renderer/header-cell-renderer.ts
```tsx
import { Component } from '@angular/core'
import { IHeaderAngularComp } from 'ag-grid-angular'
import { IHeaderParams } from 'ag-grid-community'

@Component({
  selector: 'app-ag-grid-table-header-cell-renderer',
  templateUrl: './header-cell-renderer.html',
})
export class HeaderCellRenderer implements IHeaderAngularComp {
  public params: IHeaderParams | undefined

  agInit(params: IHeaderParams): void {
    this.params = params
  }

  public handleHeaderCellClick = () => {
    if (!this.params || !this.params.enableSorting) return

    const items: ('asc' | 'desc' | null)[] = ['asc', 'desc', null]
    const selectedSort = this.params.column.getSort()
    const selectedSortIndex = selectedSort ? items.indexOf(selectedSort) : -1
    const nextSortType =
      selectedSortIndex === -1 || selectedSortIndex === items.length - 1 ? 'asc' : items[selectedSortIndex + 1]

    this.params.setSort(nextSortType)
  }

  public getColor = (isActive: boolean | undefined): string =>
    isActive ? 'var(--wpp-iconography-color-active)' : 'var(--wpp-grey-color-400)'

  refresh() {
    return false
  }
}
```

#### ./header-cell-renderer/header-cell-renderer.html
```html
<div class="ag-header-cell-comp" (click)='handleHeaderCellClick()'>
  <wpp-typography type='s-strong'>{{ params?.displayName }}</wpp-typography>
  <div class="ag-sorting" *ngIf='params?.enableSorting'>
    <wpp-icon-table-sort-triangle direction='top' [color]='getColor(params?.column?.isSortAscending())'>
    </wpp-icon-table-sort-triangle>
    <wpp-icon-table-sort-triangle direction='down' [color]='getColor(params?.column?.isSortDescending())'>
    </wpp-icon-table-sort-triangle>
  </div>
</div>
```

#### ./actions-renderer/actions-renderer.ts
```tsx
import { Component } from '@angular/core'
import { ICellRendererAngularComp } from 'ag-grid-angular'
import { ICellRendererParams } from 'ag-grid-community'

@Component({
  selector: 'app-ag-grid-table-actions-renderer',
  templateUrl: './actions-renderer.html',
  styleUrls: ['./actions-renderer.scss'],
})
export class ActionsRenderer implements ICellRendererAngularComp {
  public id: number | undefined
  public dropdownConfig = { appendTo: () => document.body, placement: 'right' }

  public handleEditClick = () => alert(`Edit user with id: ${this.id}`)

  public handleDeleteClick = () => alert(`Delete user with id: ${this.id}`)

  agInit(params: ICellRendererParams): void {
    this.id = params.data.id
  }

  refresh() {
    return false
  }
}
```

#### ./actions-renderer/actions-renderer.html
```html
<div class="actions-cell">
  <wpp-menu-context [dropdownConfig]='dropdownConfig'>
    <wpp-action-button slot="trigger-button">
      <wpp-icon-more direction="horizontal" color="var(--wpp-color-primary-500)"></wpp-icon-more>
    </wpp-action-button>
    <wpp-list-item class="centered" (wppChangeListItem)='handleEditClick()'>
      <p slot="label">Edit</p>
    </wpp-list-item>
    <wpp-list-item class="centered" (wppChangeListItem)='handleDeleteClick()'>
      <p slot="label">Delete</p>
    </wpp-list-item>
  </wpp-menu-context>
</div>
```

#### styles.scss
```scss
@import 'ag-grid-community/styles/ag-grid.css';
@import '@platform-ui-kit/components-library/dist/platform-ui-kit/ag-theme-wpp';

.wpp-menu-context-wrapper > :where([hidden]) {
  display: block;
}
```

#### ./component/HeaderCell.tsx
```tsx
import React, { FunctionComponent } from 'react'
import { WppTypography, WppIconTableSortTriangle } from '@platform-ui-kit/components-library-react'
import { IHeaderParams } from 'ag-grid-community'

const HeaderCell: FunctionComponent<IHeaderParams> = props => {
  const handleHeaderCellClick = () => {
    if (!props.enableSorting) return

    const items: ('asc' | 'desc' | null)[] = ['asc', 'desc', null]
    const selectedSort = props.column.getSort()
    const selectedSortIndex = selectedSort ? items.indexOf(selectedSort) : -1
    const nextSortType =
      selectedSortIndex === -1 || selectedSortIndex === items.length - 1 ? 'asc' : items[selectedSortIndex + 1]

    props.setSort(nextSortType)
  }

  const getColor = (isActive: boolean): string =>
    isActive ? 'var(--wpp-iconography-color-active)' : 'var(--wpp-grey-color-400)'

  return (
    <div className="ag-header-cell-comp" onClick={() => handleHeaderCellClick()}>
      <WppTypography type="s-strong">{props.displayName}</WppTypography>
      {props.enableSorting && (
        <div className="ag-sorting">
          <WppIconTableSortTriangle direction="top" color={getColor(props.column.isSortAscending())} />
          <WppIconTableSortTriangle direction="down" color={getColor(props.column.isSortDescending())} />
        </div>
      )}
    </div>
  )
}

export default HeaderCell
```

#### ./components/DefaultCellRenderer.vue
```vue
<script lang="ts">
import { defineComponent } from "vue";

import { WppTypography } from "@platform-ui-kit/components-library-vue";
import { capitalize } from "@/utils";

export default defineComponent({
  components: {
    WppTypography: WppTypography,
  },
  data() {
    return {
      firstPart: "",
      secondPart: "",
      search: "",
      value: "",
    };
  },
  beforeMount() {
    this.calculateDisplayParts(this.params);
  },
  methods: {
    calculateDisplayParts(params) {
      if (params) {
        const { value, search: initSearch, column, searchColumn } = params;

        this.value = value;

        if (initSearch && column?.getColId() === searchColumn) {
          const splittedValue = value
            .toLowerCase()
            .split(initSearch.toLowerCase());

          this.firstPart = splittedValue[0];
          this.secondPart = splittedValue[1];

          if (this.firstPart) {
            this.firstPart = capitalize(this.firstPart);
          }

          this.search = this.firstPart ? initSearch : capitalize(initSearch);
        }
      }
    },
  },
});
</script>

<template>
  <WppTypography type="s-body" v-if="!search">{{ value }}</WppTypography>
  <WppTypography type="s-body" v-if="search">
    {{ firstPart }}<span class="ag-search-highlight">{{ search }}</span
    >{{ secondPart }}
  </WppTypography>
</template>

<style scoped></style>
```

#### ./components/HeaderCellRenderer.vue
```vue
<script lang="ts">
import { defineComponent } from "vue";

import {
  WppTypography,
  WppIconSort,
} from "@platform-ui-kit/components-library-vue";

export default defineComponent({
  components: {
    WppTypography: WppTypography,
    WppIconSort: WppIconSort,
  },
  setup(props) {
    const { displayName, enableSorting } = props.params;

    return {
      params: props.params,
      enableSorting,
      displayName,
    };
  },
  methods: {
    handleHeaderCellClick() {
      const props = this.params;
      if (!props.enableSorting) return;

      const items: ("asc" | "desc" | null)[] = ["asc", "desc", null];
      const selectedSort = props.column.getSort();
      const selectedSortIndex = selectedSort ? items.indexOf(selectedSort) : -1;
      const nextSortType =
        selectedSortIndex === -1 || selectedSortIndex === items.length - 1
          ? "asc"
          : items[selectedSortIndex + 1];

      props.setSort(nextSortType);
    },
  },
});
</script>

<template>
  <div class="ag-header-cell-comp" @click="handleHeaderCellClick">
    <WppTypography type="s-strong">{{ displayName }}</WppTypography>
    <div class="ag-sorting" v-if="enableSorting">
      <WppIconSort class="top-sort-icon" />
    </div>
  </div>
</template>

<style scoped></style>
```

#### ./components/LoadingOverlay.vue
```vue
<script lang="ts">
import { defineComponent } from "vue";
import { WppSpinner } from "@platform-ui-kit/components-library-vue";

export default defineComponent({
  components: {
    WppSpinner: WppSpinner,
  },
});
</script>

<template>
  <WppSpinner size="m" />
</template>

<style scoped></style>
```

#### ./components/ActionsCellRenderer.vue
```vue
<script lang="ts">
import { defineComponent } from "vue";

import {
  WppMenuContext,
  WppListItem,
  WppActionButton,
  WppIconMore,
} from "@platform-ui-kit/components-library-vue";

export default defineComponent({
  components: {
    WppMenuContext: WppMenuContext,
    WppListItem: WppListItem,
    WppActionButton: WppActionButton,
    WppIconMore: WppIconMore,
  },
  setup(props) {
    const { data } = props.params;

    return {
      id: data.id,
      dropdownConfig: {
        appendTo: () => document.body,
        placement: "right",
      },
    };
  },
  methods: {
    handleItemClick(action: string) {
      alert(`${action} user with id: ${this.id}`);
    },
  },
});
</script>

<template>
  <div class="column-data">
    <WppMenuContext :dropdownConfig="dropdownConfig">
      <WppActionButton slot="trigger-element">
        <WppIconMore
          direction="horizontal"
          color="var(--wpp-color-primary-500)"
          slot="icon-start"
        />
      </WppActionButton>
      <div>
        <WppListItem
          class="centered"
          @wppChangeListItem="() => handleItemClick('Edit')"
        >
          <p slot="label">Edit</p>
        </WppListItem>
        <WppListItem
          class="centered"
          @wppChangeListItem="() => handleItemClick('Delete')"
        >
          <p slot="label">Delete</p>
        </WppListItem>
      </div>
    </WppMenuContext>
  </div>
</template>

<style scoped></style>
```

#### ./components/AvatarGroupCellRenderer.vue
```vue
<script lang="ts">
import { defineComponent } from "vue";
import { WppAvatarGroup } from "@platform-ui-kit/components-library-vue";

export default defineComponent({
  components: {
    WppAvatarGroup,
  },
  setup(props) {
    const { data } = props.params;

    return {
      avatars: data.avatarGroup,
      fullName: `${data.firstName} ${data.lastName}`,
    };
  },
});
</script>

<template>
  <div class="avatar-group-cell">
    <WppAvatarGroup
      size="s"
      :avatars="avatars"
      maxAvatarsToDisplay="3"
    />
    <i>{{ fullName }}</i>
  </div>
</template>

<style scoped lang="scss">
.avatar-group-cell {
  display: flex;
  align-items: center;

  i {
    margin-left: 12px;
  }
}
</style>
```
