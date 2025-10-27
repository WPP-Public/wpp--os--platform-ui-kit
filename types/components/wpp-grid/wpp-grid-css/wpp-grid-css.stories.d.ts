declare const _default: {
  title: string;
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: boolean;
      };
    };
    options: {
      showPanel: boolean;
    };
    viewport: {
      viewports: {
        xxLarge: {
          name: string;
          styles: {
            width: string;
            height: string;
          };
        };
        xLarge: {
          name: string;
          styles: {
            width: string;
            height: string;
          };
        };
        large: {
          name: string;
          styles: {
            width: string;
            height: string;
          };
        };
        medium: {
          name: string;
          styles: {
            width: string;
            height: string;
          };
        };
        small: {
          name: string;
          styles: {
            width: string;
            height: string;
          };
        };
      };
    };
  };
  argTypes: {
    size: {
      options: (string | number | null)[];
      control: {
        type: string;
      };
    };
    spacing: {
      type: string;
    };
    breakpoint: {
      options: string[];
      control: {
        type: string;
      };
    };
    fullWidth: {
      control: {
        type: string;
      };
    };
    fullHeight: {
      control: {
        type: string;
      };
    };
    fluid: {
      control: {
        type: string;
      };
    };
  };
};
export default _default;
export declare const CSSGrid: {
  (args: any): import("lit-html").TemplateResult<1>;
  args: {
    size: string;
    spacing: string;
    breakpoint: string;
  };
};
