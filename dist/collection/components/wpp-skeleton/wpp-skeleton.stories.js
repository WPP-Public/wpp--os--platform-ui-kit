import { html } from 'lit-html';
import readme from './readme.md';
export default {
  title: 'Design System/Components/Feedback/Skeleton',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
  argTypes: {
    animation: { control: { type: 'boolean' } },
    variant: {
      options: ['rectangle', 'circle'],
      control: { type: 'select' },
    },
  },
};
/**
 * Basic Skeleton Example
 */
export const Skeleton = (args) => html `
    <wpp-skeleton-v2-22-0
      .variant="${args.variant}"
      .animation=${args.animation}
      .width=${args.width}
      .height=${args.height}
    />
  `;
Skeleton.args = {
  variant: 'rectangle',
  animation: true,
  width: '',
  height: '',
};
/**
 * Card Skeleton Example
 */
export const SkeletonCard = (args) => html `
    <div style="width: 260px; padding: 20px;">
      <wpp-skeleton-v2-22-0
        .variant="${args.variant}"
        .animation=${args.animation}
        width="60%"
        height="30px"
        style="margin-bottom: 16px;"
      ></wpp-skeleton-v2-22-0>
      <wpp-skeleton-v2-22-0
        .variant="${args.variant}"
        .animation=${args.animation}
        width="90%"
        height="16px"
        style="margin-bottom: 8px;"
      ></wpp-skeleton-v2-22-0>
      <wpp-skeleton-v2-22-0
        .variant="${args.variant}"
        .animation=${args.animation}
        width="80%"
        height="16px"
        style="margin-bottom: 24px;"
      ></wpp-skeleton-v2-22-0>
      <div style="display: flex; gap: 40px;">
        <wpp-skeleton-v2-22-0
          .variant="${args.variant}"
          .animation=${args.animation}
          width="70%"
          height="8px"
        ></wpp-skeleton-v2-22-0>
        <wpp-skeleton-v2-22-0
          .variant="${args.variant}"
          .animation=${args.animation}
          width="30%"
          height="8px"
        ></wpp-skeleton-v2-22-0>
      </div>
    </div>
  `;
SkeletonCard.args = {
  animation: true,
  variant: 'rectangle',
};
/**
 * Table Skeleton Example
 */
export const SkeletonTable = (args) => html `
    <div style="width: 1750px; margin: 0 auto;">
      <!-- Header Row -->
      <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; margin-bottom: 16px;">
        ${Array(6)
  .fill(null)
  .map((_, index) => html `
              <wpp-skeleton-v2-22-0
                .variant="${args.variant}"
                .animation=${args.animation}
                width="100%"
                height="20px"
                key=${index}
              ></wpp-skeleton-v2-22-0>
            `)}
      </div>
      <!-- Table Rows -->
      ${Array(5)
  .fill(null)
  .map((_, rowIndex) => html `
            <div
              style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; margin-bottom: 16px;"
              key=${rowIndex}
            >
              ${Array(6)
  .fill(null)
  .map((_, colIndex) => html `
                    <wpp-skeleton-v2-22-0
                      .variant="${args.variant}"
                      .animation=${args.animation}
                      width="100%"
                      height="16px"
                      key="${rowIndex}-${colIndex}"
                    ></wpp-skeleton-v2-22-0>
                  `)}
            </div>
          `)}
    </div>
  `;
SkeletonTable.args = {
  animation: true,
  variant: 'rectangle',
};
/**
 * Custom Layouts Example
 */
export const SkeletonCustomLayout = () => html `
    <div style="display: flex; gap: 24px; align-items: center; padding: 20px;">
      <wpp-skeleton-v2-22-0 variant="circle" width="50px" height="50px"></wpp-skeleton-v2-22-0>
      <div style="flex: 1;">
        <wpp-skeleton-v2-22-0 width="80%" height="20px" style="margin-bottom: 8px;"></wpp-skeleton-v2-22-0>
        <wpp-skeleton-v2-22-0 width="60%" height="16px"></wpp-skeleton-v2-22-0>
      </div>
    </div>
  `;
SkeletonCustomLayout.argTypes = {
  animation: { control: false },
  variant: { control: false },
  width: { control: false },
  height: { control: false },
};
SkeletonCustomLayout.parameters = {
  docs: {
    description: {
      story: 'This example demonstrates a custom layout combining circles and rectangles. It does not use or require any adjustable parameters.',
    },
  },
};
