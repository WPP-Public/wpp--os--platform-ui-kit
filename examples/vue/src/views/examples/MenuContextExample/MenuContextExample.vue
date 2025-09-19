<script setup lang="ts">
import {
  WppButton,
  WppIconCross,
  WppIconPlus,
  WppMenuContext,
  WppListItem,
} from '@platform-ui-kit/components-library-vue'

const dropdownConfig = {
  onHide: (instance: any) => console.log('Hide', instance),
  onShow: (instance: any) => console.log('Show', instance),
}
</script>

<template>
  <div>
    <div>
      <h3 data-testid="test-label">Menu Context Test</h3>
      <WppMenuContext :dropdownConfig="dropdownConfig" appendToListWrapper data-testid="functional-menu-context">
        <WppButton slot="trigger-element" data-testid="context-trigger-button"> Click me </WppButton>

        <div>
          <WppListItem data-testid="item-with-left-icon">
            <WppIconPlus slot="left" />
            <p slot="label">Lorem ipsum dolor sit amet, consectetur</p>
          </WppListItem>
          <WppListItem data-testid="item-with-right-icon">
            <p slot="label">Pellentesque venenatis eget diam sit amet dictum</p>
            <WppIconCross slot="right" />
          </WppListItem>
          <WppMenuContext appendToListWrapper>
            <WppListItem slot="trigger-element" isExtended data-testid="extendable-item">
              <p slot="label">Extendable Item</p>
            </WppListItem>
            <div>
              <WppMenuContext appendToListWrapper>
                <WppListItem slot="trigger-element" isExtended>
                  <p slot="label">SubItem 1</p>
                </WppListItem>
                <div>
                  <WppListItem>
                    <p slot="label">SubItem 2</p>
                  </WppListItem>
                  <WppListItem>
                    <p slot="label">SubItem 3</p>
                  </WppListItem>
                  <WppListItem>
                    <p slot="label">SubItem 3</p>
                  </WppListItem>
                  <WppListItem>
                    <p slot="label">SubItem 3</p>
                  </WppListItem>
                  <WppListItem>
                    <p slot="label">SubItem 3</p>
                  </WppListItem>
                </div>
              </WppMenuContext>
              <WppListItem disabled data-testid="disabled-item">
                <p slot="label">SubItem 2</p>
              </WppListItem>
              <WppListItem data-testid="regular-nested-item">
                <p slot="label">SubItem 3</p>
              </WppListItem>
              <WppListItem data-testid="nested-item-left-icon">
                <WppIconPlus slot="left" />
                <p slot="label">SubItem 4</p>
              </WppListItem>
              <WppListItem data-testid="nested-item-right-icon">
                <p slot="label">SubItem 5</p>
                <WppIconCross slot="right" />
              </WppListItem>
            </div>
          </WppMenuContext>
          <WppListItem data-testid="regular-item">
            <p slot="label">Nulla sit amet bibendum augue curabitur non erat purus</p>
          </WppListItem>
        </div>
      </WppMenuContext>
    </div>
  </div>
</template>
