import { useState } from 'react'
import {
  WppActionButton,
  WppMenuContext,
  WppListItem,
  WppIconEdit,
  WppIconTrash,
  WppButton,
} from '@platform-ui-kit/components-library-react'

import styles from '../MenuContext.module.scss'

export const MovingPlaces = () => {
  const [list, setList] = useState(['10', '11', '12', '13', '14', '15', '16', '17', '18'])
  const handleClick = () =>
    setList(list => {
      const first = list.at(0)!
      const moved = list.at(6)!

      return [first, moved, ...list.slice(1, 6), ...list.slice(7)]
    })

  return (
    <div className={styles.example}>
      <h3>Moving places Test</h3>
      <WppButton onClick={handleClick}>Move places</WppButton>
      <br />
      {list.map(id => (
        <div key={id}>
          <WppMenuContext
            onClick={e => {
              e.stopPropagation()
            }}
            appendToListWrapper
          >
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
        </div>
      ))}
    </div>
  )
}
