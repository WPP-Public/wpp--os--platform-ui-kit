import React from 'react'

import {
  WppActionButton,
  WppButton,
  WppDivider,
  WppPopover,
  WppTypography,
} from '@platform-ui-kit/components-library-react'

import './index.scss'
import styles from '../4897/index.module.scss'

// Was added to every `-13666` because some styles was applied from grid.css file

const PopoverNativeEventsDoNotWork = () => (
  <div>
    <div className={styles.link}>
      <h1 style={{ textDecoration: 'underline' }}>
        <a href="https://jira.uhub.biz/browse/WPPLONOP-13666">Bugfix #13666 - events in component do not work</a>
      </h1>
    </div>

    <WppPopover>
      <WppButton variant="secondary" slot="trigger-element">
        Trigger button to open Popover
      </WppButton>
      <div className="default-content-13666">
        <div className="header-13666">
          <WppActionButton variant="secondary" onClick={() => alert('Smile  🙃')}>
            Press this button
          </WppActionButton>
        </div>
        <WppDivider className="divider-13666" />
        <div className="body-13666">
          <WppTypography className="text-13666">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
          </WppTypography>
        </div>
      </div>
    </WppPopover>
  </div>
)

export default PopoverNativeEventsDoNotWork
