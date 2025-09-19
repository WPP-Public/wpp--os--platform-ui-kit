import debounce from 'lodash/debounce'
import React, { useCallback, useState } from 'react'

import { WppButton, WppInput, WppTree } from '@platform-ui-kit/components-library-react'
import {
  InputChangeEventDetail,
  TreeActionClickEventDetail,
  TreeChangeEventDetail,
  TreeType,
} from '@platform-ui-kit/components-library'

import { chosData, data, dataWithEndContent, dataWithLongNames } from './config'
import styles from './TreeVC.module.scss'
// Tree-2 component works as a controlled component. That means, wppChange event returns to you treeState snapshot
// which one you should pass to the 'data' prop to rerender component and see changes

// To implement initial open state you should simply add properties 'open: true' to the desired
// item in data config like this
// {
//   title: 'Cars',
//   id: '0',
//   open: true,
//   selected: true
//   disabled: true,
//   children: [ ...some other items]
//   }
//

// TreeSingle with End Content Example
const TreeSingleWithEndContent = () => {
  const [treeData, setTreeData] = useState(dataWithEndContent)

  const handleTreeChange = (event: CustomEvent<TreeChangeEventDetail>) => {
    setTreeData(event.detail.treeState)
  }

  const handleActionClick = (event: CustomEvent<TreeActionClickEventDetail>) => {
    console.log('Action button clicked:', event.detail)
  }

  return (
    <div style={{ marginTop: '1px' }} data-testid="single-tree-end-content">
      <h3 className={styles.title}>Tree with End Content Types</h3>
      <WppTree
        className={styles.tree}
        data={treeData}
        multiple
        onWppChange={handleTreeChange}
        onWppActionClick={handleActionClick}
        data-testid="single-tree-end-content"
      />
    </div>
  )
}

const TreeSingle = () => {
  const [treeData, setTreeData] = useState(data)

  const handleTreeChange = (event: CustomEvent) => {
    console.log('handleTreeChange event :>> ', event.detail)
    setTreeData(event.detail.treeState)
  }

  const handleActionClick = (event: CustomEvent<TreeActionClickEventDetail>) => {
    console.log('handleActionClick', event.detail)
  }

  return (
    <div style={{ marginTop: '1px' }} data-testid="single-tree-container">
      <h3 className={styles.title}>Single tree</h3>
      <WppTree
        className={styles.tree}
        data={treeData}
        onWppChange={handleTreeChange}
        data-testid="single-tree"
        onWppActionClick={handleActionClick}
      />
    </div>
  )
}

const TreeSingleDisabledAnimation = () => {
  const [treeData, setTreeData] = useState(data)

  const handleTreeChange = (event: CustomEvent) => {
    console.log('handleTreeChange event :>> ', event.detail)
    setTreeData(event.detail.treeState)
  }

  const handleActionClick = (event: CustomEvent<TreeActionClickEventDetail>) => {
    console.log('handleActionClick', event.detail)
  }

  return (
    <>
      <h3 className={styles.title}>Single tree with disabled open/close animation</h3>
      <WppTree
        className={styles.tree}
        data={treeData}
        onWppChange={handleTreeChange}
        data-testid="single-tree"
        onWppActionClick={handleActionClick}
        disableOpenCloseAnimation={true}
      />
    </>
  )
}

const TreeSingleWithSearch = () => {
  const [treeData, setTreeData] = useState(chosData)
  const [search, setSearch] = useState('')

  const handleTreeChange = (event: CustomEvent) => {
    console.log('handleTreeChange event :>> ', event.detail)
    setTreeData(event.detail.treeState)
  }

  const handleSearch = (e: CustomEvent<InputChangeEventDetail>) => {
    setSearch(e.detail.value || '')
  }

  const handleActionClick = (event: CustomEvent) => {
    console.log('handleActionClick', event.detail)
  }

  // In order to prevent rendering issues on big data, use debounce for search handler
  const debouncedHandleSearch = useCallback(debounce(handleSearch, 400), [])

  return (
    <>
      <h3 className={styles.title}>Single tree with search</h3>
      <WppInput
        className={styles.search}
        onWppChange={debouncedHandleSearch}
        type="search"
        placeholder="Search"
        data-testid="search-input"
      />
      <WppTree
        className={styles.tree}
        data={treeData}
        search={search}
        onWppChange={handleTreeChange}
        onWppActionClick={handleActionClick}
      />
    </>
  )
}

