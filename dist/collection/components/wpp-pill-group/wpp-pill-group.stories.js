import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Selection and input/Pill',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    size: {
      options: ['m'],
      control: { type: 'select' },
    },
  },
};
export const Display = (args) => {
  const handlePillGroupChange = (event) => {
    console.log('event.detail :>> ', event.detail);
  };
  return html `
    <wpp-pill-group-v3-3-1
      type="display"
      .size="${args.size}"
      .required="${args.required}"
      .labelConfig="${args.labelConfig}"
      @wppChange="${handlePillGroupChange}"
    >
      <wpp-pill-v3-3-1 label="Item A" value="item-a" .removable="${args.removable}"></wpp-pill-v3-3-1>
      <wpp-pill-v3-3-1 label="Item B" value="item-b" .disabled="${args.disabled}" .removable="${args.removable}">
        <wpp-avatar-v3-3-1
          name="Name"
          size="xs"
          src="https://mui.com/static/images/avatar/1.jpg"
          slot="icon-start"
          .removable="${args.removable}"
          index="-1"
        />
      </wpp-pill-v3-3-1>
      <wpp-pill-v3-3-1 label="Item C" value="item-c" .removable="${args.removable}">
        <wpp-icon-smile-v3-3-1 slot="icon-start" />
      </wpp-pill-v3-3-1>
      <wpp-pill-v3-3-1 label="Item D" value="item-d" .disabled="${args.disabled}" .removable="${args.removable}">
        <wpp-avatar-v3-3-1
          variant="square"
          name="Linkedin"
          size="xs"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
          slot="icon-start"
        />
      </wpp-pill-v3-3-1>
    </wpp-pill-group-v3-3-1>
  `;
};
Display.args = {
  size: 'm',
  disabled: false,
  required: true,
  removable: true,
  labelConfig: {
    icon: '',
    text: '',
    description: '',
    locales: {
      optional: 'Optional',
    },
  },
};
export const Draggable = (args) => {
  const handlePillGroupChange = (event) => {
    console.log('event.detail :>> ', event.detail);
  };
  return html `
    <wpp-pill-group-v3-3-1
      type="draggable"
      .size="${args.size}"
      .required="${args.required}"
      .labelConfig="${args.labelConfig}"
      @wppChange="${handlePillGroupChange}"
    >
      <wpp-pill-v3-3-1
        label="Item A"
        value="item-a"
        .disabled="${args.disabled}"
        .removable="${args.removable}"
      ></wpp-pill-v3-3-1>
      <wpp-pill-v3-3-1 label="Item B" value="item-b" removable></wpp-pill-v3-3-1>
    </wpp-pill-group-v3-3-1>
  `;
};
Draggable.args = {
  size: 'm',
  disabled: false,
  required: true,
  removable: true,
  labelConfig: {
    icon: '',
    text: '',
    description: '',
    locales: {
      optional: 'Optional',
    },
  },
};
export const SingleSelectGroup = (args) => {
  const handlePillGroupChange = (event) => {
    console.log('event.detail :>> ', event.detail);
  };
  return html `
    <wpp-pill-group-v3-3-1
      type="single"
      .size="${args.size}"
      .required="${args.required}"
      .labelConfig="${args.labelConfig}"
      @wppChange="${handlePillGroupChange}"
    >
      <wpp-pill-v3-3-1 label="Item A" value="item-a"></wpp-pill-v3-3-1>
      <wpp-pill-v3-3-1 label="Item B" value="item-b" .disabled="${args.disabled}">
        <wpp-avatar-v3-3-1
          name="Name"
          size="xs"
          src="https://mui.com/static/images/avatar/1.jpg"
          slot="icon-start"
          index="-1"
        />
      </wpp-pill-v3-3-1>
      <wpp-pill-v3-3-1 label="Item C" value="item-c">
        <wpp-avatar-v3-3-1
          variant="square"
          name="Linkedin"
          size="xs"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
          slot="icon-start"
        />
      </wpp-pill-v3-3-1>
      <wpp-pill-v3-3-1 label="Item D" value="item-d">
        <wpp-icon-smile-v3-3-1 slot="icon-start" />
      </wpp-pill-v3-3-1>
    </wpp-pill-group-v3-3-1>
  `;
};
SingleSelectGroup.args = {
  size: 'm',
  disabled: false,
  required: true,
  labelConfig: {
    icon: '',
    text: '',
    description: '',
    locales: {
      optional: 'Optional',
    },
  },
};
export const MultipleSelectGroup = (args) => {
  const pillGroupValue = ['item-a', 'item-c'];
  const handlePillGroupChange = (event) => {
    console.log('event.detail :>> ', event.detail);
  };
  return html `
    <wpp-pill-group-v3-3-1
      type="multiple"
      .value="${pillGroupValue}"
      .size="${args.size}"
      .required="${args.required}"
      .labelConfig="${args.labelConfig}"
      @wppChange="${handlePillGroupChange}"
    >
      <wpp-pill-v3-3-1 label="Item A" value="item-a"></wpp-pill-v3-3-1>
      <wpp-pill-v3-3-1 label="Item B" value="item-b" .disabled="${args.disabled}">
        <wpp-avatar-v3-3-1
          name="Name"
          size="xs"
          src="https://mui.com/static/images/avatar/1.jpg"
          slot="icon-start"
          index="-1"
        />
      </wpp-pill-v3-3-1>
      <wpp-pill-v3-3-1 label="Item C" value="item-c">
        <wpp-avatar-v3-3-1
          variant="square"
          name="Linkedin"
          size="xs"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
          slot="icon-start"
        />
      </wpp-pill-v3-3-1>
      <wpp-pill-v3-3-1 label="Item D" value="item-d">
        <wpp-icon-smile-v3-3-1 slot="icon-start" />
      </wpp-pill-v3-3-1>
      <wpp-pill-v3-3-1 label="Item E" value="item-e">
        <img
          src="https://easydrawingguides.com/wp-content/uploads/2018/09/Impossible-Triangle-09.png"
          style="display: flex; width: 20px; height: 20px;"
          slot="icon-start"
        />
      </wpp-pill-v3-3-1>
    </wpp-pill-group-v3-3-1>
  `;
};
MultipleSelectGroup.args = {
  size: 'm',
  disabled: false,
  required: true,
  labelConfig: {
    icon: '',
    text: '',
    description: '',
    locales: {
      optional: 'Optional',
    },
  },
};
