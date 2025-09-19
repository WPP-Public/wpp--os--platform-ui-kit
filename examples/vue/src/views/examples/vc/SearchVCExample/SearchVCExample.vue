<script setup lang="ts">
import {
  WppSearch,
  WppListItem,
} from "@platform-ui-kit/components-library-vue";
import { ref } from "vue";
import { fruitOptions } from "@/views/examples/vc/SearchVCExample/options";
import type { SearchDefaultOption } from "@platform-ui-kit/components-library/src";

const basicValue = ref<SearchDefaultOption[]>([
  {
    id: 5,
    label: "Pineapple",
  },
]);

const handleBasicValue = (event: CustomEvent) => {
  basicValue.value = event.detail.value as SearchDefaultOption[];
};
</script>

<template>
  <div class="container" data-testid="search-container">
    <div class="searches">
      <h2>Size M</h2>
      <div class="regularContainer" data-testid="regular-search-container">
        <WppSearch
          required
          autoFocus
          class="item"
          :labelConfig="{
            text: 'Regular Search',
          }"
          placeholder="Select fruits"
          :value="basicValue"
          @wppChange="handleBasicValue"
          simpleSearch
          data-testid="regular-search"
        >
          <WppListItem
            v-for="option in fruitOptions"
            :key="option.id"
            :value="option"
            :label="option.label"
          >
            <p slot="label">{{ option.label }}</p>
          </WppListItem>
        </WppSearch>
      </div>

      <WppSearch
        required
        class="item"
        :labelConfig="{
          text: 'Disabled Search',
        }"
        disabled
        :value="basicValue"
        simpleSearch
      />

      <WppSearch
        required
        class="item"
        :labelConfig="{
          text: 'Search with custom dropdown width',
        }"
        :highlight="false"
        dropdownWidth="200px"
        placeholder="Select fruits"
        :value="basicValue"
        @wppChange="handleBasicValue"
        simpleSearch
      >
        <WppListItem
          v-for="option in fruitOptions"
          :key="option.id"
          :value="option"
          :label="option.label"
        >
          <p slot="label">{{ option.label }}</p>
        </WppListItem>
      </WppSearch>

      <WppSearch
        required
        class="item"
        :labelConfig="{
          text: 'Search with highlight',
        }"
        placeholder="Select fruits"
        :value="basicValue"
        @wppChange="handleBasicValue"
        simpleSearch
      >
        <WppListItem
          v-for="option in fruitOptions"
          :key="option.id"
          :value="option"
          :label="option.label"
        >
          <p slot="label">{{ option.label }}</p>
        </WppListItem>
      </WppSearch>

      <WppSearch
        required
        class="item"
        :labelConfig="{
          text: 'Loading Search',
        }"
        loading
        placeholder="Select fruits"
        :value="basicValue"
        simpleSearch
      />

      <WppSearch
        class="item"
        :labelConfig="{
          icon: 'wpp-icon-info',
          text: 'Custom Label Search',
          description: 'Description',
          locales: {
            optional: 'Optional',
          },
        }"
        placeholder="Select fruits"
        :value="basicValue"
        simpleSearch
      />

      <WppSearch
        class="item"
        :labelConfig="{
          text: 'Open dropdown on click',
        }"
        openDropdownOnClick
        required
        placeholder="Select fruits"
        :value="basicValue"
        simpleSearch
        data-testid="dropdown-open-on-click-search"
      >
        <WppListItem
          v-for="option in fruitOptions"
          :key="option.id"
          :value="option"
          :label="option.label"
        >
          <p slot="label">{{ option.label }}</p>
        </WppListItem>
      </WppSearch>

      <WppSearch
        class="item"
        :labelConfig="{
          text: 'simpleSearch = false',
        }"
        required
        placeholder="Select fruits"
        :value="basicValue"
        data-testid="simple-search-off-search"
      >
        <WppListItem
          v-for="option in fruitOptions"
          :key="option.id"
          :value="option"
          :label="option.label"
        >
          <p slot="label">{{ option.label }}</p>
        </WppListItem>
      </WppSearch>

      <WppSearch
        class="item"
        :labelConfig="{
          text: 'showOptions = false',
        }"
        :showOptions="false"
        required
        placeholder="Select fruits"
        :value="basicValue"
        data-testid="show-options-off-search"
      >
        <WppListItem
          v-for="option in fruitOptions"
          :key="option.id"
          :value="option"
          :label="option.label"
        >
          <p slot="label">{{ option.label }}</p>
        </WppListItem>
      </WppSearch>

      <WppSearch
        class="item"
        :labelConfig="{
          text: 'Search with error message',
        }"
        messageType="error"
        message="Error message"
        required
        placeholder="Select fruits"
        :value="basicValue"
      />

      <WppSearch
        class="item"
        :labelConfig="{
          text: 'Search with warning message',
        }"
        messageType="warning"
        message="Warning message"
        required
        placeholder="Select fruits"
        :value="basicValue"
      />
    </div>

    <div class="searches">
      <h2>Size S</h2>
      <WppSearch
        size="s"
        required
        autoFocus
        class="item"
        :labelConfig="{
          text: 'Regular Search',
        }"
        :highlight="false"
        placeholder="Select fruits"
        :value="basicValue"
        @wppChange="handleBasicValue"
        simpleSearch
      >
        <WppListItem
          v-for="option in fruitOptions"
          :key="option.id"
          :value="option"
          :label="option.label"
        >
          <p slot="label">{{ option.label }}</p>
        </WppListItem>
      </WppSearch>

      <WppSearch
        size="s"
        required
        class="item"
        :labelConfig="{
          text: 'Disabled Search',
        }"
        disabled
        :value="basicValue"
        simpleSearch
      />

      <WppSearch
        size="s"
        required
        class="item"
        :labelConfig="{
          text: 'Search with custom dropdown width',
        }"
        :highlight="false"
        dropdownWidth="200px"
        placeholder="Select fruits"
        :value="basicValue"
        @wppChange="handleBasicValue"
        simpleSearch
      >
        <WppListItem
          v-for="option in fruitOptions"
          :key="option.id"
          :value="option"
          :label="option.label"
        >
          <p slot="label">{{ option.label }}</p>
        </WppListItem>
      </WppSearch>

      <WppSearch
        size="s"
        required
        class="item"
        :labelConfig="{
          text: 'Search with highlight',
        }"
        placeholder="Select fruits"
        :value="basicValue"
        @wppChange="handleBasicValue"
        simpleSearch
      >
        <WppListItem
          v-for="option in fruitOptions"
          :key="option.id"
          :value="option"
          :label="option.label"
        >
          <p slot="label">{{ option.label }}</p>
        </WppListItem>
      </WppSearch>

      <WppSearch
        size="s"
        required
        class="item"
        :labelConfig="{
          text: 'Loading Search',
        }"
        loading
        placeholder="Select fruits"
        :value="basicValue"
        simpleSearch
      />

      <WppSearch
        class="item"
        size="s"
        :labelConfig="{
          icon: 'wpp-icon-info',
          text: 'Custom Label Search',
          description: 'Description',
          locales: {
            optional: 'Optional',
          },
        }"
        placeholder="Select fruits"
        :value="basicValue"
        simpleSearch
      />

      <WppSearch
        size="s"
        class="item"
        :labelConfig="{
          text: 'Open dropdown on click',
        }"
        openDropdownOnClick
        required
        placeholder="Select fruits"
        :value="basicValue"
        simpleSearch
      >
        <WppListItem
          v-for="option in fruitOptions"
          :key="option.id"
          :value="option"
          :label="option.label"
        >
          <p slot="label">{{ option.label }}</p>
        </WppListItem>
      </WppSearch>

      <WppSearch
        size="s"
        class="item"
        :labelConfig="{
          text: 'simpleSearch = false',
        }"
        openDropdownOnClick
        required
        placeholder="Select fruits"
        :value="basicValue"
      >
        <WppListItem
          v-for="option in fruitOptions"
          :key="option.id"
          :value="option"
          :label="option.label"
        >
          <p slot="label">{{ option.label }}</p>
        </WppListItem>
      </WppSearch>

      <WppSearch
        size="s"
        class="item"
        :labelConfig="{
          text: 'showOptions = false',
        }"
        :showOptions="false"
        required
        placeholder="Select fruits"
        :value="basicValue"
      >
        <WppListItem
          v-for="option in fruitOptions"
          :key="option.id"
          :value="option"
          :label="option.label"
        >
          <p slot="label">{{ option.label }}</p>
        </WppListItem>
      </WppSearch>

      <WppSearch
        size="s"
        class="item"
        :labelConfig="{
          text: 'Search with error message',
        }"
        messageType="error"
        message="Error message"
        required
        placeholder="Select fruits"
        :value="basicValue"
      />

      <WppSearch
        size="s"
        class="item"
        :labelConfig="{
          text: 'Search with warning message',
        }"
        messageType="warning"
        message="Warning message"
        required
        placeholder="Select fruits"
        :value="basicValue"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.item {
  width: 400px;
  margin-bottom: 15px;
}

.container {
  display: flex;
  flex-direction: row;
}

.searches {
  margin-right: 30px;
}

.regularContainer {
  height: 130px;
}
</style>
