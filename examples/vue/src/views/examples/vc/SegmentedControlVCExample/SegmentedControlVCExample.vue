<script setup lang="ts">
import { ref } from "vue";

import {
  WppSegmentedControl,
  WppSegmentedControlItem,
  WppIconGrid,
  WppIconDataViewList,
  WppIconDataViewCards,
} from "@platform-ui-kit/components-library-vue";

const currentItem = ref("1");

const handleSegmentedControlChange = (event: CustomEvent) => {
  currentItem.value = event.detail.value;
};
</script>

<template>
  <div class="control-bars">
    <div>
      <h2>Segmented Control Bar - M Size</h2>
      <h3>Text Variant</h3>
      <div class="container">
        <div class="margin">
          <WppSegmentedControl :value="currentItem" @wppChange="handleSegmentedControlChange"
            :labelConfig="{ text: 'Segmented Control with auto width' }" required>
            <WppSegmentedControlItem variant="text" value="1">
              Item 1
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="2">
              Item 2
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="3" disabled>
              Item 3
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="4" counter="3">
              Item 4
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="5" counter="3" disabled>
              Item 5
            </WppSegmentedControlItem>
          </WppSegmentedControl>
        </div>

        <div class="margin">
          <WppSegmentedControl value="4" width="600px" hugContentOff
            :labelConfig="{ text: 'Segmented Control with fixed width and hugContentOff' }" required>
            <WppSegmentedControlItem variant="text" value="1">
              Item 1
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="2">
              Item 2
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="3" disabled>
              Item 3
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="4" counter="3">
              Item 4
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="5" counter="3" disabled>
              Item 5
            </WppSegmentedControlItem>
          </WppSegmentedControl>
        </div>
        <div class="margin">
          <WppSegmentedControl value="5" @wppChange="handleSegmentedControlChange"
            :labelConfig="{ text: 'Segmented Control with auto width - selected disabled item' }" required>
            <WppSegmentedControlItem variant="text" value="1">
              Item 1
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="2">
              Item 2
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="3" disabled>
              Item 3
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="4" counter="3">
              Item 4
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="5" counter="3" disabled>
              Item 5
            </WppSegmentedControlItem>
          </WppSegmentedControl>
        </div>

        <div class="margin">
          <WppSegmentedControl value="5" width="600px" hugContentOff
            :labelConfig="{ text: 'Segmented Control with fixed width and hugContentOff - selected disabled item' }"
            required>
            <WppSegmentedControlItem variant="text" value="1">
              Item 1
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="2">
              Item 2
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="3" disabled>
              Item 3
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="4" counter="3">
              Item 4
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="5" counter="3" disabled>
              Item 5
            </WppSegmentedControlItem>
          </WppSegmentedControl>
        </div>
      </div>

      <h3>Icon Variant</h3>
      <div class="container">
        <div class="margin">
          <WppSegmentedControl value="1" variant="icon" :labelConfig="{ text: 'Segmented Control with auto width' }"
            required>
            <WppSegmentedControlItem variant="icon" value="1">
              <WppIconGrid />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="2">
              <WppIconDataViewList />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="3" disabled>
              <WppIconDataViewCards />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="4" counter="3">
              <WppIconDataViewList />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="5" counter="3" disabled>
              <WppIconDataViewList />
            </WppSegmentedControlItem>
          </WppSegmentedControl>
        </div>

        <div class="margin">
          <WppSegmentedControl value="4" width="500px" hugContentOff
            :labelConfig="{ text: 'Segmented Control with fixed width and hugContentOff' }" required>
            <WppSegmentedControlItem variant="icon" value="1">
              <WppIconGrid />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="2">
              <WppIconDataViewList />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="3" disabled>
              <WppIconDataViewCards />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="4" counter="3">
              <WppIconDataViewList />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="5" counter="3" disabled>
              <WppIconDataViewList />
            </WppSegmentedControlItem>
          </WppSegmentedControl>
        </div>
        <div class="margin">
          <WppSegmentedControl value="5" variant="icon" :labelConfig="{ text: 'Segmented Control with auto width' }"
            required>
            <WppSegmentedControlItem variant="icon" value="1">
              <WppIconGrid />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="2">
              <WppIconDataViewList />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="3" disabled>
              <WppIconDataViewCards />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="4" counter="3">
              <WppIconDataViewList />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="5" counter="3" disabled>
              <WppIconDataViewList />
            </WppSegmentedControlItem>
          </WppSegmentedControl>
        </div>

        <div class="margin">
          <WppSegmentedControl value="5" width="500px" hugContentOff
            :labelConfig="{ text: 'Segmented Control with fixed width and hugContentOff - selected disabled item' }"
            required>
            <WppSegmentedControlItem variant="icon" value="1">
              <WppIconGrid />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="2">
              <WppIconDataViewList />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="3" disabled>
              <WppIconDataViewCards />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="4" counter="3">
              <WppIconDataViewList />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="5" counter="3" disabled>
              <WppIconDataViewList />
            </WppSegmentedControlItem>
          </WppSegmentedControl>
        </div>
      </div>
    </div>

    <div class="small">
      <h2>Segmented Control Bar - S Size</h2>
      <h3>Text Variant</h3>
      <div class="container">
        <div class="margin">
          <WppSegmentedControl value="1" size="s" :labelConfig="{ text: 'Segmented Control with auto width' }" required>
            <WppSegmentedControlItem variant="text" value="1">
              Item 1
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="2">
              Item 2
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="3" disabled>
              Item 3
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="4" counter="3">
              Item 4
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="5" counter="3" disabled>
              Item 5
            </WppSegmentedControlItem>
          </WppSegmentedControl>
        </div>

        <div class="margin">
          <WppSegmentedControl value="4" size="s" width="600px" hugContentOff
            :labelConfig="{ text: 'Segmented Control with fixed width and hugContentOff' }" required>
            <WppSegmentedControlItem variant="text" value="1">
              Item 1
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="2">
              Item 2
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="3" disabled>
              Item 3
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="4" counter="3">
              Item 4
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="5" counter="3" disabled>
              Item 5
            </WppSegmentedControlItem>
          </WppSegmentedControl>
        </div>
        <div class="margin">
          <WppSegmentedControl value="5" size="s"
            :labelConfig="{ text: 'Segmented Control with auto width - selected disabled item' }" required>
            <WppSegmentedControlItem variant="text" value="1">
              Item 1
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="2">
              Item 2
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="3" disabled>
              Item 3
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="4" counter="3">
              Item 4
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="5" counter="3" disabled>
              Item 5
            </WppSegmentedControlItem>
          </WppSegmentedControl>
        </div>

        <div class="margin">
          <WppSegmentedControl value="5" size="s" width="600px" hugContentOff
            :labelConfig="{ text: 'Segmented Control with fixed width and hugContentOff - selected disabled item' }"
            required>
            <WppSegmentedControlItem variant="text" value="1">
              Item 1
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="2">
              Item 2
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="3" disabled>
              Item 3
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="4" counter="3">
              Item 4
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="5" counter="3" disabled>
              Item 5
            </WppSegmentedControlItem>
          </WppSegmentedControl>
        </div>
      </div>

      <h3>Icon Variant</h3>
      <div class="container">
        <div class="margin">
          <WppSegmentedControl value="1" size="s" variant="icon"
            :labelConfig="{ text: 'Segmented Control with auto width' }" required>
            <WppSegmentedControlItem variant="icon" value="1">
              <WppIconGrid />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="2">
              <WppIconDataViewList />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="3" disabled>
              <WppIconDataViewCards />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="4" counter="3">
              <WppIconDataViewList />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="5" counter="3" disabled>
              <WppIconDataViewList />
            </WppSegmentedControlItem>
          </WppSegmentedControl>
        </div>

        <div class="margin">
          <WppSegmentedControl variant="icon" value="4" size="s" width="500px" hugContentOff
            :labelConfig="{ text: 'Segmented Control with fixed width and hugContentOff' }" required>
            <WppSegmentedControlItem variant="icon" value="1">
              <WppIconGrid />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="2">
              <WppIconDataViewList />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="3" disabled>
              <WppIconDataViewCards />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="4" counter="3">
              <WppIconDataViewList />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="5" counter="3" disabled>
              <WppIconDataViewList />
            </WppSegmentedControlItem>
          </WppSegmentedControl>
        </div>
        <div class="margin">
          <WppSegmentedControl value="5" size="s" variant="icon"
            :labelConfig="{ text: 'Segmented Control with auto width - selected disabled item' }" required>
            <WppSegmentedControlItem variant="icon" value="1">
              <WppIconGrid />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="2">
              <WppIconDataViewList />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="3" disabled>
              <WppIconDataViewCards />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="4" counter="3">
              <WppIconDataViewList />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="5" counter="3" disabled>
              <WppIconDataViewList />
            </WppSegmentedControlItem>
          </WppSegmentedControl>
        </div>

        <div class="margin">
          <WppSegmentedControl variant="icon" value="5" size="s" width="500px" hugContentOff
            :labelConfig="{ text: 'Segmented Control with fixed width and hugContentOff - selected disabled item' }"
            required>
            <WppSegmentedControlItem variant="icon" value="1">
              <WppIconGrid />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="2">
              <WppIconDataViewList />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="3" disabled>
              <WppIconDataViewCards />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="4" counter="3">
              <WppIconDataViewList />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="5" counter="3" disabled>
              <WppIconDataViewList />
            </WppSegmentedControlItem>
          </WppSegmentedControl>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
}

.margin {
  margin-right: 50px;
}

.segmented-control-items {
  width: 250px;
}

.icon-control-items {
  width: 75px;
}

.small {
  margin-top: 50px;
}
</style>
