import { ChangeDetectionStrategy, Component, ViewChild, ChangeDetectorRef } from '@angular/core'
import { AgGridAngular } from 'ag-grid-angular'
import { ColDef, FirstDataRenderedEvent, RowClassRules } from 'ag-grid-community'
import { InputChangeEventDetail, SelectChangeEventDetail } from '@platform-ui-kit/components-library'

import { AvatarRenderer } from './components/avatar-renderer/avatar-renderer'
import { CustomLoadingOverlay } from './components/custom-loading-overlay'
import { NoRowsOverlay } from './components/no-rows-overlay'
import { CellRenderer } from './components/cell-renderer'
import { HeaderCellRenderer } from './components/header-cell-renderer/header-cell-renderer'
import { LinkedinCellRenderer } from './components/linkedin-cell-renderer'
import { ActionsRenderer } from './components/actions-renderer/actions-renderer'
import { AvatarGroupRenderer } from './components/avatar-group-renderer/avatar-group-renderer'
import { delay } from '../../../utils'
import users from '../../dummy-data/users'

const ALL = 'ALL'

@Component({
  selector: 'ag-grid-table-hybrid-infinite-scroll-example',
  templateUrl: './ag-grid-table-hybrid-infinite-scroll-example.page.html',
  styleUrls: ['./ag-grid-table-hybrid-infinite-scroll-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgGridTableHybridInfiniteScrollExamplePage {
  public readonly AUTO_LOAD_LIMIT = 50
  public readonly LOAD_MORE_COUNT = 25
  public readonly INITIAL_LOAD = 10

  public genderOptions = [ALL]
  public search: InputChangeEventDetail['value'] = ''
  public displayData = users

  public itemsLoaded: number = this.INITIAL_LOAD
  public visibleData: any[] = []
  public loading: boolean = false

  public selectedGender: SelectChangeEventDetail['value'] = ALL
  public showProgress = true
  public selectedItems: typeof users = []

  public columnDefs: ColDef[] = [
    {
      field: 'id',
      sortable: true,
      resizable: true,
      rowDrag: false,
      headerCheckboxSelection: true,
      checkboxSelection: true,
      pinned: 'left',
    },
    { field: 'firstName', sortable: true },
    { field: 'lastName', sortable: true },
    { field: 'LinkedIn', cellRenderer: LinkedinCellRenderer },
    { field: 'email', resizable: true },
    { field: 'gender' },
    {
      field: 'avatar',
      width: 250,
      cellRenderer: AvatarRenderer,
    },
    {
      field: 'avatar',
      width: 250,
      cellRenderer: AvatarGroupRenderer,
    },
    {
      field: 'Actions',
      width: 100,
      cellRenderer: ActionsRenderer,
    },
    { field: 'job' },
    { field: 'IP' },
  ]

  public defaultColDef: ColDef = {}

  public loadingOverlayComponent = CustomLoadingOverlay
  public noRowsOverlayComponent = NoRowsOverlay

  public rowClassRules: RowClassRules<(typeof users)[0]> = {
    'with-error': data => (data.data ? !!data.data.meta?.error : false),
  }

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular

  constructor(private cdr: ChangeDetectorRef) {
    // Initialize visibleData with first slice of data.
    this.updateVisibleData()
  }

  public onFirstDataRendered(event: FirstDataRenderedEvent): void {
    const bodyViewport = document.querySelector('.ag-body-viewport')
    const horizontalScroll = document.querySelector('.ag-body-horizontal-scroll-viewport')

    let scrollingTimeout: ReturnType<typeof setTimeout> | null = null

    const handleVerticalScroll = () => {
      bodyViewport?.classList.add('scrolling')
      if (scrollingTimeout) clearTimeout(scrollingTimeout)
      scrollingTimeout = setTimeout(() => {
        bodyViewport?.classList.remove('scrolling')
      }, 500)
    }

    const handleHorizontalScroll = () => {
      horizontalScroll?.classList.add('scrolling')
      if (scrollingTimeout) clearTimeout(scrollingTimeout)
      scrollingTimeout = setTimeout(() => {
        horizontalScroll?.classList.remove('scrolling')
      }, 500)
    }

    bodyViewport?.addEventListener('scroll', handleVerticalScroll)
    horizontalScroll?.addEventListener('scroll', handleHorizontalScroll)

    event.api.addEventListener('gridDestroyed', () => {
      bodyViewport?.removeEventListener('scroll', handleVerticalScroll)
      horizontalScroll?.removeEventListener('scroll', handleHorizontalScroll)
    })

    this.attachInfiniteScroll()
  }

  public getDefaultColDef = () => {
    this.defaultColDef = {
      headerComponent: HeaderCellRenderer,
      sortable: false,
      cellRenderer: CellRenderer,
      cellRendererParams: {
        search: this.search,
        searchColumn: 'firstName',
      },
    }
  }

  public rowIdGetter = (params: any) => params.data?.id ?? params.node?.id

  public handleSearchChange = (event: Event) => {
    this.search = (event as CustomEvent<InputChangeEventDetail>).detail.value
    this.handleFiltersChange()
    this.getDefaultColDef()
  }

  public handleGenderChange = (event: Event) => {
    this.selectedGender = (event as CustomEvent<SelectChangeEventDetail>).detail.value
    this.handleFiltersChange()
  }

  ngAfterContentInit() {
    this.getDefaultColDef()
    this.handleFiltersChange()
  }

  private handleFiltersChange = () => {
    const filteredBySearch = !this.search
      ? users
      : users.filter(item => item.firstName.toLowerCase().includes((this.search || '').toLowerCase()))

    const filteredByFilters =
      this.selectedGender === ALL
        ? filteredBySearch
        : filteredBySearch.filter(item => item.gender === this.selectedGender)

    this.genderOptions = [ALL, ...Array.from(new Set(filteredBySearch.map(item => item.gender)))]
    this.displayData = filteredByFilters
    // Reset loaded items when filters change
    this.itemsLoaded = this.INITIAL_LOAD
    this.updateVisibleData()
  }

  public handleShowProgress = () => {
    this.showProgress = !this.showProgress
    this.cdr.markForCheck()
  }

  public getStyles = () => ({
    width: '100%',
    height: '450px',
  })

  public handleRemoveAvatarsColumn = () =>
    this.agGrid.api.setColumnDefs(this.columnDefs.filter(i => i.field !== 'avatar'))

  public handleAddAvatarsColumn = () => this.agGrid.api.setColumnDefs(this.columnDefs)

  public handleRowsSelect = () => {
    this.selectedItems = this.agGrid.api.getSelectedRows()
  }

  public handleDeselectAll = () => this.agGrid.api.deselectAll()

  public handleEditClick = () => alert(`Updating users with IDs: ${this.selectedItems.map(i => i.id)}`)

  public async handleLoadMore() {
    this.loading = true
    await delay(1000)

    const next = Math.min(this.itemsLoaded + this.LOAD_MORE_COUNT, this.displayData.length)
    const nextBatch = this.displayData.slice(this.itemsLoaded, next)

    if (this.agGrid && this.agGrid.api && nextBatch.length > 0) {
      this.agGrid.api.applyTransaction({ add: nextBatch })
    }

    this.itemsLoaded = next
    this.updateVisibleData()
    this.loading = false
    this.cdr.markForCheck()
  }

  private updateVisibleData() {
    this.visibleData = this.displayData.slice(0, this.itemsLoaded)
    this.cdr.markForCheck()
  }

  private attachInfiniteScroll() {
    setTimeout(() => {
      const bodyViewport = document.querySelector('.ag-body-viewport')

      if (!bodyViewport) return

      const onScroll = () => {
        if (
          bodyViewport.scrollTop + bodyViewport.clientHeight >= bodyViewport.scrollHeight - 10 &&
          this.itemsLoaded < Math.min(this.displayData.length, this.AUTO_LOAD_LIMIT)
        ) {
          const next = Math.min(this.itemsLoaded + this.LOAD_MORE_COUNT, this.AUTO_LOAD_LIMIT, this.displayData.length)
          const nextBatch = this.displayData.slice(this.itemsLoaded, next)

          if (this.agGrid && this.agGrid.api && nextBatch.length > 0) {
            this.agGrid.api.applyTransaction({ add: nextBatch })
          }
          this.itemsLoaded = next
          this.updateVisibleData()
          this.cdr.markForCheck()
        }
      }

      bodyViewport.addEventListener('scroll', onScroll)

      // Clean up on destroy or layout change
      this.agGrid.api.addEventListener('gridDestroyed', () => {
        bodyViewport.removeEventListener('scroll', onScroll)
      })
    }, 0)
  }
}
