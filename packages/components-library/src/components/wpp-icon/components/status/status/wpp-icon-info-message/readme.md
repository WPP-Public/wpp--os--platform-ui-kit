# wpp-icon-info-message



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                                               | Type                  | Default                   |
| -------- | --------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------- |
| `color`  | `color`   | Defines the icon color.                                                                                                   | `string`              | `'var(--wpp-icon-color)'` |
| `height` | `height`  | Defines the icon height and changes its default size. If you use `height` only, the icon width will not be affected.      | `number \| undefined` | `undefined`               |
| `size`   | `size`    | Defines the icon size, where `s` is **16px** and `m` is **20px**.                                                         | `"m" \| "s"`          | `'m'`                     |
| `width`  | `width`   | Defines the icon width and changes its default size. If you use `width` only, the icon width and height will be the same. | `number \| undefined` | `undefined`               |


## Dependencies

### Used by

 - [wpp-banner](../../../../../wpp-banner)
 - [wpp-inline-message](../../../../../wpp-inline-message)
 - [wpp-toast](../../../../../wpp-toast)

### Graph
```mermaid
graph TD;
  wpp-banner --> wpp-icon-info-message
  wpp-inline-message --> wpp-icon-info-message
  wpp-toast --> wpp-icon-info-message
  style wpp-icon-info-message fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
