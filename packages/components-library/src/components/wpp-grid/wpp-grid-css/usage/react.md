```tsx
import "@platform-ui-kit/components-library/dist/collection/grid.css";

const list = [...new Array(24)]

export const GridCssExample = () => {
  const gridStyle = {
    '--wpp-grid-row-spacing': 2,
    '--wpp-grid-column-spacing': 2
  }

  return (
    <div className="wpp-grid-container-root" style={gridStyle}>
      {list.map((el, i) => (
        <div className="wpp-grid-item-xs-1">
          <p>Col {i + 1}</p>
        </div>
      ))}
    </div>
  )
}

```
