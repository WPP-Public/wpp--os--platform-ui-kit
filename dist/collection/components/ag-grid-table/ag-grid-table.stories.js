import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Data display/Table AG Grid',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    options: { showPanel: false },
  },
};
export const Documentation = () => html `Refer notes for general documentation.`;
const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Polygender', label: 'Polygender' },
  { value: 'Agender', label: 'Agender' },
];
export const ValidationStates = () => html `
  <style>
    .ag-validation-demo {
      width: 640px;
      border: 1px solid var(--wpp-grey-color-300);
    }

    .ag-validation-demo-row {
      position: relative;
      display: grid;
      grid-template-columns: 220px 220px 1fr;
      gap: 12px;
      align-items: center;
      height: 56px;
      padding: 4px 16px;
      border-bottom: 1px solid var(--wpp-grey-color-300);
    }

    .ag-validation-demo-row:last-child {
      border-bottom: 0;
    }
  </style>

  <div class="ag-theme-wpp ag-validation-demo">
    <div class="ag-validation-demo-row ag-row-warning">
      <div class="ag-cell-error">
        <div class="ag-cell-error-content">
          <wpp-select-v4-1-0
            size="s"
            placeholder="Select user gender"
            .list=${genderOptions}
            .value=${'Male'}
            .messageType=${'warning'}
          ></wpp-select-v4-1-0>
          <wpp-tooltip-v4-1-0 text="Warning">
            <wpp-icon-warning-v4-1-0 color="var(--wpp-warning-color-400)"></wpp-icon-warning-v4-1-0>
          </wpp-tooltip-v4-1-0>
        </div>
      </div>

      <div class="ag-cell-error">
        <div class="ag-cell-error-content">
          <wpp-input-v4-1-0 size="s" value="PPAPs" message-type="warning"></wpp-input-v4-1-0>
          <wpp-tooltip-v4-1-0 text="Warning">
            <wpp-icon-warning-v4-1-0 color="var(--wpp-warning-color-400)"></wpp-icon-warning-v4-1-0>
          </wpp-tooltip-v4-1-0>
        </div>
      </div>

      <div class="ag-cell-error">
        <div class="ag-cell-error-content">
          <div class="ag-cell-error-text">
            <wpp-typography-v4-1-0 type="s-body">Warning text</wpp-typography-v4-1-0>
          </div>
          <wpp-tooltip-v4-1-0 text="Warning">
            <wpp-icon-warning-v4-1-0 color="var(--wpp-warning-color-400)"></wpp-icon-warning-v4-1-0>
          </wpp-tooltip-v4-1-0>
        </div>
      </div>
    </div>

    <div class="ag-validation-demo-row ag-row-error">
      <div class="ag-cell-error">
        <div class="ag-cell-error-content">
          <wpp-input-v4-1-0 size="s" value="Invalid value" message-type="error"></wpp-input-v4-1-0>
          <wpp-tooltip-v4-1-0 text="Error">
            <wpp-icon-error-v4-1-0 color="var(--wpp-danger-color-400)"></wpp-icon-error-v4-1-0>
          </wpp-tooltip-v4-1-0>
        </div>
      </div>
    </div>

    <div class="ag-validation-demo-row ag-row-error ag-row-warning">
      <div class="ag-cell-error">
        <div class="ag-cell-error-content">
          <wpp-input-v4-1-0 size="s" value="Error takes priority" message-type="error"></wpp-input-v4-1-0>
          <wpp-tooltip-v4-1-0 text="Error takes priority">
            <wpp-icon-error-v4-1-0 color="var(--wpp-danger-color-400)"></wpp-icon-error-v4-1-0>
          </wpp-tooltip-v4-1-0>
        </div>
      </div>
    </div>
  </div>
`;
