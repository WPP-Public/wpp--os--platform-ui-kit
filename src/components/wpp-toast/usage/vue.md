```vue

<script setup lang="ts">
import { ref, onMounted } from "vue";

import {
  WppToastContainer,
  WppButton,
  WppToast,
} from "@wppopen/components-library-vue";

const childRef = ref(null);
const toastRef = ref<any>(null);

onMounted(() => {
  setTimeout(() => {
    toastRef.value = document.querySelector(".wpp-toast-container");
  }, 0);
});

const primaryButton = {
  label: "Button",
  variant: "inverted" as const,
  disabled: false,
  loading: false,
  onClick: () => console.log("Clicked"),
};

const showToast = (config: any) => {
  toastRef.value?.addToast(config);
};

const handleAddToast = () => {
  showToast({
    text: `Successful message`,
    type: "success",
    header: "Title",
    duration: 4000,
    primaryBtn: {
      label: "Button",
      variant: "inverted" as const,
      disabled: false,
      loading: false,
      onClick: () => console.log(":primaryBtn"),
    },
  });
};
</script>

<template>
  <div>
    <WppButton variant="secondary" @click="handleAddToast">
      Add Toast
    </WppButton>
    <WppToastContainer :ref="childRef" maxToastsToDisplay="5" />

    <div class="toasts-container">
      <div class="items">
        <h3>Default Message Toasts</h3>
        <WppToast
          class="item"
          header="Error Header Text"
          message="Error Message Text"
          type="error"
          duration="60000"
        />

        <WppToast
          class="item"
          header="Warning Header Text"
          message="Warning Message Text"
          type="warning"
          duration="60000"
        />

        <WppToast
          class="item"
          header="Info Header"
          message="Info Message Text"
          type="information"
          duration="60000"
        />

        <WppToast
          class="item"
          header="Success Header Text"
          message="Success Message Text"
          type="success"
          duration="60000"
        />

        <WppToast
          class="item"
          message="Text without header"
          type="error"
          duration="60000"
        />

        <WppToast
          class="item"
          header="Header text without message text"
          message=""
          type="warning"
          duration="60000"
        />

        <WppToast
          class="item"
          header="Very long header message Very long header message Very long header message Very long header message "
          message="Very long message Very long message Very long message Very long message Very long message Very long message "
          type="information"
          duration="60000"
        />

        <WppToast
          class="item"
          message="Very long message Very long message Very long message Very long message Very long message Very long message "
          type="information"
          duration="60000"
        />
      </div>

      <div class="items">
        <h3>Message Toasts with Action Button</h3>
        <WppToast
          class="item"
          header="Error Header Text"
          message="Error Message Text"
          type="error"
          :primaryBtn="primaryButton"
          duration="60000"
        />

        <WppToast
          class="item"
          header="Warning Header Text"
          message="Warning Message Text"
          type="warning"
          :primaryBtn="primaryButton"
          duration="60000"
        />

        <WppToast
          class="item"
          header="Info Header"
          message="Info Message Text"
          type="information"
          :primaryBtn="primaryButton"
          duration="60000"
        />

        <WppToast
          class="item"
          header="Success Header Text"
          message="Success Message Text"
          type="success"
          :primaryBtn="primaryButton"
          duration="60000"
        />

        <WppToast
          class="item"
          message="Text without header"
          type="error"
          :primaryBtn="primaryButton"
          duration="60000"
        />

        <WppToast
          class="item"
          header="Header text without message text"
          message=""
          type="warning"
          :primaryBtn="primaryButton"
          duration="60000"
        />

        <WppToast
          class="item"
          header="Very long header message Very long header message Very long header message Very long header message "
          message="Very long message Very long message Very long message Very long message Very long message Very long message "
          type="information"
          :primaryBtn="primaryButton"
          duration="60000"
        />

        <WppToast
          class="item"
          message="Very long message Very long message Very long message Very long message Very long message Very long message "
          type="information"
          :primaryBtn="primaryButton"
          duration="60000"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.items {
  margin-bottom: 50px;
}

.item {
  margin-right: 15px;
}
</style>


```
