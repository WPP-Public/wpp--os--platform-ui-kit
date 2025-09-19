<script lang="ts">
import { defineComponent } from "vue";
import type { AutocompleteDefaultOption } from "@platform-ui-kit/components-library";

import {
  WppAutocomplete,
  WppListItem,
} from "@platform-ui-kit/components-library-vue";

import SelectedValues from "../SelectedValues.vue";

import type { MovieOption } from "../options";
import { movieOptions } from "../options";

export default defineComponent({
  name: "ServerSearch",
  components: {
    WppAutocomplete: WppAutocomplete,
    WppListItem: WppListItem,
    SelectedValues: SelectedValues,
  },
  data() {
    return {
      movieOptions: movieOptions,
      serverDataValue: [] as AutocompleteDefaultOption[],
      isGettingInitialMoviesValue: true,
      isSearchingMovies: false,
      movieSearchValue: "",
      movieSearchResult: [] as MovieOption[],
      timer: null,
    };
  },
  mounted() {
    setTimeout(() => {
      this.serverDataValue = [
        {
          id: "tt2948356",
          label: "Zootopia",
          year: 2016,
          rating: 8,
          unavailable: false,
        },
        {
          id: "tt0107290",
          label: "Jurassic Park",
          year: 1993,
          rating: 8.2,
          unavailable: false,
        },
        {
          id: "tt1074638",
          label: "Skyfall",
          year: 2012,
          rating: 7.8,
          unavailable: true,
        },
      ];
      this.isGettingInitialMoviesValue = false;
    }, 2000);
  },
  watch: {
    movieSearchValue(newSearchValue, oldSearchValue) {
      if (newSearchValue.trim() === oldSearchValue.trim()) {
        return;
      }

      const movieSearchValueTrimmed = newSearchValue.trim();

      this.isSearchingMovies = true;

      const timeout = 700 + Math.round(Math.random() * 1300);
      setTimeout(() => {
        this.movieSearchResult = movieOptions
          .filter((option) => {
            const searchValue = movieSearchValueTrimmed.toLocaleLowerCase();

            return (
              option.label.toLocaleLowerCase().includes(searchValue) ||
              String(option.year).includes(searchValue)
            );
          })
          .sort((a, b) =>
            a.label.toLocaleLowerCase() > b.label.toLocaleLowerCase() ? 1 : -1
          );
        this.isSearchingMovies = false;
      }, timeout);
    },
  },
  methods: {
    handleSearchValueChange(event: CustomEvent) {
      this.movieSearchValue = event.detail;
    },
    handleChange(event: CustomEvent) {
      this.serverDataValue = event.detail.value;
    },
    handlePillCloseClick(removedId: number) {
      this.serverDataValue = this.serverDataValue.filter(
        (i) => i.id !== removedId
      );
    },
  },
});
</script>

<template>
  <div class="item">
    <WppAutocomplete
      required
      :loading="isSearchingMovies"
      :disabled="isGettingInitialMoviesValue"
      name="server-data"
      :labelConfig="{
        text: `${
          isGettingInitialMoviesValue ? '(Loading initial values) ' : ''
        }Server search with lots of customization (max 5 selected items)`,
      }"
      placeholder="Select movies"
      :value="serverDataValue"
      @wppSearchValueChange="handleSearchValueChange"
      @wppChange="handleChange"
      limitSelectedItems="5"
      multiple
      showCreateNewElement
      simpleSearch
    >
      <WppListItem
        v-for="option in movieOptions"
        :key="option.id"
        :value="option"
        :label="option.label"
        :disabled="option.unavailable"
      >
        <p slot="label">
          <span class="unavailable" v-if="option.unavailable">(Sold out) </span>
          {{ option.label }} <span class="year">({{ option.year }})</span>&nbsp;
          <span class="rating">⭐ {{ option.rating.toFixed(1) }}</span>
        </p>
      </WppListItem>
      <SelectedValues
        :values="serverDataValue"
        @closeClick="(value) => handlePillCloseClick(value)"
      />
    </WppAutocomplete>
  </div>
</template>

<style scoped></style>
