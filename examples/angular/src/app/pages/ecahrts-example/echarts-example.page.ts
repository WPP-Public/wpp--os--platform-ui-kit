import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ThemeCatDataviz } from '@platform-ui-kit/components-library'
import themeJson from '@platform-ui-kit/components-library/dist/platform-ui-kit/wpp-theme.json'
import { barData, lineData, pieData } from './consts'
import { init, ECharts } from 'echarts'

@Component({
  selector: 'app-echarts-example',
  templateUrl: './echarts-example.page.html',
  styleUrls: ['./echarts-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EchartsExamplePage {
  public searchParams: [] = useSearchParams()

  public colors = Object.values((themeJson.content.light?.color.dataviz.cat as ThemeCatDataviz)['dark'])

  public lineChartRef: HTMLDivElement = null
  public pieChartRef: HTMLDivElement = null
  public barChartRef: HTMLDivElement = null

  public initializeChart = (
    chartRef: typeof lineChartRef,
    option: typeof lineData | typeof barData | typeof pieData,
  ) => {
    let chart: ECharts | undefined

    if (chartRef.current !== null) {
      chart = init(chartRef.current, {
        color: this.colors,
      })
    }

    if (chart) {
      chart.setOption(option)
    }
  }

  // this.initializeChart(this.lineChartRef, lineData)
  // this.initializeChart(this.pieChartRef, pieData)
  // this.initializeChart(this.barChartRef, barData)
}
