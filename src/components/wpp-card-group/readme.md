# wpp-card-group



<!-- Auto Generated Below -->


## Usage

### Angular

```ts
@Component({
  ...
})
export class CardGroupExample {
  public multipleValue: CardValue[] = ['item-a', 'item-b']
  public singleValue: CardValue = 'item-c'
  public withRadioOrCheckbox: boolean = false

  public handleMultipleCardGroupChange(event: Event): void {
    console.log('event.detail => ', (event as CustomEvent<CardGroupChangeEventDetail>).detail.value)
  }

  public handleSingleCardGroupChange(event: Event): void {
    console.log('event.detail => ', (event as CustomEvent<CardGroupChangeEventDetail>).detail.value)
  }
}
```

```html
<wpp-card-group multiple [value]="multipleValue" (wppChange)="handleMultipleCardGroupChange($event)">
  <wpp-card value="item-a">
    <div>
      Information about item a
    </div>
    <wpp-typography slot="header">Item A</wpp-typography>
  </wpp-card>
  <wpp-card value="item-b">
    <div>
      Information about item b
    </div>
    <wpp-typography slot="header">Item B</wpp-typography>
  </wpp-card>
  <wpp-card value="item-c">
    <div>
      Information about item c
    </div>
    <wpp-typography slot="header">Item C</wpp-typography>
  </wpp-card>
</wpp-card-group>

<wpp-card-group [value]="singleValue" [withRadioOrCheckbox]="withRadioOrCheckbox" (wppChange)="handleSingleCardGroupChange($event)">
  <wpp-card value="item-a">
    <wpp-typography slot="header">Item A</wpp-typography>
  </wpp-card>
  <wpp-card value="item-b">
    <wpp-typography slot="header">Item B</wpp-typography>
  </wpp-card>
  <wpp-card value="item-c">
    <wpp-typography slot="header">Item C</wpp-typography>
  </wpp-card>
</wpp-card-group>
```


### React

```tsx
import React from 'react'
import { WppCard, WppCardGroup, WppTypography } from '@platform-ui-kit/components-library-react'
import { CardGroupChangeEventDetail } from '@platform-ui-kit/components-library'

export const CardGroupExample = () => {
  const handleMultipleCardGroupChange = (event: CustomEvent<CardGroupChangeEventDetail>) => {
    console.log('event.detail =>', event.detail)
  }

  const handleSingleCardGroupChange = (event: CustomEvent<CardGroupChangeEventDetail>) => {
    console.log('event.detail =>', event.detail)
  }

  return (
    <>
      <WppCardGroup multiple value={['item-a', 'item-c']} onWppChange={handleMultipleCardGroupChange}>
        <WppCard value="item-a">
          <div>
            Information about item a
          </div>
          <WppTypography slot="header">Item A</WppTypography>
        </WppCard>
        <WppCard value="item-b">
          <div>
            Information about item b
          </div>
          <WppTypography slot="header">Item B</WppTypography>
        </WppCard>
        <WppCard value="item-c">
          <div>
            Information about item c
          </div>
          <WppTypography slot="header">Item C</WppTypography>
        </WppCard>
      </WppCardGroup>

      <WppCardGroup value="item-a" withRadioOrCheckbox={false} onWppChange={handleSingleCardGroupChange}>
        <WppCard value="item-a" >
          <WppTypography slot="header">Item A</WppTypography>
        </WppCard>
        <WppCard value="item-b" >
          <WppTypography slot="header">Item B</WppTypography>
        </WppCard>
        <WppCard value="item-c" >
          <WppTypography slot="header">Item C</WppTypography>
        </WppCard>
      </WppCardGroup>
    </>
  )
}
```


### Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import {
  WppCard,
  WppCardGroup,
  WppTypography,
} from "@platform-ui-kit/components-library-vue";

const isToShowBanner = ref(true)

const multipleGroupValue = ref(["item-a"]);

const handleMultipleCardGroupChange = (event: CustomEvent) => {
  console.log("event.detail =>", event.detail);

  multipleGroupValue.value = event.detail.value;
};

const handleSingleCardGroupChange = (event: CustomEvent) => {
  console.log("event.detail =>", event.detail);
};
</script>

<template>
  <div>
    <WppCardGroup
      class="multiple"
      multiple
      :value="multipleGroupValue"
      size="s"
      @wppChange="handleMultipleCardGroupChange"
    >
      <WppCard class="item" value="item-a">
        <div>Information about item a</div>
        <WppTypography slot="header" type="s-strong"> Item A </WppTypography>
      </WppCard>
      <WppCard class="item" value="item-b">
        <div>Information about item b</div>
        <WppTypography slot="header" type="s-strong"> Item B </WppTypography>
      </WppCard>
      <WppCard class="item" value="item-c">
        <div>Information about item c</div>
        <WppTypography slot="header" type="s-strong"> Item C </WppTypography>
      </WppCard>
    </WppCardGroup>

    <WppCardGroup
      value="item-a"
      size="l"
      :withRadioOrCheckbox="false"
      @wppChange="handleSingleCardGroupChange"
    >
      <WppCard class="item" value="item-a">
        <WppTypography slot="header" type="l-strong"> Item A </WppTypography>
      </WppCard>
      <WppCard class="item" value="item-b">
        <WppTypography slot="header" type="l-strong"> Item B </WppTypography>
      </WppCard>
      <WppCard class="item" value="item-c">
        <WppTypography slot="header" type="l-strong"> Item C </WppTypography>
      </WppCard>
    </WppCardGroup>
  </div>
</template>
```



## Properties

| Property              | Attribute                | Description                                                                                                              | Type                                           | Default     |
| --------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- | ----------- |
| `allowEmptySelection` | `allow-empty-selection`  | If `true`, single card group require no card selection and can be empty. Users can deselect a card by clicking it again. | `boolean`                                      | `false`     |
| `ariaProps`           | --                       | Contains the `aria-` props for component                                                                                 | `AriaProps`                                    | `{}`        |
| `multiple`            | `multiple`               | If `true`, the card group will give possibility to select multiple cards                                                 | `boolean`                                      | `false`     |
| `name`                | `name`                   | Indicates the card group name                                                                                            | `string`                                       | `undefined` |
| `required`            | `required`               | If `true`, the card group is required                                                                                    | `boolean`                                      | `false`     |
| `size`                | `size`                   | Indicates the size of the cards                                                                                          | `"2xl" \| "l" \| "m" \| "s" \| "xl"`           | `'m'`       |
| `value`               | `value`                  | Indicates the card group value                                                                                           | `CardValue[] \| number \| string \| undefined` | `undefined` |
| `withRadioOrCheckbox` | `with-radio-or-checkbox` | If `true`, the card group has radio or checkbox button on the right-top-side of the card                                 | `boolean`                                      | `true`      |


## Events

| Event       | Description                                | Type                                      |
| ----------- | ------------------------------------------ | ----------------------------------------- |
| `wppBlur`   | Emitted when the card group loses focus    | `CustomEvent<FocusEvent>`                 |
| `wppChange` | Emitted when the card group value changes  | `CustomEvent<CardGroupChangeEventDetail>` |
| `wppFocus`  | Emitted when the card group receives focus | `CustomEvent<FocusEvent>`                 |


## Slots

| Slot | Description                                                                                                                 |
| ---- | --------------------------------------------------------------------------------------------------------------------------- |
|      | Content is placed inside the card-group component. It can be only <wpp-card>. The default slot, without the name attribute. |


## Shadow Parts

| Part      | Description          |
| --------- | -------------------- |
| `"inner"` | Content slot element |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
