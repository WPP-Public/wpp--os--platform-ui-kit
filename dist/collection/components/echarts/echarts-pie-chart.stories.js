import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Data Visualization/ECharts',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    options: {
      showPanel: false,
    },
  },
};
export const PieChart = () => html `
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
        text: 'Pie chart',
      },
      color: ['#BC71FB', '#C880B2', '#F87171', '#F48052', '#EAB308', '#68A512', '#1FBC59', '#06B6D4', '#7B90DF'],
      series: [
        {
          type: 'pie',
          color: ['#BC71FB', '#C880B2', '#F87171', '#F48052', '#EAB308', '#68A512', '#1FBC59', '#06B6D4', '#7B90DF'],
          data: [
            { name: 'Item 1', value: 75 },
            { name: 'Item 2', value: 120 },
            { name: 'Item 3', value: 80 },
            { name: 'Item 4', value: 150 },
            { name: 'Item 5', value: 50 },
            { name: 'Item 6', value: 125 },
            { name: 'Item 7', value: 110 },
            { name: 'Item 8', value: 140 },
            { name: 'Item 9', value: 120 },
          ],
        },
      ],
    }

    myChart.setOption(option)

    window.onresize = () => myChart.resize()
  </script>
`;
PieChart.args = {};
