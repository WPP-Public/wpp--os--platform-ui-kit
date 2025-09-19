<script setup lang="ts">
import { ref } from "vue";

import {
  WppTopbar,
  WppButton,
  WppTypography,
} from "@platform-ui-kit/components-library-vue";

const initNavigation = [
  {
    label: "Home",
    value: "home",
    path: "/topbar",
  },
  {
    chevronOnly: true,
    value: 'learning',
    children: [
      {
        label: 'Guided tour',
        value: 'guidedTour',
        path: '/topbar/learning/guided-tour',
      },
      {
        label: 'Case studies',
        value: 'caseStudies',
        path: '/topbar/learning/case-studies',
      },
      {
        label: 'Community',
        value: 'community',
        path: '/topbar/learning/community',
        children: [
          {
            label: 'People',
            value: 'people',
            path: '/topbar/learning/people',
          },
          {
            label: 'Workers',
            value: 'workers',
            path: '/topbar/learning/workers',
          },
        ],
      },
    ],
  },
  {
    label: "Client services",
    value: "clientServices",
    path: "/topbar/client-services",
  },
  {
    label: "Learning",
    value: "learning",
    children: [
      {
        label: "Guided tour",
        value: "guidedTour",
        path: "/topbar/learning/guided-tour",
      },
      {
        label: "Case studies",
        value: "caseStudies",
        path: "/topbar/learning/case-studies",
      },
      {
        label: "Community",
        value: "community",
        path: "/topbar/learning/community",
      },
    ],
  },
  {
    label: "Marketplace",
    value: "marketplace",
    path: "/topbar/marketplace",
  },
  {
    label: "Dev portal",
    value: "devPortal",
    path: "/topbar/devPortal",
  },
];

const firstValue = ref("devPortal");
const secondValue = ref("community");
const navigationData = ref(initNavigation);

const handleTopbarItemChange = (event: CustomEvent) => {
  firstValue.value = event.detail.value;
  secondValue.value = event.detail.value;

  console.log(event.detail.path);
};

const handleAddNavigationItemToBeginning = () => {
  navigationData.value = [
    { label: "Start", value: "start", path: "/topbar/start" },
    ...navigationData.value,
  ];
};

const handleAddNavigationItemToEnd = () => {
  navigationData.value = [
    ...navigationData.value,
    { label: "End", value: "end", path: "/topbar/end" },
  ];
};
</script>

<template>
  <div>
    <div class="page" data-testid="topbar-page">
      <WppTopbar
        :value="firstValue"
        :navigation="navigationData"
        @wppChange="handleTopbarItemChange"
      >
        <div slot="app" class="app">
          <img
            src="https://easydrawingguides.com/wp-content/uploads/2018/09/Impossible-Triangle-09.png"
            class="image"
          />
          <WppTypography class="name" type="m-strong" tag="h3">
            APP Name
          </WppTypography>
        </div>
      </WppTopbar>

      <WppTopbar :value="firstValue" :navigation="navigationData" />

      <WppTopbar :value="secondValue" :navigation="navigationData" data-testid="selected-menu" />

      <div class="actions">
        <WppButton
          variant="secondary"
          @click="handleAddNavigationItemToBeginning"
          data-testid="add-nav-button"
        >
          Add new navigation to beginning
        </WppButton>
        <WppButton variant="secondary" @click="handleAddNavigationItemToEnd">
          Add new navigation to end
        </WppButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 20px 0 50px;
  box-shadow: 0 4px 12px rgb(52 58 63 / 10.2%);
}

.image {
  display: flex;
  width: 40px;
  max-width: 40px;
  height: 40px;
  margin-right: 12px;
}

.app {
  display: flex;
  align-items: center;
  margin-right: 32px;
}

.name {
  white-space: nowrap;
}

.actions {
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
  margin-top: 20px;
}
</style>