// Search implementation could vary with help of searchConfig property. Default implementation works as search
// by multiple words, but if you want to change it, you could pass your own matcher function in searchConfig */
const TreeSingleWithCustomSearch = () => {
  const [treeData, setTreeData] = useState(data)
  const [search, setSearch] = useState('')

  const handleTreeChange = (event: CustomEvent<TreeChangeEventDetail>) => {
    console.log('handleTreeChange event :>> ', event.detail)
    setTreeData(event.detail.treeState)
  }

  const handleSearch = (e: CustomEvent<InputChangeEventDetail>) => {
    setSearch(e.detail.value || '')
  }

  // In order to prevent rendering issues on big data, use debounce for search handler
  const debouncedHandleSearch = useCallback(debounce(handleSearch, 400), [])

  return (
    <>
      <h3 className={styles.title}>
        Single tree with custom search: tree-item's text should match exactly the search string (is case sensitive)
      </h3>
      <WppInput className={styles.search} onWppChange={debouncedHandleSearch} type="search" placeholder="Search" />
      <WppTree
        className={styles.tree}
        data={treeData}
        search={search}
        onWppChange={handleTreeChange}
        data-testid="single-tree-custom-search"
        searchConfig={{
          isMatchSearch: (title: string, search: string) => title === search,
        }}
      />
    </>
  )
}

const TreeSingleWithNewCustomSearch = () => {
  const [treeData, setTreeData] = useState(data)
  const [search, setSearch] = useState('')

  const handleTreeChange = (event: CustomEvent<TreeChangeEventDetail>) => {
    console.log('handleTreeChange event :>> ', event.detail)
    setTreeData(event.detail.treeState)
  }

  const handleSearch = (e: CustomEvent<InputChangeEventDetail>) => {
    setSearch(e.detail.value || '')
  }

  // In order to prevent rendering issues on big data, use debounce for search handler
  const debouncedHandleSearch = useCallback(debounce(handleSearch, 400), [])

  return (
    <>
      <h3 className={styles.title}>
        Single tree with new custom search: tree-item's text should include search string (not case sensitive)
      </h3>
      <WppInput className={styles.search} onWppChange={debouncedHandleSearch} type="search" placeholder="Search" />
      <WppTree
        className={styles.tree}
        data={treeData}
        search={search}
        onWppChange={handleTreeChange}
        data-testid="single-tree-custom-search"
        searchConfig={{
          isMatchingSearch: (item: TreeType, search: string) =>
            item.title.toLocaleLowerCase().includes(search.toLowerCase()),
        }}
      />
    </>
  )
}

// You could use defaultSelectedIds property to pass an array of default selected ids. In order to make several items opened
// by default feel free to add 'open: true' property in the data to the desired item.
// Note: single mode accepts only 1 element in array of defaultSelectedIds.
const TreeMultiple = () => {
  const [treeData, setTreeData] = useState(dataWithLongNames)

  const handleTreeChange = (event: CustomEvent<TreeChangeEventDetail>) => {
    console.log('handleTreeChange event :>> ', event.detail)
    setTreeData(event.detail.treeState)
  }

  const handleActionClick = (event: CustomEvent<TreeActionClickEventDetail>) => {
    console.log('handleActionClick', event.detail)
  }

  return (
    <>
      <h3 className={styles.title}>Multiple tree with selected by default</h3>
      <WppTree
        className={styles.tree}
        data={treeData}
        multiple
        onWppChange={handleTreeChange}
        onWppActionClick={handleActionClick}
        defaultSelectedIds={['2-1', '1']}
        data-testid="multiple-tree"
      />
    </>
  )
}

