import React from 'react'
import {
  WppExpandableCard,
  WppProgressIndicator,
  WppInput,
  WppTypography,
  WppCard,
} from '@platform-ui-kit/components-library-react'
import { ExpandableCardSectionChangeEventDetail } from '@platform-ui-kit/components-library'

import styles from './ExpandableCardVC.module.scss'

export const ExpandableCardVC = () => {
  const handleChange = (event: CustomEvent<ExpandableCardSectionChangeEventDetail>) => {
    console.log('e ====>', event.detail.expanded)
  }

  return (
    <div data-testid="expandable-cards">
      <div>
        <WppExpandableCard className={styles.progress} header="What's next" size="2xl">
          <div className={styles.content}>
            <WppTypography>
              Having a proactive Board and strong leadership that is deeply committed to high ethical standards is a
              business imperative for ensuring sustainable success
            </WppTypography>
            <WppInput />
          </div>
          <div slot="actions" className={styles.information}>
            <WppTypography type="s-body" className={styles.info}>
              35% Complete
            </WppTypography>
            <WppProgressIndicator value={35} width={173} />
          </div>
        </WppExpandableCard>

        <WppExpandableCard header="Governance & Ethics" expanded onWppChange={handleChange}>
          <WppTypography>
            Having a proactive Board and strong leadership that is deeply committed to high ethical standards is a
            business imperative for ensuring sustainable success
          </WppTypography>
        </WppExpandableCard>
      </div>

      <div className={styles.container}>
        <div className={styles.variant}>
          <h3>Collapsed</h3>
          <WppExpandableCard
            className={styles.item}
            header="Governance & Ethics (S Size)"
            size="s"
            onWppChange={handleChange}
          >
            <WppTypography>Having a proactive Board and strong leadership...</WppTypography>
          </WppExpandableCard>

          <WppExpandableCard
            className={styles.item}
            header="Governance & Ethics (M Size)"
            size="m"
            onWppChange={handleChange}
          >
            <WppTypography>Having a proactive Board and strong leadership...</WppTypography>
          </WppExpandableCard>

          <WppExpandableCard
            className={styles.item}
            header="Governance & Ethics (L Size)"
            size="l"
            onWppChange={handleChange}
          >
            <WppTypography>Having a proactive Board and strong leadership...</WppTypography>
          </WppExpandableCard>

          <WppExpandableCard
            className={styles.item}
            header="Governance & Ethics (XL Size)"
            size="xl"
            onWppChange={handleChange}
          >
            <WppTypography>Having a proactive Board and strong leadership...</WppTypography>
          </WppExpandableCard>

          <WppExpandableCard
            className={styles.item}
            header="Governance & Ethics (2XL Size)"
            size="2xl"
            onWppChange={handleChange}
          >
            <WppTypography>Having a proactive Board and strong leadership...</WppTypography>
          </WppExpandableCard>
        </div>

        <div className={styles.variant}>
          <h3>Expanded</h3>
          <WppExpandableCard
            className={styles.item}
            header="Governance & Ethics (S Size)"
            size="s"
            expanded
            onWppChange={handleChange}
          >
            <WppTypography>Having a proactive Board and strong leadership...</WppTypography>
          </WppExpandableCard>

          <WppExpandableCard
            className={styles.item}
            header="Governance & Ethics (M Size)"
            size="m"
            expanded
            onWppChange={handleChange}
          >
            <WppTypography>Having a proactive Board and strong leadership...</WppTypography>
          </WppExpandableCard>

          <WppExpandableCard
            className={styles.item}
            header="Governance & Ethics (L Size)"
            size="l"
            expanded
            onWppChange={handleChange}
          >
            <WppTypography>Having a proactive Board and strong leadership...</WppTypography>
          </WppExpandableCard>

          <WppExpandableCard
            className={styles.item}
            header="Governance & Ethics (XL Size)"
            size="xl"
            expanded
            onWppChange={handleChange}
          >
            <WppTypography>Having a proactive Board and strong leadership...</WppTypography>
          </WppExpandableCard>

          <WppExpandableCard
            className={styles.item}
            header="Governance & Ethics (2XL Size)"
            size="2xl"
            expanded
            onWppChange={handleChange}
          >
            <WppTypography>Having a proactive Board and strong leadership...</WppTypography>
          </WppExpandableCard>
        </div>
      </div>

      <WppCard className={styles.cardWithCards}>
        <WppTypography slot="header" type="m-strong">
          Card with Expandable Cards inside. The expandable cards have variant = "secondary"
        </WppTypography>
        <WppExpandableCard variant="secondary" className={styles.cardInside} size="2xl">
          <WppTypography slot="header" type="l-strong">
            What's next
          </WppTypography>
          <div className={styles.content}>
            <WppTypography>
              Having a proactive Board and strong leadership that is deeply committed to high ethical standards is a
              business imperative for ensuring sustainable success
            </WppTypography>
            <WppInput />
          </div>
          <div slot="actions" className={styles.information}>
            <WppTypography type="s-body" className={styles.info}>
              35% Complete
            </WppTypography>
            <WppProgressIndicator value={35} width={173} />
          </div>
        </WppExpandableCard>
        <WppExpandableCard variant="secondary" className={styles.cardInside} size="2xl">
          <WppTypography slot="header" type="l-strong">
            What's next
          </WppTypography>
          <div className={styles.content}>
            <WppTypography>
              Having a proactive Board and strong leadership that is deeply committed to high ethical standards is a
              business imperative for ensuring sustainable success
            </WppTypography>
            <WppInput />
          </div>
          <div slot="actions" className={styles.information}>
            <WppTypography type="s-body" className={styles.info}>
              35% Complete
            </WppTypography>
            <WppProgressIndicator value={35} width={173} />
          </div>
        </WppExpandableCard>
      </WppCard>
    </div>
  )
}
