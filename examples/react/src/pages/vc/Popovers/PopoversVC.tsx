import React, { useRef, useState } from 'react'
import {
  WppActionButton,
  WppAvatar,
  WppButton,
  WppDivider,
  WppInput,
  WppListItem,
  WppPopover,
  WppTypography,
  WppTooltip,
  WppIconChatMessage,
  WppSelect,
  WppInlineEdit,
} from '@platform-ui-kit/components-library-react'
import { InlineEditMode, InputChangeEventDetail, ListItemChangeEventDetail } from '@platform-ui-kit/components-library'

import styles from './PopoversVC.module.scss'
import { usersList } from './config'
import { User } from './types'
import { SAMPLE_LIST_2 } from '../../SingleSelect/consts'

export const fruitOptions = [
  { id: 1, label: 'Mango' },
  { id: 2, label: 'Passion Fruit' },
  { id: 3, label: 'Kiwi' },
  { id: 4, label: 'Dragon Fruit' },
  { id: 5, label: 'Pineapple' },
  { id: 6, label: 'Сarambola' },
  { id: 7, label: 'Grape' },
  { id: 8, label: 'Orange' },
  { id: 9, label: 'Apple' },
  { id: 10, label: 'Grapefruit' },
  { id: 11, label: 'Watermelon' },
  {
    id: 12,
    label: 'All the fruits in the world mixed into a SUPER FRUIT MIX! Trimmed to the edge of the universe -_-',
  },
  { id: 13, label: 'Pear' },
  { id: 14, label: 'Apricot' },
  { id: 15, label: 'Banana' },
  { id: 16, label: 'Melon' },
]

