import {
  WppActionButton,
  WppButton,
  WppIconArrow,
  WppIconMore,
  WppIconPlus,
  WppBackToTopButton,
  WppFilterButton,
  WppSortButton,
  WppFloatingButton,
  WppTypography,
  WppMoreButton,
} from '@platform-ui-kit/components-library-react'
import styles from './ButtonsVC.module.scss'
import { useRef } from 'react'

export const ButtonsVCPage = () => {
  const btnRef = useRef<HTMLWppButtonElement>(null)
  const actionBtnRef = useRef<HTMLWppActionButtonElement>(null)
  const filterBtnRef = useRef<HTMLWppFilterButtonElement>(null)
  const sortBtnRef = useRef<HTMLWppSortButtonElement>(null)
  const floatingBtnRef = useRef<HTMLWppFloatingButtonElement>(null)
  const backToTopBtnRef = useRef<HTMLWppBackToTopButtonElement>(null)

  const handleSetFocus = (type: 'btn' | 'actionBtn' | 'filterBtn' | 'sortBtn' | 'floatingBtn' | 'backToTopBtn') => {
    if (type === 'btn' && btnRef.current) {
      btnRef.current.setFocus()
    }

    if (type === 'actionBtn' && actionBtnRef.current) {
      actionBtnRef.current.setFocus()
    }

    if (type === 'filterBtn' && filterBtnRef.current) {
      filterBtnRef.current.setFocus()
    }

    if (type === 'sortBtn' && sortBtnRef.current) {
      sortBtnRef.current.setFocus()
    }

    if (type === 'floatingBtn' && floatingBtnRef.current) {
      floatingBtnRef.current.setFocus()
    }

    if (type === 'backToTopBtn' && backToTopBtnRef.current) {
      backToTopBtnRef.current.setFocus()
    }
  }

  return (
    <div className="main-div">
      <p>Buttons with Dynamic Elements</p>
      <div className="dynamic-elements">
        <WppButton onClick={(e: any) => console.log('Click', e)} loading data-testid="loading-button">
          Loading
        </WppButton>

        <WppButton
          onClick={(e: any) => console.log('Click', e)}
          loading
          data-testid="loading-secondary-button"
          variant="secondary"
        >
          Loading
        </WppButton>

        <WppButton
          onClick={(e: any) => console.log('Click', e)}
          loading
          data-testid="loading-destructive-button"
          variant="destructive"
        >
          Loading
        </WppButton>

        <WppButton
          onClick={(e: any) => console.log('Click', e)}
          inverted
          loading
          data-testid="loading-destructive-secondary-button"
          variant="destructive-secondary"
        >
          Loading
        </WppButton>

        <WppActionButton
          onClick={(e: any) => console.log('Click', e)}
          loading
          data-testid="loading-action-primary-button"
        >
          Loading
        </WppActionButton>

        <WppActionButton
          onClick={(e: any) => console.log('Click', e)}
          loading
          data-testid="loading-action-secondary-button"
          variant="secondary"
        >
          Loading
        </WppActionButton>

        {/* <WppIconButton ariaProps={{ label: 'Label for accessibility' }} loading data-testid="loading-icon-button">
        <WppIconMore />
      </WppIconButton> */}
      </div>
      <div>
        <div className={styles.invertedButtons}>
          <h2>wpp inverted buttons</h2>
          <p>wpp inverted primary buttons</p>
          <div className="primary-buttons">
            <WppButton onClick={(e: any) => console.log('Click', e)} inverted data-testid="inverted-button">
              Inverted
            </WppButton>
            <WppButton onClick={(e: any) => console.log('Click', e)} inverted className={styles.fixed}>
              Very Long Button Name{' '}
            </WppButton>

            <WppButton onClick={(e: any) => console.log('Click', e)} inverted disabled data-testid="disabled-button">
              Disabled
            </WppButton>

            <WppButton onClick={(e: any) => console.log('Click', e)} inverted size="s" data-testid="small-button">
              S Size
            </WppButton>

            <WppButton
              onClick={(e: any) => console.log('Click', e)}
              inverted
              className={styles.fixed}
              data-testid="custom-width-button"
            >
              Custom Width
            </WppButton>

            <WppButton onClick={(e: any) => console.log('Click', e)} inverted data-testid="inverted-plus-icon-button">
              <WppIconPlus slot="icon-start" />
              Plus Icon
            </WppButton>

            <WppButton onClick={(e: any) => console.log('Click', e)} inverted loading data-testid="inverted-button">
              loading
            </WppButton>
          </div>

          <p>wpp inverted secondary button</p>
          <div className="secondary-buttons">
            <WppButton
              onClick={(e: any) => console.log('Click', e)}
              inverted
              data-testid="inverted-secondary-button"
              variant="secondary"
            >
              Inverted
            </WppButton>

            <WppButton
              onClick={(e: any) => console.log('Click', e)}
              inverted
              variant="secondary"
              className={styles.fixed}
            >
              Very Long Button Name{' '}
            </WppButton>

            <WppButton
              onClick={(e: any) => console.log('Click', e)}
              inverted
              disabled
              data-testid="disabled-secondary-button"
              variant="secondary"
            >
              Disabled
            </WppButton>

            <WppButton
              onClick={(e: any) => console.log('Click', e)}
              inverted
              size="s"
              data-testid="small-secondary-button"
              variant="secondary"
            >
              S Size
            </WppButton>

            <WppButton
              onClick={(e: any) => console.log('Click', e)}
              inverted
              className={styles.fixed}
              data-testid="custom-width-secondary-button"
              variant="secondary"
            >
              Custom Width
            </WppButton>

            <WppButton
              onClick={(e: any) => console.log('Click', e)}
              inverted
              data-testid="plus-icon-secondary-button"
              variant="secondary"
            >
              <WppIconPlus slot="icon-start" />
              Plus Icon
            </WppButton>

            <WppButton
              onClick={(e: any) => console.log('Click', e)}
              inverted
              loading
              data-testid="loading-secondary-button"
              variant="secondary"
            >
              Loading
            </WppButton>
          </div>
        </div>

        <div>
          <h2>wpp regular buttons</h2>
          <p>wpp regular primary buttons</p>
          <WppButton className={styles.setFocusBtn} onClick={() => handleSetFocus('btn')}>
            SetFocus to first button
          </WppButton>
          <div className="primary-buttons">
            <WppButton ref={btnRef} onClick={(e: any) => console.log('Click', e)} data-testid="regular-button">
              Regular
            </WppButton>
            <WppButton onClick={(e: any) => console.log('Click', e)} className={styles.fixed}>
              Very Long Button Name{' '}
            </WppButton>

            <WppButton onClick={(e: any) => console.log('Click', e)} disabled data-testid="disabled-button">
              Disabled
            </WppButton>

            <WppButton onClick={(e: any) => console.log('Click', e)} size="s" data-testid="small-button">
              S Size
            </WppButton>

            <WppButton
              onClick={(e: any) => console.log('Click', e)}
              className={styles.fixed}
              data-testid="custom-width-button"
            >
              Custom Width
            </WppButton>

            <WppButton onClick={(e: any) => console.log('Click', e)} data-testid="regular-plus-icon-button">
              <WppIconPlus slot="icon-start" />
              Plus Icon
            </WppButton>
          </div>

          <p>wpp regular secondary button</p>
          <div className="secondary-buttons">
            <WppButton
              onClick={(e: any) => console.log('Click', e)}
              data-testid="regular-secondary-button"
              variant="secondary"
            >
              Regular
            </WppButton>

            <WppButton onClick={(e: any) => console.log('Click', e)} variant="secondary" className={styles.fixed}>
              Very Long Button Name{' '}
            </WppButton>

            <WppButton
              onClick={(e: any) => console.log('Click', e)}
              disabled
              data-testid="disabled-secondary-button"
              variant="secondary"
            >
              Disabled
            </WppButton>

            <WppButton
              onClick={(e: any) => console.log('Click', e)}
              size="s"
              data-testid="small-secondary-button"
              variant="secondary"
            >
              S Size
            </WppButton>

            <WppButton
              onClick={(e: any) => console.log('Click', e)}
              className={styles.fixed}
              data-testid="custom-width-secondary-button"
              variant="secondary"
            >
              Custom Width
            </WppButton>

            <WppButton
              onClick={(e: any) => console.log('Click', e)}
              data-testid="plus-icon-secondary-button"
              variant="secondary"
            >
              <WppIconPlus slot="icon-start" />
              Plus Icon
            </WppButton>
          </div>

          <p>wpp regular destructive button</p>
          <div className="destructive-buttons">
            <WppButton
              onClick={(e: any) => console.log('Click', e)}
              data-testid="regular-destructive-button"
              variant="destructive"
            >
              Regular
            </WppButton>

            <WppButton onClick={(e: any) => console.log('Click', e)} variant="destructive" className={styles.fixed}>
              Very Long Button Name{' '}
            </WppButton>

            <WppButton
              onClick={(e: any) => console.log('Click', e)}
              disabled
              data-testid="disabled-destructive-button"
              variant="destructive"
            >
              Disabled
            </WppButton>

            <WppButton
              onClick={(e: any) => console.log('Click', e)}
              size="s"
              data-testid="small-destructive-button"
              variant="destructive"
            >
              S Size
            </WppButton>

            <WppButton
              onClick={(e: any) => console.log('Click', e)}
              className={styles.fixed}
              data-testid="custom-width-destructive-button"
              variant="destructive"
            >
              Custom Width
            </WppButton>

            <WppButton
              onClick={(e: any) => console.log('Click', e)}
              data-testid="plus-icon-secondary-button"
              variant="destructive"
            >
              <WppIconPlus slot="icon-start" />
              Plus Icon
            </WppButton>
          </div>

          <p>wpp regular destructive-secondary button</p>
          <div className="destructive-secondary-buttons">
            <WppButton
              onClick={(e: any) => console.log('Click', e)}
              data-testid="regular-destructive-secondary-button"
              variant="destructive-secondary"
            >
              Regular
            </WppButton>

            <WppButton
              onClick={(e: any) => console.log('Click', e)}
              variant="destructive-secondary"
              className={styles.fixed}
            >
              Very Long Button Name{' '}
            </WppButton>

            <WppButton
              onClick={(e: any) => console.log('Click', e)}
              disabled
              data-testid="disabled-destructive-secondary-button"
              variant="destructive-secondary"
            >
              Disabled
            </WppButton>

            <WppButton
              onClick={(e: any) => console.log('Click', e)}
              size="s"
              data-testid="small-destructive-secondary-button"
              variant="destructive-secondary"
            >
              S Size
            </WppButton>

            <WppButton
              onClick={(e: any) => console.log('Click', e)}
              className={styles.fixed}
              data-testid="custom-width-destructive-secondary-button"
              variant="destructive-secondary"
            >
              Custom Width
            </WppButton>

            <WppButton
              onClick={(e: any) => console.log('Click', e)}
              data-testid="plus-icon-secondary-button"
              variant="destructive-secondary"
            >
              <WppIconPlus slot="icon-start" />
              Plus Icon
            </WppButton>
          </div>
        </div>

        <div className="action-buttons">
          <h2>wpp action button</h2>
          <p>wpp action primary button</p>
          <WppButton className={styles.setFocusBtn} onClick={() => handleSetFocus('actionBtn')}>
            SetFocus to first button
          </WppButton>
          <div className="action-primary-buttons">
            <WppActionButton
              onClick={(e: any) => console.log('Click', e)}
              ref={actionBtnRef}
              role=""
              data-testid="regular-action-primary-button"
            >
              Regular
            </WppActionButton>

            <WppActionButton
              onClick={(e: any) => console.log('Click', e)}
              disabled
              data-testid="disabled-action-primary-button"
            >
              Disabled
            </WppActionButton>

            <WppActionButton
              onClick={(e: any) => console.log('Click', e)}
              data-testid="plus-icon-action-primary-button"
            >
              <WppIconPlus slot="icon-start" />
              Plus Icon
            </WppActionButton>

            <WppActionButton
              onClick={(e: any) => console.log('Click', e)}
              data-testid="arrow-icon-action-primary-button"
            >
              Arrow Icon
              <WppIconArrow slot="icon-end" />
            </WppActionButton>

            <WppActionButton
              onClick={(e: any) => console.log('Click', e)}
              ariaProps={{ label: 'Aria label test' }}
              data-testid="plus-icon-only-button"
            >
              <WppIconPlus slot="icon-start" />
            </WppActionButton>

            <WppActionButton
              onClick={(e: any) => console.log('Click', e)}
              ariaProps={{ label: 'Aria label test' }}
              data-testid="arrow-icon-only-button"
            >
              <WppIconArrow slot="icon-end" />
            </WppActionButton>

            <WppActionButton
              onClick={(e: any) => console.log('Click', e)}
              ariaProps={{ label: 'Aria label test' }}
              data-testid="plus-icon-only-button"
              disabled
            >
              <WppIconPlus slot="icon-start" />
            </WppActionButton>

            <WppActionButton
              onClick={(e: any) => console.log('Click', e)}
              ariaProps={{ label: 'Aria label test' }}
              data-testid="arrow-icon-only-button"
              disabled
            >
              <WppIconArrow slot="icon-end" />
            </WppActionButton>
          </div>

          <p>wpp action secondary button</p>
          <div className="action-secondary-buttons">
            <WppActionButton
              onClick={(e: any) => console.log('Click', e)}
              data-testid="regular-action-secondary-button"
              variant="secondary"
            >
              Regular
            </WppActionButton>

            <WppActionButton
              onClick={(e: any) => console.log('Click', e)}
              disabled
              data-testid="disabled-action-secondary-button"
              variant="secondary"
            >
              Disabled
            </WppActionButton>

            <WppActionButton
              onClick={(e: any) => console.log('Click', e)}
              data-testid="plus-icon-action-secondary-button"
              variant="secondary"
            >
              <WppIconPlus slot="icon-start" />
              Plus Icon
            </WppActionButton>

            <WppActionButton
              onClick={(e: any) => console.log('Click', e)}
              data-testid="arrow-icon-action-secondary-button"
              variant="secondary"
            >
              Arrow Icon
              <WppIconArrow slot="icon-end" />
            </WppActionButton>

            <WppActionButton
              onClick={(e: any) => console.log('Click', e)}
              ariaProps={{ label: 'Aria label test' }}
              data-testid="plus-icon-only-button"
              variant="secondary"
            >
              <WppIconPlus slot="icon-start" />
            </WppActionButton>

            <WppActionButton
              onClick={(e: any) => console.log('Click', e)}
              ariaProps={{ label: 'Aria label test' }}
              data-testid="arrow-icon-only-button"
              variant="secondary"
            >
              <WppIconArrow slot="icon-end" />
            </WppActionButton>

            <WppActionButton
              onClick={(e: any) => console.log('Click', e)}
              ariaProps={{ label: 'Aria label test' }}
              data-testid="plus-icon-only-button"
              disabled
              variant="secondary"
            >
              <WppIconPlus slot="icon-start" />
            </WppActionButton>

            <WppActionButton
              onClick={(e: any) => console.log('Click', e)}
              ariaProps={{ label: 'Aria label test' }}
              data-testid="arrow-icon-only-button"
              disabled
              variant="secondary"
            >
              <WppIconArrow slot="icon-end" />
            </WppActionButton>
          </div>

          <p>wpp action destructive button</p>
          <div className="action-destructive-buttons">
            <WppActionButton
              onClick={(e: any) => console.log('Click', e)}
              data-testid="regular-action-destructive-button"
              variant="destructive"
            >
              Regular
            </WppActionButton>

            <WppActionButton
              onClick={(e: any) => console.log('Click', e)}
              disabled
              data-testid="disabled-action-destructive-button"
              variant="destructive"
            >
              Disabled
            </WppActionButton>

            <WppActionButton
              onClick={(e: any) => console.log('Click', e)}
              data-testid="plus-icon-action-destructive-button"
              variant="destructive"
            >
              <WppIconPlus slot="icon-start" />
              Plus Icon
            </WppActionButton>

            <WppActionButton
              onClick={(e: any) => console.log('Click', e)}
              data-testid="arrow-icon-action-destructive-button"
              variant="destructive"
            >
              Arrow Icon
              <WppIconArrow slot="icon-end" />
            </WppActionButton>

            <WppActionButton
              onClick={(e: any) => console.log('Click', e)}
              ariaProps={{ label: 'Aria label test' }}
              data-testid="plus-icon-only-button"
              variant="destructive"
            >
              <WppIconPlus slot="icon-start" />
            </WppActionButton>

            <WppActionButton
              onClick={(e: any) => console.log('Click', e)}
              ariaProps={{ label: 'Aria label test' }}
              data-testid="arrow-icon-only-button"
              variant="destructive"
            >
              <WppIconArrow slot="icon-end" />
            </WppActionButton>

            <WppActionButton
              onClick={(e: any) => console.log('Click', e)}
              ariaProps={{ label: 'Aria label test' }}
              data-testid="plus-icon-only-button"
              disabled
              variant="destructive"
            >
              <WppIconPlus slot="icon-start" />
            </WppActionButton>

            <WppActionButton
              onClick={(e: any) => console.log('Click', e)}
              ariaProps={{ label: 'Aria label test' }}
              data-testid="arrow-icon-only-button"
              disabled
              variant="destructive"
            >
              <WppIconArrow slot="icon-end" />
            </WppActionButton>
          </div>

          <p>wpp action inverted button</p>
          <div className={styles.toasts}>
            <WppActionButton onClick={(e: any) => console.log('Click', e)} variant="inverted">
              Regular
            </WppActionButton>
            <WppActionButton onClick={(e: any) => console.log('Click', e)} variant="inverted" disabled>
              Disabled
            </WppActionButton>
            <WppActionButton onClick={(e: any) => console.log('Click', e)} variant="inverted" loading>
              Loading
            </WppActionButton>
            <WppActionButton onClick={(e: any) => console.log('Click', e)} variant="inverted">
              <WppIconPlus slot="icon-start" />
              Button
            </WppActionButton>
            <WppActionButton onClick={(e: any) => console.log('Click', e)} variant="inverted" disabled>
              <WppIconPlus slot="icon-start" />
              Button
            </WppActionButton>
            <WppActionButton onClick={(e: any) => console.log('Click', e)} variant="inverted">
              <WppIconArrow slot="icon-end" />
              Button
            </WppActionButton>
            <WppActionButton onClick={(e: any) => console.log('Click', e)} variant="inverted" disabled>
              <WppIconArrow slot="icon-end" />
              Button
            </WppActionButton>
            <WppActionButton
              onClick={(e: any) => console.log('Click', e)}
              ariaProps={{ label: 'Aria label test' }}
              variant="inverted"
            >
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <WppActionButton
              onClick={(e: any) => console.log('Click', e)}
              ariaProps={{ label: 'Aria label test' }}
              variant="inverted"
              disabled
            >
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
            <WppActionButton
              onClick={(e: any) => console.log('Click', e)}
              ariaProps={{ label: 'Aria label test' }}
              variant="inverted"
              loading
            >
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
          </div>
        </div>

        <div className="icon-buttons">
          <h2>wpp filter button</h2>
          <WppButton className={styles.setFocusBtn} onClick={() => handleSetFocus('filterBtn')}>
            SetFocus to first button
          </WppButton>

          <WppFilterButton
            ref={filterBtnRef}
            onClick={(e: any) => console.log('Click', e)}
            ariaProps={{ label: 'Filter (3) options' }}
          >
            Filter
          </WppFilterButton>
          <WppFilterButton onClick={(e: any) => console.log('Click', e)} disabled>
            Filter
          </WppFilterButton>
          <WppFilterButton
            onClick={(e: any) => console.log('Click', e)}
            ariaProps={{ label: 'Filter (3) options' }}
            counter={3}
          >
            Filter
          </WppFilterButton>
          <WppFilterButton onClick={(e: any) => console.log('Click', e)} counter={3} disabled>
            Filter
          </WppFilterButton>

          <h2>wpp sort button</h2>
          <WppButton className={styles.setFocusBtn} onClick={() => handleSetFocus('sortBtn')}>
            SetFocus to first button
          </WppButton>
          <WppSortButton
            ref={sortBtnRef}
            onClick={(e: any) => console.log('Click', e)}
            ariaProps={{ label: 'Sort options' }}
            name="Sort categories"
          >
            Sort
          </WppSortButton>
          <WppSortButton onClick={(e: any) => console.log('Click', e)} ariaProps={{ label: 'Sort options' }} disabled>
            Sort
          </WppSortButton>

          <h2>wpp floating button</h2>
          <WppButton className={styles.setFocusBtn} onClick={() => handleSetFocus('floatingBtn')}>
            SetFocus to first button
          </WppButton>
          <WppFloatingButton
            ref={floatingBtnRef}
            onClick={(e: any) => console.log('Click', e)}
            ariaProps={{ label: 'Testing accessibility' }}
          />
          <WppFloatingButton
            onClick={(e: any) => console.log('Click', e)}
            ariaProps={{ label: 'Testing accessibility' }}
            disabled
          />
          <WppFloatingButton
            onClick={(e: any) => console.log('Click', e)}
            ariaProps={{ label: 'Testing accessibility' }}
            loading
          />
          <WppFloatingButton
            onClick={(e: any) => console.log('Click', e)}
            ariaProps={{ label: 'Testing accessibility' }}
          >
            <WppIconMore />
          </WppFloatingButton>
        </div>

        <h2>wpp back to top button</h2>
        <WppButton className={styles.setFocusBtn} onClick={() => handleSetFocus('backToTopBtn')}>
          SetFocus to first button
        </WppButton>
        <WppBackToTopButton ref={backToTopBtnRef} onClick={(e: any) => console.log('Click', e)} />
      </div>

      <div className={styles.moreBtn}>
        <WppTypography type="2xl-heading">WppMoreButton</WppTypography>

        <WppTypography className={styles.subtitle} type="xl-heading">
          Default
        </WppTypography>
        <div className={styles.moreBtnSection}>
          <WppMoreButton
            onClick={() => console.log('Clicked')}
            ariaProps={{ label: 'More items menu' }}
            data-testid="default-more-btn-m"
            className={styles.moreBtnItem}
          ></WppMoreButton>
          <WppMoreButton
            ariaProps={{ label: 'More items menu' }}
            data-testid="default-more-btn-s"
            className={styles.moreBtnItem}
            size="s"
          ></WppMoreButton>
        </div>

        <WppTypography className={styles.subtitle} type="xl-heading">
          Loading
        </WppTypography>
        <div className={styles.moreBtnSection}>
          <WppMoreButton
            ariaProps={{ label: 'More items menu' }}
            loading
            data-testid="loading-more-btn-m"
            className={styles.moreBtnItem}
          ></WppMoreButton>
          <WppMoreButton
            ariaProps={{ label: 'More items menu' }}
            loading
            data-testid="loading-more-btn-s"
            className={styles.moreBtnItem}
            size="s"
          ></WppMoreButton>
        </div>

        <WppTypography className={styles.subtitle} type="xl-heading">
          Disabled
        </WppTypography>
        <div className={styles.moreBtnSection}>
          <WppMoreButton
            ariaProps={{ label: 'More items menu' }}
            disabled
            data-testid="disabled-more-btn-m"
            className={styles.moreBtnItem}
          ></WppMoreButton>
          <WppMoreButton
            ariaProps={{ label: 'More items menu' }}
            disabled
            data-testid="disabled-more-btn-s"
            className={styles.moreBtnItem}
            size="s"
          ></WppMoreButton>
        </div>
      </div>
    </div>
  )
}
