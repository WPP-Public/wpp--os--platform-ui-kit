# wpp-menu-list

Create a menu component that indicates the currently active screen.

<!-- Auto Generated Below -->


## Properties

| Property                    | Attribute | Description                                                                                                                                                                                                    | Type                        | Default      |
| --------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ------------ |
| `dropdownConfig`            | --        | Defines the dropdown configuration. Under the hood dropdown using tippy.js, all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/` | `DropdownConfig`            | `{}`         |
| `shouldCloseOnOutsideClick` | --        | Helper that defines If the menu can be closed by clicking outside of it.                                                                                                                                       | `(event: Event) => boolean` | `() => true` |


## Slots

| Slot                | Description                                                                                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"trigger-element"` | Content that is considered the list target. Can be used on one element only and that element must be passed first. If used, other components are displayed as a list. |


## Shadow Parts

| Part        | Description          |
| ----------- | -------------------- |
| `"inner"`   | Content slot element |
| `"trigger"` | Trigger menu element |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
