```html
<wpp-accordion size="l" [withTag]="true">
  <wpp-typography type="l-heading" slot="header">Beauty Science & Technology</wpp-typography>
  <wpp-typography>
    Dive into our constant search for cutting edge scientific discoveries and game-changing technologies, for more and
    more transparency and trust in our products, with no compromise on quality, efficacy and safety.
  </wpp-typography>
  <wpp-tag slot="tags" label="Neutral" variant="neutral"></wpp-tag>
</wpp-accordion>

<wpp-accordion expanded disabled [withDivider]="false">
  <wpp-typography type="m-strong" slot="header">Governance & Ethics</wpp-typography>
  <wpp-typography>
    Having a proactive Board and strong leadership that is deeply committed to high ethical standards is a business
    imperative for ensuring sustainable success
  </wpp-typography>
  <wpp-action-button disabled variant="secondary" slot="actions">
    Action
    <wpp-icon-edit slot="icon-start"></wpp-icon-edit>
  </wpp-action-button>
</wpp-accordion>
```
