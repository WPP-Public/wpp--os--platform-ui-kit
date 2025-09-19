<script lang="ts">
import { defineComponent } from "vue";

import { WppInput } from "@platform-ui-kit/components-library-vue";

export default defineComponent({
  components: {
    WppInput: WppInput,
  },
  setup(props) {
    const { data } = props.params;
    const messageType = data.meta?.error ? "error" : undefined;

    return {
      messageType: messageType,
      linkedIn: data.linkedIn,
    };
  },
});
</script>

<template>
  <div class="linkedin-cell">
    <WppInput :value="linkedIn" size="s" :messageType="messageType" />
  </div>
</template>

<style scoped></style>
