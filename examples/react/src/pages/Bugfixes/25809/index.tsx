import React, { useEffect, useState } from 'react'

import { WppTree } from '@platform-ui-kit/components-library-react'
import { TreeType } from '@platform-ui-kit/components-library'

import styles from './index.module.scss'
import { data } from '../../vc/Tree/config'

const TreeWithDynamicWidth = () => {
  const [treeData, setTreeData] = useState(data)
  const [treeWidth, setTreeWidth] = useState(400)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTreeWidth(600)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const treeContainer = document.querySelector('[data-testid="dynamic-width-tree"]') as HTMLElement

    if (treeContainer) {
      treeContainer.style.setProperty('--wpp-tree-item-width', `${treeWidth}px`)
    }
  }, [treeWidth])

  const handleTreeChange = (event: { detail: { treeState: React.SetStateAction<TreeType[]> } }) => {
    setTreeData(event.detail.treeState)
  }

  return (
    <div style={{ marginTop: '1px' }} data-testid="dynamic-width-tree-container">
      <h3 className={styles.title}>Tree - change width after 2 seconds to test dynamic resizing</h3>
      <div style={{ width: `${treeWidth}px`, border: '1px solid #000', padding: '10px' }}>
        <WppTree
          className={styles.tree}
          data={treeData}
          onWppChange={handleTreeChange}
          data-testid="dynamic-width-tree"
        />
      </div>
    </div>
  )
}

export const DynamicTreeWidth = () => (
  <div className={styles.wrapper} data-testid="trees-container">
    <div className={styles.trees}>
      <TreeWithDynamicWidth />
    </div>
  </div>
)
