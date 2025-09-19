# ADR0003_FE_Review_echarts_as_3rd_party_solution
​
## Status
 _Proposed_
​
## Summary
_Review eCharts as 3rd party solution for Data Visualisation._
​
## Problem & Context
_Review if eCharts has good customization, documentation from the technical perspective and evaluate the comprehensiveness of this solution_
​
## Considered options
_Following options for charts:_
​
### eCharts (https://echarts.apache.org/en/index.html)
| Pros | Cons |
|------|------|
|  Good documentation    |   Big number of opened issues (2086)  |
|  Regular updates   |  Learning curve is a bit higher comparing to Chart.js    |
|  Big community (400k downloads)    |      |
|  React, Angular, Vue compatible |      |
|  High level of customization    |      |
|  High range of graphs    |      |
|  Huge examples list    |      |
|  Good performance      |      |
​
### Chart.js (https://www.chartjs.org/)
| Pros | Cons |
|------|------|
|   Good documentation   |   Easy-to-go   |
|   Regular updates   |  No advanced graphs provided  |
|   Big community (1.8kk downloads)   |  No advanced customization possible  |
|   Good level of customization   |      |
|   Basic range of graphs   |     |
|   Good performance   |      |
|   Small number of opened issues (161) | |
​
## Risks
_If we will use one of this library, of course we will be limited by this library. We freely can change styles, but it's not possible to change the behavior of the charts_
​
## Decision
_We had to review the eCharts solution, and it looks very promising. The library has very good documentation with examples, big range of charts and highly customizable. Also during this review, the library was compared with another popular library - Chart.js, and comparing to it, eCharts have bigger range of charts and higher customization level. Based on the information above we definitely can choose eCharts as our solution._
