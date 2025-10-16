import { Component, Element, h, Host } from '@stencil/core'

import { BaseComponent } from '../../interfaces/base-component'

@Component({
  tag: 'wpp-richtext-icon-loader',
  shadow: true,
  styleUrl: 'richtext-icon-loader.scss',
})
export class WppRichtextIconLoader implements BaseComponent {
  @Element() host: HTMLWppRichtextElement

  render() {
    return (
      <Host>
        <div class="icon-loader-container" aria-hidden="true" role="presentation">
          {/* Text formatting icons */}
          <wpp-icon-bold />
          <wpp-icon-italic />
          <wpp-icon-underline />
          <wpp-icon-strike-through />
          <wpp-icon-blockquote />
          <wpp-icon-code-view />

          {/* Heading icons */}
          <wpp-icon-h1 />
          <wpp-icon-h2 />

          {/* List icons */}
          <wpp-icon-ordered-list />
          <wpp-icon-unordered-list />

          {/* Alignment icons */}
          <wpp-icon-text-alignment-left />
          <wpp-icon-text-alignment-center />
          <wpp-icon-text-alignment-right />
          <wpp-icon-text-alignment-justify />

          {/* Float/positioning icons */}
          <wpp-icon-float-left />
          <wpp-icon-float-center />
          <wpp-icon-float-right />

          {/* Indent icons */}
          <wpp-icon-indent-increase />
          <wpp-icon-indent-decrease />

          {/* Action icons */}
          <wpp-icon-link />
          <wpp-icon-undo />
          <wpp-icon-redo />
          <wpp-icon-attach />

          {/* Media icons */}
          <wpp-icon-image />
          <wpp-icon-video-clip />

          <wpp-icon-info />
        </div>
      </Host>
    )
  }
}
