```tsx
export const AccordionExample = () => (
  <>
    <WppAccordion size="m" withTag>
      <WppTypography type="m-strong" slot="header">Beauty Science & Technology</WppTypography>
      <WppTypography>
        Dive into our constant search for cutting edge scientific discoveries and game-changing technologies, for more and
        more transparency and trust in our products, with no compromise on quality, efficacy and safety.
      </WppTypography>
      <WppTag slot="tags" label="Neutral" variant="neutral" />
    </WppAccordion>

    <WppAccordion expanded disabled withDivider={false}>
      <WppTypography type="m-strong" slot="header">Governance & Ethics</WppTypography>
      <WppActionButton disabled variant="secondary" slot="actions">
        Action
        <WppIconEdit slot="icon-start" />
      </WppActionButton>
      <WppTypography>
        Having a proactive Board and strong leadership that is deeply committed to high ethical standards is a business
        imperative for ensuring sustainable success
      </WppTypography>
    </WppAccordion>
  </>
)
```
