<script setup lang="ts">
import {
  WppActionButton,
  WppCard,
  WppIconMore,
  WppTypography,
} from "@platform-ui-kit/components-library-vue";
</script>

<template>
  <div class="container" data-testid="cards-container">
    <div class="pack">
      <div>
        <h3>Regular</h3>
        <WppCard class="item" variant="primary" size="s">
          <WppTypography slot="header" type="s-strong">
            Card Size S
          </WppTypography>
        </WppCard>

        <WppCard class="item" variant="primary" size="m">
          <WppTypography slot="header" type="m-strong">
            Card Size M
          </WppTypography>
        </WppCard>

        <WppCard class="item" variant="primary" size="l">
          <WppTypography slot="header" type="l-strong">
            Card Size L
          </WppTypography>
        </WppCard>

        <WppCard class="item" variant="primary" size="xl">
          <WppTypography slot="header" type="xl-heading">
            Card Size XL
          </WppTypography>
        </WppCard>

        <WppCard class="item" variant="primary" size="2xl">
          <WppTypography slot="header" type="2xl-heading">
            Card Size 2XL
          </WppTypography>
        </WppCard>
      </div>

      <div class="section sectionend">
        <WppCard class="item" variant="secondary" size="s">
          <WppTypography slot="header" type="s-strong">
            Secondary Card Size S
          </WppTypography>
        </WppCard>

        <WppCard class="item" variant="secondary" size="m">
          <WppTypography slot="header" type="m-strong">
            Secondary Card Size M
          </WppTypography>
        </WppCard>

        <WppCard class="item" variant="secondary" size="l">
          <WppTypography slot="header" type="l-strong">
            Secondary Card Size L
          </WppTypography>
        </WppCard>

        <WppCard class="item" variant="secondary" size="xl">
          <WppTypography slot="header" type="xl-heading">
            Secondary Card Size XL
          </WppTypography>
        </WppCard>

        <WppCard class="item" variant="secondary" size="2xl">
          <WppTypography slot="header" type="2xl-heading">
            Secondary Card Size 2XL
          </WppTypography>
        </WppCard>
      </div>

      <div class="sectionend">
        <h3>Clickable</h3>
        <WppCard class="item" variant="primary" size="s" interactive>
          <WppTypography slot="header" type="s-strong">
            Interactive Card Size S
          </WppTypography>
        </WppCard>

        <WppCard class="item" variant="primary" size="m" interactive>
          <WppTypography slot="header" type="m-strong">
            Interactive Card Size M
          </WppTypography>
        </WppCard>

        <WppCard class="item" variant="primary" size="l" interactive>
          <WppTypography slot="header" type="l-strong">
            Interactive Card Size L
          </WppTypography>
        </WppCard>

        <WppCard class="item" variant="primary" size="xl" interactive>
          <WppTypography slot="header" type="xl-heading">
            Interactive Card Size XL
          </WppTypography>
        </WppCard>

        <WppCard class="item" variant="primary" size="2xl" interactive>
          <WppTypography slot="header" type="2xl-heading">
            Interactive Card Size 2XL
          </WppTypography>
        </WppCard>
      </div>
    </div>

    <div class="pack">
      <div>
        <h3>Truncation with actions</h3>
        <WppCard class="item" variant="primary" size="s">
          <WppTypography slot="header" type="s-strong">
            Long title S size just to test how truncation works inside the card
          </WppTypography>
          <div slot="actions">
            <WppActionButton variant="secondary">
              <WppIconMore slot="icon-start" direction="horizontal" />
            </WppActionButton>
          </div>
        </WppCard>

        <WppCard class="item" variant="primary" size="m">
          <div class="content">
            <span>
              This is not a header but a simply content. This is not a header but a simply content. This is not a
                header but a simply content. This is not a header but a simply content. This is not a header but a
                simply content
            </span>
          </div>
          <div slot="actions">
            <WppActionButton variant="secondary">
              <WppIconMore slot="icon-start" direction="horizontal" />
            </WppActionButton>
          </div>
        </WppCard>

        <WppCard class="item" variant="primary" size="l">
          <WppTypography slot="header" type="l-strong">
            Long title L size just to test how truncation works inside the card
          </WppTypography>
          <span>
              This is not a header but a simply content. This is not a header but a simply content. This is not a header
              but a simply content. This is not a header but a simply content. This is not a header but a simply content
            </span>
          <div slot="actions">
            <WppActionButton variant="secondary">
              <WppIconMore slot="icon-start" direction="horizontal" />
            </WppActionButton>
          </div>
        </WppCard>

        <WppCard class="item" variant="primary" size="xl">
          <WppTypography slot="header" type="xl-heading">
            Long title XL size just to test how truncation works inside the card
          </WppTypography>
          <span>
              This is not a header but a simply content. This is not a header but a simply content. This is not a header
              but a simply content. This is not a header but a simply content. This is not a header but a simply content
            </span>
          <div slot="actions">
            <WppActionButton variant="secondary">
              <WppIconMore slot="icon-start" direction="horizontal" />
            </WppActionButton>
          </div>
        </WppCard>

        <WppCard class="item" variant="primary" size="2xl">
          <WppTypography slot="header" type="2xl-heading">
            Long title 2XL size just to test how truncation works inside the
            card
          </WppTypography>
          <span>
              This is not a header but a simply content. This is not a header but a simply content. This is not a header
              but a simply content. This is not a header but a simply content. This is not a header but a simply content
            </span>
          <div slot="actions">
            <WppActionButton variant="secondary">
              <WppIconMore slot="icon-start" direction="horizontal" />
            </WppActionButton>
          </div>
        </WppCard>
      </div>
    </div>

    <div class="pack">
      <div>
        <h3>Selectable (Single)</h3>
        <WppCard class="item" variant="primary" size="s" type="single">
          <WppTypography slot="header" type="s-strong">
            Single Select Card Size S
          </WppTypography>
        </WppCard>

        <WppCard class="item" variant="primary" size="m" type="single">
          <WppTypography slot="header" type="m-strong">
            Single Select Card Size M
          </WppTypography>
        </WppCard>

        <WppCard class="item" variant="primary" size="l" type="single">
          <WppTypography slot="header" type="l-strong">
            Single Select Card Size L
          </WppTypography>
        </WppCard>

        <WppCard class="item" variant="primary" size="xl" type="single">
          <WppTypography slot="header" type="xl-heading">
            Single Select Card Size XL
          </WppTypography>
        </WppCard>

        <WppCard class="item" variant="primary" size="2xl" type="single">
          <WppTypography slot="header" type="2xl-heading">
            Single Select Card Size 2XL
          </WppTypography>
        </WppCard>
      </div>

      <div class="section">
        <WppCard class="item" variant="primary" size="s" type="single" disabled>
          <WppTypography slot="header" type="s-strong">
            Disabled Single Select Card Size S
          </WppTypography>
        </WppCard>

        <WppCard class="item" variant="primary" size="m" type="single" disabled>
          <WppTypography slot="header" type="m-strong">
            Disabled Single Select Card Size M
          </WppTypography>
        </WppCard>

        <WppCard class="item" variant="primary" size="l" type="single" disabled>
          <WppTypography slot="header" type="l-strong">
            Disabled Single Select Card Size L
          </WppTypography>
        </WppCard>

        <WppCard
          class="item"
          variant="primary"
          size="xl"
          type="single"
          disabled
        >
          <WppTypography slot="header" type="xl-heading">
            Disabled Single Select Card Size XL
          </WppTypography>
        </WppCard>

        <WppCard
          class="item"
          variant="primary"
          size="2xl"
          type="single"
          disabled
        >
          <WppTypography slot="header" type="2xl-heading">
            Disabled Single Select Card Size 2XL
          </WppTypography>
        </WppCard>
      </div>

      <div class="section">
        <WppCard class="item" variant="primary" size="s" type="single" checked>
          <WppTypography slot="header" type="s-strong">
            Checked Single Select Card Size S
          </WppTypography>
        </WppCard>

        <WppCard class="item" variant="primary" size="m" type="single" checked>
          <WppTypography slot="header" type="m-strong">
            Checked Single Select Card Size M
          </WppTypography>
        </WppCard>

        <WppCard class="item" variant="primary" size="l" type="single" checked>
          <WppTypography slot="header" type="l-strong">
            Checked Single Select Card Size L
          </WppTypography>
        </WppCard>

        <WppCard class="item" variant="primary" size="xl" type="single" checked>
          <WppTypography slot="header" type="xl-heading">
            Checked Single Select Card Size XL
          </WppTypography>
        </WppCard>

        <WppCard
          class="item"
          variant="primary"
          size="2xl"
          type="single"
          checked
        >
          <WppTypography slot="header" type="2xl-heading">
            Checked Single Select Card Size 2XL
          </WppTypography>
        </WppCard>
      </div>

      <div class="section sectionend">
        <WppCard
          class="item"
          variant="primary"
          size="s"
          type="single"
          checked
          disabled
        >
          <WppTypography slot="header" type="s-strong">
            Disabled Checked Single Select Card Size S
          </WppTypography>
        </WppCard>

        <WppCard
          class="item"
          variant="primary"
          size="m"
          type="single"
          checked
          disabled
        >
          <WppTypography slot="header" type="m-strong">
            Disabled Checked Single Select Card Size M
          </WppTypography>
        </WppCard>

        <WppCard
          class="item"
          variant="primary"
          size="l"
          type="single"
          checked
          disabled
        >
          <WppTypography slot="header" type="l-strong">
            Disabled Checked Single Select Card Size L
          </WppTypography>
        </WppCard>

        <WppCard
          class="item"
          variant="primary"
          size="xl"
          type="single"
          checked
          disabled
        >
          <WppTypography slot="header" type="xl-heading">
            Disabled Checked Single Select Card Size XL
          </WppTypography>
        </WppCard>

        <WppCard
          class="item"
          variant="primary"
          size="2xl"
          type="single"
          checked
          disabled
        >
          <WppTypography slot="header" type="2xl-heading">
            Disabled Checked Single Select Card Size 2XL
          </WppTypography>
        </WppCard>
      </div>
    </div>

    <div class="pack">
      <div>
        <h3>Selectable (Multiple)</h3>
        <WppCard class="item" variant="primary" size="s" type="multiple">
          <WppTypography slot="header" type="s-strong">
            Multiple Select Card Size S
          </WppTypography>
        </WppCard>

        <WppCard class="item" variant="primary" size="m" type="multiple">
          <WppTypography slot="header" type="m-strong">
            Multiple Select Card Size M
          </WppTypography>
        </WppCard>

        <WppCard class="item" variant="primary" size="l" type="multiple">
          <WppTypography slot="header" type="l-strong">
            Multiple Select Card Size L
          </WppTypography>
        </WppCard>

        <WppCard class="item" variant="primary" size="xl" type="multiple">
          <WppTypography slot="header" type="xl-heading">
            Multiple Select Card Size XL
          </WppTypography>
        </WppCard>

        <WppCard class="item" variant="primary" size="2xl" type="multiple">
          <WppTypography slot="header" type="2xl-heading">
            Multiple Select Card Size 2XL
          </WppTypography>
        </WppCard>
      </div>

      <div class="section">
        <WppCard
          class="item"
          variant="primary"
          size="s"
          type="multiple"
          disabled
        >
          <WppTypography slot="header" type="s-strong">
            Disabled Multiple Select Card Size S
          </WppTypography>
        </WppCard>

        <WppCard
          class="item"
          variant="primary"
          size="m"
          type="multiple"
          disabled
        >
          <WppTypography slot="header" type="m-strong">
            Disabled Multiple Select Card Size M
          </WppTypography>
        </WppCard>

        <WppCard
          class="item"
          variant="primary"
          size="l"
          type="multiple"
          disabled
        >
          <WppTypography slot="header" type="l-strong">
            Disabled Multiple Select Card Size L
          </WppTypography>
        </WppCard>

        <WppCard
          class="item"
          variant="primary"
          size="xl"
          type="multiple"
          disabled
        >
          <WppTypography slot="header" type="xl-heading">
            Disabled Multiple Select Card Size XL
          </WppTypography>
        </WppCard>

        <WppCard
          class="item"
          variant="primary"
          size="2xl"
          type="multiple"
          disabled
        >
          <WppTypography slot="header" type="2xl-heading">
            Disabled Multiple Select Card Size 2XL
          </WppTypography>
        </WppCard>
      </div>

      <div class="section">
        <WppCard
          class="item"
          variant="primary"
          size="s"
          type="multiple"
          checked
        >
          <WppTypography slot="header" type="s-strong">
            Checked Multiple Select Card Size S
          </WppTypography>
        </WppCard>

        <WppCard
          class="item"
          variant="primary"
          size="m"
          type="multiple"
          checked
        >
          <WppTypography slot="header" type="m-strong">
            Checked Multiple Select Card Size M
          </WppTypography>
        </WppCard>

        <WppCard
          class="item"
          variant="primary"
          size="l"
          type="multiple"
          checked
        >
          <WppTypography slot="header" type="l-strong">
            Checked Multiple Select Card Size L
          </WppTypography>
        </WppCard>

        <WppCard
          class="item"
          variant="primary"
          size="xl"
          type="multiple"
          checked
        >
          <WppTypography slot="header" type="xl-heading">
            Checked Multiple Select Card Size XL
          </WppTypography>
        </WppCard>

        <WppCard
          class="item"
          variant="primary"
          size="2xl"
          type="multiple"
          checked
        >
          <WppTypography slot="header" type="2xl-heading">
            Checked Multiple Select Card Size 2XL
          </WppTypography>
        </WppCard>
      </div>

      <div class="section">
        <WppCard
          class="item"
          variant="primary"
          size="s"
          type="multiple"
          checked
          disabled
        >
          <WppTypography slot="header" type="s-strong">
            Disabled Checked Multiple Select Card Size S
          </WppTypography>
        </WppCard>

        <WppCard
          class="item"
          variant="primary"
          size="m"
          type="multiple"
          checked
          disabled
        >
          <WppTypography slot="header" type="m-strong">
            Disabled Checked Multiple Select Card Size M
          </WppTypography>
        </WppCard>

        <WppCard
          class="item"
          variant="primary"
          size="l"
          type="multiple"
          checked
          disabled
        >
          <WppTypography slot="header" type="l-strong">
            Disabled Checked Multiple Select Card Size L
          </WppTypography>
        </WppCard>

        <WppCard
          class="item"
          variant="primary"
          size="xl"
          type="multiple"
          checked
          disabled
        >
          <WppTypography slot="header" type="xl-heading">
            Disabled Checked Multiple Select Card Size XL
          </WppTypography>
        </WppCard>

        <WppCard
          class="item"
          variant="primary"
          size="2xl"
          type="multiple"
          checked
          disabled
        >
          <WppTypography slot="header" type="2xl-heading">
            Disabled Checked Multiple Select Card Size 2XL
          </WppTypography>
        </WppCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  width: 4150px;
}

.item {
  width: 320px;
  height: 250px;
  margin-right: 15px;
  margin-bottom: 10px;
}

.pack {
  display: flex;
  flex-direction: row;
}

.group {
  display: flex;
  flex-direction: column;
}

.section {
  margin-top: 60px;
}

.sectionend {
  margin-right: 35px;
}
</style>
