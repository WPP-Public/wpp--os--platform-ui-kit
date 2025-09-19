<script setup lang="ts">
import { ref, onMounted } from "vue";

import {
  WppToastContainer,
  WppButton,
  WppToast,
} from "@platform-ui-kit/components-library-vue";

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
    message: `Successful message`,
    type: "success",
    header: "Title",
    duration: 4000000,
    primaryBtn: {
      label: "Button",
      variant: "inverted" as const,
      disabled: false,
      loading: false,
      onClick: () => console.log("primaryBtn"),
    },
  });
};

const handleAddCustomToast = () => {
  showToast({
    message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry`,
    type: "success",
    header: "Title",
    duration: 4000000,
    primaryBtn: {
      label: "Button",
      variant: "inverted" as const,
      disabled: false,
      loading: false,
      onClick: () => console.log("primaryBtn"),
    },
    maxMessageLines: 2,
    icon: {
      name: "wpp-icon-phone",
    },
  });
};

const handleAddToastWithLongText = () => {
  showToast({
    message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500`,
    type: "success",
    header: "Title",
    duration: 4000000,
    primaryBtn: {
      label: "Button",
      variant: "inverted" as const,
      disabled: false,
      loading: false,
      onClick: () => console.log("primaryBtn"),
    },
    icon: {
      url: "https://mui.com/static/images/avatar/1.jpg",
    },
  });
};
</script>

<template>
  <div>
    <div class="toastBtnsWrapper">
      <WppButton variant="secondary" @click="handleAddToast" data-testid="add-toast-button">
        Add Toast
      </WppButton>

      <WppButton variant="secondary" @click="handleAddCustomToast" data-testid="add-toast-with-custom-icon-button">
        Add Toast with custom icon
      </WppButton>

      <WppButton variant="secondary" @click="handleAddToastWithLongText" data-testid="add-toast-with-long-text-button">
        Add Toast with long text
      </WppButton>
    </div>
    <WppToastContainer :ref="childRef" maxToastsToDisplay="5" />

    <div class="toasts-container">
      <h3>Chat Input Message Toasts</h3>
      <div class="chatItems">
        <WppToast class="chatItem" message="Error" type="error" variant="chat" :duration="600000" />
        <WppToast class="chatItem" message="Success" type="success" variant="chat" :duration="600000" />
        <WppToast class="chatItem" message="Information" type="information" variant="chat" :duration="600000" />
      </div>

      <div class="items">
        <h3>Default Message Toasts</h3>
        <WppToast class="item" header="Error Header Text" message="Error Message Text" type="error" duration="60000" />

        <WppToast class="item" header="Warning Header Text" message="Warning Message Text" type="warning"
          duration="60000" />

        <WppToast class="item" header="Info Header" message="Info Message Text" type="information" duration="60000" />

        <WppToast class="item withMargin" header="Success Header Text" message="Success Message Text" type="success"
          duration="60000" />

        <WppToast class="item" message="Text without header" type="error" duration="60000" />

        <WppToast class="item" header="Header text without message text" message="" type="warning" duration="60000" />

        <WppToast class="item"
          header="Very long header message Very long header message Very long header message Very long header message "
          message="Very long message Very long message Very long message Very long message Very long message Very long message "
          type="information" duration="60000" />

        <WppToast class="item"
          message="Very long message Very long message Very long message Very long message Very long message Very long message "
          type="information" duration="60000" />
      </div>

      <div class="items">
        <h3>Message Toasts with Action Button</h3>
        <WppToast class="item" header="Error Header Text" message="Error Message Text" type="error"
          :primaryBtn="primaryButton" duration="60000" />

        <WppToast class="item" header="Warning Header Text" message="Warning Message Text" type="warning"
          :primaryBtn="primaryButton" duration="60000" />

        <WppToast class="item" header="Info Header" message="Info Message Text" type="information"
          :primaryBtn="primaryButton" duration="60000" />

        <WppToast class="item withMargin" header="Success Header Text" message="Success Message Text" type="success"
          :primaryBtn="primaryButton" duration="60000" />

        <WppToast class="item" message="Text without header" type="error" :primaryBtn="primaryButton"
          duration="60000" />

        <WppToast class="item" header="Header text without message text" message="" type="warning"
          :primaryBtn="primaryButton" duration="60000" />

        <WppToast class="item"
          header="Very long header message Very long header message Very long header message Very long header message "
          message="Very long message Very long message Very long message Very long message Very long message Very long message "
          type="information" :primaryBtn="primaryButton" duration="60000" />

        <WppToast class="item"
          message="Very long message Very long message Very long message Very long message Very long message Very long message "
          type="information" :primaryBtn="primaryButton" duration="60000" />
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

.withMargin {
  margin-bottom: 8px;
  margin-top: 8px;
}

.toastBtnsWrapper {
  display: flex;
  justify-content: space-between;
  width: 1000px;
}

.chatItems {
  display: flex;
  gap: 16px;
}

.chatItem {
  position: relative;
  margin: 8px 0;
}
</style>
