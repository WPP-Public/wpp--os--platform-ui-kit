### Example with WppTooltip for a truncated table cell

Need to define `cellRenderer` with a custom method that will check if the text is truncated and render a `WppTooltip` component with the full text if it is.

```typescript
cellRenderer: (props: ColDef['cellRenderer']) => {
  const { value, eGridCell } = props
  const [isTextTruncated, setIsTextTruncated] = useState(false)

  const checkTruncation = () => {
    requestAnimationFrame(() => {
      const textElement = eGridCell.querySelector('.cell-text')
      const typographyElement = textElement.shadowRoot.querySelector('.typography')

      setIsTextTruncated(typographyElement.clientWidth < typographyElement.scrollWidth)
    })
  }

  useEffect(() => {
    if (!eGridCell) return

    checkTruncation()

    const resizeObserver = new ResizeObserver(checkTruncation)

    resizeObserver.observe(eGridCell)

    return () => resizeObserver.disconnect()
  }, [eGridCell])

  if (isTextTruncated) {
    return (
      <WppTooltip className="truncation-tooltip" text={value}>
        <WppTypography type="s-body" className="cell-text">
          {value}
        </WppTypography>
      </WppTooltip>
    )
  } else {
    return (
      <WppTypography type="s-body" className="cell-text">
        {value}
      </WppTypography>
    )
  }
}
```
