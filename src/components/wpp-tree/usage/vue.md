You could use defaultSelectedIds property to pass an array of default selected ids. In order to make several items opened
by default feel free to add 'open: true' property in the data to the desired item.

> Note: Do not use defaultSelectedIds when you are trying to implement custom selection logic.

> Note: single mode accepts only 1 element in array of defaultSelectedIds.

```vue

<script setup lang="ts">
import { ref } from "vue"

import { WppTree } from "@wppopen/components-library-vue"}

const data = [
  {
    title: 'Cars',
    id: '0',
    children: [
      {
        title: 'Toyota',
        // This particular property makes impossible to select item, but you still can open it or operate with icons
        isNotSelectable: true,
        id: '0-0',
        iconsEnd: [
          { icon: `wpp-icon-info`, name: 'remove' },
          { icon: 'wpp-icon-cross', name: 'save' },
        ],
        children: [
          {
            title: 'Avalon',
            id: '0-0-0',
            disabled: true,
          },
          {
            title: 'Prius',
            id: '0-0-1',
            disabled: true,
            iconsEnd: [
              { icon: `wpp-icon-arrow`, name: 'remove' },
              { icon: 'wpp-icon-cross', name: 'save' },
            ],
          },
          {
            title: 'Camry Variants',
            id: '0-0-2',
            iconsEnd: [
              { icon: `wpp-icon-arrow`, name: 'remove' },
              { icon: 'wpp-icon-cross', name: 'save' },
            ],
            children: [
              {
                title: 'Camry 3.5',
                id: '0-0-2-1',
              },
              {
                title: 'Camry Hybrid',
                id: '0-0-2-2',
              },
            ],
          },
        ],
      },
      {
        title: 'Skoda',
        id: '0-1',
        children: [
          {
            title: 'Kodiaq',
            id: '0-1-0',
            someProps: true,
            iconEnd: {
              icon: 'wpp-icon-sad',
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
        ],
      },
      {
        title: 'Volkswagen',
        id: '0-2',
        children: [
          {
            title: 'Passat',
            id: '0-2-0',
          },
          {
            title: 'Tiguan',
            id: '0-2-1',
          },
          {
            title: 'Touareg',
            id: '0-2-2',
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
        title: 'B-52',
        id: '2-0',
      },
      {
        title: 'MIG-21',
        id: '2-1',
      },
    ],
  },
]

const treeData = ref(data)

const handleTreeChange = (event: CustomEvent) => {
  console.log('handleTreeChange event :>> ', event.detail)
  treeData.value = event.detail.treeState
}

const handleActionClick = (event: CustomEvent) => {
  console.log('handleActionClick', event.detail)
}
</script>

<template>
  <h3 class="title">Single tree</h3>
  <WppTree
    class="tree"
    :data="treeData"
    @wppChange="handleTreeChange"
    @wppActionClick="handleActionClick"
  />
</template>


```


```vue
<script setup lang="ts">
import { ref } from 'vue'
import { WppTree } from '@wppopen/components-library-vue'

const treeData = ref([
  {
    title: 'Task 1',
    id: '1',
    endContent: {
      contentType: 'text',
      props: { text: 'Due in 3 days' }
    },
    children: [
      {
        title: 'Subtask 1.1',
        id: '1-1',
        endContent: {
          contentType: 'tag',
          props: {
            label: 'In Progress',
            variant: 'warning',
            icon: 'wpp-icon-info'
          }
        }
      }
    ]
  },
  {
    title: 'Task 2',
    id: '2',
    endContent: {
      contentType: 'avatar',
      props: {
        src: 'https://example.com/avatar1.jpg',
        name: 'John Doe',
        size: 'sm',
      }
    },
    children: [
      {
        title: 'Subtask 2.1',
        id: '2-1',
        endContent: {
          contentType: 'avatarGroup',
          props: {
            avatars: [
              { src: 'https://example.com/avatar2.jpg', name: 'Jane' },
              { src: 'https://example.com/avatar3.jpg', name: 'Tom' },
            ]
          }
        }
      }
    ]
  }
])

const handleTreeChange = (event: CustomEvent) => {
  treeData.value = event.detail.treeState
}

const handleActionClick = (event: CustomEvent) => {
  console.log('Action button clicked:', event.detail)
}
</script>

<template>
  <h3 class="title">Single Tree with End Content</h3>
  <WppTree
    class="tree"
    :data="treeData"
    @wppChange="handleTreeChange"
    @wppActionClick="handleActionClick"
  />
</template>
```