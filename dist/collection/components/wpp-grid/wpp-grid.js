import { h, Host } from '@stencil/core';
/**
 * @part inner - Content slot element
 */
export class WppGrid {
  constructor() {
    this.hostCssClasses = () => {
      const isContainerHaveSpacing = !!this.rowSpacing && this.container;
      const isContainerHaveAlignItems = !!this.alignItems && this.container;
      const isContainerHaveJustifyContent = !!this.justifyContent && this.container;
      const getItemClassName = () => {
        const { sm, md, lg, xl, xxl, all } = this;
        const sizeArr = [
          ['sm', sm],
          ['md', md],
          ['lg', lg],
          ['xl', xl],
          ['xxl', xxl],
          ['all', all],
        ].reduce((itemClassStr, [breakpoint, size]) => {
          if (!size) {
            return itemClassStr;
          }
          if (typeof size === 'boolean') {
            return `item-${breakpoint} ${itemClassStr}`;
          }
          if (size === 'auto') {
            return `item-${breakpoint}-auto ${itemClassStr}`;
          }
          return `item-${breakpoint}-${size} ${itemClassStr}`;
        }, '');
        return sizeArr || 'item-all';
      };
      return {
        // container styles
        container: this.container,
        [`${this.direction}`]: this.container,
        [`row-spacing-${this.rowSpacing}`]: isContainerHaveSpacing,
        [`column-spacing-${this.columnSpacing || this.rowSpacing}`]: isContainerHaveSpacing,
        [`justify-${this.justifyContent}`]: isContainerHaveJustifyContent,
        [`align-${this.alignItems}`]: isContainerHaveAlignItems,
        'full-width': this.container && this.fullWidth,
        'full-height': this.container && this.fullHeight,
        fluid: this.container && this.fluid,
        // item styles
        [`${getItemClassName()}`]: this.item,
      };
    };
    this.container = false;
    this.item = false;
    this.direction = 'row';
    this.justifyContent = 'flex-start';
    this.alignItems = 'normal';
    this.columnSpacing = undefined;
    this.rowSpacing = undefined;
    this.all = undefined;
    this.sm = undefined;
    this.md = undefined;
    this.lg = undefined;
    this.xl = undefined;
    this.xxl = undefined;
    this.fullWidth = false;
    this.fullHeight = false;
    this.fluid = false;
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "inner" }, h("slot", { part: "inner" })));
  }
  static get is() { return "wpp-grid"; }
  static get registryIs() { return "wpp-grid-v3-3-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-grid.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-grid.css"]
    };
  }
  static get properties() {
    return {
      "container": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the component is a grid container."
        },
        "attribute": "container",
        "reflect": false,
        "defaultValue": "false"
      },
      "item": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the component is a grid item. Must be used inside a grid container."
        },
        "attribute": "item",
        "reflect": false,
        "defaultValue": "false"
      },
      "direction": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "DirectionType",
          "resolved": "\"column\" | \"column-reverse\" | \"row\" | \"row-reverse\"",
          "references": {
            "DirectionType": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-grid/types.ts::DirectionType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the grid direction, works the same as flexbox direction."
        },
        "attribute": "direction",
        "reflect": false,
        "defaultValue": "'row'"
      },
      "justifyContent": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "JustifyContentType",
          "resolved": "\"center\" | \"flex-end\" | \"flex-start\" | \"space-around\" | \"space-between\"",
          "references": {
            "JustifyContentType": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-grid/types.ts::JustifyContentType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the grid `justifyContent` value, works the same as `justifyContent` in flexbox."
        },
        "attribute": "justify-content",
        "reflect": false,
        "defaultValue": "'flex-start'"
      },
      "alignItems": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "AlignItemsType",
          "resolved": "\"baseline\" | \"center\" | \"flex-end\" | \"flex-start\" | \"normal\"",
          "references": {
            "AlignItemsType": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-grid/types.ts::AlignItemsType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the grid `alignItems`, works the same as `alignItems` in flexbox."
        },
        "attribute": "align-items",
        "reflect": false,
        "defaultValue": "'normal'"
      },
      "columnSpacing": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "RangeOf<24>",
          "resolved": "0 | 2 | 1 | 3 | 4 | 5 | 6 | 8 | 7 | 9 | 10 | 11 | 12 | 16 | 15 | 13 | 14 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | undefined",
          "references": {
            "RangeOf": {
              "location": "import",
              "path": "../../types/numberRange",
              "id": "src/types/numberRange.ts::RangeOf"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the vertical gap between grid columns. Use only if you have more than one column."
        },
        "attribute": "column-spacing",
        "reflect": false
      },
      "rowSpacing": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "RangeOf<24>",
          "resolved": "0 | 2 | 1 | 3 | 4 | 5 | 6 | 8 | 7 | 9 | 10 | 11 | 12 | 16 | 15 | 13 | 14 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | undefined",
          "references": {
            "RangeOf": {
              "location": "import",
              "path": "../../types/numberRange",
              "id": "src/types/numberRange.ts::RangeOf"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the horizontal gap between grid rows. Use only if you have more than one row."
        },
        "attribute": "row-spacing",
        "reflect": false
      },
      "all": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "RangeOf<24> | 'auto' | true",
          "resolved": "true | 0 | 2 | 1 | 3 | 4 | 5 | 6 | 8 | 7 | 9 | 10 | 11 | 12 | 16 | \"auto\" | 15 | 13 | 14 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | undefined",
          "references": {
            "RangeOf": {
              "location": "import",
              "path": "../../types/numberRange",
              "id": "src/types/numberRange.ts::RangeOf"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the grid item width for all screen sizes.\nTakes in a number between **1** and **24**, where **24** is **100%** of the item width. If no value is specified, the grid items take all the available screen width."
        },
        "attribute": "all",
        "reflect": false
      },
      "sm": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "RangeOf<24> | 'auto' | true",
          "resolved": "true | 0 | 2 | 1 | 3 | 4 | 5 | 6 | 8 | 7 | 9 | 10 | 11 | 12 | 16 | \"auto\" | 15 | 13 | 14 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | undefined",
          "references": {
            "RangeOf": {
              "location": "import",
              "path": "../../types/numberRange",
              "id": "src/types/numberRange.ts::RangeOf"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the grid item width for screen size - 1280px.\nTakes in a number between **1** and **24**, where **24** is **100%** of the item width. If no value is specified, the grid items take all the available screen width."
        },
        "attribute": "sm",
        "reflect": false
      },
      "md": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "RangeOf<24> | 'auto' | true",
          "resolved": "true | 0 | 2 | 1 | 3 | 4 | 5 | 6 | 8 | 7 | 9 | 10 | 11 | 12 | 16 | \"auto\" | 15 | 13 | 14 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | undefined",
          "references": {
            "RangeOf": {
              "location": "import",
              "path": "../../types/numberRange",
              "id": "src/types/numberRange.ts::RangeOf"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the grid item width for screen size - 1366px.\nTakes in a number between **1** and **24**, where **24** is **100%** of the item width. If no value is specified, the grid items take all the available screen width."
        },
        "attribute": "md",
        "reflect": false
      },
      "lg": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "RangeOf<24> | 'auto' | true",
          "resolved": "true | 0 | 2 | 1 | 3 | 4 | 5 | 6 | 8 | 7 | 9 | 10 | 11 | 12 | 16 | \"auto\" | 15 | 13 | 14 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | undefined",
          "references": {
            "RangeOf": {
              "location": "import",
              "path": "../../types/numberRange",
              "id": "src/types/numberRange.ts::RangeOf"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the grid item width for screen size - 1440px.\nTakes in a number between **1** and **24**, where **24** is **100%** of the item width. If no value is specified, the grid items take all the available screen width."
        },
        "attribute": "lg",
        "reflect": false
      },
      "xl": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "RangeOf<24> | 'auto' | true",
          "resolved": "true | 0 | 2 | 1 | 3 | 4 | 5 | 6 | 8 | 7 | 9 | 10 | 11 | 12 | 16 | \"auto\" | 15 | 13 | 14 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | undefined",
          "references": {
            "RangeOf": {
              "location": "import",
              "path": "../../types/numberRange",
              "id": "src/types/numberRange.ts::RangeOf"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the grid item width for screen size - 1920px.\nTakes in a number between **1** and **24**, where **24** is **100%** of the item width. If no value is specified, the grid items take all the available screen width."
        },
        "attribute": "xl",
        "reflect": false
      },
      "xxl": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "RangeOf<24> | 'auto' | true",
          "resolved": "true | 0 | 2 | 1 | 3 | 4 | 5 | 6 | 8 | 7 | 9 | 10 | 11 | 12 | 16 | \"auto\" | 15 | 13 | 14 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | undefined",
          "references": {
            "RangeOf": {
              "location": "import",
              "path": "../../types/numberRange",
              "id": "src/types/numberRange.ts::RangeOf"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the grid item width for screen size - 2220px.\nTakes in a number between **1** and **24**, where **24** is **100%** of the item width. If no value is specified, the grid items take all the available screen width."
        },
        "attribute": "xxl",
        "reflect": false
      },
      "fullWidth": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the container has full width and no margins."
        },
        "attribute": "full-width",
        "reflect": false,
        "defaultValue": "false"
      },
      "fullHeight": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the container's height is at **100%** and the grid content grows to fill the parent block height."
        },
        "attribute": "full-height",
        "reflect": false,
        "defaultValue": "false"
      },
      "fluid": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the container's fluid makes it fill all parent width and height"
        },
        "attribute": "fluid",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get elementRef() { return "host"; }
}
