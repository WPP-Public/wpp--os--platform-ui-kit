import { Component } from '@stencil/core'

/**
 * Adds Quill styles.
 * Implemented as a separate component to avoid styles duplication
 */
@Component({
  tag: 'wpp-quill-styles',
  styleUrl: '../../themes/styles/wpp.styl',
})
export class WppQuillStyles {}
