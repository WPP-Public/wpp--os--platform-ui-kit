<script lang="ts">
import { countries, groupedCountries } from './config'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Countries',
  data() {
    return {
      countries: countries,
      groupedCountries: groupedCountries,
    }
  },
})
const groupSize = 10

// Divide the flagsData array into groups of 10 rows
for (let i = 0; i < countries.length; i += groupSize) {
  groupedCountries.push(countries.slice(i, i + groupSize))
}
</script>

<template>
  <html>
  <head>
    <link rel="stylesheet" href="https://public-assets.os.wpp.com/flags/minified.css" />
  </head>
  <div data-testid="countries-container">
    <div class="row" v-for="group in groupedCountries">
      <div class="row" v-for="flag in group">
        <div class="flag">
          <p class="label">{{flag.title}}</p>
          <div class="flags" :class="flag.icon" />
        </div>
      </div>
    </div>
  </div>
  </html>
</template>

<style>
.flag {
  align-items: center;
  width: 159px;
  margin-right: 20px;
  margin-bottom: 40px;
}

.row {
  display: flex;
  flex-direction: row;
}

.label {
  height: 40px;
}
</style>
