<script setup lang="ts">
import {
  WppButton,
  WppActionButton,
  WppBackToTopButton,
  WppFloatingButton,
  WppFilterButton,
  WppSortButton,
  WppIconArrow,
  WppIconMore,
  WppIconPlus,
  WppMoreButton,
  WppTypography,
} from '@platform-ui-kit/components-library-vue'
</script>

<template>
  <div class="wrapper">
    <div class="main-div">
      <p>Buttons with Dynamic Elements</p>
      <div class="dynamic-elements">
        <WppButton loading data-testid="loading-button"> Loading</WppButton>

        <WppButton loading variant="secondary" data-testid="loading-secondary-button"> Loading</WppButton>

        <WppButton loading variant="destructive" data-testid="loading-destructive-button"> Loading</WppButton>

        <WppButton loading variant="destructive-secondary" data-testid="loading-destructive-secondary-button">
          Loading</WppButton
        >

        <WppActionButton loading data-testid="loading-action-primary-button"> Loading</WppActionButton>

        <WppActionButton loading variant="secondary" data-testid="loading-action-secondary-button">
          Loading
        </WppActionButton>
      </div>

      <div class="invertedButtons">
        <h2>wpp inverted buttons</h2>
        <p>wpp inverted primary buttons</p>
        <div class="primary-buttons">
          <WppButton inverted data-testid="regular-button">Inverted</WppButton>
          <WppButton inverted class="fixed">Very Long Button Name</WppButton>

          <WppButton inverted disabled data-testid="disabled-button"> Disabled</WppButton>

          <WppButton inverted size="s"> S Size</WppButton>

          <WppButton inverted class="fixed"> Custom Width</WppButton>

          <WppButton inverted>
            <WppIconPlus slot="icon-start" />
            Plus Icon
          </WppButton>

          <WppButton inverted loading data-testid="loading-button"> Loading</WppButton>
        </div>

        <p>wpp inverted secondary button</p>
        <div class="secondary-buttons">
          <WppButton inverted variant="secondary" data-testid="regular-secondary-button"> Inverted</WppButton>

          <WppButton inverted variant="secondary" class="fixed"> Very Long Button Name </WppButton>

          <WppButton inverted disabled variant="secondary" data-testid="disabled-secondary-button"> Disabled</WppButton>

          <WppButton inverted size="s" variant="secondary"> S Size</WppButton>

          <WppButton inverted class="fixed" variant="secondary"> Custom Width </WppButton>

          <WppButton inverted variant="secondary">
            <WppIconPlus slot="icon-start" />
            Plus Icon
          </WppButton>

          <WppButton inverted loading variant="secondary" data-testid="loading-secondary-button"> Loading</WppButton>
        </div>
      </div>

      <div class="regular-buttons">
        <h2>wpp regular buttons</h2>
        <p>wpp regular primary buttons</p>
        <div class="primary-buttons">
          <WppButton data-testid="regular-button">Regular</WppButton>
          <WppButton class="fixed">Very Long Button Name</WppButton>

          <WppButton disabled data-testid="disabled-button"> Disabled</WppButton>

          <WppButton size="s"> S Size</WppButton>

          <WppButton class="fixed"> Custom Width</WppButton>

          <WppButton>
            <WppIconPlus slot="icon-start" />
            Plus Icon
          </WppButton>
        </div>

        <p>wpp regular secondary button</p>
        <div class="secondary-buttons">
          <WppButton variant="secondary" data-testid="regular-secondary-button"> Regular</WppButton>

          <WppButton variant="secondary" class="fixed"> Very Long Button Name </WppButton>

          <WppButton disabled variant="secondary" data-testid="disabled-secondary-button"> Disabled</WppButton>

          <WppButton size="s" variant="secondary"> S Size</WppButton>

          <WppButton class="fixed" variant="secondary"> Custom Width </WppButton>

          <WppButton variant="secondary">
            <WppIconPlus slot="icon-start" />
            Plus Icon
          </WppButton>
        </div>

        <p>wpp regular destructive button</p>
        <div class="destructive-buttons">
          <WppButton variant="destructive" data-testid="regular-destructive-button"> Regular</WppButton>

          <WppButton variant="destructive" class="fixed"> Very Long Button Name </WppButton>

          <WppButton disabled variant="destructive" data-testid="disabled-destructive-button"> Disabled</WppButton>

          <WppButton size="s" variant="destructive"> S Size</WppButton>

          <WppButton class="fixed" variant="destructive"> Custom Width </WppButton>

          <WppButton variant="destructive">
            <WppIconPlus slot="icon-start" />
            Plus Icon
          </WppButton>
        </div>

        <p>wpp regular destructive-secondary button</p>
        <div class="destructive-secondary-buttons">
          <WppButton data-testid="regular-destructive-secondary-button" variant="destructive-secondary">
            Regular
          </WppButton>

          <WppButton variant="destructive-secondary" class="fixed"> Very Long Button Name{' '} </WppButton>

          <WppButton disabled data-testid="disabled-destructive-secondary-button" variant="destructive-secondary">
            Disabled
          </WppButton>

          <WppButton size="s" data-testid="small-destructive-secondary-button" variant="destructive-secondary">
            S Size
          </WppButton>

          <WppButton
            class="fixed"
            data-testid="custom-width-destructive-secondary-button"
            variant="destructive-secondary"
          >
            Custom Width
          </WppButton>

          <WppButton variant="destructive-secondary">
            <WppIconPlus slot="icon-start" />
            Plus Icon
          </WppButton>
        </div>
      </div>

      <div class="action-buttons">
        <h2>wpp action button</h2>
        <p>wpp action primary button</p>
        <div class="action-primary-buttons">
          <WppActionButton data-testid="regular-action-primary-button"> Regular</WppActionButton>

          <WppActionButton disabled data-testid="disabled-action-primary-button"> Disabled</WppActionButton>

          <WppActionButton>
            <WppIconPlus slot="icon-start" />
            Plus Icon
          </WppActionButton>

          <WppActionButton>
            Arrow Icon
            <WppIconArrow slot="icon-end" />
          </WppActionButton>

          <WppActionButton>
            <WppIconPlus slot="icon-start" />
          </WppActionButton>

          <WppActionButton>
            <WppIconArrow slot="icon-end" />
          </WppActionButton>

          <WppActionButton disabled>
            <WppIconPlus slot="icon-start" />
          </WppActionButton>

          <WppActionButton disabled>
            <WppIconArrow slot="icon-end" />
          </WppActionButton>
        </div>

        <p>wpp action secondary button</p>
        <div class="action-secondary-buttons">
          <WppActionButton variant="secondary" data-testid="regular-action-secondary-button"> Regular</WppActionButton>

          <WppActionButton disabled variant="secondary" data-testid="disabled-action-secondary-button">
            Disabled
          </WppActionButton>

          <WppActionButton variant="secondary">
            <WppIconPlus slot="icon-start" />
            Plus Icon
          </WppActionButton>

          <WppActionButton variant="secondary">
            Arrow Icon
            <WppIconArrow slot="icon-end" />
          </WppActionButton>

          <WppActionButton variant="secondary">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>

          <WppActionButton variant="secondary">
            <WppIconArrow slot="icon-end" />
          </WppActionButton>

          <WppActionButton disabled variant="secondary">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>

          <WppActionButton disabled variant="secondary">
            <WppIconArrow slot="icon-end" />
          </WppActionButton>
        </div>

        <p>wpp action destructive button</p>
        <div class="action-destructive-buttons">
          <WppActionButton data-testid="regular-action-destructive-button" variant="destructive">
            Regular
          </WppActionButton>

          <WppActionButton disabled data-testid="disabled-action-destructive-button" variant="destructive">
            Disabled
          </WppActionButton>

          <WppActionButton data-testid="plus-icon-action-destructive-button" variant="destructive">
            <WppIconPlus slot="icon-start" />
            Plus Icon
          </WppActionButton>

          <WppActionButton data-testid="arrow-icon-action-destructive-button" variant="destructive">
            Arrow Icon
            <WppIconArrow slot="icon-end" />
          </WppActionButton>

          <WppActionButton data-testid="plus-icon-only-button" variant="destructive">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>

          <WppActionButton data-testid="arrow-icon-only-button" variant="destructive">
            <WppIconArrow slot="icon-end" />
          </WppActionButton>

          <WppActionButton data-testid="plus-icon-only-button" disabled variant="destructive">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>

          <WppActionButton data-testid="arrow-icon-only-button" disabled variant="destructive">
            <WppIconArrow slot="icon-end" />
          </WppActionButton>
        </div>

        <p>wpp action inverted button</p>
        <div class="toasts">
          <WppActionButton variant="inverted">Regular</WppActionButton>
          <WppActionButton variant="inverted" disabled> Disabled </WppActionButton>
          <WppActionButton variant="inverted" loading> Loading </WppActionButton>
          <WppActionButton variant="inverted">
            <WppIconPlus slot="icon-start" />
            Button
          </WppActionButton>
          <WppActionButton variant="inverted" disabled>
            <WppIconPlus slot="icon-start" />
            Button
          </WppActionButton>
          <WppActionButton variant="inverted">
            <WppIconArrow slot="icon-end" />
            Button
          </WppActionButton>
          <WppActionButton variant="inverted" disabled>
            <WppIconArrow slot="icon-end" />
            Button
          </WppActionButton>
          <WppActionButton variant="inverted">
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <WppActionButton variant="inverted" disabled>
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <WppActionButton variant="inverted" loading>
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
        </div>
      </div>

      <div class="icon-buttons">
        <h2>wpp filter button</h2>
        <WppFilterButton>Filter</WppFilterButton>
        <WppFilterButton disabled>Filter</WppFilterButton>
        <WppFilterButton :counter="3">Filter</WppFilterButton>
        <WppFilterButton :counter="3" disabled> Filter</WppFilterButton>

        <h2>wpp sort button</h2>
        <WppSortButton>Sort</WppSortButton>
        <WppSortButton disabled>Sort</WppSortButton>

        <h2>wpp floating button</h2>
        <WppFloatingButton />
        <WppFloatingButton disabled />
        <WppFloatingButton loading />
        <WppFloatingButton>
          <WppIconMore />
        </WppFloatingButton>

        <h2>wpp back to top button</h2>
        <WppBackToTopButton />
      </div>

      <div class="moreBtn">
        <WppTypography type="2xl-heading">WppMoreButton</WppTypography>

        <WppTypography class="subtitle" type="xl-heading"> Default </WppTypography>
        <div class="moreBtnSection">
          <WppMoreButton
            @wppClick="() => console.log('Clicked')"
            :ariaProps="{ label: 'More items menu' }"
            data-testid="default-more-btn-m"
            class="moreBtnItem"
          ></WppMoreButton>
          <WppMoreButton
            @wppClick="() => console.log('Clicked')"
            :ariaProps="{ label: 'More items menu' }"
            data-testid="default-more-btn-s"
            class="moreBtnItem"
            size="s"
          ></WppMoreButton>
        </div>

        <WppTypography class="subtitle" type="xl-heading"> Loading </WppTypography>
        <div class="moreBtnSection">
          <WppMoreButton
            :ariaProps="{ label: 'More items menu' }"
            loading
            data-testid="loading-more-btn-m"
            class="moreBtnItem"
          ></WppMoreButton>
          <WppMoreButton
            :ariaProps="{ label: 'More items menu' }"
            loading
            data-testid="loading-more-btn-s"
            class="moreBtnItem"
            size="s"
          ></WppMoreButton>
        </div>

        <WppTypography class="subtitle" type="xl-heading"> Disabled </WppTypography>
        <div class="moreBtnSection">
          <WppMoreButton
            :ariaProps="{ label: 'More items menu' }"
            disabled
            data-testid="disabled-more-btn-m"
            class="moreBtnItem"
          ></WppMoreButton>
          <WppMoreButton
            :ariaProps="{ label: 'More items menu' }"
            disabled
            data-testid="disabled-more-btn-s"
            class="moreBtnItem"
            size="s"
          ></WppMoreButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fixed::part(button) {
  width: 170px;
}

.toasts {
  display: flex;
  padding: 10px;
  gap: 10px;
  background-color: rgb(52 58 63);
}

.invertedButtons {
  margin-top: 10px;
  padding: 10px;
  background-color: #343a3f;
  color: white;
}

.moreBtn {
  margin-top: 20px;
  padding-bottom: 150px;
}

.subtitle {
  display: block;
  margin: 10px 0;
}

.moreBtnSection {
  margin-bottom: 20px;
}

.moreBtnItem {
  margin-right: 100px;
}

.moreBtnItem:last-child {
  margin-right: 0;
}
</style>
