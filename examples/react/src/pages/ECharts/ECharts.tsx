import React, { useEffect, useRef } from 'react'
import { init, ECharts } from 'echarts'
import { useSearchParams } from 'react-router-dom'

import themeJson from '@platform-ui-kit/components-library/dist/platform-ui-kit/wpp-theme.json'
import { ThemeCatDataviz } from '@platform-ui-kit/components-library'

import { lineData, pieData, barData } from './consts'

import './ECharts.scss'

export const EChartsPage = () => {
  const [searchParams] = useSearchParams()

  const themeType = (searchParams.get('themeType') as 'dark' | 'light') || 'dark'
  const colors = Object.values((themeJson.content.light?.color.dataviz.cat as ThemeCatDataviz)[themeType])

  const lineChartRef = useRef<HTMLDivElement>(null)
  const pieChartRef = useRef<HTMLDivElement>(null)
  const barChartRef = useRef<HTMLDivElement>(null)

  const initializeChart = (
    chartRef: typeof lineChartRef,
    option: typeof lineData | typeof barData | typeof pieData,
  ) => {
    let chart: ECharts | undefined

    if (chartRef.current !== null) {
      chart = init(chartRef.current, {
        color: colors,
      })
    }

    if (chart) {
      chart.setOption(option)
    }
  }

  useEffect(() => {
    initializeChart(lineChartRef, lineData)
    initializeChart(pieChartRef, pieData)
    initializeChart(barChartRef, barData)
  }, [])

  return (
    <div data-testid="echarts">
      <div className="echarts">
        <div ref={lineChartRef} style={{ width: '40%', height: '500px' }} />

        <div ref={pieChartRef} style={{ width: '40%', height: '500px' }} />
      </div>
      <div ref={barChartRef} style={{ width: '40%', height: '500px' }} />
    </div>
  )
}
