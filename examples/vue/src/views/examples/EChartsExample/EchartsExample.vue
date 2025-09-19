<script setup lang="ts">

import { lineData, pieData, barData } from './consts'
import themeJson from '@platform-ui-kit/components-library/dist/platform-ui-kit/wpp-theme.json'
import { init } from 'echarts'
import type { ECharts } from 'echarts'

import type { ThemeCatDataviz } from '@platform-ui-kit/components-library'
import { ref } from 'vue'

const themeType = 'dark'
const colors = Object.values((themeJson.content.light?.color.dataviz.cat as ThemeCatDataviz)[themeType])

const lineChartRef = ref<HTMLDivElement>(null)
const pieChartRef = ref<HTMLDivElement>(null)
const barChartRef = ref<HTMLDivElement>(null)

const initializeChart = (
  chartRef: typeof lineChartRef,
  option: typeof lineData | typeof barData | typeof pieData,
) => {
  let chart: ECharts | undefined

  if (chartRef.value !== null) {
    chart = init(chartRef.value, {
      color: colors,
    })
  }

  if (chart) {
    chart.setOption(option)
  }
}

initializeChart(lineChartRef, lineData)
initializeChart(pieChartRef, pieData)
initializeChart(barChartRef, barData)
</script>

<template>
  <div data-testid="echarts">
    <div class="echarts">
      <div :ref={lineChartRef} :style="{ width: '40%', height: '500px' }" />

      <div :ref={pieChartRef} :style="{ width: '40%', height: '500px' }" />
    </div>
    <div :ref={barChartRef} :style="{ width: '40%', height: '500px' }" />
  </div>
</template>

<style>
.echarts {
  display: flex;
}
</style>
