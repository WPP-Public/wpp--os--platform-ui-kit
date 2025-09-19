import React, { useRef } from 'react'
import styles from './index.module.scss'
import {
  WppActionButton,
  WppButton,
  WppDatepicker,
  WppDivider,
  WppIconPlus,
  WppIconSuccess,
  WppListItem,
  WppMenuContext,
  WppPopover,
  WppTooltip,
  WppTypography,
} from '@platform-ui-kit/components-library-react'

const PopoverEventsNotTriggered = () => {
  const defaultPopoverRef = useRef<HTMLWppPopoverElement>(null)

  const handleCloseButtonClick = () => {
    defaultPopoverRef.current?.closePopover()
  }

  const handleSubmitButtonClick = () => {
    alert('Some message')
  }

  return (
    <div id="micro-app">
      <div className={styles.container}>
        <WppTypography className={styles.text} type="2xl-heading">
          The dropdowns should render in the "root" container. Check in DOM.
        </WppTypography>
        <div className={styles.component}>
          <WppTypography className={styles.text} type="xl-heading">
            Datepicker Test
          </WppTypography>
          <WppDatepicker
            locale={{
              dateFormat: 'MM/dd/yyyy',
              firstDay: 1,
            }}
            minDate="04/20/2022"
            maxDate="04/27/2022"
            value="04/23/2022"
            data-testid="overridden-date-format-datepicker"
          />
        </div>

        <div className={styles.component}>
          <WppTypography className={styles.text} type="xl-heading">
            Popover + Tooltip Test
          </WppTypography>
          <WppPopover className={styles.defaultPopover} closable ref={defaultPopoverRef}>
            <WppButton variant="secondary" slot="trigger-element">
              Trigger button to open Popover
            </WppButton>
            <div className={styles.defaultContent} data-testid="popover-content">
              <div className={styles.header}>
                <WppTypography type="m-strong">Title</WppTypography>
              </div>
              <WppDivider className={styles.divider} />
              <div className={styles.body}>
                <WppTypography className={styles.text}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                </WppTypography>
              </div>
              <WppDivider className={styles.divider} />
              <div className={styles.actions}>
                <WppActionButton
                  variant="secondary"
                  className={styles.secondaryButton}
                  onClick={handleCloseButtonClick}
                >
                  Close
                </WppActionButton>
                <WppTooltip title="header" text="text">
                  <WppActionButton onClick={handleSubmitButtonClick}>Submit</WppActionButton>
                </WppTooltip>
              </div>
            </div>
          </WppPopover>
        </div>
        <div className={styles.component}>
          <WppTypography className={styles.text} type="xl-heading">
            Menu Context + Tooltip Test
          </WppTypography>
          <WppMenuContext dropdownConfig={{ triggerElementWidth: true }}>
            <WppButton slot="trigger-element" data-testid="same-width-button">
              Click to open
            </WppButton>
            <div>
              <WppListItem>
                <WppIconPlus slot="left" />
                <p slot="label">Item 1</p>
              </WppListItem>
              <WppListItem active>
                <p slot="label">Item 2</p>
              </WppListItem>
              <WppListItem disabled>
                <p slot="label">Item 3</p>
              </WppListItem>
              <WppListItem>
                <p slot="label">Item 4</p>
                <WppIconSuccess slot="right" />
              </WppListItem>
              <WppListItem>
                <WppIconPlus slot="left" />
                <p slot="label">withPlus</p>
              </WppListItem>
              <WppListItem>
                <p slot="label">With label</p>
              </WppListItem>
              <WppListItem value="text">
                <p slot="label">With value</p>
              </WppListItem>
              <WppListItem linkConfig={{ href: 'https://google.com', target: '_blank' }}>
                <p slot="label">Link</p>
              </WppListItem>
            </div>
          </WppMenuContext>
        </div>
      </div>
    </div>
  )
}

export default PopoverEventsNotTriggered
