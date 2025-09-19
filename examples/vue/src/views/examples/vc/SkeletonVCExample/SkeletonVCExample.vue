<script setup lang="ts">
import { WppSkeleton } from "@platform-ui-kit/components-library-vue";
</script>

<template>
  <div class="container">
    <h2>Skeleton Examples</h2>

    <!-- Card Skeleton Example -->
    <section>
      <h3>Card Skeleton</h3>
      <div class="cardSkeleton">
        <WppSkeleton width="60%" height="30px" style="margin-bottom: 16px;" />
        <WppSkeleton width="90%" height="16px" style="margin-bottom: 8px;" />
        <WppSkeleton width="80%" height="16px" style="margin-bottom: 24px;" />
        <div class="skeletonRow">
          <WppSkeleton width="70%" height="8px" />
          <WppSkeleton width="30%" height="8px" />
        </div>
      </div>
    </section>

    <!-- Card Skeleton Example - Animation Off -->
    <section>
      <h3>Card Skeleton - Animation Off</h3>
      <div class="cardSkeleton">
        <WppSkeleton :animation="false" width="60%" height="30px" style="margin-bottom: 16px;" />
        <WppSkeleton :animation="false" width="90%" height="16px" style="margin-bottom: 8px;" />
        <WppSkeleton :animation="false" width="80%" height="16px" style="margin-bottom: 24px;" />
        <div class="skeletonRow">
          <WppSkeleton :animation="false" width="70%" height="8px" />
          <WppSkeleton :animation="false" width="30%" height="8px" />
        </div>
      </div>
    </section>

    <!-- Table Skeleton Example -->
    <section>
      <h3>Table Skeleton</h3>
      <div class="tableSkeleton">
        <div class="row">
          <WppSkeleton v-for="index in 6" :key="`header-${index}`" width="100%" height="20px" />
        </div>
        <div v-for="rowIndex in 5" :key="`row-${rowIndex}`" class="row">
          <WppSkeleton v-for="colIndex in 6" :key="`row-${rowIndex}-col-${colIndex}`" width="100%" height="16px" />
        </div>
      </div>
    </section>

    <!-- Custom Layout Example -->
    <section>
      <h3>Custom Layout</h3>
      <div class="customLayout">
        <WppSkeleton variant="circle" width="50px" height="50px" />
        <div class="customLayoutText">
          <WppSkeleton width="80%" height="20px" style="margin-bottom: 8px;" />
          <WppSkeleton width="60%" height="16px" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  padding: 20px;
}

.cardSkeleton {
  width: 260px;
  padding: 20px;
}

.tableSkeleton {
  width: 100%;
}

.row {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.skeletonRow {
  display: flex;
  gap: 40px;
}

/* Custom Layout Styles */
.customLayout {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 20px;
}

.customLayoutText {
  flex: 1;
}
</style>
