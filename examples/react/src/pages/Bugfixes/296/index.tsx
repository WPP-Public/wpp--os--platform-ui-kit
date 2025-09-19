import React, { useState } from 'react'
import styles from './index.module.scss'
import {
  WppActionButton,
  WppAvatar,
  WppIconAvailableCheckmark,
  WppIconChevron,
  WppIconPlus,
  WppTag,
  WppToggle,
  WppListItem,
  WppSelect,
  WppTypography,
  WppIconMail,
  WppMenuContext,
  WppIconMore,
  WppAvatarGroup,
} from '@platform-ui-kit/components-library-react'

const users = [
  {
    name: 'Citlalli Tuva',
    src: '',
  },
  {
    name: 'Nicte Lalawethika',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiB6O_lfxeRec_iL5xnCkXpYVSKcbR2ouoMA&usqp=CAU',
  },
  {
    name: 'Wickaninnish Harald',
    src: '',
  },
]

const ValidateListItemSlots = () => {
  const [isChecked, setIsChecked] = useState(false)
  const [leftSlotComponent, setLeftSlotComponent] = useState('')
  const [rightSlotComponent, setRightSlotComponent] = useState('')

  const handleToggleChange = (event: { detail: { checked: boolean } }) => {
    setIsChecked(event.detail.checked)
  }

  const slotOptions = [
    { label: 'None', value: '' },
    { label: 'Text', value: 'text' },
    { label: 'Tag', value: 'tag' },
    { label: 'Toggle', value: 'toggle' },
    { label: 'Avatar', value: 'avatar' },
    { label: 'Icon (Checkmark)', value: 'icon-checkmark' },
    { label: 'Icon (Mail)', value: 'icon-mail' },
    { label: 'Icon (Chevron)', value: 'icon-chevron' },
    { label: 'Icon (Plus)', value: 'icon-plus' },
    { label: 'Action button', value: 'action' },
    { label: 'Menu context', value: 'menu-context' },
    { label: 'Avatar group', value: 'avatar-group' },
    { label: 'Avatar Logo', value: 'avatar-logo' },
    { label: 'Avatar Icon', value: 'avatar-icon' },
  ]

  const componentMap: Record<string, (slot: string) => JSX.Element> = {
    text: slot => (
      <WppTypography slot={slot} type="s-body">
        Text
      </WppTypography>
    ),
    tag: slot => <WppTag slot={slot} label="Positive" variant="positive" />,
    toggle: slot => <WppToggle slot={slot} />,
    avatar: slot => (
      <WppAvatar
        slot={slot}
        size="xs"
        src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
      />
    ),
    'avatar-group': slot => (
      <WppAvatarGroup
        onWppSelectItem={event => console.log('Event', event)}
        size="xs"
        slot={slot}
        avatars={users}
        maxAvatarsToDisplay={5}
        withTooltip
      />
    ),
    'avatar-logo': slot => (
      <WppAvatar
        onWppClick={event => console.log('Event', event)}
        className={styles.item}
        variant="square"
        slot={slot}
        size="xs"
        src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU'}
      />
    ),
    'avatar-icon': slot => (
      <WppAvatar
        slot={slot}
        onWppClick={event => console.log('Event', event)}
        className={styles.item}
        size="xs"
        icon="wpp-icon-premium"
      />
    ),
    'icon-checkmark': slot => <WppIconAvailableCheckmark slot={slot} />,
    'icon-mail': slot => <WppIconMail slot={slot} />,
    'icon-chevron': slot => <WppIconChevron slot={slot} />,
    'icon-plus': slot => <WppIconPlus slot={slot} />,
    action: slot => (
      <WppActionButton slot={slot}>
        <WppIconPlus />
      </WppActionButton>
    ),
    'menu-context': slot => (
      <WppMenuContext slot={slot}>
        <WppActionButton slot="trigger-element" variant="secondary">
          <WppIconMore slot="icon-start" onClick={() => console.log('Clicked icon more')} />
        </WppActionButton>
        <div>
          <WppListItem onClick={() => console.log('Clicked item 1')}>
            <p slot="label">Item 1</p>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
          <WppListItem onClick={() => console.log('Clicked item 2')}>
            <p slot="label">Item 2</p>
            <span slot="subtitle">Subtitle</span>
          </WppListItem>
        </div>
      </WppMenuContext>
    ),
  }

  const renderLeftSlotComponent = () => {
    if (!leftSlotComponent || !(leftSlotComponent in componentMap)) return null

    return componentMap[leftSlotComponent]('left')
  }

  const renderRightSlotComponent = () => {
    if (!rightSlotComponent || !(rightSlotComponent in componentMap)) return null

    return componentMap[rightSlotComponent]('right')
  }

  return (
    <div className={styles.container}>
      <h2>Dynamic List Item Slot Testing</h2>

      {/* Dropdowns for selecting components */}
      <div className={styles.dropdown}>
        <WppSelect
          type="single"
          required
          labelConfig={{ text: 'Select Left Slot Component' }}
          placeholder="Choose a Left Slot Component"
          value={leftSlotComponent}
          onWppChange={event => setLeftSlotComponent(event.detail.value)}
          list={slotOptions.map(option => ({
            value: option.value,
            label: option.label,
          }))}
        ></WppSelect>

        <WppSelect
          type="single"
          required
          labelConfig={{ text: 'Select Right Slot Component' }}
          placeholder="Choose a Right Slot Component"
          value={rightSlotComponent}
          onWppChange={event => setRightSlotComponent(event.detail.value)}
          list={slotOptions.map(option => ({
            value: option.value,
            label: option.label,
          }))}
        ></WppSelect>

        {/* Toggle for enabling multiple selection */}
        <div className={styles.toggle}>
          <WppToggle
            labelConfig={{ text: 'Enable multiple' }}
            required
            onWppChange={handleToggleChange}
            checked={isChecked}
          />
        </div>
      </div>

      {/* Preview area for dynamic list item */}
      <div className={styles.listItemPreview}>
        <WppListItem
          className={styles.item}
          key={`${leftSlotComponent}-${rightSlotComponent}-${isChecked}`}
          multiple={isChecked}
        >
          {renderLeftSlotComponent()}
          <span slot="label">Dynamic List Item</span>
          {renderRightSlotComponent()}
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>

      <div className={styles.listItemPreview}>
        <WppListItem
          className={styles.item}
          key={`${leftSlotComponent}-${rightSlotComponent}-${isChecked}`}
          multiple={isChecked}
        >
          {renderLeftSlotComponent()}
          <span slot="label">Dynamic List Item</span>
          <span slot="caption">with Caption</span>
          {renderRightSlotComponent()}
          <span slot="subtitle">Subtitle</span>
        </WppListItem>
      </div>
    </div>
  )
}

export default ValidateListItemSlots
