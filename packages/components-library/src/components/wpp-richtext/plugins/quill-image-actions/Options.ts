import BlotSpec from './specs/BlotSpec'
import ImageSpec from './specs/ImageSpec'
import VideoSpec from './specs/VideoSpec'

//@ts-ignore No module declaration
import { icons } from '../../themes/icons.mjs'

interface ExtendsBlotSpec {
  new (): BlotSpec
}

type Styles = Record<string, string>

export type OverlayOptions = {
  // classname applied to the overlay element
  className?: string
  // style applied to overlay element, or null to prevent styles
  style?: Styles | null
}

export type ResizeOptions = {
  // class name applied to the resize handles
  handleClassName?: string
  // style applied to resize handles, or null to prevent styles
  handleStyle?: Styles | null
}

export type AlignOptions = {
  // the name of the attribute for an element that has its alignment changed
  attribute?: string
  // the aligner does the actual alignment switch
  aligner?: {
    // whether or not the aligner should handle the actual alignment properties
    applyStyle?: boolean
  }
  // icons used for alignment
  icons?: {
    left?: string
    center?: string
    right?: string
  }
  // the toolbar so users can change alignments
  toolbar?: {
    // whether or not users can deselect an alignment. it's up to you to set the initial alignment
    allowDeselect?: boolean
    // class name applied to the root toolbar element
    mainClassName?: string
    // style applied to root toolbar element, or null to prevent styles
    mainStyle?: Styles | null
    // class name applied to each button in the toolbar
    buttonClassName?: string

    /* whether or not to add the selected style to the buttons.
    they'll always get the is-selected class */
    addButtonSelectStyle?: boolean
    // style applied to buttons, or null to prevent styles
    buttonStyle?: Styles | null
    // style applied to the svgs in the buttons
    svgStyle?: Styles | null
  }
}

export type Options = {
  specs?: ExtendsBlotSpec[]
  overlay?: OverlayOptions
  align?: AlignOptions
  resize?: ResizeOptions
}

const DefaultOptions = {
  specs: [ImageSpec, VideoSpec],
  overlay: {
    className: 'ql-image-actions__overlay',
    style: {},
  },
  align: {
    attribute: 'data-align',
    aligner: {
      applyStyle: true,
    },
    icons: {
      left: icons.float.left,
      center: icons.float.center,
      right: icons.float.right,
    },
    toolbar: {
      allowDeselect: true,
      mainClassName: 'ql-image-actions__toolbar',
      mainStyle: {},
      buttonClassName: 'ql-image-actions__toolbar-button',
      addButtonSelectStyle: false,
      buttonStyle: {},
      svgStyle: {},
    },
  },
  resize: {
    handleClassName: 'ql-image-actions__resize-handle',
    handleStyle: {
      height: '10px',
      width: '10px',
    },
  },
}

export default DefaultOptions