export const PopoversVCPage = () => {
  const [users, setUsers] = useState(usersList)
  const [searchValue, setSearchValue] = useState('')
  const [currentUser, setCurrentUser] = useState<User>(usersList[0])
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [popoverSearchValue, setPopoverSearchValue] = useState<string>('')
  const [persistantSearch, setPersistantSearch] = useState<boolean>(false)

  const [inputText1, setInputText1] = useState('')
  const [inputMode1, setInputMode1] = useState<InlineEditMode>('read')

  const defaultPopoverRef = useRef<HTMLWppPopoverElement>(null)
  const extendedPopoverRef = useRef<HTMLWppPopoverElement>(null)

  const handleInputChange = (event: CustomEvent<InputChangeEventDetail>) => {
    const newSearchValue = event.detail.value as string

    setSearchValue(newSearchValue)

    setUsers(
      newSearchValue
        ? usersList.filter(user => user.name.toLowerCase().includes(newSearchValue.toLowerCase()))
        : usersList,
    )
  }

  const handleListItemChecked = (event: CustomEvent<ListItemChangeEventDetail>, src: string) => {
    const userName = event.detail.label as string

    setCurrentUser({ name: userName, src })
    setSearchValue('')

    setTimeout(() => {
      setUsers(usersList)
    }, 300)

    extendedPopoverRef?.current?.closePopover()
  }

  const handleCloseButtonClick = () => {
    defaultPopoverRef.current?.closePopover()
  }

  const handleOpenPopover = () => {
    if (isDisabled) return

    defaultPopoverRef.current?.openPopover()
  }

  const toggleDisable = () => {
    setIsDisabled(!isDisabled)
  }

  const handleSubmitButtonClick = () => {
    alert('Some message')
  }

  return (
    <div className={styles.popoversPage}>
      <WppPopover>
        <WppIconChatMessage slot="trigger-element" />
        <p>Some text in the dropdown</p>
      </WppPopover>
      <div className={styles.item} data-testid="default-popover">
        <WppPopover className={styles.defaultPopover} closable ref={defaultPopoverRef}>
          <WppButton disabled={isDisabled} variant="secondary" slot="trigger-element">
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
              <WppActionButton variant="secondary" className={styles.secondaryButton} onClick={handleCloseButtonClick}>
                Close
              </WppActionButton>
              <WppTooltip title="header" text="text">
                <WppActionButton onClick={handleSubmitButtonClick}>Submit</WppActionButton>
              </WppTooltip>
            </div>
          </div>
        </WppPopover>

        <WppButton className={styles.openBtn} onClick={handleOpenPopover}>
          Open Popover
        </WppButton>

        <WppButton className={styles.disableBtn} onClick={toggleDisable}>
          {isDisabled ? 'Enable' : 'Disable'} trigger
        </WppButton>
      </div>

      <div className={styles.item} data-testid="custom-popover">
        <WppPopover ref={extendedPopoverRef}>
          <div slot="trigger-element" className={styles.triggerWrapper}>
            <WppAvatar size="s" src={currentUser.src} name={currentUser.name} className={styles.avatar} />
            <WppTypography type="s-strong" className={styles.description}>
              {currentUser.name}
            </WppTypography>
          </div>
          <div className={styles.extendedContent}>
            <div className={styles.header}>
              <WppInput
                value={searchValue}
                placeholder="Search"
                type="search"
                className={styles.searchInput}
                onWppChange={handleInputChange}
              />
              <WppDivider className={styles.divider} />
            </div>
            <div className={styles.body}>
              {users.map(user => (
                <WppListItem
                  className={styles.userItem}
                  key={user.name}
                  onWppChangeListItem={(event: CustomEvent<ListItemChangeEventDetail>) =>
                    handleListItemChecked(event, user.src)
                  }
                  checked={currentUser?.name === user.name}
                >
                  <p slot="label">{user.name}</p>
                  <WppAvatar size="xs" src={user.src} name={user.name} slot="left" />
                </WppListItem>
              ))}
              {users.length === 0 && (
                <WppListItem className={styles.userItem} disabled>
                  <p slot="label">Nothing Found</p>
                </WppListItem>
              )}
            </div>
          </div>
        </WppPopover>
      </div>

      <div className={styles.withSearch}>
        <WppTypography className={styles.withSearchTitle} type="l-body">
          Popover with `withSearch=true` property
        </WppTypography>
        <WppPopover
          withSearch
          persistantSearch={persistantSearch}
          searchName="Dropdown Input with no content"
          searchValue={popoverSearchValue}
          onWppSearchChange={(event: CustomEvent) => {
            console.log('On Change search event:', event)

            setPopoverSearchValue(event.detail.value)
          }}
        >
          <WppButton slot="trigger-element" variant="secondary">
            With no content
          </WppButton>
        </WppPopover>

        <WppPopover
          withSearch
          persistantSearch={persistantSearch}
          searchName="Dropdown Input with content"
          searchValue={popoverSearchValue}
          onWppSearchChange={(event: CustomEvent) => {
            console.log('On Change search event:', event)

            setPopoverSearchValue(event.detail.value)
          }}
        >
          <WppButton slot="trigger-element" variant="secondary">
            With content
          </WppButton>
          <div className={styles.withSearchContent}>
            <WppTypography className={styles.contentText} type="m-body">
              Content inside the popover.
            </WppTypography>
          </div>
        </WppPopover>

        <WppButton onClick={() => setPopoverSearchValue('Test')}>Set search value to: 'Test'</WppButton>
        <WppButton onClick={() => setPersistantSearch(!persistantSearch)}>
          Toggle persistantSearch: {persistantSearch ? 'disable' : 'enable'}
        </WppButton>
      </div>

      <div className={styles.scenario}>
        <WppTypography className={styles.title} type="xl-heading">
          Scenario 01: Placing other components with dropdowns inside the popover
        </WppTypography>

        <WppTypography className={styles.subTitle} type="m-body">
          - Note: The popover's dropdown should close only when clicking outside of the popover. The dropdown of the
          select is considered as part of the popover's dropdown.
        </WppTypography>

        <div className={styles.content}>
          <WppPopover
            withSearch
            searchName="Popover with content"
            onWppSearchChange={(event: CustomEvent) => {
              console.log('On Change search event:', event)
            }}
          >
            <WppButton slot="trigger-element" variant="secondary">
              With content
            </WppButton>
            <div className={styles.withComponents}>
              <WppTypography className={styles.contentText} type="m-body">
                Content inside the popover.
              </WppTypography>

              <WppSelect
                type="multiple"
                name="select-component"
                className={styles.selectItem}
                list={SAMPLE_LIST_2}
                labelConfig={{
                  text: 'Size M',
                }}
                placeholder={'Choose option'}
                value={[]}
                onWppChange={(e: CustomEvent) => {
                  console.log('On Change', e.detail)
                }}
              />

              <WppInlineEdit
                value={inputText1}
                mode={inputMode1}
                inputWidth="150px"
                onWppModeChange={(event: CustomEvent) => {
                  console.log(event.detail)
                  setInputMode1(event.detail.mode)
                  if (event.detail.mode === 'read') {
                    event.detail.closePopover()
                  }
                }}
                data-testid="default-input-inline-edit"
              >
                <WppInput
                  size="s"
                  slot="form-element"
                  name="test"
                  value={inputText1}
                  onWppChange={(e: CustomEvent) => {
                    setInputText1(e.detail.value!)
                  }}
                />
              </WppInlineEdit>
            </div>
          </WppPopover>
        </div>
      </div>
    </div>
  )
}
