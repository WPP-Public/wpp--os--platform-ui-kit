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
  selector: 'app-ag-grid-table-load-more-example',
  templateUrl: './ag-grid-table-load-more-example.page.html',
  styleUrls: ['./ag-grid-table-load-more-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgGridTableLoadMoreExamplePage {
  public genderOptions = [ALL]
  public search: InputChangeEventDetail['value'] = ''
  public displayData = users

  public itemsLoaded: number = 10
  public visibleData: any[] = []
  public loading: boolean = false

  public selectedGender: SelectChangeEventDetail['value'] = ALL
  public domLayout: 'normal' | 'autoHeight' = 'autoHeight'
  public isAutoHeight = true
  public showProgress = true
  public selectedItems: typeof users = []
  public gendersList1 = [
    {
      value: 'ALL',
      label: 'Gender: ALL',
    },
    {
      value: 'Male',
      label: 'Gender: Male',
    },
    {
      value: 'Female',
      label: 'Gender: Female',
    },
    {
      value: 'Polygender',
      label: 'Gender: Polygender',
    },
    {
      value: 'Agender',
      label: 'Gender: Agender',
    },
  ]

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
    this.itemsLoaded = 10
    this.updateVisibleData()
  }

  public handleAutoHeightToggle = () => {
    this.isAutoHeight = !this.isAutoHeight
    this.domLayout = this.isAutoHeight ? 'autoHeight' : 'normal'
  }

  public handleShowProgress = () => {
    this.showProgress = !this.showProgress
    this.cdr.markForCheck()
  }

  public getStyles = () => ({
    width: '100%',
    height: this.isAutoHeight ? '' : '450px',
  })

  public handleRemoveAvatarsColumn = () =>
    this.agGrid.api.setColumnDefs(this.columnDefs.filter(i => i.field !== 'avatar'))

  public handleAddAvatarsColumn = () => this.agGrid.api.setColumnDefs(this.columnDefs)

  public handleRowsSelect = () => {
    this.selectedItems = this.agGrid.api.getSelectedRows()
  }

  public handleDeselectAll = () => this.agGrid.api.deselectAll()

  public handleEditClick = () => alert(`Updating users with IDs: ${this.selectedItems.map(i => i.id)}`)

  public async handleLoadMore(event: Event) {
    const detail = (event as CustomEvent<{ newItemsLoaded: number; incrementBy: number }>).detail

    this.loading = true
    await delay(1000)

    const newItemsLoaded = detail.newItemsLoaded
    const effectiveItemsLoaded = Math.min(newItemsLoaded, this.displayData.length)
    const nextBatch = this.displayData.slice(this.itemsLoaded, effectiveItemsLoaded)

    if (this.agGrid && this.agGrid.api && nextBatch.length > 0) {
      this.agGrid.api.applyTransaction({ add: nextBatch })
    }

    this.itemsLoaded = effectiveItemsLoaded
    this.updateVisibleData()
    this.loading = false
    this.cdr.markForCheck()
  }

  private updateVisibleData() {
    this.visibleData = this.displayData.slice(0, this.itemsLoaded)
    this.cdr.markForCheck()
  }
}
