# ADR0002_FE_Choose_table_component
​
## Status
 _Proposed_
​
## Summary
_Research the most appropriate library for our purpose._
​
## Problem & Context
_Table should cover our design decision, have good maintenance, strong community and transparency of the solution adoption process, good documentation_
​
## Considered options
_Following options for table component:_
​
### Grid.js (https://gridjs.io/)
| Pros | Cons |
|------|------|
| Free     |  Lack of required features    |
|  Have basic features like pagination, fixed header, search, sort    |  Poor API for existing features  |
| Light weight | Is not great for enterprise applications  |
| | Poor library API |
| | Only 10k weekly downloads on npm |
| | Last publish a year ago |



​
### Toast UI (https://gridjs.io/)
| Pros | Cons |
|------|------|
| Free     |  Lack of required features |
|  Have basic list of features like pagination, validation, sorting,frozen columns, filters, pagination |  Not bad API for existing features, but with gaps |
| Last publish a week ago | Very low number of weekly downloads on npm (1.6k) |
| | Pure JavaScript grid with no support for other JavaScript frameworks |
| | Poor library API |
| | Hard to find answers to the questions (small community)|
| | Not structured documentation |

​
### Handsontable (https://handsontable.com/)
| Pros | Cons |
|------|------|
| Have extended list of features like validation, sorting,frozen columns, filters, pagination, drag&drop etc. | Not free |
| Good documentation | Has spreadsheet-like UI |
| Supports pure JS, React, Angular, Vue | Very limited with the theming options |
| Last publish a week ago | Some of the features (drag&drop) are not available if we will not render additional dummy column (like we have in excel) |
| 100k weekly downloads on npm | Huge list of open issues (835) |
| | Heavy weight |

​
### AG Grid (https://www.ag-grid.com/)
| Pros | Cons |
|------|------|
| Have extended list of features like validation, sorting,frozen columns, filters, pagination, drag&drop etc. | Not free |
| Good documentation | Heavy weight |
| Supports pure JS, React, Angular, Vue |  |
| Last publish a week ago |  |
| Small list of open issues (15) |  |
| 365k weekly downloads on npm |  |
| Powerful API | |
| Good theming possibility | |

### TanStack (https://tanstack.com/table/v8)
| Pros | Cons |
|------|------|
| Free | As it provides only "building blocks", we will need to implement the table component |
| Light-weight | Need to full maintain the solution from our side |
| Have base list of features | No markup, styles or themes provided |
| Good documentation | No drag and drop feature from the box |
| Supports pure JS, React, Svelte, Vue | No Angular adapter |
| Regular updates |  |
| Small list of open issues |  |
| Full control over markup and styles  | |

​
## Risks
_If we will use one of these libraries, of course we will be limited by the library we will choose. Some libraries have quite powerful API's and theming possibilities, so we will have flexibility._
​
## Decision
_In my opinion the best choice for table (if costs do not influence a lot) - AG Grid. This library has a good support, big community, regular updates. It also provides us the features we need based on our design (like pagination, fixed header, sorting etc.)
Also, it have a powerful API and theming options, that gives us possibility to wrap this library and to add even some more features, if we will need that.
But in case if we need to have a free solution TanStack will be the best option, as it gives us a "building blocks" to create a table solution we need._
