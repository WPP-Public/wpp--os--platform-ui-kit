import { html } from 'lit-html'

import readme from './readme.md'

export default {
  title: 'Design System/Components/Data Visualization/ECharts/Line Chart',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    options: {
      showPanel: false,
    },
    notes: { readme },
  },
}

export const LineChart = () =>
  html`
    <style>
      #main,
      html,
      body {
        width: 100%;
      }
      #main {
        height: 800px;
      }
    </style>
    <div id="main"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.0/echarts.min.js"></script>
    <script>
      var myChart = echarts.init(document.getElementById('main'))

      var option = {
        title: {
          text: 'Line chart',
        },
        color: ['#BC71FB'],
        tooltip: {},
        legend: {
          data: ['sales'],
        },
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {},
        series: [
          {
            name: 'sales',
            type: 'line',
            data: [125, 150, 100, 75, 70, 110, 125],
          },
        ],
      }

      myChart.setOption(option)

      window.onresize = () => myChart.resize()
    </script>
  `

LineChart.args = {}
