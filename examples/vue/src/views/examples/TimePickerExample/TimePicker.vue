<script setup>
import { ref } from 'vue'
import { WppButton, WppTimePicker, WppTypography } from '@platform-ui-kit/components-library-vue'

const value = ref('')
const minutesInterval = ref(15)

const handleWppChange = event => {
  console.log(event)
  value.value = event.detail.timeFormat
}

const handleWppClear = event => {
  console.log(event)
  value.value = event.detail.timeFormat
}

const setValue = newValue => {
  value.value = newValue
}

const setMinutesInterval = interval => {
  minutesInterval.value = interval
}
</script>

<template>
  <div className="container">
    <div className="sections">
      <div className="section">
        <WppTypography className="title" type="xl-heading"> Size M </WppTypography>
        <WppTimePicker
          :value="value"
          :labelConfig="{ text: 'Label' }"
          required
          className="item"
          :minutesInterval="minutesInterval"
          @wppChange="handleWppChange"
          @wppClear="handleWppClear"
        />
        <WppTimePicker className="item" disabled :labelConfig="{ text: 'Label' }" required />
        <WppTimePicker className="item" message="Normal message" :labelConfig="{ text: 'Label' }" required />
        <WppTimePicker
          className="item"
          message="Error message"
          messageType="error"
          :minutesInterval="minutesInterval"
          :labelConfig="{ text: 'Label' }"
          required
        />
        <WppTimePicker
          className="item"
          message="Warning message"
          messageType="warning"
          :labelConfig="{ text: 'Label' }"
          required
        />
      </div>

      <div className="section">
        <WppTypography className="title" type="xl-heading"> Size S </WppTypography>
        <WppTimePicker
          :value="value"
          :labelConfig="{ text: 'Label' }"
          required
          className="item"
          size="s"
          :minutesInterval="minutesInterval"
          @wppChange="handleWppChange"
          @wppClear="handleWppClear"
        />
        <WppTimePicker size="s" className="item" disabled :labelConfig="{ text: 'Label' }" required />
        <WppTimePicker size="s" className="item" message="Normal message" :labelConfig="{ text: 'Label' }" required />
        <WppTimePicker
          size="s"
          className="item"
          message="Error message"
          messageType="error"
          :labelConfig="{ text: 'Label' }"
          required
        />
        <WppTimePicker
          size="s"
          className="item"
          message="Warning message"
          messageType="warning"
          :labelConfig="{ text: 'Label' }"
          required
        />
      </div>
    </div>

    <div className="actions">
      <div className="actionsSection">
        <WppButton className="buttonItem" @click="setValue('07:30')">Set value to: 07:30</WppButton>
        <WppButton className="buttonItem" @click="setValue('07:45')">Set value to: 07:45</WppButton>
        <WppButton className="buttonItem" @click="setValue('07:25')">Set value to: 07:25</WppButton>
      </div>
      <div className="actionsSection">
        <WppButton className="buttonItem" @click="setMinutesInterval(1)">Set minutesInterval to: 1</WppButton>
        <WppButton className="buttonItem" @click="setMinutesInterval(5)">Set minutesInterval to: 5</WppButton>
        <WppButton className="buttonItem" @click="setMinutesInterval(10)">Set minutesInterval to: 10</WppButton>
        <WppButton className="buttonItem" @click="setMinutesInterval(15)">Set minutesInterval to: 15</WppButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 50px;
}

.sections {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
}

.section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 300px;
}

.title {
  margin-bottom: 20px;
}

.item {
  margin-bottom: 20px;
}

.actionsSection {
  margin-bottom: 20px;
}

.buttonItem {
  margin-right: 10px;
}
</style>
