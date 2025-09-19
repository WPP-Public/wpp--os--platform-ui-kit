<script setup lang="ts">
import {
  WppPagination,
  WppPaginationSelect,
  WppCard,
} from "@platform-ui-kit/components-library-vue";

const dropdownConfig = { popperOptions: { strategy: "fixed" } };

const itemsPerPageOptions = [3, 5, 8];
</script>

<template>
  <div>
    <div class="container" data-testid="paginations">
      <div>
        <h3>Pagination Select</h3>
        <WppPaginationSelect
          class="item"
          count="8"
          activePageNumber="1"
          pageSelectThreshold="5"
        />

        <WppPaginationSelect
          class="item"
          count="8"
          activePageNumber="4"
          pageSelectThreshold="5"
        />

        <WppPaginationSelect
          count="8"
          activePageNumber="8"
          pageSelectThreshold="5"
        />
      </div>

      <div>
        <h3>
          Pagination Select (pageSelectThreshold exceeds the pages amount)
        </h3>
        <WppPaginationSelect
          class="item"
          count="8"
          activePageNumber="1"
          pageSelectThreshold="11"
        />

        <WppPaginationSelect
          class="item"
          count="8"
          activePageNumber="5"
          pageSelectThreshold="11"
        />

        <WppPaginationSelect
          count="8"
          activePageNumber="8"
          pageSelectThreshold="11"
        />
      </div>

      <div>
        <h3>Pagination</h3>
        <WppPagination
          count="8"
          activePageNumber="1"
          pageSelectThreshold="1"
          :itemsPerPage="itemsPerPageOptions"
        />

        <WppPagination
          count="8"
          activePageNumber="2"
          pageSelectThreshold="1"
          :itemsPerPage="itemsPerPageOptions"
        />

        <WppPagination
          count="8"
          activePageNumber="3"
          pageSelectThreshold="1"
          :itemsPerPage="itemsPerPageOptions"
        />

        <WppPagination
          count="8"
          activePageNumber="1"
          pageSelectThreshold="9"
          :itemsPerPage="itemsPerPageOptions"
        />

        <WppPagination
          count="8"
          activePageNumber="2"
          pageSelectThreshold="9"
          :itemsPerPage="itemsPerPageOptions"
        />

        <WppPagination
          count="8"
          activePageNumber="3"
          pageSelectThreshold="9"
          :itemsPerPage="itemsPerPageOptions"
        />

        <WppPagination
          count="8"
          pageSelectThreshold="1"
          selectedItemPerPage="8"
          :itemsPerPage="itemsPerPageOptions"
        />

        <WppPagination
          count="8"
          pageSelectThreshold="9"
          selectedItemPerPage="8"
          :itemsPerPage="itemsPerPageOptions"
        />

        <WppPagination
          count="8"
          activePageNumber="1"
          pageSelectThreshold="9"
          :itemsPerPage="itemsPerPageOptions"
          data-testid="pagination-list"
        />

        <WppCard>
          <WppPagination
            count="8"
            activePageNumber="1"
            pageSelectThreshold="9"
            :dropdownConfig="dropdownConfig"
            :itemsPerPage="itemsPerPageOptions"
            data-testid="pagination-in-card"
          />
        </WppCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item {
  margin-right: 30px;
}

.container {
  height: 650px;
}
</style>
