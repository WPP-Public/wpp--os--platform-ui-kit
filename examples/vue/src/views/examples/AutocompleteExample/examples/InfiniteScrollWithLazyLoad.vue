<script lang="ts">
import { defineComponent } from "vue";
import type { AutocompleteDefaultOption } from "@platform-ui-kit/components-library";

import {
  WppAutocomplete,
  WppListItem,
} from "@platform-ui-kit/components-library-vue";

import type { LoadMoreHandler } from "@platform-ui-kit/components-library";

import SelectedValues from "../SelectedValues.vue";
import ResultsView from "../ResultsView.vue";

import type { BasicOption } from "../options";
import { isInfiniteLastPage } from "../options";
import { generateInfiniteResults } from "@platform-ui-kit/react-example/src/pages/Autocomplete/options";

let infiniteLoadMoreTimer: ReturnType<typeof setTimeout> | null = null;
let searchTimer: ReturnType<typeof setTimeout> | null = null;

export default defineComponent({
  name: "InfiniteScrollWithLazyLoad",
  components: {
    WppAutocomplete: WppAutocomplete,
    WppListItem: WppListItem,
    SelectedValues: SelectedValues,
    ResultsView: ResultsView,
  },
  data() {
    return {
      isInfiniteLastPage: isInfiniteLastPage,

      infiniteValue: [] as AutocompleteDefaultOption[],
      infiniteSearchPage: 0,
      isSearchingInfinite: false,
      infiniteSearchValue: "",
      infiniteSearchResults: [] as BasicOption[],
    };
  },
  watch: {
    infiniteSearchValue(newSearchValue, oldSearchValue) {
      if (newSearchValue.trim() === oldSearchValue.trim()) {
        return;
      }

      const infiniteSearchValueTrimmed = newSearchValue.trim();

      if (infiniteLoadMoreTimer) {
        clearTimeout(infiniteLoadMoreTimer);
        infiniteLoadMoreTimer = null;
      }

      if (searchTimer) {
        clearTimeout(searchTimer);
        searchTimer = newSearchValue;
      }

      this.isSearchingInfinite = true;

      const timeout = 700 + Math.round(Math.random() * 1300);
      searchTimer = setTimeout(() => {
        this.infiniteSearchResults = generateInfiniteResults(
          infiniteSearchValueTrimmed,
          0
        );

        this.infiniteSearchPage = 0;

        this.isSearchingInfinite = false;
      }, timeout);
    },
  },
  computed: {
    infiniteSearchLoadMore(): LoadMoreHandler {
      const infiniteSearchValueTrimmed = this.infiniteSearchValue.trim();

      const loadMore: LoadMoreHandler = () =>
        new Promise((resolve) => {
          const timeout = 300 + Math.round(Math.random() * 700);
          const page = this.infiniteSearchResults.length
            ? this.infiniteSearchPage + 1
            : this.infiniteSearchPage;

          infiniteLoadMoreTimer = setTimeout(() => {
            infiniteLoadMoreTimer = null;
            this.infiniteSearchResults = [
              ...this.infiniteSearchResults,
              ...generateInfiniteResults(infiniteSearchValueTrimmed, page),
            ];
            this.infiniteSearchPage = page;

            resolve();
          }, timeout);
        });

      return loadMore;
    },
  },
  methods: {
    handleSearchValueChange(event: CustomEvent) {
      this.infiniteSearchValue = event.detail;
    },
    handleChange(event: CustomEvent) {
      this.infiniteValue = event.detail.value;
    },
    handlePillCloseClick(removedId: number) {
      this.infiniteValue = this.infiniteValue.filter((i) => i.id !== removedId);
    },
  },
});
</script>

<template>
  <div class="item">
    <WppAutocomplete
      required
      infinite
      :infiniteLastPage="
        isInfiniteLastPage(infiniteSearchValue.trim(), infiniteSearchPage)
      "
      :loading="isSearchingInfinite"
      name="infinite-list"
      :labelConfig="{ text: 'Infinite scroll with lazy load' }"
      placeholder="Scroll me"
      :value="infiniteValue"
      :loadMore="infiniteSearchLoadMore"
      @wppSearchValueChange="handleSearchValueChange"
      @wppChange="handleChange"
      multiple
      showCreateNewElement
    >
      <WppListItem
        v-for="option in infiniteSearchResults"
        :key="option.id"
        :value="option"
        :label="option.label"
      >
        <p slot="label">{{ option.label }}</p>
      </WppListItem>
      <SelectedValues
        :values="infiniteValue"
        @closeClick="(value) => handlePillCloseClick(value)"
      />
    </WppAutocomplete>

    <ResultsView :value="infiniteValue.map((i) => i.id)" />
  </div>
</template>

<style scoped></style>
