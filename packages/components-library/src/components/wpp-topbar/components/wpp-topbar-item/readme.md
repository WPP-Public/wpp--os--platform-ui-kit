# wpp-topbar-item



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                                                                                                                                                                                                                                                | Type              | Default     |
| ------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ----------- |
| `active`      | `active`      | If `true`, the component is active                                                                                                                                                                                                                                                                         | `boolean`         | `undefined` |
| `activeItems` | --            | Indicates list of values of the items that are active, where each value represents particular navigation item                                                                                                                                                                                              | `string[]`        | `undefined` |
| `firstLevel`  | `first-level` | If `true`, the component placed on the first level of topbar                                                                                                                                                                                                                                               | `boolean`         | `false`     |
| `menu`        | `menu`        | If `true`, the component has menu icon                                                                                                                                                                                                                                                                     | `boolean`         | `false`     |
| `nativeLink`  | `native-link` | If `true`, the navigation link will be have native behaviour `a` tag. If app using `client side render` you need to leave `nativeLink` false, if `server side render`, then better to use this prop This is not dynamic prop, so in Storybook when change value of this prop, need you to refresh the page | `boolean`         | `false`     |
| `navigation`  | --            | Indicates navigation items                                                                                                                                                                                                                                                                                 | `NavigationState` | `undefined` |


## Events

| Event                       | Description                          | Type                                     |
| --------------------------- | ------------------------------------ | ---------------------------------------- |
| `wppActiveTopbarItemChange` | Emitted when topbar item was changed | `CustomEvent<NavigationItemEventDetail>` |


## Dependencies

### Used by

 - [wpp-topbar](../..)

### Depends on

- [wpp-menu-context](../../../wpp-menu-context)
- [wpp-navigation-item](../wpp-navigation-item)
- [wpp-list-item](../../../wpp-list-item)

### Graph
```mermaid
graph TD;
  wpp-topbar-item --> wpp-menu-context
  wpp-topbar-item --> wpp-navigation-item
  wpp-topbar-item --> wpp-list-item
  wpp-navigation-item --> wpp-typography
  wpp-navigation-item --> wpp-icon-more
  wpp-navigation-item --> wpp-icon-chevron
  wpp-list-item --> wpp-icon-chevron
  wpp-list-item --> wpp-icon-tick
  wpp-list-item --> wpp-checkbox
  wpp-list-item --> wpp-tooltip
  wpp-checkbox --> wpp-label
  wpp-checkbox --> wpp-icon-tick
  wpp-checkbox --> wpp-icon-dash
  wpp-checkbox --> wpp-inline-message
  wpp-label --> wpp-internal-label
  wpp-internal-label --> wpp-typography
  wpp-internal-label --> wpp-tooltip
  wpp-tooltip --> wpp-internal-tooltip
  wpp-internal-tooltip --> wpp-icon-error
  wpp-internal-tooltip --> wpp-icon-warning
  wpp-inline-message --> wpp-icon-warning
  wpp-inline-message --> wpp-icon-error
  wpp-inline-message --> wpp-icon-info-message
  wpp-inline-message --> wpp-icon-success
  wpp-inline-message --> wpp-tooltip
  wpp-inline-message --> wpp-action-button
  wpp-inline-message --> wpp-icon-cross
  wpp-action-button --> wpp-spinner
  wpp-topbar --> wpp-topbar-item
  style wpp-topbar-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
