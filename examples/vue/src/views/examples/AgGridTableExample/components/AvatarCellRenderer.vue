<script lang="ts">
import { defineComponent } from "vue";

import { WppAvatar } from "@platform-ui-kit/components-library-vue";

export default defineComponent({
  components: {
    WppAvatar: WppAvatar,
  },
  setup(props) {
    const { data } = props.params;

    return {
      firstName: data.firstName,
      lastName: data.lastName,
      avatar: data.avatar,
    };
  },
});
</script>

<template>
  <div class="avatar-cell">
    <WppAvatar size="s" :src="avatar" />
    <i> {{ firstName }} {{ lastName }} </i>
  </div>
</template>

<style scoped></style>
