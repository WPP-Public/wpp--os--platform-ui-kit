import {
  WppNavSidebar,
  WppNavSidebarItem,
  WppIconGlobe,
  WppIconFavourites,
  WppIconCalendar,
  WppIconUser,
  WppIconMail,
  WppIconSubscribe,
  WppIconUpload,
  WppIconBookmarkSelected,
  WppTypography,
} from '@platform-ui-kit/components-library-react'

import styles from './NavSidebarVC.module.scss'
import { useState } from 'react'

export const NavSidebarVCPage = () => {
  const [activePath, setActivePath] = useState('/dashboard')

  const handleChangeRoute = (event: CustomEvent) => {
    console.log('Route change detected:', event.detail)
  }

  const handlePathChange = (path: string) => {
    setActivePath(path)
  }

  return (
    <div className={`${styles.wrapper} ${styles.open}`}>
      <div className={styles.controlPanel}>
        <WppTypography type="m-strong" tag="p">
          Control Active Path
        </WppTypography>
        <button onClick={() => handlePathChange('/dashboard')}>Go to Dashboard</button>
        <button onClick={() => handlePathChange('/projects')}>Go to Projects</button>
        <button onClick={() => handlePathChange('/projects1')}>Go to Projects 1</button>
        <button onClick={() => handlePathChange('/scheduled')}>Go to Scheduled Reporting</button>
        <button onClick={() => handlePathChange('/shared-reports')}>Go to Shared Reports</button>
      </div>

      <WppNavSidebar onWppChange={handleChangeRoute} activePath={activePath} nativeLink>
        <div slot="header">
          <div className={styles.icon}>
            <WppIconBookmarkSelected />
          </div>
          <WppTypography type="m-strong" className={styles.name} tag="p">
            App Name
          </WppTypography>
        </div>
        <WppNavSidebarItem label="Dashboard" path="/dashboard" target="_blank">
          <WppIconGlobe slot="icon-start" />
        </WppNavSidebarItem>
        <WppNavSidebarItem label="Projects" path="/projects" extended>
          <WppIconFavourites slot="icon-start" />
          <WppNavSidebarItem label="Projects 01" path="/projects1" target="_blank"></WppNavSidebarItem>
          <WppNavSidebarItem label="Projects 02" path="/projects2" target="_blank"></WppNavSidebarItem>
          <WppNavSidebarItem label="Projects 03" path="/projects3" target="_blank"></WppNavSidebarItem>
        </WppNavSidebarItem>
        <WppNavSidebarItem
          label={'Scheduled reporting'}
          path="/scheduled"
          extended
          groupTitle="Reporting"
          data-testid="tooltip-item"
        >
          <WppIconCalendar slot="icon-start" />
          <WppNavSidebarItem label="Scheduled 01" path="/scheduled1"></WppNavSidebarItem>
          <WppNavSidebarItem label="Scheduled 02" path="/scheduled2"></WppNavSidebarItem>
        </WppNavSidebarItem>
        <WppNavSidebarItem label={'Shared reports'} path="/shared-reports" divide>
          <WppIconUser slot="icon-start" />
        </WppNavSidebarItem>
        <WppNavSidebarItem label={'Attachments'} path="/attachments">
          <WppIconMail slot="icon-start" />
        </WppNavSidebarItem>
        <WppNavSidebarItem label={'Archive'} path="/archive" divide>
          <WppIconSubscribe slot="icon-start" />
        </WppNavSidebarItem>
        <WppNavSidebarItem label={'Applications'} path="/applications">
          <WppIconUpload slot="icon-start" />
        </WppNavSidebarItem>
      </WppNavSidebar>
      <div>
        <WppTypography type="m-body" tag="p">
          Content Area: The content updates based on the active item.
        </WppTypography>
      </div>
    </div>
  )
}
