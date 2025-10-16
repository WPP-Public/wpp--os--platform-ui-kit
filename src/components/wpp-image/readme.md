# wpp-empty

Create OS error illustrations as images for empty states.

## Usage

### Angular

```html
<wpp-empty-content></wpp-empty-content>
<wpp-empty-404 width="250"></wpp-empty-404>
```


### React

```tsx
import { WppEmpty404, WppEmptyContent } from '@wppopen/components-library-react'

export const WppEmptyExample = () => (
  <>
    <WppEmptyContent />
    <WppEmpty404 width={250} />
  </>
)
```


### Vue

```vue
<script setup lang="ts">
import { WppEmptyContent, WppEmpty404 } from '@wppopen/components-library-vue'
</script>

<template>
  <WppEmptyContent />
  <WppEmpty404 width='250' />
</template>
```

## Namings

| Label | Angular | Vue/React |
| ----- | ---- | ---- |
| `Notifications` | `wpp-empty-notifications` | `WppEmptyNotifications` |
| `Folder` | `wpp-empty-folder` | `WppEmptyFolder` |
| `Table` | `wpp-empty-table` | `WppEmptyTable` |
| `Cards` | `wpp-empty-cards` | `WppEmptyCards` |
| `Content` | `wpp-empty-content` | `WppEmptyContent` |
| `DataViz` | `wpp-empty-dataViz` | `WppEmptyDataviz` |
| `Nothing Found` | `wpp-empty-nothing-found` | `WppEmptyNothingFound` |
| `404` | `wpp-empty-404` | `WppEmpty404` |
| `Error` | `wpp-empty-error` | `WppEmptyError` |
| `No Connection` | `wpp-empty-no-connection` | `WppEmptyNoConnection` |
| `No Access` | `wpp-empty-no-access` | `WppEmptyNoAccess` |

## Properties

| Property | Attribute | Description | Type     | Default     |
| -------- | --------- | ----------- | -------- | ----------- |
| `height` | `height`  | Image height | `number` | `160` |
| `width`  | `width`   | Image width  | `number` | `160` |

---

_Built with [StencilJS](https://stenciljs.com/)_
