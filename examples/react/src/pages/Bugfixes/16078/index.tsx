import React, { FC, Fragment } from 'react'
import {
  WppPopover,
  WppButton,
  WppTypography,
  WppTooltip,
  WppIconPremium,
  WppMenuContext,
  WppListItem,
  WppAvatar,
  WppSelect,
  WppInlineEdit,
  WppTextareaInput,
  WppDatepicker,
  WppAutocomplete,
  WppSearch,
} from '@platform-ui-kit/components-library-react'

import './index.scss'
import { SelectTypes } from '@platform-ui-kit/components-library'

const LIST = [
  {
    value: 'thor',
    label: 'Thor',
  },
  {
    value: 'loki',
    label: 'Loki',
  },
]

const renderContent = () => (
  <Fragment>
    <WppListItem value="thor">
      <span slot="label">Thor</span>
    </WppListItem>
    <WppListItem value="loki">
      <span slot="label">Loki</span>
    </WppListItem>
  </Fragment>
)

const TooltipAndMenu = () => (
  <Fragment>
    <WppTooltip header="Title" text="Lorem Ipsum is simply dummy text">
      <WppButton>
        Tooltip
        <WppIconPremium slot="icon-start" />
      </WppButton>
    </WppTooltip>
    <WppMenuContext className="menu-16078" dropdownConfig={{ zIndex: 1500 }}>
      <WppButton slot="trigger-element">Menu</WppButton>
      <WppListItem>
        <p slot="label">Item</p>
        <WppAvatar name="List Avatar" slot="left" />
      </WppListItem>
    </WppMenuContext>
  </Fragment>
)

const Select: FC<{ type: SelectTypes }> = ({ type }) => (
  <WppSelect
    value={type === 'multiple' ? ['thor'] : 'thor'}
    type={type}
    inputValue="Favourite hero"
    placeholder={type}
    labelConfig={{ text: `${type.charAt(0).toUpperCase() + type.slice(1)} select` }}
    list={LIST}
  ></WppSelect>
)

const Autocomplete = () => <WppAutocomplete placeholder="autocomplete">{renderContent()}</WppAutocomplete>

const Search = () => <WppSearch placeholder="search">{renderContent()}</WppSearch>

const InlineEdit = () => (
  <WppInlineEdit mode="read" value="lorem Ipsum is simply dummy text" dropdownConfig={{ appendTo: 'parent' }}>
    <WppTextareaInput slot="form-element" size="s" rows={3} value="lorem Ipsum is simply dummy text" />
  </WppInlineEdit>
)

const Datepicker = () => (
  <WppDatepicker
    className="datepicker-16078"
    placeholder="dd/MM/yyyy"
    value="20/08/2021"
    locale={{
      dateFormat: 'dd/MM/yyyy',
    }}
  />
)

const PopoverNotWorkingWithOtherTippyJSComponents = () => (
  <div>
    <div>
      <h1 style={{ textDecoration: 'underline' }}>
        <a href="https://jira.uhub.biz/browse/WPPLONOP-16078">
          Bugfix #16078 - Architect feedback: Popover - Popover not working with all other instances of
          tooltip/dropdowns
        </a>
      </h1>
    </div>
    <WppPopover>
      <WppButton slot="trigger-element">Click to open menu</WppButton>
      <div className="popover-body-16078">
        <WppTypography type="l-strong">Components where tippy is used</WppTypography>
        <div className="body-components-16078">
          <div className="tooltip-and-menu-wrapper-16078">
            <TooltipAndMenu />
          </div>
          <div className="selects-wrapper-16078">
            <Select type="combined" />
            <Select type="single" />
            <Select type="multiple" />
          </div>
          <div className="autocomplete-wrapper-16078">
            <Autocomplete />
          </div>
          <div className="search-wrapper-16078">
            <Search />
          </div>
          <div className="datepicker-wrapper-16078">
            <Datepicker />
          </div>
          <div className="inline-edit-wrapper-16078">
            <InlineEdit />
          </div>
        </div>
      </div>
    </WppPopover>
  </div>
)

export default PopoverNotWorkingWithOtherTippyJSComponents
