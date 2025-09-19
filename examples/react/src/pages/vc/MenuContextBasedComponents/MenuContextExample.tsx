import React, { Fragment, useState } from 'react'

import { WppButton, WppMenuContext, WppListItem, WppTypography } from '@platform-ui-kit/components-library-react'

export const MenuContextExample = () => {
  const [counter, setCounter] = useState(0)

  const renderMenuContextContent = () => (
    <Fragment>
      {counter < 100 ? (
        <WppButton slot="trigger-element" data-testid="same-width-button">
          Click to open
        </WppButton>
      ) : (
        <WppButton slot="trigger-element" data-testid="same-width-button">
          Changed button
        </WppButton>
      )}

      <div>
        <WppListItem onWppChangeListItem={() => setCounter(counter + 1)}>
          <p slot="label">Increase by 1</p>
        </WppListItem>
        <WppListItem onWppChangeListItem={() => setCounter(counter + 100)}>
          <p slot="label">Increase by 100</p>
        </WppListItem>
        <WppListItem onWppChangeListItem={() => setCounter(counter - 1)}>
          <p slot="label">Decrease by 1</p>
        </WppListItem>
        <WppListItem onWppChangeListItem={() => setCounter(0)}>
          <p slot="label">Reset</p>
        </WppListItem>
      </div>
    </Fragment>
  )

  return (
    <div>
      <h3>Simple menu context with state change</h3>
      <WppTypography>Counter: {counter} (Trigger button changes when counter more then 100)</WppTypography>
      <WppMenuContext>{renderMenuContextContent()}</WppMenuContext>

      <WppTypography>Counter: {counter} (Appended to document body)</WppTypography>
      <WppMenuContext dropdownConfig={{ appendTo: () => document.body }}>{renderMenuContextContent()}</WppMenuContext>
    </div>
  )
}
