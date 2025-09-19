import React from 'react'

import {
  WppActionButton,
  WppMenuContext,
  WppListItem,
  WppIconEdit,
  WppIconTrash,
  WppAutocomplete,
  WppSearch,
  WppButton,
  WppTypography,
  WppPopover,
  WppTooltip,
  WppSelect,
} from '@platform-ui-kit/components-library-react'

import { useMovingPlacesList } from './hooks'
import { MovingPlacesWrapper } from './MovingPlacesWrapper'

import styles from './index.module.scss'

const MovingPlacesMenuContext = () => {
  const [list, movePlaces] = useMovingPlacesList()

  return (
    <MovingPlacesWrapper title="Moving places Menu Context" onButtonClick={movePlaces}>
      {list.map(id => (
        <WppMenuContext key={id} onClick={e => e.stopPropagation()} appendToListWrapper>
          <WppActionButton slot="trigger-element">Button #{id}</WppActionButton>
          <div>
            <WppListItem>
              <WppIconEdit slot="left" />
              <p slot="label">Edit</p>
            </WppListItem>
            <WppListItem>
              <WppIconTrash slot="left" />
              <p slot="label">Delete</p>
            </WppListItem>
          </div>
        </WppMenuContext>
      ))}
    </MovingPlacesWrapper>
  )
}

const MovingPlacesAutocomplete = () => {
  const [list, movePlaces] = useMovingPlacesList()
  const options = [{ label: 'Edit', id: 'Edit' }]

  return (
    <MovingPlacesWrapper title="Moving places Autocomplete" onButtonClick={movePlaces}>
      {list.map(id => (
        <WppAutocomplete key={id} labelConfig={{ text: `Autocomplete #${id}` }} onClick={e => e.stopPropagation()}>
          {options.map(option => (
            <WppListItem key={option.id} value={option}>
              <p slot="label">{option.label}</p>
            </WppListItem>
          ))}
        </WppAutocomplete>
      ))}
    </MovingPlacesWrapper>
  )
}

const MovingPlacesSearch = () => {
  const [list, movePlaces] = useMovingPlacesList()
  const options = [{ label: 'Edit', id: 'Edit' }]

  return (
    <MovingPlacesWrapper title="Moving places Search" onButtonClick={movePlaces}>
      {list.map(id => (
        <WppSearch key={id} labelConfig={{ text: `Search #${id}` }} onClick={e => e.stopPropagation()}>
          {options.map(option => (
            <WppListItem key={option.id} value={option}>
              <p slot="label">{option.label}</p>
            </WppListItem>
          ))}
        </WppSearch>
      ))}
    </MovingPlacesWrapper>
  )
}

const MovingPlacesPoppover = () => {
  const [list, movePlaces] = useMovingPlacesList()

  return (
    <MovingPlacesWrapper title="Moving places Poppover" onButtonClick={movePlaces}>
      {list.map(id => (
        <WppPopover
          key={id}
          className={styles.exampleItem}
          closable
          config={{ appendTo: () => document.querySelector('#root')! }} // This config is required for React to work with different handlers like 'onClick'
        >
          <WppButton variant="secondary" slot="trigger-element">
            Trigger button to open Popover #{id}
          </WppButton>
          <div className={styles.defaultContent}>
            <div className={styles.header}>
              <WppTypography type="m-strong">Title #{id}</WppTypography>
            </div>
          </div>
        </WppPopover>
      ))}
    </MovingPlacesWrapper>
  )
}

const MovingPlacesTooltips = () => {
  const [list, movePlaces] = useMovingPlacesList()

  return (
    <MovingPlacesWrapper title="Moving places Tooltips" onButtonClick={movePlaces}>
      {list.map(id => (
        <WppTooltip
          key={id}
          className={styles.exampleItem}
          text={`Tooltip text #${id}`}
          header="Lorem Ipsum"
          data-testid="styled-tooltip-button"
        >
          <WppButton>Tooltip #{id}</WppButton>
        </WppTooltip>
      ))}
    </MovingPlacesWrapper>
  )
}

const MovingPlacesSelects = () => {
  const [list, movePlaces] = useMovingPlacesList()

  return (
    <MovingPlacesWrapper title="Moving places Selects" onButtonClick={movePlaces}>
      {list.map(id => (
        <WppSelect
          list={[
            {
              value: `tree-${id}`,
              label: `Tree #${id}`,
            },
            {
              value: `car-${id}`,
              label: `Car #${id}`,
            },
            {
              value: `house-${id}`,
              label: `House #${id}`,
            },
          ]}
          key={id}
          required
          labelConfig={{ text: `Select #${id}` }}
          className={styles.exampleItem}
        ></WppSelect>
      ))}
    </MovingPlacesWrapper>
  )
}

const MovingPlacesExample = () => (
  <div>
    <div className={styles.link}>
      <h1 style={{ textDecoration: 'underline' }}>
        <a href="https://jira.uhub.biz/browse/WPPLONOP-16080">Bugfix #16080 - All tippy.js components</a>
      </h1>
    </div>
    <div className={styles.exampleContainer}>
      <MovingPlacesMenuContext />
      <MovingPlacesAutocomplete />
      <MovingPlacesSearch />
      <MovingPlacesPoppover />
      <MovingPlacesTooltips />
      <MovingPlacesSelects />
    </div>
  </div>
)

export default MovingPlacesExample
