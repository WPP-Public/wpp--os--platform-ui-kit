<script setup lang="ts">
import { ref } from 'vue'

import { WppCounter, WppTypography } from '@platform-ui-kit/components-library-vue'

const initiallyValue = 1

const value = ref(initiallyValue)
const formattedNumber = ref(String(initiallyValue))

const handleCounterChange = (event: CustomEvent) => {
  const number = event.detail.value
  const formattedCounterNumber = String(number).replace(/(.)(?=(\d{3})+$)/g, '$1 ')

  value.value = number
  formattedNumber.value = formattedCounterNumber
}
</script>

<template>
  <div class="container">
    <div class="counters">
      <div class="info">
        <h3>Counter</h3>
        <WppCounter
          min="10"
          :value="value"
          @wppChange="handleCounterChange"
          class="counter"
          max="1000000"
          data-testid="hover-counter"
          :format="{
            searchValue: /(.)(?=(\d{3})+$)/g,
            replaceValue: '$1 ',
          }"
        />
        <WppTypography tag="span" type="m-strong" class="message">
          Our current value is: {{ formattedNumber }}
        </WppTypography>
      </div>

      <div>
        <h3>Counter in mid state</h3>
        <WppCounter value="5" autoFocus data-testid="focus-counter" />
      </div>

      <div>
        <h3>Counter with info message</h3>
        <WppCounter message="Info message" />
      </div>

      <div>
        <h3>Counter with warning message</h3>
        <WppCounter message="Warning message" messageType="warning" />
      </div>

      <div>
        <h3>Counter with error message</h3>
        <WppCounter message="Error message" messageType="error" />
      </div>
    </div>

    <div class="counters">
      <div>
        <h3>Counter with truncation</h3>
        <WppCounter
          message="Error message"
          messageType="error"
          maxMessageLength="10"
          data-testid="counter-with-tooltip"
        />
      </div>

      <div>
        <h3>Counter with disabled state</h3>
        <WppCounter disabled />
      </div>

      <div>
        <h3>Counter with label message</h3>
        <WppCounter :labelConfig="{ text: 'Label' }" />
      </div>

      <div>
        <h3>Required Counter</h3>
        <WppCounter :labelConfig="{ text: 'Label' }" required />
      </div>

      <div>
        <h3>Counter with max value</h3>
        <WppCounter value="99" max="99" required />
      </div>
    </div>

    <div class="counters">
      <div>
        <h3>Counter without buttons</h3>
        <WppCounter required :withButtons="false" value="5" data-testid="counter-without-buttons" />
      </div>

      <div>
        <h3>Counter with info</h3>
        <WppCounter required :withButtons="false" value="5" message="Info message" />
      </div>

      <div>
        <h3>Counter with warning</h3>
        <WppCounter required :withButtons="false" value="5" message="Warning message" messageType="warning" />
      </div>

      <div>
        <h3>Counter with error</h3>
        <WppCounter required :withButtons="false" value="5" message="Error message" messageType="error" />
      </div>

      <div>
        <h3>Counter with info icon</h3>
        <WppCounter
          value="50"
          max="99"
          required
          :labelConfig="{
            icon: 'wpp-icon-info',
            text: 'Counter',
            description: 'Description',
            locales: {
              optional: 'Optional',
            },
          }"
        />
      </div>
    </div>

    <div class="counters">
      <div>
        <h3>Counter S size</h3>
        <WppCounter
          value="5"
          size="s"
          :labelConfig="{
            icon: 'wpp-icon-info',
            text: 'Counter',
            description: 'Description',
            locales: {
              optional: 'Optional',
            },
          }"
        />
      </div>

      <div>
        <h3>Counter disabled S size</h3>
        <WppCounter disabled size="s" />
      </div>

      <div>
        <h3>Warning Counter S size</h3>
        <WppCounter message="Warning message" messageType="warning" size="s" />
      </div>

      <div>
        <h3>Error Counter S size</h3>
        <WppCounter message="Error message" messageType="error" size="s" />
      </div>

      <div>
        <h3>No buttons S size</h3>
        <WppCounter size="s" :withButtons="false" />
      </div>

      <div>
        <h3>Counter with Step of 0.1</h3>
        <WppCounter value="1.5" step="0.1" size="s" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
}

.counters {
  margin-right: 15px;
}

.info {
  display: inline-flex;
  flex-direction: column;
}

.counter {
  margin-bottom: 10px;
}

.message {
  color: var(--wpp-dataviz-color-cat-dark-7);
}
</style>
