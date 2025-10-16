```vue

<script setup lang="ts">
import { ref } from "vue"

import {
  WppTable,
  WppTableCell,
  WppTableHeadCell,
  WppTableRow,
  WppAvatar,
  WppPagination,
} from '@platform-ui-kit/components-library-vue'

import { dataList } from './consts'

const itemsPerPage = [3, 5, 10]

const page = ref(1)
const perPage = ref(itemsPerPage[0])

const handlePaginationChange = (event: CustomEvent) => {
  page.value = event.detail.page
  perPage.value = event.detail.itemsPerPage
}

const dataToDisplay = [...dataList.slice((page - 1) * perPage, page * perPage)]
</script>

<template>
  <div class="table-page">
    <WppTable>
      <WppTableRow slot="table-head">
        <WppTableHeadCell>
          <p class="text">ID</p>
        </WppTableHeadCell>
        <WppTableHeadCell>
          <p class="text">First Name</p>
        </WppTableHeadCell>
        <WppTableHeadCell>
          <p class="text">Height</p>
        </WppTableHeadCell>
      </WppTableRow>
      <WppTableRow v-if="user in dataToDisplay" slot="table-body">
        <WppTableCell>
          <p class="text">{{ user.id }}</p>
        </WppTableCell>
        <WppTableCell>
          <WppAvatar :name="user.firstName" class="avatar" />
          <p class="text">{{ user.firstName }}</p>
        </WppTableCell>
        <WppTableCell>
          <p class="text">{{ user.height }}</p>
        </WppTableCell>
      </WppTableRow>
    </WppTable>
    <WppPagination
      :count="dataList.length"
      :itemsPerPage="itemsPerPage"
      @wppChange="handlePaginationChange"
    />
  </div>
</template>


```
