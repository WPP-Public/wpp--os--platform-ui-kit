<script setup lang="ts">
import { WppLabel } from "@platform-ui-kit/components-library-vue";
</script>

<template>
  <div class="container" data-testid="labels-container">
    <div class="labels">
      <h3>Regular Labels</h3>
      <WppLabel
        class="label"
        :config="{ text: 'Regular Label' }"
        typography="s-body"
      />

      <WppLabel
        class="label"
        disabled
        :config="{ text: 'Disabled Regular Label' }"
        typography="s-body"
      />

      <WppLabel
        class="label"
        optional
        :config="{ text: 'Optional Regular Label' }"
        typography="s-body"
      />

      <WppLabel
        class="label"
        htmlFor="email"
        :config="{ text: 'Regular Label with htmlFor' }"
        typography="s-body"
      />

      <WppLabel
        class="label"
        htmlFor="fname"
        optional
        disabled
        :config="{ text: 'All In Regular Label' }"
        typography="s-body"
      />

      <WppLabel
        class="label"
        :config="{
          icon: 'wpp-icon-info',
          text: 'Label with info icon',
          description: 'Description',
          locales: {
            optional: 'Optional',
          },
        }"
        :tooltipConfig="{ placement: 'right' }"
        typography="s-body"
      />

      <WppLabel :config="{ text: 'Default Label' }" data-testid="default-label"></WppLabel>
    </div>

    <div class="accent-labels">
      <h3>Accent Labels</h3>
      <WppLabel
        class="label"
        :config="{ text: 'Accent Label' }"
        typography="s-strong"
      />

      <WppLabel
        class="label"
        disabled
        typography="s-strong"
        :config="{ text: 'Disabled Accent Label' }"
      />

      <WppLabel
        class="label"
        optional
        typography="s-strong"
        :config="{ text: 'Optional Accent Label' }"
      />

      <WppLabel
        class="label"
        htmlFor="email"
        typography="s-strong"
        :config="{ text: 'Accent Label with htmlFor' }"
      />

      <WppLabel
        class="label"
        htmlFor="fname"
        optional
        disabled
        typography="s-strong"
        :config="{ text: 'All In Accent Label' }"
      />

      <WppLabel
        class="label"
        typography="s-strong"
        :config="{
          icon: 'wpp-icon-info',
          text: 'Accent Label with info icon',
          description: 'Description',
          locales: {
            optional: 'Optional',
          },
        }"
        :tooltipConfig="{ placement: 'left' }"
        data-testid="tooltip-label"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: 300px;
}

.labels {
  margin-right: 30px;
}

.label {
  margin-bottom: 10px;
}
</style>
