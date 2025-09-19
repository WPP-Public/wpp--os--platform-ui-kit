# wpp-opacity-slider



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description                                         | Type     | Default     |
| ---------- | ----------- | --------------------------------------------------- | -------- | ----------- |
| `hexColor` | `hex-color` | Hex color of the slider.                            | `string` | `undefined` |
| `opacity`  | `opacity`   | Opacity value of the slider. Values between: [0, 1] | `number` | `1`         |


## Events

| Event            | Description                                  | Type                  |
| ---------------- | -------------------------------------------- | --------------------- |
| `opacityChanged` | Event emitted when the opacity value changes | `CustomEvent<number>` |


## Dependencies

### Used by

 - [wpp-color-picker](../..)

### Depends on

- [wpp-icon-transparent](../../../wpp-icon/components/system/controls/wpp-icon-transparent)

### Graph
```mermaid
graph TD;
  wpp-opacity-slider --> wpp-icon-transparent
  wpp-color-picker --> wpp-opacity-slider
  style wpp-opacity-slider fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
