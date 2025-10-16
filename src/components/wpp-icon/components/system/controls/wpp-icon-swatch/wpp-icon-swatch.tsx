import { Component, Fragment, h, Prop } from '@stencil/core'

/**
 * @internal
 */
@Component({
  tag: 'wpp-icon-swatch',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconSwatch {
  /**
   Defines the icon size.
   */
  @Prop() readonly size: 's' | 'm' = 'm'

  render() {
    return (
      <Fragment>
        {this.size === 's' ? (
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="3.71429" height="3.71429" fill="#E7EAEE" />
            <rect x="3.71484" width="3.71429" height="3.71429" fill="white" />
            <rect x="7.42969" width="3.71429" height="3.71429" fill="#E7EAEE" />
            <rect x="11.1445" width="3.71429" height="3.71429" fill="white" />
            <rect x="14.8555" width="3.71429" height="3.71429" fill="#E7EAEE" />
            <rect x="18.5703" width="3.71429" height="3.71429" fill="white" />
            <rect x="22.2852" width="3.71429" height="3.71429" fill="#E7EAEE" />
            <rect y="3.71436" width="3.71429" height="3.71429" fill="white" />
            <rect x="3.71484" y="3.71436" width="3.71429" height="3.71429" fill="#E7EAEE" />
            <rect x="7.42969" y="3.71436" width="3.71429" height="3.71429" fill="white" />
            <rect x="11.1445" y="3.71436" width="3.71429" height="3.71429" fill="#E7EAEE" />
            <rect x="14.8555" y="3.71436" width="3.71429" height="3.71429" fill="white" />
            <rect x="18.5703" y="3.71436" width="3.71429" height="3.71429" fill="#E7EAEE" />
            <rect x="22.2852" y="3.71436" width="3.71429" height="3.71429" fill="white" />
            <rect y="7.42847" width="3.71429" height="3.71429" fill="#E7EAEE" />
            <rect x="3.71484" y="7.42847" width="3.71429" height="3.71429" fill="white" />
            <rect x="7.42969" y="7.42847" width="3.71429" height="3.71429" fill="#E7EAEE" />
            <rect x="11.1445" y="7.42847" width="3.71429" height="3.71429" fill="white" />
            <rect x="14.8555" y="7.42847" width="3.71429" height="3.71429" fill="#E7EAEE" />
            <rect x="18.5703" y="7.42847" width="3.71429" height="3.71429" fill="white" />
            <rect x="22.2852" y="7.42847" width="3.71429" height="3.71429" fill="#E7EAEE" />
            <rect y="11.1428" width="3.71429" height="3.71429" fill="white" />
            <rect x="3.71484" y="11.1428" width="3.71429" height="3.71429" fill="#E7EAEE" />
            <rect x="7.42969" y="11.1428" width="3.71429" height="3.71429" fill="white" />
            <rect x="11.1445" y="11.1428" width="3.71429" height="3.71429" fill="#E7EAEE" />
            <rect x="14.8555" y="11.1428" width="3.71429" height="3.71429" fill="white" />
            <rect x="18.5703" y="11.1428" width="3.71429" height="3.71429" fill="#E7EAEE" />
            <rect x="22.2852" y="11.1428" width="3.71429" height="3.71429" fill="white" />
            <rect y="14.8572" width="3.71429" height="3.71429" fill="#E7EAEE" />
            <rect x="3.71484" y="14.8572" width="3.71429" height="3.71429" fill="white" />
            <rect x="7.42969" y="14.8572" width="3.71429" height="3.71429" fill="#E7EAEE" />
            <rect x="11.1445" y="14.8572" width="3.71429" height="3.71429" fill="white" />
            <rect x="14.8555" y="14.8572" width="3.71429" height="3.71429" fill="#E7EAEE" />
            <rect x="18.5703" y="14.8572" width="3.71429" height="3.71429" fill="white" />
            <rect x="22.2852" y="14.8572" width="3.71429" height="3.71429" fill="#E7EAEE" />
            <rect y="18.5715" width="3.71429" height="3.71429" fill="white" />
            <rect x="3.71484" y="18.5715" width="3.71429" height="3.71429" fill="#E7EAEE" />
            <rect x="7.42969" y="18.5715" width="3.71429" height="3.71429" fill="white" />
            <rect x="11.1445" y="18.5715" width="3.71429" height="3.71429" fill="#E7EAEE" />
            <rect x="14.8555" y="18.5715" width="3.71429" height="3.71429" fill="white" />
            <rect x="18.5703" y="18.5715" width="3.71429" height="3.71429" fill="#E7EAEE" />
            <rect x="22.2852" y="18.5715" width="3.71429" height="3.71429" fill="white" />
            <rect y="22.2856" width="3.71429" height="3.71429" fill="#E7EAEE" />
            <rect x="3.71484" y="22.2856" width="3.71429" height="3.71429" fill="white" />
            <rect x="7.42969" y="22.2856" width="3.71429" height="3.71429" fill="#E7EAEE" />
            <rect x="11.1445" y="22.2856" width="3.71429" height="3.71429" fill="white" />
            <rect x="14.8555" y="22.2856" width="3.71429" height="3.71429" fill="#E7EAEE" />
            <rect x="18.5703" y="22.2856" width="3.71429" height="3.71429" fill="white" />
            <rect x="22.2852" y="22.2856" width="3.71429" height="3.71429" fill="#E7EAEE" />
          </svg>
        ) : (
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="5.71429" height="5.71429" fill="#E7EAEE" />
            <rect x="5.71429" width="5.71429" height="5.71429" fill="white" />
            <rect x="11.4286" width="5.71429" height="5.71429" fill="#E7EAEE" />
            <rect x="17.1429" width="5.71429" height="5.71429" fill="white" />
            <rect x="22.8571" width="5.71429" height="5.71429" fill="#E7EAEE" />
            <rect x="28.5714" width="5.71429" height="5.71429" fill="white" />
            <rect x="34.2857" width="5.71429" height="5.71429" fill="#E7EAEE" />

            <rect y="5.71429" width="5.71429" height="5.71429" fill="white" />
            <rect x="5.71429" y="5.71429" width="5.71429" height="5.71429" fill="#E7EAEE" />
            <rect x="11.4286" y="5.71429" width="5.71429" height="5.71429" fill="white" />
            <rect x="17.1429" y="5.71429" width="5.71429" height="5.71429" fill="#E7EAEE" />
            <rect x="22.8571" y="5.71429" width="5.71429" height="5.71429" fill="white" />
            <rect x="28.5714" y="5.71429" width="5.71429" height="5.71429" fill="#E7EAEE" />
            <rect x="34.2857" y="5.71429" width="5.71429" height="5.71429" fill="white" />

            <rect y="11.4286" width="5.71429" height="5.71429" fill="#E7EAEE" />
            <rect x="5.71429" y="11.4286" width="5.71429" height="5.71429" fill="white" />
            <rect x="11.4286" y="11.4286" width="5.71429" height="5.71429" fill="#E7EAEE" />
            <rect x="17.1429" y="11.4286" width="5.71429" height="5.71429" fill="white" />
            <rect x="22.8571" y="11.4286" width="5.71429" height="5.71429" fill="#E7EAEE" />
            <rect x="28.5714" y="11.4286" width="5.71429" height="5.71429" fill="white" />
            <rect x="34.2857" y="11.4286" width="5.71429" height="5.71429" fill="#E7EAEE" />

            <rect y="17.1429" width="5.71429" height="5.71429" fill="white" />
            <rect x="5.71429" y="17.1429" width="5.71429" height="5.71429" fill="#E7EAEE" />
            <rect x="11.4286" y="17.1429" width="5.71429" height="5.71429" fill="white" />
            <rect x="17.1429" y="17.1429" width="5.71429" height="5.71429" fill="#E7EAEE" />
            <rect x="22.8571" y="17.1429" width="5.71429" height="5.71429" fill="white" />
            <rect x="28.5714" y="17.1429" width="5.71429" height="5.71429" fill="#E7EAEE" />
            <rect x="34.2857" y="17.1429" width="5.71429" height="5.71429" fill="white" />

            <rect y="22.8571" width="5.71429" height="5.71429" fill="#E7EAEE" />
            <rect x="5.71429" y="22.8571" width="5.71429" height="5.71429" fill="white" />
            <rect x="11.4286" y="22.8571" width="5.71429" height="5.71429" fill="#E7EAEE" />
            <rect x="17.1429" y="22.8571" width="5.71429" height="5.71429" fill="white" />
            <rect x="22.8571" y="22.8571" width="5.71429" height="5.71429" fill="#E7EAEE" />
            <rect x="28.5714" y="22.8571" width="5.71429" height="5.71429" fill="white" />
            <rect x="34.2857" y="22.8571" width="5.71429" height="5.71429" fill="#E7EAEE" />

            <rect y="28.5714" width="5.71429" height="5.71429" fill="white" />
            <rect x="5.71429" y="28.5714" width="5.71429" height="5.71429" fill="#E7EAEE" />
            <rect x="11.4286" y="28.5714" width="5.71429" height="5.71429" fill="white" />
            <rect x="17.1429" y="28.5714" width="5.71429" height="5.71429" fill="#E7EAEE" />
            <rect x="22.8571" y="28.5714" width="5.71429" height="5.71429" fill="white" />
            <rect x="28.5714" y="28.5714" width="5.71429" height="5.71429" fill="#E7EAEE" />
            <rect x="34.2857" y="28.5714" width="5.71429" height="5.71429" fill="white" />

            <rect y="34.2857" width="5.71429" height="5.71429" fill="#E7EAEE" />
            <rect x="5.71429" y="34.2857" width="5.71429" height="5.71429" fill="white" />
            <rect x="11.4286" y="34.2857" width="5.71429" height="5.71429" fill="#E7EAEE" />
            <rect x="17.1429" y="34.2857" width="5.71429" height="5.71429" fill="white" />
            <rect x="22.8571" y="34.2857" width="5.71429" height="5.71429" fill="#E7EAEE" />
            <rect x="28.5714" y="34.2857" width="5.71429" height="5.71429" fill="white" />
            <rect x="34.2857" y="34.2857" width="5.71429" height="5.71429" fill="#E7EAEE" />
          </svg>
        )}
      </Fragment>
    )
  }
}