const TreeMultipleWithNotSelectableItem = () => {
  const data: TreeType[] = [
    {
      title: 'Cars',
      id: '0',
      children: [
        {
          title: 'Toyota',
          id: '0-0',
          iconsEnd: [
            { icon: `wpp-icon-info`, name: 'remove' },
            { icon: 'wpp-icon-cross', name: 'save' },
          ],
        },
      ],
    },
    {
      title: 'Planes',
      isNotSelectable: true,
      id: '1',
      children: [
        {
          title: 'B-52',
          id: '1-0',
        },
        {
          title: 'MIG-21',
          id: '1-1',
        },
      ],
    },
  ]
  const [treeData, setTreeData] = useState(data)

  const handleTreeChange = (event: CustomEvent<TreeChangeEventDetail>) => {
    console.log('handleTreeChange event :>> ', event.detail)
    setTreeData(event.detail.treeState)
  }

  return (
    <>
      <h3 className={styles.title}>Multiple tree with not selectable Planes item</h3>
      <WppTree
        className={styles.tree}
        data={treeData}
        multiple
        onWppChange={handleTreeChange}
        data-testid="multiple-tree"
      />
    </>
  )
}

const TreeMultipleWithSearch = () => {
  const [treeData, setTreeData] = useState(dataWithLongNames)
  const [search, setSearch] = useState('')

  const handleTreeChange = (event: CustomEvent<TreeChangeEventDetail>) => {
    setTreeData(event.detail.treeState)
  }

  const handleSearch = (e: CustomEvent<InputChangeEventDetail>) => {
    setSearch(e.detail.value || '')
  }

  // In order to prevent rendering issues on big data, use debounce for search handler
  const debouncedHandleSearch = useCallback(debounce(handleSearch, 400), [])

  return (
    <>
      <h3 className={styles.title}>Multiple tree with search</h3>
      <WppInput className={styles.search} onWppChange={debouncedHandleSearch} type="search" placeholder="Search" />
      <WppTree
        className={styles.tree}
        data={treeData}
        search={search}
        multiple
        onWppChange={handleTreeChange}
        data-testid="multiple-tree"
      />
    </>
  )
}

const TreeMultipleWithoutSearchHighlight = () => {
  const [treeData, setTreeData] = useState(dataWithLongNames)
  const [search, setSearch] = useState('')

  const handleTreeChange = (event: CustomEvent<TreeChangeEventDetail>) => {
    setTreeData(event.detail.treeState)
  }

  const handleSearch = (e: CustomEvent<InputChangeEventDetail>) => {
    setSearch(e.detail.value || '')
  }

  // In order to prevent rendering issues on big data, use debounce for search handler
  const debouncedHandleSearch = useCallback(debounce(handleSearch, 400), [])

  return (
    <>
      <h3 className={styles.title}>Multiple tree without search highlight</h3>
      <WppInput className={styles.search} onWppChange={debouncedHandleSearch} type="search" placeholder="Search" />
      <WppTree
        className={styles.tree}
        data={treeData}
        search={search}
        multiple
        onWppChange={handleTreeChange}
        disableSearchHighlight
        data-testid="multiple-tree"
      />
    </>
  )
}

const TreeMultipleWithDefaultSelectedIds = () => {
  const [treeData, setTreeData] = useState(data)

  const handleTreeChange = (event: CustomEvent<TreeChangeEventDetail>) => {
    setTreeData(event.detail.treeState)
  }

  return (
    <>
      <h3 className={styles.title}>Multiple tree with default selected ids ['0-1', '1']</h3>
      <WppTree
        className={styles.tree}
        data={treeData}
        defaultSelectedIds={['0-1', '1']}
        multiple
        onWppChange={handleTreeChange}
        data-testid="multiple-tree"
      />
    </>
  )
}

