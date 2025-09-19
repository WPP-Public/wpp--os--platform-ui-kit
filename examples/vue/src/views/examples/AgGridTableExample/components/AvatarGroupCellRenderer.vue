<script lang="ts">
import { defineComponent } from "vue";
import { WppAvatarGroup } from '@platform-ui-kit/components-library-vue'

export default defineComponent({
  components: {
    WppAvatarGroup: WppAvatarGroup,
  },
  setup(props) {
    const { data } = props.params;

    return {
      firstName: data.firstName,
      lastName: data.lastName,
      avatars: data.avatarGroup,
    };
  },
});
</script>

<template>
  <div class="avatar-cell">
    <WppAvatarGroup size="s" :avatars="avatars" maxAvatarsToDisplay="3" />
    <i> {{ firstName }} {{ lastName }} </i>
  </div>
</template>

<style scoped></style>
