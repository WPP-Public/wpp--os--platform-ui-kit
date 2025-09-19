<script setup lang="ts">
import TreeSingle from './TreeSingle.vue'
import TreeSingleWithSearch from './TreeSingleWithSearch.vue'
import TreeSingleWithCustomSearch from './TreeSingleWithCustomSearch.vue'
import TreeSingleWithNewCustomSearch from './TreeSingleWithNewCustomSearch.vue'
import TreeMultiple from './TreeMultiple.vue'
import TreeMultipleWithSearch from './TreeMultipleWithSearch.vue'
import TreeMultipleWithNotSelectableItem from './TreeMultipleWithNotSelectableItem.vue'
import TreeSingleWithDisabledAnimation from './TreeSingleWithDisabledAnimation.vue'
import TreeMultipleWithoutSearchHighlight from './TreeMultipleWithoutSearchHighlight.vue'
import TreeMultipleWithDefaultSelectedIds from './TreeMultipleWithDefaultSelectedIds.vue'
import TreeSingleWithQuotationMarks from './TreeSingleWithQuotationMarks.vue'
import TreeEndContent from './TreeEndContent.vue'
import TreeSkeletonLoading from './TreeSkeletonLoading.vue'
</script>

<template>
  <div class="wrapper" data-testid="trees-container">
    <div class="trees">
      <TreeEndContent />
    </div>
    <div class="trees">
      <TreeSingle />
    </div>
    <div class="trees">
      <TreeSingleWithDisabledAnimation />
    </div>
    <div class="trees">
      <TreeSingleWithSearch />
    </div>
    <div class="trees">
      <TreeSingleWithCustomSearch />
    </div>
    <div class="trees">
      <TreeSingleWithNewCustomSearch />
    </div>
    <div class="trees">
      <TreeSingleWithQuotationMarks />
    </div>
    <div class="trees">
      <TreeMultiple />
    </div>
    <div class="trees">
      <TreeMultipleWithSearch />
    </div>
    <div class="trees">
      <TreeMultipleWithoutSearchHighlight />
    </div>
    <div class="trees">
      <TreeMultipleWithNotSelectableItem />
    </div>
    <div class="trees">
      <TreeMultipleWithDefaultSelectedIds />
    </div>
    <div class="trees">
      <TreeSkeletonLoading />
    </div>
  </div>
</template>

<style lang="scss">
.title {
  margin: 20px 0;
}

.text {
  margin: 0;
}

.wrapper {
  display: flex;
  flex-direction: column;
  padding: 0 12px;
}

.tree {
  width: 100%;
  margin-right: 30px;
}

.multiple {
  width: 400px;
}

.search {
  margin-bottom: 15px;
}

// stylelint-disable-next-line
:global(.wpp-tree-horizontal-scroll) {
  width: 50%;
  overflow: auto;
}

.filter {
  width: 500px;
  margin-right: 30px;
}

.trees {
  display: flex;
  flex-direction: column;
  width: 600px;
}
</style>
