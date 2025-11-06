import { Components } from '../../../../components';
declare const _default: {
  title: string;
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: boolean;
      };
    };
    notes: {
      Container: any;
      Items: any;
    };
  };
  argTypes: {
    count: {
      type: string;
    };
    activePageNumber: {
      type: string;
    };
  };
};
export default _default;
export declare const PageNumberSelect: {
  (args: Components.WppPaginationSelect): import("lit-html").TemplateResult<1>;
  args: {
    count: number;
    activePageNumber: number;
  };
};
export declare const PageNumberInput: {
  (args: Components.WppPaginationSelect): import("lit-html").TemplateResult<1>;
  args: {
    count: number;
    activePageNumber: number;
  };
};
