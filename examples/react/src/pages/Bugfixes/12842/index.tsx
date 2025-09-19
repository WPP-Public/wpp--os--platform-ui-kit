import {
  WppActionButton,
  WppAvatar,
  WppCard,
  WppIconMore,
  WppListItem,
  WppMenuContext,
  WppTopbar,
  WppTypography,
} from '@platform-ui-kit/components-library-react'
import { cards, topbar_items } from './config'
import styles from './index.module.scss'

const Card = ({ title, src }: { title: string; src: string }) => (
  <WppCard className={styles.cardItem} key={title}>
    <WppTypography type="xl-heading" className={styles.title} slot="header">
      {title}
    </WppTypography>
    <WppMenuContext dropdownConfig={{ placement: 'bottom' }} slot="actions">
      <WppActionButton variant="secondary" slot="trigger-element">
        <WppIconMore direction="horizontal" />
      </WppActionButton>
      <WppListItem>
        <WppAvatar src="https://media.tenor.com/ulzkSxwJiDMAAAAC/apple-logo.gif" slot="left" variant="square" />
        <p slot="label">Apple</p>
      </WppListItem>
      <WppListItem>
        <WppAvatar
          src="https://media.tenor.com/ms9n5oYamMAAAAAC/microsoft-microsoft-logo.gif"
          slot="left"
          variant="square"
        />
        <p slot="label">Microsoft</p>
      </WppListItem>
    </WppMenuContext>
    <img src={src} alt="" />
  </WppCard>
)

const DropdownHiddenWhenNotVisible = () => (
  <div>
    <div className={styles.link}>
      <h1 style={{ textDecoration: 'underline' }}>
        <a href="https://jira.uhub.biz/browse/WPPLONOP-12842">
          Bugfix #12842 - Drop-down of the phase/app/activity more menu is displaying over the header
        </a>
      </h1>
    </div>
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <WppTopbar value="dataManagement" navigation={topbar_items}>
            <div slot="app" className={styles.app}>
              <WppTypography className={styles.name} type="m-strong" tag="h3">
                APP Name
              </WppTypography>
            </div>
          </WppTopbar>
        </div>
        <div className={styles.cardsList}>
          {cards.map(card => (
            <Card {...card} />
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default DropdownHiddenWhenNotVisible
