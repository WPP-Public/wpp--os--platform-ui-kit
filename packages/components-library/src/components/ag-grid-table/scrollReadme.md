### Enabling Scrollbars

AG Grid provides multiple ways to handle scrollbars and grid layout. By default, if your grid has more rows or columns than can fit in its container, AG Grid will show scrollbars automatically. There are two common approaches you can use:

#### Dynamic Scroll Appearance
You can enhance the scrollbar experience by:
- Dynamically toggling a `.scrolling` class on `.ag-body-viewport` and/or `.ag-body-horizontal-scroll-viewport`.
- See our examples (React, Angular, Vue) for how to add event listeners on `onFirstDataRendered` or similar callbacks.

