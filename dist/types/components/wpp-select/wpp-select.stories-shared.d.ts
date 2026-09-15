export declare const getSelectStoryList: (type: 'single' | 'multiple') => ({
  value: number;
  label: string;
  disabled?: undefined;
  slots?: undefined;
} | {
  value: number;
  disabled: boolean;
  label: string;
  slots?: undefined;
} | {
  value: number;
  label: string;
  slots: {
    type: string;
    props: {
      slot: string;
    };
  }[];
  disabled?: undefined;
} | {
  value: number;
  label: string;
  slots: {
    type: string;
    props: {
      slot: string;
      name: string;
    };
  }[];
  disabled?: undefined;
} | {
  value: number;
  label: string;
  slots: ({
    type: string;
    props: {
      size: string;
      name: string;
      slot: string;
      children?: undefined;
      label?: undefined;
      variant?: undefined;
      disabled?: undefined;
    };
  } | {
    type: string;
    props: {
      slot: string;
      children: string;
      size?: undefined;
      name?: undefined;
      label?: undefined;
      variant?: undefined;
      disabled?: undefined;
    };
  } | {
    type: string;
    props: {
      label: string;
      variant: string;
      slot: string;
      disabled: boolean;
      size?: undefined;
      name?: undefined;
      children?: undefined;
    };
  })[];
  disabled?: undefined;
})[];
export declare const selectStoryArgTypes: {
  readonly placeholder: {
    readonly type: "string";
  };
  readonly message: {
    readonly control: {
      readonly type: "text";
    };
  };
  readonly messageType: {
    readonly options: readonly ["null", "warning", "error"];
    readonly control: {
      readonly type: "select";
    };
  };
  readonly messageInTooltip: {
    readonly control: {
      readonly type: "boolean";
    };
  };
  readonly size: {
    readonly options: readonly ["s", "m"];
    readonly control: {
      readonly type: "select";
    };
  };
  readonly maximumSelectedItems: {
    readonly options: readonly ["none", "3", "5"];
    readonly control: {
      readonly type: "select";
    };
  };
  readonly disabled: {
    readonly control: {
      readonly type: "boolean";
    };
  };
  readonly required: {
    readonly control: {
      readonly type: "boolean";
    };
  };
  readonly withSearch: {
    readonly control: {
      readonly type: "boolean";
    };
  };
  readonly showSelectAllText: {
    readonly control: {
      readonly type: "boolean";
    };
  };
  readonly showSelectAllOption: {
    readonly control: {
      readonly type: "boolean";
    };
  };
  readonly dropdownConfig: {
    readonly control: "object";
  };
  readonly consistentSearch: {
    readonly control: {
      readonly type: "boolean";
    };
  };
};
