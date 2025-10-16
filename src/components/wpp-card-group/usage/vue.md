```vue
<script setup lang="ts">
import { ref } from "vue";
import {
  WppCard,
  WppCardGroup,
  WppTypography,
} from "@platform-ui-kit/components-library-vue";

const isToShowBanner = ref(true)

const multipleGroupValue = ref(["item-a"]);

const handleMultipleCardGroupChange = (event: CustomEvent) => {
  console.log("event.detail =>", event.detail);

  multipleGroupValue.value = event.detail.value;
};

const handleSingleCardGroupChange = (event: CustomEvent) => {
  console.log("event.detail =>", event.detail);
};
</script>

<template>
  <div>
    <WppCardGroup
      class="multiple"
      multiple
      :value="multipleGroupValue"
      size="s"
      @wppChange="handleMultipleCardGroupChange"
    >
      <WppCard class="item" value="item-a">
        <div>Information about item a</div>
        <WppTypography slot="header" type="s-strong"> Item A </WppTypography>
      </WppCard>
      <WppCard class="item" value="item-b">
        <div>Information about item b</div>
        <WppTypography slot="header" type="s-strong"> Item B </WppTypography>
      </WppCard>
      <WppCard class="item" value="item-c">
        <div>Information about item c</div>
        <WppTypography slot="header" type="s-strong"> Item C </WppTypography>
      </WppCard>
    </WppCardGroup>

    <WppCardGroup
      value="item-a"
      size="l"
      :withRadioOrCheckbox="false"
      @wppChange="handleSingleCardGroupChange"
    >
      <WppCard class="item" value="item-a">
        <WppTypography slot="header" type="l-strong"> Item A </WppTypography>
      </WppCard>
      <WppCard class="item" value="item-b">
        <WppTypography slot="header" type="l-strong"> Item B </WppTypography>
      </WppCard>
      <WppCard class="item" value="item-c">
        <WppTypography slot="header" type="l-strong"> Item C </WppTypography>
      </WppCard>
    </WppCardGroup>
  </div>
</template>
```
