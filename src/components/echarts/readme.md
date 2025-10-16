## ECharts

For the Data Visualisation components creation, we recommend using the [ECharts](https://echarts.apache.org/en/index.html) library, which is proven to be a solid DataViz solution with comprehensive documentation. The free version covers plenty of functionality for building charts.
DataViz components can still have the brand's looks & feel corresponding to the branded themes CSS variables provided by the Components Library. Please have a look at the documentation on how to pass the parameters accordingly and the examples below.
The recommended version of the library to use is v.5.4.x.

### Theming

In order to implement theming, you can check ECharts [documentation](https://apache.github.io/echarts-handbook/en/concepts/style/).
Using components library theme, theming can be implemented in the following way:

```tsx
import themeJson from '@platform-ui-kit/components-library/dist/platform-ui-kit/wpp-theme.json'
import { Theme, ThemeCatDataviz } from '@platform-ui-kit/components-library'

const themeType = (searchParams.get('themeType') as 'dark' | 'light') || 'dark'
const colors = Object.values(((themeJson as Theme).content.light?.color.dataviz.cat as ThemeCatDataviz)[themeType])

let chart = init(/DOM element/, {
  color: colors,
})
```
