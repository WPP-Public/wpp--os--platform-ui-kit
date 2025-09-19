<script setup lang="ts">
import {
  WppExpandableCard,
  WppProgressIndicator,
  WppInput,
  WppTypography,
  WppCard,
} from '@platform-ui-kit/components-library-vue'
import type { ExpandableCardSectionChangeEventDetail } from '@platform-ui-kit/components-library'

const handleChange = (event: CustomEvent<ExpandableCardSectionChangeEventDetail>) => {
  console.log('e ====>', event.detail.expanded)
}
</script>

<template>
  <div data-testid="expandable-cards">
    <div>
      <WppExpandableCard class="progress" header="What's next" size="2xl">
        <div class="content">
          <WppTypography>
            Having a proactive Board and strong leadership that is deeply committed to high ethical standards is a
            business imperative for ensuring sustainable success
          </WppTypography>
          <WppInput />
        </div>
        <div slot="actions" class="information">
          <WppTypography type="s-body" class="info"> 35% Complete </WppTypography>
          <WppProgressIndicator :value="35" :width="173" />
        </div>
      </WppExpandableCard>

      <WppExpandableCard header="Governance & Ethics" expanded @wppChange="handleChange">
        <WppTypography>
          Having a proactive Board and strong leadership that is deeply committed to high ethical standards is a
          business imperative for ensuring sustainable success
        </WppTypography>
      </WppExpandableCard>
    </div>

    <div class="container">
      <div class="variant">
        <h3>Collapsed</h3>
        <WppExpandableCard class="item" header="Governance & Ethics (S Size)" size="s" @wppChange="handleChange">
          <WppTypography>Having a proactive Board and strong leadership...</WppTypography>
        </WppExpandableCard>

        <WppExpandableCard class="item" header="Governance & Ethics (M Size)" size="m" @wppChange="handleChange">
          <WppTypography>Having a proactive Board and strong leadership...</WppTypography>
        </WppExpandableCard>

        <WppExpandableCard class="item" header="Governance & Ethics (L Size)" size="l" @wppChange="handleChange">
          <WppTypography>Having a proactive Board and strong leadership...</WppTypography>
        </WppExpandableCard>

        <WppExpandableCard class="item" header="Governance & Ethics (XL Size)" size="xl" @wppChange="handleChange">
          <WppTypography>Having a proactive Board and strong leadership...</WppTypography>
        </WppExpandableCard>

        <WppExpandableCard class="item" header="Governance & Ethics (2XL Size)" size="2xl" @wppChange="handleChange">
          <WppTypography>Having a proactive Board and strong leadership...</WppTypography>
        </WppExpandableCard>
      </div>

      <div class="variant">
        <h3>Expanded</h3>
        <WppExpandableCard
          class="item"
          header="Governance & Ethics (S Size)"
          size="s"
          expanded
          @wppChange="handleChange"
        >
          <WppTypography>Having a proactive Board and strong leadership...</WppTypography>
        </WppExpandableCard>

        <WppExpandableCard
          class="item"
          header="Governance & Ethics (M Size)"
          size="m"
          expanded
          @wppChange="handleChange"
        >
          <WppTypography>Having a proactive Board and strong leadership...</WppTypography>
        </WppExpandableCard>

        <WppExpandableCard
          class="item"
          header="Governance & Ethics (L Size)"
          size="l"
          expanded
          @wppChange="handleChange"
        >
          <WppTypography>Having a proactive Board and strong leadership...</WppTypography>
        </WppExpandableCard>

        <WppExpandableCard
          class="item"
          header="Governance & Ethics (XL Size)"
          size="xl"
          expanded
          @wppChange="handleChange"
        >
          <WppTypography>Having a proactive Board and strong leadership...</WppTypography>
        </WppExpandableCard>

        <WppExpandableCard
          class="item"
          header="Governance & Ethics (2XL Size)"
          size="2xl"
          expanded
          @wppChange="handleChange"
        >
          <WppTypography>Having a proactive Board and strong leadership...</WppTypography>
        </WppExpandableCard>
      </div>
    </div>
    <WppCard class="cardWithCards">
      <WppTypography slot="header" type="m-strong">
        Card with Expandable Cards inside. The expandable cards have variant = "secondary"
      </WppTypography>
      <WppExpandableCard variant="secondary" class="cardInside" size="2xl">
        <WppTypography slot="header" type="l-strong"> What's next </WppTypography>
        <div class="content">
          <WppTypography>
            Having a proactive Board and strong leadership that is deeply committed to high ethical standards is a
            business imperative for ensuring sustainable success
          </WppTypography>
          <WppInput />
        </div>
        <div slot="actions" class="information">
          <WppTypography type="s-body" class="info"> 35% Complete </WppTypography>
          <WppProgressIndicator :value="35" :width="173" />
        </div>
      </WppExpandableCard>
      <WppExpandableCard variant="secondary" class="cardInside" size="2xl">
        <WppTypography slot="header" type="l-strong"> What's next </WppTypography>
        <div class="content">
          <WppTypography>
            Having a proactive Board and strong leadership that is deeply committed to high ethical standards is a
            business imperative for ensuring sustainable success
          </WppTypography>
          <WppInput />
        </div>
        <div slot="actions" class="information">
          <WppTypography type="s-body" class="info"> 35% Complete </WppTypography>
          <WppProgressIndicator :value="35" :width="173" />
        </div>
      </WppExpandableCard>
    </WppCard>
  </div>
</template>

<style>
.content {
  display: flex;
  flex-direction: column;
}

.information {
  display: inline-flex;
  align-items: center;
}

.info {
  margin-right: 18px;
}

.progress {
  margin-right: 15px;
}

.container {
  display: flex;
  flex-direction: row;
  margin-top: 30px;
}

.item {
  width: 500px;
  margin-bottom: 10px;
}

.variant {
  width: 600px;
}

.cardWithCards {
  width: 800px;
  margin: 50px 0;
}

.cardInside {
  margin-bottom: 20px;
}
</style>
