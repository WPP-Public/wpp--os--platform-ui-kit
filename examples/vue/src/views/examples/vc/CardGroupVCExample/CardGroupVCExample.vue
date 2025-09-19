<script setup lang="ts">
import { ref } from "vue";

import {
  WppButton,
  WppCard,
  WppCardGroup,
  WppTypography,
  WppIconUser,
} from "@platform-ui-kit/components-library-vue";

const isShown = ref(false);
const multipleGroupValue = ref(["item-a"]);
const dynamicMultipleGroupValue = ref(["item-b"]);

const handleMultipleCardGroupChange = (event: CustomEvent) => {
  console.log("event.detail =>", event.detail);

  multipleGroupValue.value = event.detail.value;
};

const handleDynamicMultipleCardGroupChange = (event: CustomEvent) => {
  console.log("event.detail =>", event.detail);

  dynamicMultipleGroupValue.value = event.detail.value;
};

const handleSingleCardGroupChange = (event: CustomEvent) => {
  console.log("event.detail =>", event.detail);
};

const handleShowCardGroup = () => {
  isShown.value = !isShown.value;
};

const cardList = [
  { id: 0, value: "item-a", label: "Item A" },
  { id: 1, value: "item-b", label: "Item B" },
  { id: 2, value: "item-c", label: "Item C" },
];
</script>

<template>
  <div class="group" data-testid="cards-group-container">
    <h3>Multiple Group</h3>
    <WppCardGroup
      class="multiple"
      multiple
      :value="multipleGroupValue"
      size="s"
      @wppChange="handleMultipleCardGroupChange"
    >
      <WppCard class="item" value="item-a" data-testid="multiple-card-item-a">
        <div>Information about item a</div>
        <WppTypography slot="header" type="s-strong"> Item A </WppTypography>
      </WppCard>
      <WppCard class="item" value="item-b" data-testid="multiple-card-item-b">
        <div>Information about item b</div>
        <WppTypography slot="header" type="s-strong"> Item B </WppTypography>
      </WppCard>
      <WppCard class="item" value="item-c">
        <div>Information about item c</div>
        <WppTypography slot="header" type="s-strong"> Item C </WppTypography>
      </WppCard>
    </WppCardGroup>

    <h3>Multiple Group with dynamic value</h3>
    <WppButton class="multipleButton" @click="handleShowCardGroup">
      Click to show/hide Cards
    </WppButton>
    <WppCardGroup
      v-if="isShown"
      class="multiple"
      multiple
      :value="dynamicMultipleGroupValue"
      size="m"
      @wppChange="handleDynamicMultipleCardGroupChange"
    >
      <WppCard
        v-for="card in cardList"
        :value="card.value"
        :key="card.id"
        class="item"
      >
        <div>Information about {{ card.label }}</div>
        <WppTypography slot="header" type="s-strong">
          {{ card.label }}
        </WppTypography>
      </WppCard>
    </WppCardGroup>

    <h3>Single Group</h3>
    <WppCardGroup
      class="single"
      value="item-a"
      size="l"
      @wppChange="handleSingleCardGroupChange"
    >
      <WppCard class="item" value="item-a" data-testid="single-card-item-a">
        <WppTypography slot="header" type="l-strong"> Item A </WppTypography>
      </WppCard>
      <WppCard class="item" value="item-b" data-testid="single-card-item-b">
        <WppTypography slot="header" type="l-strong"> Item B </WppTypography>
      </WppCard>
      <WppCard class="item" value="item-c" disabled>
        <div slot="header" class="cardHeader">
          <WppIconUser class="userIcon"></WppIconUser>
          <WppTypography class="disabledLabel" slot="header" type="l-strong">
            Item C
          </WppTypography>
        </div>
      </WppCard>
    </WppCardGroup>

    <h3>Single Group - Allow Empty Value</h3>
    <WppCardGroup
      class="single"
      value="item-a"
      size="l"
      @wppChange="handleSingleCardGroupChange"
      allowEmptySelection
    >
      <WppCard class="item" value="item-a">
        <WppTypography slot="header" type="l-strong"> Item A </WppTypography>
      </WppCard>
      <WppCard class="item" value="item-b">
        <WppTypography slot="header" type="l-strong"> Item B </WppTypography>
      </WppCard>
      <WppCard class="item" value="item-c">
        <div slot="header" class="cardHeader">
          <WppIconUser class="userIcon"></WppIconUser>
          <WppTypography slot="header" type="l-strong">
            Item C
          </WppTypography>
        </div>
      </WppCard>
    </WppCardGroup>

    <h3>Single Group without radio</h3>
    <WppCardGroup
      class="single"
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

<style scoped>
.content {
  width: 238px;
  height: 200px;
}

.item {
  width: 320px;
  margin-right: 15px;
  margin-bottom: 10px;
}

.multipleButton {
  margin-bottom: 10px;
}

.cardHeader {
  display: flex;
  align-items: center;
}

.userIcon {
  margin-right: 8px;
}

.disabledLabel {
  color: var(--wpp-grey-color-500);
}
</style>
