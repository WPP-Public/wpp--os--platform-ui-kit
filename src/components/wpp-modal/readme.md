# wpp-modal



<!-- Auto Generated Below -->


## Usage

### Angular

```ts
@Component({
  ...
})
export class ModalExample {
  public isOpen: boolean = false;

  public open(): void {
    this.isOpen = true;
  }

  public close(): void {
    this.isOpen = false;
  }
}
```

```html
<wpp-button (click)="open()">Open</wpp-button>

<wpp-modal [open]="isOpen" (wppModalClose)="close()">
  <div slot="header">Lorem Ipsum</div>

  <div slot="body">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </div>

  <div slot="actions">
    <wpp-button variant="secondary" (click)="close()">Close</wpp-button>
  </div>
</wpp-modal>
```


### React

```tsx
import { WppModal, WppButton } from '@wppopen/components-library-react'

export const ModalExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  return (
    <>
      <WppButton onClick={handleOpenModal}>Open Modal</WppButton>

      <WppModal open={isModalOpen} onWppModalClose={handleCloseModal}>
        <div slot="header">Title</div>
        <p slot="body">Body of the modal</p>
        <div slot="actions">
          <WppButton variant="primary" size="s" onClick={handleCloseModal}>
            Close
          </WppButton>
        </div>
      </WppModal>
    </>
  )
}
```


### Vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { WppButton, WppModal } from '@wppopen/components-library-vue'

const isModalOpen = ref(false)

const handleOpenModal = () => (isModalOpen.value = true)
const handleCloseModal = () => (isModalOpen.value = false)
</script>

<template>
  <div>
    <WppButton @click="handleOpenModal">Open Modal</WppButton>
    <WppModal :open="isModalOpen" @wppModalClose="handleCloseModal">
      <div slot="header">Title</div>
      <p slot="body">Body of the modal</p>
      <div slot="actions">
        <WppButton variant="primary" size="s" @click="handleCloseModal">Close</WppButton>
      </div>
    </WppModal>
  </div>
</template>
```



## Properties

| Property                 | Attribute                  | Description                                                       | Type                           | Default         |
| ------------------------ | -------------------------- | ----------------------------------------------------------------- | ------------------------------ | --------------- |
| `disableOutsideClick`    | `disable-outside-click`    | If the modal can be closed by clicking outside of it.             | `boolean`                      | `false`         |
| `formConfig`             | --                         | If you pass this prop wrapper of dialog will be rendered as form. | `ModalFormConfig \| undefined` | `undefined`     |
| `open`                   | `open`                     | Indicates is the modal open.                                      | `boolean`                      | `false`         |
| `size`                   | `size`                     | Indicates the modal size                                          | `"m" \| "s"`                   | `'s'`           |
| `withTransparentOverlay` | `with-transparent-overlay` | Makes overlay transparent                                         | `boolean`                      | `undefined`     |
| `zIndex`                 | `z-index`                  | Defines the z-index of the WppModal.                              | `number`                       | `Z_INDEX.MODAL` |


## Events

| Event                   | Description                                                                                                                                                                                     | Type                             |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `wppModalClose`         | Handles the modal closing actions.                                                                                                                                                              | `CustomEvent<ModalCloseDetails>` |
| `wppModalCloseComplete` | Event emitted when the close animation ends.                                                                                                                                                    | `CustomEvent<ModalCloseDetails>` |
| `wppModalCloseStart`    | Event emitted when the close animation starts.                                                                                                                                                  | `CustomEvent<ModalCloseDetails>` |
| `wppModalOpen`          | <span style="color:red">**[DEPRECATED]**</span> - this prop will be deleted in version 4.0.0 . Use `wppModalOpenStart`/`wppModalOpenComplete` instead<br/><br/>Handles the modal click actions. | `CustomEvent<void>`              |
| `wppModalOpenComplete`  | Event emitted when the open animation ends.                                                                                                                                                     | `CustomEvent<void>`              |
| `wppModalOpenStart`     | Event emitted when the open animation starts.                                                                                                                                                   | `CustomEvent<void>`              |


## Methods

### `closeModal() => Promise<void>`

Method for closing the modal.

#### Returns

Type: `Promise<void>`



### `openModal() => Promise<void>`

Method for opening the modal.

#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                                                                                                                                             |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"actions"` | Content that is displayed within the `.modal` element. To add actions, pass `slot="actions"` – can contain any action buttons.                          |
| `"body"`    | Content that is displayed within the `.modal` element. To add body content, pass `slot="body"` – can contain any text that describes the modal actions. |
| `"header"`  | Content that is displayed within the `.modal` element. To add header content, pass `slot="header"` – can contain the modal title.                       |


## Shadow Parts

| Part        | Description               |
| ----------- | ------------------------- |
| `"actions"` | actions slot element      |
| `"body"`    | Main slot content wrapper |
| `"content"` | modal content element     |
| `"header"`  | header slot element       |
| `"overlay"` | overlay element           |
| `"wrapper"` | component wrapper element |


## CSS Custom Properties

| Name                                                   | Description |
| ------------------------------------------------------ | ----------- |
| `--wpp-modal-actions-paddings`                         |             |
| `--wpp-modal-bg-color`                                 |             |
| `--wpp-modal-body-paddings`                            |             |
| `--wpp-modal-box-shadow`                               |             |
| `--wpp-modal-header-padding`                           |             |
| `--wpp-modal-overlay-bg-color`                         |             |
| `--wpp-modal-vertical-position-animation-minus-number` |             |
| `--wpp-modal-vertical-position-minus-number`           |             |
| `--wpp-modal-width-m`                                  |             |
| `--wpp-modal-width-s`                                  |             |


## Dependencies

### Depends on

- [wpp-overlay](../wpp-overlay)

### Graph
```mermaid
graph TD;
  wpp-modal --> wpp-overlay
  style wpp-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
