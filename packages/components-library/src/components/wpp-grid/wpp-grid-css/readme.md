# wpp-grid-css

## Usage

### Angular

```html

<div class="wpp-grid-container-root" style="--wpp-grid-row-spacing: 2; --wpp-grid-column-spacing: 2;">
  <div class="wpp-grid-item-xs-1">
    <p>Col 1</p>
  </div>
  <div class="wpp-grid-item-xs-1">
    <p>Col 2</p>
  </div>
  <div class="wpp-grid-item-xs-1">
    <p>Col 3</p>
  </div>
  <div class="wpp-grid-item-xs-1">
    <p>Col 4</p>
  </div>
  <div class="wpp-grid-item-xs-1">
    <p>Col 5</p>
  </div>
  <div class="wpp-grid-item-xs-1">
    <p>Col 6</p>
  </div>
  <div class="wpp-grid-item-xs-1">
    <p>Col 7</p>
  </div>
  <div class="wpp-grid-item-xs-1">
    <p>Col 8</p>
  </div>
  <div class="wpp-grid-item-xs-1">
    <p>Col 9</p>
  </div>
  <div class="wpp-grid-item-xs-1">
    <p>Col 10</p>
  </div>
  <div class="wpp-grid-item-xs-1">
    <p>Col 11</p>
  </div>
  <div class="wpp-grid-item-xs-1">
    <p>Col 12</p>
  </div>
  <div class="wpp-grid-item-xs-1">
    <p>Col 13</p>
  </div>
  <div class="wpp-grid-item-xs-1">
    <p>Col 14</p>
  </div>
  <div class="wpp-grid-item-xs-1">
    <p>Col 15</p>
  </div>
  <div class="wpp-grid-item-xs-1">
    <p>Col 16</p>
  </div>
  <div class="wpp-grid-item-xs-1">
    <p>Col 17</p>
  </div>
  <div class="wpp-grid-item-xs-1">
    <p>Col 18</p>
  </div>
  <div class="wpp-grid-item-xs-1">
    <p>Col 19</p>
  </div>
  <div class="wpp-grid-item-xs-1">
    <p>Col 20</p>
  </div>
  <div class="wpp-grid-item-xs-1">
    <p>Col 21</p>
  </div>
  <div class="wpp-grid-item-xs-1">
    <p>Col 22</p>
  </div>
  <div class="wpp-grid-item-xs-1">
    <p>Col 23</p>
  </div>
  <div class="wpp-grid-item-xs-1">
    <p>Col 24</p>
  </div>
</div>

```


### React

```tsx

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


## CSS Custom Properties

| Name                         | Description |
|------------------------------| ----------- |
| `--wpp-grid-total-columns:`  |             |
| `--wpp-grid-width:`          |             |
| `--wpp-grid-max-width:`      |             |
| `--wpp-grid-row-spacing:`    |             |
| `--wpp-grid-column-spacing:` |             |
| `--wpp-grid-min-spacing:`    |             |
| `--wpp-grid-max-spacing:`    |             |
| `--wpp-grid-column:`         |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