const TreeSkeletonLoading = () => {
  const [treeData, setTreeData] = useState(data)
  const [loading, setLoading] = useState(true)

  const toggleLoading = () => setLoading(!loading)
  const handleTreeChange = (event: CustomEvent<TreeChangeEventDetail>) => {
    setTreeData(event.detail.treeState)
  }

  return (
    <>
      <h3 className={styles.title}>Skeleton Loading for a Single tree</h3>

      <WppTree data={treeData} skeletonNumberItems={3} loading={loading} onWppChange={handleTreeChange} />

      <WppButton onClick={toggleLoading} style={{ marginTop: '40px' }}>
        Toggle loading
      </WppButton>
    </>
  )
}

const multipleWordSearch = (title: string, multipleWord: string[]) =>
  multipleWord.find(element => element && title.includes(element)) !== undefined
const exactMatchSearch = (title: string, exactMatchChunks: string[]) =>
  exactMatchChunks.find(element => element && title.includes(element)) !== undefined

const TreeSingleWithQuotationMarks = () => {
  const [search, setSearch] = useState('')
  const [treeData, setTreeData] = useState(data)

  const handleSearch = (e: CustomEvent<InputChangeEventDetail>) => {
    setSearch(e.detail.value || '')
  }

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 400), [])

  const handleTreeChange = (event: CustomEvent) => {
    console.log('handleTreeChange event :>> ', event.detail)
    setTreeData(event.detail.treeState)
  }

  const handleActionClick = (event: CustomEvent<TreeActionClickEventDetail>) => {
    console.log('handleActionClick', event.detail)
  }

  return (
    <div style={{ marginTop: '1px' }} data-testid="quotation-marks-tree-area">
      <h3 className={styles.title}>Single tree with search with quotation marks</h3>
      <WppInput
        className={styles.search}
        onWppChange={debouncedHandleSearch}
        type="search"
        placeholder="Search"
        data-testid="quotation-marks-input"
      />
      <WppTree
        className={styles.tree}
        data={treeData}
        onWppChange={handleTreeChange}
        onWppActionClick={handleActionClick}
        search={search}
        data-testid="quotation-marks-tree"
        searchConfig={{
          isMatchSearch: (title: string, search: string) => {
            const exactMatch: string[] = []
            const multipleWord: string[] = []
            const regx = /("(.*?)"|\S+)/g

            for (const match of search.matchAll(regx) as unknown as any) {
              match[2] ? exactMatch.push(match[2]) : multipleWord.push(match[1].toLowerCase())
            }
            const scTitle = title.toLowerCase()

            return exactMatchSearch(title, exactMatch) || multipleWordSearch(scTitle, multipleWord)
          },
          transformSearchQuery: (search: string) => search.replace(/"/g, ''),
        }}
      />
    </div>
  )
}

export const TreeVC = () => (
  <div className={styles.wrapper} data-testid="trees-container">
    <div className={styles.trees}>
      <TreeSingleWithEndContent />
    </div>
    <div className={styles.trees}>
      <TreeSingle />
    </div>
    <div className={styles.trees}>
      <TreeSingleDisabledAnimation />
    </div>
    <div className={styles.trees}>
      <TreeSingleWithSearch />
    </div>
    <div className={styles.trees}>
      <TreeSingleWithCustomSearch />
    </div>
    <div className={styles.trees}>
      <TreeSingleWithNewCustomSearch />
    </div>
    <div className={styles.trees}>
      <TreeSingleWithQuotationMarks />
    </div>
    <div className={styles.trees}>
      <TreeMultiple />
    </div>
    <div className={styles.trees}>
      <TreeMultipleWithSearch />
    </div>
    <div className={styles.trees}>
      <TreeMultipleWithoutSearchHighlight />
    </div>
    <div className={styles.trees}>
      <TreeMultipleWithNotSelectableItem />
    </div>
    <div className={styles.trees}>
      <TreeMultipleWithDefaultSelectedIds />
    </div>
    <div className={styles.trees}>
      <TreeSkeletonLoading />
    </div>
  </div>
)
