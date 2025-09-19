import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core'
import { AgGridAngular } from 'ag-grid-angular'
import { ColDef, FirstDataRenderedEvent, RowClassRules } from 'ag-grid-community'

import {
  PaginationChangeEventDetail,
  InputChangeEventDetail,
  SelectChangeEventDetail,
} from '@platform-ui-kit/components-library'

import { AvatarRenderer } from './components/avatar-renderer/avatar-renderer'
import { CustomLoadingOverlay } from './components/custom-loading-overlay'
import { NoRowsOverlay } from './components/no-rows-overlay'
import { CellRenderer } from './components/cell-renderer'
import { HeaderCellRenderer } from './components/header-cell-renderer/header-cell-renderer'
import { LinkedinCellRenderer } from './components/linkedin-cell-renderer'
import { ActionsRenderer } from './components/actions-renderer/actions-renderer'
import { delay } from '../../../utils'
import { AvatarGroupRenderer } from './components/avatar-group-renderer/avatar-group-renderer'
import users from '../../dummy-data/users'

const ALL = 'ALL'

@Component({
  selector: 'app-ag-grid-table-example',
  templateUrl: './ag-grid-table-example.page.html',
  styleUrls: ['./ag-grid-table-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgGridTableExamplePage {
  public genderOptions = [ALL]
  public search: InputChangeEventDetail['value'] = ''
  public displayData = users
  public paginationPageSize = 10
  public currPage = 1
  public selectedRowsNumber = 0
  public selectedGender: SelectChangeEventDetail['value'] = ALL
  public domLayout: 'normal' | 'autoHeight' = 'autoHeight'
  public isAutoHeight = true
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
      rowDrag: true,
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

  public onFirstDataRendered(event: FirstDataRenderedEvent): void {
    const bodyViewport = document.querySelector('.ag-body-viewport')
    const horizontalScroll = document.querySelector('.ag-body-horizontal-scroll-viewport')

    let scrollingTimeout: ReturnType<typeof setTimeout> | null = null

    const handleVerticalScroll = () => {
      bodyViewport?.classList.add('scrolling')

      if (scrollingTimeout) {
        clearTimeout(scrollingTimeout)
      }
      scrollingTimeout = setTimeout(() => {
        bodyViewport?.classList.remove('scrolling')
      }, 500)
    }

    const handleHorizontalScroll = () => {
      horizontalScroll?.classList.add('scrolling')

      if (scrollingTimeout) {
        clearTimeout(scrollingTimeout)
      }
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
  }

  public handlePaginationChange = async (event: Event) => {
    const { itemsPerPage, page } = (event as CustomEvent<PaginationChangeEventDetail>).detail

    this.agGrid.api.showLoadingOverlay()

    await delay(1000)

    if (this.paginationPageSize !== itemsPerPage) {
      this.agGrid.api.paginationSetPageSize(itemsPerPage)
      this.paginationPageSize = itemsPerPage
    }

    if (this.currPage !== page) {
      this.agGrid.api.paginationGoToPage(page - 1)
      this.currPage = page
    }

    this.agGrid.api.hideOverlay()
  }

  public handleAutoHeightToggle = () => {
    this.isAutoHeight = !this.isAutoHeight
    this.domLayout = this.isAutoHeight ? 'autoHeight' : 'normal'
  }

  public getStyles = () => ({
    width: '100%',
    marginBottom: '32px',
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
}
