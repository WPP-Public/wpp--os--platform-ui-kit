import {
  WppButton,
  WppIconCross,
  WppIconLogout,
  WppIconPlus,
  WppIconSuccess,
  WppMenuContext,
  WppMenuGroup,
  WppListItem,
  WppIconWarning,
} from '@platform-ui-kit/components-library-react'

import styles from './MenuContextVC.module.scss'

export const MenuContextVCPage = () => {
  const tooltipConfig = {
    rightSlot: {
      text: 'Right slot content',
      header: 'Header',
    },
  }

  return (
    <div className={styles.container} data-testid="menu-context-container">
      <div className={styles.context}>
        <h3>The list is the Same Width as a Button</h3>
        <WppMenuContext dropdownConfig={{ triggerElementWidth: true }} appendToListWrapper>
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
            <WppListItem
              linkConfig={{
                href: 'https://google.com',
                target: '_blank',
                onClick: (e: PointerEvent) => e.preventDefault(),
              }}
            >
              <p slot="label">Link with preventDefault</p>
            </WppListItem>
          </div>
        </WppMenuContext>
      </div>

      <div className={styles.context}>
        <h3>Expandable List with Fixed Width</h3>
        <WppMenuContext appendToListWrapper listWidth="100px">
          <WppButton slot="trigger-element" data-testid="fixed-width-button">
            Click to open
          </WppButton>
          <div>
            <WppListItem>
              <WppIconPlus slot="left" />
              <p slot="label">Lorem ipsum dolor sit amet, consectetur</p>
            </WppListItem>
            <WppListItem>
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
                      <p slot="label">SubItem 4</p>
                    </WppListItem>
                    <WppListItem>
                      <p slot="label">SubItem 5</p>
                    </WppListItem>
                    <WppListItem>
                      <p slot="label">SubItem 6</p>
                    </WppListItem>
                    <WppListItem>
                      <p slot="label">SubItem 7</p>
                    </WppListItem>
                    <WppListItem>
                      <p slot="label">SubItem 8</p>
                    </WppListItem>
                  </div>
                </WppMenuContext>
                <WppListItem disabled>
                  <p slot="label">SubItem 2</p>
                </WppListItem>
                <WppListItem>
                  <p slot="label">SubItem 3</p>
                </WppListItem>
              </div>
            </WppMenuContext>
            <WppListItem>
              <p slot="label">Nulla sit amet bibendum augue curabitur non erat purus</p>
            </WppListItem>
          </div>
        </WppMenuContext>
      </div>

      <div className={styles.context}>
        <h3>Expandable List with Groups and Divider</h3>
        <WppMenuContext listWidth="150px">
          <WppButton slot="trigger-element" data-testid="group-menu-button">
            Click to open
          </WppButton>
          <div>
            <WppMenuGroup header="Admin" />
            <WppListItem>
              <p slot="label">Tenant</p>
            </WppListItem>
            <WppListItem>
              <p slot="label">Client</p>
            </WppListItem>
            <WppMenuContext>
              <WppListItem slot="trigger-element" isExtended data-testid="extendable-item">
                <p slot="label">Apps & Roles</p>
              </WppListItem>
              <div>
                <WppMenuGroup header="Apps" withDivider />
                <WppListItem>
                  <p slot="label">App 1</p>
                </WppListItem>
                <WppListItem>
                  <p slot="label">App 2</p>
                </WppListItem>
                <WppMenuGroup header="Roles" />
                <WppListItem>
                  <p slot="label">Role 1</p>
                </WppListItem>
              </div>
            </WppMenuContext>
            <WppListItem>
              <p slot="label">Users & Groups</p>
            </WppListItem>
            <WppMenuGroup header="Group Title" withDivider>
              <WppListItem>
                <p slot="label">Text</p>
              </WppListItem>
              <WppListItem>
                <p slot="label">Settings</p>
              </WppListItem>
              <WppMenuGroup withDivider />
              <WppListItem>
                <p slot="label">Feedback</p>
              </WppListItem>
              <WppListItem>
                <p slot="label">Copyrights</p>
              </WppListItem>
            </WppMenuGroup>
            <WppListItem>
              <WppIconLogout slot="left" />
              <p slot="label">Sign Out</p>
            </WppListItem>
          </div>
        </WppMenuContext>
      </div>

      <div>
        <h3>Test tooltip in menu context</h3>
        <WppMenuContext dropdownConfig={{ triggerElementWidth: true }}>
          <WppButton slot="trigger-element">Click to open</WppButton>
          <WppListItem tooltipConfig={tooltipConfig}>
            <span slot="label">Test 1</span>
            <WppIconWarning slot="right" />
          </WppListItem>
        </WppMenuContext>
      </div>
    </div>
  )
}
