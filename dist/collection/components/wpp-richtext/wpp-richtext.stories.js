import { html } from 'lit-html';
import readme from './readme.md';
import { debugLevels, formats, } from './types';
/* eslint-disable import/no-webpack-loader-syntax */
// @ts-ignore Can't find file
import value from '!raw-loader!./test/test-value.html';
export default {
  title: 'Design System/Components/Selection and input/Rich Text',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
  argTypes: {
    debug: {
      options: Object.values(debugLevels),
      control: { type: 'select' },
    },
  },
  options: {
    storySort: {
      order: ['Editor', '*'],
      method: 'alphabetical',
    },
  },
};
const changeHandler = {
  handleEvent(e) {
    console.log('wppChange', e);
  },
};
const selectionChangeHandler = {
  handleEvent(e) {
    console.log('wppSelectionChange', { ...e.detail.range }, e);
  },
};
function upload(file) {
  return new Promise(resolve => {
    const delay = 10000 + Math.floor(Math.random() * 10000);
    // Embed image as Data URL
    // const reader = new FileReader()
    //
    // reader.onload = function () {
    //   setTimeout(() => resolve(reader.result as string), delay)
    // }
    // reader.readAsDataURL(file)
    // Or embed via Blob URL for local experiments
    setTimeout(() => resolve(URL.createObjectURL(file)), delay);
  });
}
// There is also need to enable respective embed button in toolbar (image, video and attachment)
// and respective upload modules (imageUpload, videoUpload and attachmentUpload)
const uploadRequestHandler = {
  handleEvent(e) {
    console.log('wppUploadRequest', e);
    const type = e.detail.type;
    const callback = e.detail.callback;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type === 'attachment' ? '*' : `${type}/*`;
    input.multiple = true;
    input.onchange = () => {
      const uploadItems = Array.from(input.files).map(file => ({
        file,
        promise: upload(file),
      }));
      callback(uploadItems);
    };
    input.click();
  },
};
export const Editor = (args) => html `
  <wpp-richtext-v2-22-0
    key=${args.format}
    @wppChange="${changeHandler}"
    @wppSelectionChange="${selectionChangeHandler}"
    @wppUploadRequest="${uploadRequestHandler}"
    .name=${args.name}
    .value=${value}
    .placeholder=${args.placeholder}
    .preserve-whitespace=${args.preserveWhitespace}
    .format=${args.format}
    .debug=${args.debug}
    .modules=${args.modules}
    .disabled=${args.disabled}
    .required=${args.required}
    .labelConfig="${args.labelConfig}"
    .message="${args.message}"
    .messageType="${args.messageType}"
    .auto-focus="${args.autoFocus}"
    characters-limit="${args.charactersLimit}"
    warning-threshold="${args.warningThreshold}"
    style="width: 900px; height: 600px"
    class="custom-class-1"
  ></wpp-richtext-v2-22-0>
`;
const modules = JSON.stringify({
  toolbar: {
    aliases: {
      // Add image, video and attachments buttons to the embed section of toolbar
      embed: ['link', 'image', 'video', 'attachment', { imageLibrary: [] }],
    },
  },
  // Enable custom upload handler for image, video and attachment
  imageUpload: true,
  videoUpload: true,
  attachmentUpload: true,
  // Image Library settings
  imageLibrary: {
    sections: [
      {
        items: [
          {
            name: 'Shapes',
            toolbar: { width: 20, height: 20 },
            value: {
              src: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0icHgiIGhlaWdodD0iMTRweCIgdmlld0JveD0iMCAwIDE0IDE0IiB2ZXJzaW9uPSIxLjEiPgo8ZyBpZD0ic3VyZmFjZTEiPgo8cGF0aCBzdHlsZT0iIHN0cm9rZTpub25lO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6cmdiKDAlLDAlLDAlKTtmaWxsLW9wYWNpdHk6MTsiIGQ9Ik0gNS4xNzk2ODggMi4yMzgyODEgQyAzLjU1NDY4OCAyLjIzODI4MSAyLjIzODI4MSAzLjU1NDY4OCAyLjIzODI4MSA1LjE3OTY4OCBDIDIuMjM4MjgxIDYuNjYwMTU2IDMuMzM1OTM4IDcuODg2NzE5IDQuNzYxNzE5IDguMDg5ODQ0IEwgNC43NjE3MTkgOC45Mzc1IEMgMi44NzEwOTQgOC43MjY1NjIgMS4zOTg0MzggNy4xMjUgMS4zOTg0MzggNS4xNzk2ODggQyAxLjM5ODQzOCAzLjA5Mzc1IDMuMDkzNzUgMS4zOTg0MzggNS4xNzk2ODggMS4zOTg0MzggQyA3LjEyNSAxLjM5ODQzOCA4LjcyNjU2MiAyLjg3MTA5NCA4LjkzNzUgNC43NjE3MTkgTCA4LjA4OTg0NCA0Ljc2MTcxOSBDIDcuODg2NzE5IDMuMzM1OTM4IDYuNjYwMTU2IDIuMjM4MjgxIDUuMTc5Njg4IDIuMjM4MjgxIFogTSA3LjE0MDYyNSA1LjMyMDMxMiBDIDYuMTM2NzE5IDUuMzIwMzEyIDUuMzIwMzEyIDYuMTM2NzE5IDUuMzIwMzEyIDcuMTQwNjI1IEwgNS4zMjAzMTIgMTAuNzgxMjUgQyA1LjMyMDMxMiAxMS43ODUxNTYgNi4xMzY3MTkgMTIuNjAxNTYyIDcuMTQwNjI1IDEyLjYwMTU2MiBMIDEwLjc4MTI1IDEyLjYwMTU2MiBDIDExLjc4NTE1NiAxMi42MDE1NjIgMTIuNjAxNTYyIDExLjc4NTE1NiAxMi42MDE1NjIgMTAuNzgxMjUgTCAxMi42MDE1NjIgNy4xNDA2MjUgQyAxMi42MDE1NjIgNi4xMzY3MTkgMTEuNzg1MTU2IDUuMzIwMzEyIDEwLjc4MTI1IDUuMzIwMzEyIFogTSA2LjE2MDE1NiA3LjE0MDYyNSBDIDYuMTYwMTU2IDYuNTk3NjU2IDYuNTk3NjU2IDYuMTYwMTU2IDcuMTQwNjI1IDYuMTYwMTU2IEwgMTAuNzgxMjUgNi4xNjAxNTYgQyAxMS4zMjAzMTIgNi4xNjAxNTYgMTEuNzYxNzE5IDYuNTk3NjU2IDExLjc2MTcxOSA3LjE0MDYyNSBMIDExLjc2MTcxOSAxMC43ODEyNSBDIDExLjc2MTcxOSAxMS4zMjAzMTIgMTEuMzIwMzEyIDExLjc2MTcxOSAxMC43ODEyNSAxMS43NjE3MTkgTCA3LjE0MDYyNSAxMS43NjE3MTkgQyA2LjU5NzY1NiAxMS43NjE3MTkgNi4xNjAxNTYgMTEuMzIwMzEyIDYuMTYwMTU2IDEwLjc4MTI1IFogTSA2LjE2MDE1NiA3LjE0MDYyNSAiLz4KPC9nPgo8L3N2Zz4K',
            },
          },
          {
            name: 'Triangle',
            toolbar: { width: 20, height: 20 },
            value: {
              src: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0icHgiIGhlaWdodD0iMTRweCIgdmlld0JveD0iMCAwIDE0IDE0IiB2ZXJzaW9uPSIxLjEiPgo8ZyBpZD0ic3VyZmFjZTEiPgo8cGF0aCBzdHlsZT0iIHN0cm9rZTpub25lO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6cmdiKDAlLDAlLDAlKTtmaWxsLW9wYWNpdHk6MTsiIGQ9Ik0gNS43NSAyLjEyNSBDIDYuMjg1MTU2IDEuMTYwMTU2IDcuNjcxODc1IDEuMTYwMTU2IDguMjAzMTI1IDIuMTI1IEwgMTIuODMyMDMxIDEwLjUyMzQzOCBDIDEzLjM0NzY1NiAxMS40NTcwMzEgMTIuNjcxODc1IDEyLjYwMTU2MiAxMS42MDU0NjkgMTIuNjAxNTYyIEwgMi4zNDc2NTYgMTIuNjAxNTYyIEMgMS4yODEyNSAxMi42MDE1NjIgMC42MDU0NjkgMTEuNDU3MDMxIDEuMTIxMDk0IDEwLjUyMzQzOCBaIE0gNy40NDkyMTkgMi41MzkwNjIgQyA3LjI0NjA5NCAyLjE2Nzk2OSA2LjcxMDkzOCAyLjE2Nzk2OSA2LjUwNzgxMiAyLjUzOTA2MiBMIDEuODc1IDEwLjk0MTQwNiBDIDEuNjc1NzgxIDExLjMwMDc4MSAxLjkzNzUgMTEuNzM4MjgxIDIuMzQ3NjU2IDExLjczODI4MSBMIDExLjYwNTQ2OSAxMS43MzgyODEgQyAxMi4wMTU2MjUgMTEuNzM4MjgxIDEyLjI3MzQzOCAxMS4zMDA3ODEgMTIuMDc4MTI1IDEwLjk0MTQwNiBaIE0gNy40NDkyMTkgMi41MzkwNjIgIi8+CjwvZz4KPC9zdmc+Cg==',
            },
          },
          {
            name: 'Square',
            toolbar: { width: 20, height: 20 },
            value: {
              src: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0icHgiIGhlaWdodD0iMTRweCIgdmlld0JveD0iMCAwIDE0IDE0IiB2ZXJzaW9uPSIxLjEiPgo8ZyBpZD0ic3VyZmFjZTEiPgo8cGF0aCBzdHlsZT0iIHN0cm9rZTpub25lO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6cmdiKDAlLDAlLDAlKTtmaWxsLW9wYWNpdHk6MTsiIGQ9Ik0gMi4xMDE1NjIgMy44NzEwOTQgQyAyLjEwMTU2MiAyLjg5MDYyNSAyLjg5MDYyNSAyLjEwMTU2MiAzLjg3MTA5NCAyLjEwMTU2MiBMIDEwLjEyODkwNiAyLjEwMTU2MiBDIDExLjEwOTM3NSAyLjEwMTU2MiAxMS44OTg0MzggMi44OTA2MjUgMTEuODk4NDM4IDMuODcxMDk0IEwgMTEuODk4NDM4IDEwLjEyODkwNiBDIDExLjg5ODQzOCAxMS4xMDkzNzUgMTEuMTA5Mzc1IDExLjg5ODQzOCAxMC4xMjg5MDYgMTEuODk4NDM4IEwgMy44NzEwOTQgMTEuODk4NDM4IEMgMi44OTA2MjUgMTEuODk4NDM4IDIuMTAxNTYyIDExLjEwOTM3NSAyLjEwMTU2MiAxMC4xMjg5MDYgWiBNIDMuODcxMDk0IDIuOTE3OTY5IEMgMy4zNDM3NSAyLjkxNzk2OSAyLjkxNzk2OSAzLjM0Mzc1IDIuOTE3OTY5IDMuODcxMDk0IEwgMi45MTc5NjkgMTAuMTI4OTA2IEMgMi45MTc5NjkgMTAuNjU2MjUgMy4zNDM3NSAxMS4wODIwMzEgMy44NzEwOTQgMTEuMDgyMDMxIEwgMTAuMTI4OTA2IDExLjA4MjAzMSBDIDEwLjY1NjI1IDExLjA4MjAzMSAxMS4wODIwMzEgMTAuNjU2MjUgMTEuMDgyMDMxIDEwLjEyODkwNiBMIDExLjA4MjAzMSAzLjg3MTA5NCBDIDExLjA4MjAzMSAzLjM0Mzc1IDEwLjY1NjI1IDIuOTE3OTY5IDEwLjEyODkwNiAyLjkxNzk2OSBaIE0gMy44NzEwOTQgMi45MTc5NjkgIi8+CjwvZz4KPC9zdmc+Cg==',
            },
          },
          {
            name: 'Pentagram',
            toolbar: { width: 20, height: 20 },
            value: {
              src: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0icHgiIGhlaWdodD0iMTRweCIgdmlld0JveD0iMCAwIDE0IDE0IiB2ZXJzaW9uPSIxLjEiPgo8ZyBpZD0ic3VyZmFjZTEiPgo8cGF0aCBzdHlsZT0iIHN0cm9rZTpub25lO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6cmdiKDAlLDAlLDAlKTtmaWxsLW9wYWNpdHk6MTsiIGQ9Ik0gNi4xODM1OTQgMS42Njc5NjkgQyA2LjY3MTg3NSAxLjMxMjUgNy4zMzk4NDQgMS4zMTI1IDcuODI4MTI1IDEuNjY3OTY5IEwgMTIuMjQ2MDk0IDQuODc1IEMgMTIuNzM0Mzc1IDUuMjMwNDY5IDEyLjk0MTQwNiA1Ljg2MzI4MSAxMi43NTM5MDYgNi40NDE0MDYgTCAxMS4wNjY0MDYgMTEuNjMyODEyIEMgMTAuODc4OTA2IDEyLjIxMDkzOCAxMC4zNDM3NSAxMi42MDE1NjIgOS43MzQzNzUgMTIuNjAxNTYyIEwgNC4yNzczNDQgMTIuNjAxNTYyIEMgMy42NzE4NzUgMTIuNjAxNTYyIDMuMTMyODEyIDEyLjIxMDkzOCAyLjk0NTMxMiAxMS42MzI4MTIgTCAxLjI1NzgxMiA2LjQ0MTQwNiBDIDEuMDcwMzEyIDUuODYzMjgxIDEuMjc3MzQ0IDUuMjMwNDY5IDEuNzY5NTMxIDQuODc1IFogTSA3LjMyNDIxOSAyLjM2MzI4MSBDIDcuMTMyODEyIDIuMjI2NTYyIDYuODc4OTA2IDIuMjI2NTYyIDYuNjg3NSAyLjM2MzI4MSBMIDIuMjczNDM4IDUuNTc0MjE5IEMgMi4wODU5MzggNS43MTA5MzggMi4wMDc4MTIgNS45NTMxMjUgMi4wNzgxMjUgNi4xNzU3ODEgTCAzLjc2NTYyNSAxMS4zNjcxODggQyAzLjgzNTkzOCAxMS41ODU5MzggNC4wNDI5NjkgMTEuNzM4MjgxIDQuMjc3MzQ0IDExLjczODI4MSBMIDkuNzM0Mzc1IDExLjczODI4MSBDIDkuOTY4NzUgMTEuNzM4MjgxIDEwLjE3NTc4MSAxMS41ODU5MzggMTAuMjQ2MDk0IDExLjM2NzE4OCBMIDExLjkzMzU5NCA2LjE3NTc4MSBDIDEyLjAwMzkwNiA1Ljk1MzEyNSAxMS45MjU3ODEgNS43MTA5MzggMTEuNzM4MjgxIDUuNTc0MjE5IFogTSA3LjMyNDIxOSAyLjM2MzI4MSAiLz4KPC9nPgo8L3N2Zz4K',
            },
          },
          {
            name: 'Rhombus',
            toolbar: { width: 20, height: 20 },
            value: {
              src: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0icHgiIGhlaWdodD0iMTRweCIgdmlld0JveD0iMCAwIDE0IDE0IiB2ZXJzaW9uPSIxLjEiPgo8ZyBpZD0ic3VyZmFjZTEiPgo8cGF0aCBzdHlsZT0iIHN0cm9rZTpub25lO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6cmdiKDAlLDAlLDAlKTtmaWxsLW9wYWNpdHk6MTsiIGQ9Ik0gMS43Njk1MzEgNy44OTA2MjUgQyAxLjI3NzM0NCA3LjM5ODQzOCAxLjI3NzM0NCA2LjYwMTU2MiAxLjc2OTUzMSA2LjEwOTM3NSBMIDYuMTA5Mzc1IDEuNzY5NTMxIEMgNi42MDE1NjIgMS4yNzczNDQgNy4zOTg0MzggMS4yNzczNDQgNy44OTA2MjUgMS43Njk1MzEgTCAxMi4yMzA0NjkgNi4xMDkzNzUgQyAxMi43MjI2NTYgNi42MDE1NjIgMTIuNzIyNjU2IDcuMzk4NDM4IDEyLjIzMDQ2OSA3Ljg5MDYyNSBMIDcuODkwNjI1IDEyLjIzMDQ2OSBDIDcuMzk4NDM4IDEyLjcyMjY1NiA2LjYwMTU2MiAxMi43MjI2NTYgNi4xMDkzNzUgMTIuMjMwNDY5IFogTSAyLjM2MzI4MSA2LjcwMzEyNSBDIDIuMTk5MjE5IDYuODY3MTg4IDIuMTk5MjE5IDcuMTMyODEyIDIuMzYzMjgxIDcuMjk2ODc1IEwgNi43MDMxMjUgMTEuNjM2NzE5IEMgNi44NjcxODggMTEuODAwNzgxIDcuMTMyODEyIDExLjgwMDc4MSA3LjI5Njg3NSAxMS42MzY3MTkgTCAxMS42MzY3MTkgNy4yOTY4NzUgQyAxMS44MDA3ODEgNy4xMzI4MTIgMTEuODAwNzgxIDYuODY3MTg4IDExLjYzNjcxOSA2LjcwMzEyNSBMIDcuMjk2ODc1IDIuMzYzMjgxIEMgNy4xMzI4MTIgMi4xOTkyMTkgNi44NjcxODggMi4xOTkyMTkgNi43MDMxMjUgMi4zNjMyODEgWiBNIDIuMzYzMjgxIDYuNzAzMTI1ICIvPgo8L2c+Cjwvc3ZnPgo=',
            },
          },
          {
            name: 'Cube',
            toolbar: { width: 20, height: 20 },
            value: {
              src: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0icHgiIGhlaWdodD0iMTRweCIgdmlld0JveD0iMCAwIDE0IDE0IiB2ZXJzaW9uPSIxLjEiPgo8ZyBpZD0ic3VyZmFjZTEiPgo8cGF0aCBzdHlsZT0iIHN0cm9rZTpub25lO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6cmdiKDAlLDAlLDAlKTtmaWxsLW9wYWNpdHk6MTsiIGQ9Ik0gMy42Njc5NjkgNC43NSBDIDMuNzUgNC41MzUxNTYgMy45OTIxODggNC40MjU3ODEgNC4yMDcwMzEgNC41MDc4MTIgTCA3IDUuNTY2NDA2IEwgOS43ODkwNjIgNC41MDc4MTIgQyAxMC4wMDc4MTIgNC40MjU3ODEgMTAuMjUgNC41MzUxNTYgMTAuMzMyMDMxIDQuNzUgQyAxMC40MTQwNjIgNC45Njg3NSAxMC4zMDQ2ODggNS4yMTA5MzggMTAuMDg5ODQ0IDUuMjkyOTY5IEwgNy40MjE4NzUgNi4zMDQ2ODggTCA3LjQyMTg3NSA5LjM3ODkwNiBDIDcuNDIxODc1IDkuNjEzMjgxIDcuMjMwNDY5IDkuODAwNzgxIDcgOS44MDA3ODEgQyA2Ljc2OTUzMSA5LjgwMDc4MSA2LjU3ODEyNSA5LjYxMzI4MSA2LjU3ODEyNSA5LjM3ODkwNiBMIDYuNTc4MTI1IDYuMzA0Njg4IEwgMy45MTAxNTYgNS4yOTI5NjkgQyAzLjY5NTMxMiA1LjIxMDkzOCAzLjU4NTkzOCA0Ljk2ODc1IDMuNjY3OTY5IDQuNzUgWiBNIDYuMjEwOTM4IDEuNjg3NSBDIDYuNzE4NzUgMS40ODA0NjkgNy4yODEyNSAxLjQ4MDQ2OSA3Ljc4OTA2MiAxLjY4NzUgTCAxMS45ODgyODEgMy4zOTA2MjUgQyAxMi4zNTkzNzUgMy41MzkwNjIgMTIuNjAxNTYyIDMuODk4NDM4IDEyLjYwMTU2MiA0LjI5Njg3NSBMIDEyLjYwMTU2MiA5LjcwMzEyNSBDIDEyLjYwMTU2MiAxMC4xMDE1NjIgMTIuMzU5Mzc1IDEwLjQ2MDkzOCAxMS45ODgyODEgMTAuNjA5Mzc1IEwgNy43ODkwNjIgMTIuMzEyNSBDIDcuMjgxMjUgMTIuNTE5NTMxIDYuNzE4NzUgMTIuNTE5NTMxIDYuMjEwOTM4IDEyLjMxMjUgTCAyLjAxMTcxOSAxMC42MDkzNzUgQyAxLjY0MDYyNSAxMC40NjA5MzggMS4zOTg0MzggMTAuMTAxNTYyIDEuMzk4NDM4IDkuNzAzMTI1IEwgMS4zOTg0MzggNC4yOTY4NzUgQyAxLjM5ODQzOCAzLjg5ODQzOCAxLjY0MDYyNSAzLjUzOTA2MiAyLjAxMTcxOSAzLjM5MDYyNSBaIE0gNy40NzI2NTYgMi40NjQ4NDQgQyA3LjE2Nzk2OSAyLjM0Mzc1IDYuODMyMDMxIDIuMzQzNzUgNi41MjczNDQgMi40NjQ4NDQgTCAyLjMyODEyNSA0LjE2Nzk2OSBDIDIuMjczNDM4IDQuMTg3NSAyLjIzODI4MSA0LjI0MjE4OCAyLjIzODI4MSA0LjI5Njg3NSBMIDIuMjM4MjgxIDkuNzAzMTI1IEMgMi4yMzgyODEgOS43NjE3MTkgMi4yNzM0MzggOS44MTI1IDIuMzI4MTI1IDkuODMyMDMxIEwgNi41MjczNDQgMTEuNTM1MTU2IEMgNi44MzIwMzEgMTEuNjU2MjUgNy4xNjc5NjkgMTEuNjU2MjUgNy40NzI2NTYgMTEuNTM1MTU2IEwgMTEuNjcxODc1IDkuODMyMDMxIEMgMTEuNzI2NTYyIDkuODEyNSAxMS43NjE3MTkgOS43NjE3MTkgMTEuNzYxNzE5IDkuNzAzMTI1IEwgMTEuNzYxNzE5IDQuMjk2ODc1IEMgMTEuNzYxNzE5IDQuMjQyMTg4IDExLjcyNjU2MiA0LjE4NzUgMTEuNjcxODc1IDQuMTY3OTY5IFogTSA3LjQ3MjY1NiAyLjQ2NDg0NCAiLz4KPC9nPgo8L3N2Zz4K',
            },
          },
          {
            name: 'Circle',
            toolbar: { width: 20, height: 20 },
            value: {
              src: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0icHgiIGhlaWdodD0iMTRweCIgdmlld0JveD0iMCAwIDE0IDE0IiB2ZXJzaW9uPSIxLjEiPgo8ZyBpZD0ic3VyZmFjZTEiPgo8cGF0aCBzdHlsZT0iIHN0cm9rZTpub25lO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6cmdiKDAlLDAlLDAlKTtmaWxsLW9wYWNpdHk6MTsiIGQ9Ik0gNyAyLjIzODI4MSBDIDQuMzcxMDk0IDIuMjM4MjgxIDIuMjM4MjgxIDQuMzcxMDk0IDIuMjM4MjgxIDcgQyAyLjIzODI4MSA5LjYyODkwNiA0LjM3MTA5NCAxMS43NjE3MTkgNyAxMS43NjE3MTkgQyA5LjYyODkwNiAxMS43NjE3MTkgMTEuNzYxNzE5IDkuNjI4OTA2IDExLjc2MTcxOSA3IEMgMTEuNzYxNzE5IDQuMzcxMDk0IDkuNjI4OTA2IDIuMjM4MjgxIDcgMi4yMzgyODEgWiBNIDEuMzk4NDM4IDcgQyAxLjM5ODQzOCAzLjkwNjI1IDMuOTA2MjUgMS4zOTg0MzggNyAxLjM5ODQzOCBDIDEwLjA5Mzc1IDEuMzk4NDM4IDEyLjYwMTU2MiAzLjkwNjI1IDEyLjYwMTU2MiA3IEMgMTIuNjAxNTYyIDEwLjA5Mzc1IDEwLjA5Mzc1IDEyLjYwMTU2MiA3IDEyLjYwMTU2MiBDIDMuOTA2MjUgMTIuNjAxNTYyIDEuMzk4NDM4IDEwLjA5Mzc1IDEuMzk4NDM4IDcgWiBNIDEuMzk4NDM4IDcgIi8+CjwvZz4KPC9zdmc+Cg==',
            },
          },
          {
            name: 'Shapes 2',
            toolbar: { width: 20, height: 20 },
            value: {
              src: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0icHgiIGhlaWdodD0iMTRweCIgdmlld0JveD0iMCAwIDE0IDE0IiB2ZXJzaW9uPSIxLjEiPgo8ZyBpZD0ic3VyZmFjZTEiPgo8cGF0aCBzdHlsZT0iIHN0cm9rZTpub25lO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6cmdiKDAlLDAlLDAlKTtmaWxsLW9wYWNpdHk6MTsiIGQ9Ik0gNS4xNzk2ODggMi4yMzgyODEgQyAzLjU1NDY4OCAyLjIzODI4MSAyLjIzODI4MSAzLjU1NDY4OCAyLjIzODI4MSA1LjE3OTY4OCBDIDIuMjM4MjgxIDYuNjYwMTU2IDMuMzM1OTM4IDcuODg2NzE5IDQuNzYxNzE5IDguMDg5ODQ0IEwgNC43NjE3MTkgOC45Mzc1IEMgMi44NzEwOTQgOC43MjY1NjIgMS4zOTg0MzggNy4xMjUgMS4zOTg0MzggNS4xNzk2ODggQyAxLjM5ODQzOCAzLjA5Mzc1IDMuMDkzNzUgMS4zOTg0MzggNS4xNzk2ODggMS4zOTg0MzggQyA3LjEyNSAxLjM5ODQzOCA4LjcyNjU2MiAyLjg3MTA5NCA4LjkzNzUgNC43NjE3MTkgTCA4LjA4OTg0NCA0Ljc2MTcxOSBDIDcuODg2NzE5IDMuMzM1OTM4IDYuNjYwMTU2IDIuMjM4MjgxIDUuMTc5Njg4IDIuMjM4MjgxIFogTSA3LjE0MDYyNSA1LjMyMDMxMiBDIDYuMTM2NzE5IDUuMzIwMzEyIDUuMzIwMzEyIDYuMTM2NzE5IDUuMzIwMzEyIDcuMTQwNjI1IEwgNS4zMjAzMTIgMTAuNzgxMjUgQyA1LjMyMDMxMiAxMS43ODUxNTYgNi4xMzY3MTkgMTIuNjAxNTYyIDcuMTQwNjI1IDEyLjYwMTU2MiBMIDEwLjc4MTI1IDEyLjYwMTU2MiBDIDExLjc4NTE1NiAxMi42MDE1NjIgMTIuNjAxNTYyIDExLjc4NTE1NiAxMi42MDE1NjIgMTAuNzgxMjUgTCAxMi42MDE1NjIgNy4xNDA2MjUgQyAxMi42MDE1NjIgNi4xMzY3MTkgMTEuNzg1MTU2IDUuMzIwMzEyIDEwLjc4MTI1IDUuMzIwMzEyIFogTSA2LjE2MDE1NiA3LjE0MDYyNSBDIDYuMTYwMTU2IDYuNTk3NjU2IDYuNTk3NjU2IDYuMTYwMTU2IDcuMTQwNjI1IDYuMTYwMTU2IEwgMTAuNzgxMjUgNi4xNjAxNTYgQyAxMS4zMjAzMTIgNi4xNjAxNTYgMTEuNzYxNzE5IDYuNTk3NjU2IDExLjc2MTcxOSA3LjE0MDYyNSBMIDExLjc2MTcxOSAxMC43ODEyNSBDIDExLjc2MTcxOSAxMS4zMjAzMTIgMTEuMzIwMzEyIDExLjc2MTcxOSAxMC43ODEyNSAxMS43NjE3MTkgTCA3LjE0MDYyNSAxMS43NjE3MTkgQyA2LjU5NzY1NiAxMS43NjE3MTkgNi4xNjAxNTYgMTEuMzIwMzEyIDYuMTYwMTU2IDEwLjc4MTI1IFogTSA2LjE2MDE1NiA3LjE0MDYyNSAiLz4KPC9nPgo8L3N2Zz4K',
            },
          },
          {
            name: 'Triangle 2',
            toolbar: { width: 20, height: 20 },
            value: {
              src: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0icHgiIGhlaWdodD0iMTRweCIgdmlld0JveD0iMCAwIDE0IDE0IiB2ZXJzaW9uPSIxLjEiPgo8ZyBpZD0ic3VyZmFjZTEiPgo8cGF0aCBzdHlsZT0iIHN0cm9rZTpub25lO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6cmdiKDAlLDAlLDAlKTtmaWxsLW9wYWNpdHk6MTsiIGQ9Ik0gNS43NSAyLjEyNSBDIDYuMjg1MTU2IDEuMTYwMTU2IDcuNjcxODc1IDEuMTYwMTU2IDguMjAzMTI1IDIuMTI1IEwgMTIuODMyMDMxIDEwLjUyMzQzOCBDIDEzLjM0NzY1NiAxMS40NTcwMzEgMTIuNjcxODc1IDEyLjYwMTU2MiAxMS42MDU0NjkgMTIuNjAxNTYyIEwgMi4zNDc2NTYgMTIuNjAxNTYyIEMgMS4yODEyNSAxMi42MDE1NjIgMC42MDU0NjkgMTEuNDU3MDMxIDEuMTIxMDk0IDEwLjUyMzQzOCBaIE0gNy40NDkyMTkgMi41MzkwNjIgQyA3LjI0NjA5NCAyLjE2Nzk2OSA2LjcxMDkzOCAyLjE2Nzk2OSA2LjUwNzgxMiAyLjUzOTA2MiBMIDEuODc1IDEwLjk0MTQwNiBDIDEuNjc1NzgxIDExLjMwMDc4MSAxLjkzNzUgMTEuNzM4MjgxIDIuMzQ3NjU2IDExLjczODI4MSBMIDExLjYwNTQ2OSAxMS43MzgyODEgQyAxMi4wMTU2MjUgMTEuNzM4MjgxIDEyLjI3MzQzOCAxMS4zMDA3ODEgMTIuMDc4MTI1IDEwLjk0MTQwNiBaIE0gNy40NDkyMTkgMi41MzkwNjIgIi8+CjwvZz4KPC9zdmc+Cg==',
            },
          },
          {
            name: 'Square 2',
            toolbar: { width: 20, height: 20 },
            value: {
              src: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0icHgiIGhlaWdodD0iMTRweCIgdmlld0JveD0iMCAwIDE0IDE0IiB2ZXJzaW9uPSIxLjEiPgo8ZyBpZD0ic3VyZmFjZTEiPgo8cGF0aCBzdHlsZT0iIHN0cm9rZTpub25lO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6cmdiKDAlLDAlLDAlKTtmaWxsLW9wYWNpdHk6MTsiIGQ9Ik0gMi4xMDE1NjIgMy44NzEwOTQgQyAyLjEwMTU2MiAyLjg5MDYyNSAyLjg5MDYyNSAyLjEwMTU2MiAzLjg3MTA5NCAyLjEwMTU2MiBMIDEwLjEyODkwNiAyLjEwMTU2MiBDIDExLjEwOTM3NSAyLjEwMTU2MiAxMS44OTg0MzggMi44OTA2MjUgMTEuODk4NDM4IDMuODcxMDk0IEwgMTEuODk4NDM4IDEwLjEyODkwNiBDIDExLjg5ODQzOCAxMS4xMDkzNzUgMTEuMTA5Mzc1IDExLjg5ODQzOCAxMC4xMjg5MDYgMTEuODk4NDM4IEwgMy44NzEwOTQgMTEuODk4NDM4IEMgMi44OTA2MjUgMTEuODk4NDM4IDIuMTAxNTYyIDExLjEwOTM3NSAyLjEwMTU2MiAxMC4xMjg5MDYgWiBNIDMuODcxMDk0IDIuOTE3OTY5IEMgMy4zNDM3NSAyLjkxNzk2OSAyLjkxNzk2OSAzLjM0Mzc1IDIuOTE3OTY5IDMuODcxMDk0IEwgMi45MTc5NjkgMTAuMTI4OTA2IEMgMi45MTc5NjkgMTAuNjU2MjUgMy4zNDM3NSAxMS4wODIwMzEgMy44NzEwOTQgMTEuMDgyMDMxIEwgMTAuMTI4OTA2IDExLjA4MjAzMSBDIDEwLjY1NjI1IDExLjA4MjAzMSAxMS4wODIwMzEgMTAuNjU2MjUgMTEuMDgyMDMxIDEwLjEyODkwNiBMIDExLjA4MjAzMSAzLjg3MTA5NCBDIDExLjA4MjAzMSAzLjM0Mzc1IDEwLjY1NjI1IDIuOTE3OTY5IDEwLjEyODkwNiAyLjkxNzk2OSBaIE0gMy44NzEwOTQgMi45MTc5NjkgIi8+CjwvZz4KPC9zdmc+Cg==',
            },
          },
          {
            name: 'Pentagram 2',
            toolbar: { width: 20, height: 20 },
            value: {
              src: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0icHgiIGhlaWdodD0iMTRweCIgdmlld0JveD0iMCAwIDE0IDE0IiB2ZXJzaW9uPSIxLjEiPgo8ZyBpZD0ic3VyZmFjZTEiPgo8cGF0aCBzdHlsZT0iIHN0cm9rZTpub25lO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6cmdiKDAlLDAlLDAlKTtmaWxsLW9wYWNpdHk6MTsiIGQ9Ik0gNi4xODM1OTQgMS42Njc5NjkgQyA2LjY3MTg3NSAxLjMxMjUgNy4zMzk4NDQgMS4zMTI1IDcuODI4MTI1IDEuNjY3OTY5IEwgMTIuMjQ2MDk0IDQuODc1IEMgMTIuNzM0Mzc1IDUuMjMwNDY5IDEyLjk0MTQwNiA1Ljg2MzI4MSAxMi43NTM5MDYgNi40NDE0MDYgTCAxMS4wNjY0MDYgMTEuNjMyODEyIEMgMTAuODc4OTA2IDEyLjIxMDkzOCAxMC4zNDM3NSAxMi42MDE1NjIgOS43MzQzNzUgMTIuNjAxNTYyIEwgNC4yNzczNDQgMTIuNjAxNTYyIEMgMy42NzE4NzUgMTIuNjAxNTYyIDMuMTMyODEyIDEyLjIxMDkzOCAyLjk0NTMxMiAxMS42MzI4MTIgTCAxLjI1NzgxMiA2LjQ0MTQwNiBDIDEuMDcwMzEyIDUuODYzMjgxIDEuMjc3MzQ0IDUuMjMwNDY5IDEuNzY5NTMxIDQuODc1IFogTSA3LjMyNDIxOSAyLjM2MzI4MSBDIDcuMTMyODEyIDIuMjI2NTYyIDYuODc4OTA2IDIuMjI2NTYyIDYuNjg3NSAyLjM2MzI4MSBMIDIuMjczNDM4IDUuNTc0MjE5IEMgMi4wODU5MzggNS43MTA5MzggMi4wMDc4MTIgNS45NTMxMjUgMi4wNzgxMjUgNi4xNzU3ODEgTCAzLjc2NTYyNSAxMS4zNjcxODggQyAzLjgzNTkzOCAxMS41ODU5MzggNC4wNDI5NjkgMTEuNzM4MjgxIDQuMjc3MzQ0IDExLjczODI4MSBMIDkuNzM0Mzc1IDExLjczODI4MSBDIDkuOTY4NzUgMTEuNzM4MjgxIDEwLjE3NTc4MSAxMS41ODU5MzggMTAuMjQ2MDk0IDExLjM2NzE4OCBMIDExLjkzMzU5NCA2LjE3NTc4MSBDIDEyLjAwMzkwNiA1Ljk1MzEyNSAxMS45MjU3ODEgNS43MTA5MzggMTEuNzM4MjgxIDUuNTc0MjE5IFogTSA3LjMyNDIxOSAyLjM2MzI4MSAiLz4KPC9nPgo8L3N2Zz4K',
            },
          },
          {
            name: 'Rhombus 2',
            toolbar: { width: 20, height: 20 },
            value: {
              src: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0icHgiIGhlaWdodD0iMTRweCIgdmlld0JveD0iMCAwIDE0IDE0IiB2ZXJzaW9uPSIxLjEiPgo8ZyBpZD0ic3VyZmFjZTEiPgo8cGF0aCBzdHlsZT0iIHN0cm9rZTpub25lO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6cmdiKDAlLDAlLDAlKTtmaWxsLW9wYWNpdHk6MTsiIGQ9Ik0gMS43Njk1MzEgNy44OTA2MjUgQyAxLjI3NzM0NCA3LjM5ODQzOCAxLjI3NzM0NCA2LjYwMTU2MiAxLjc2OTUzMSA2LjEwOTM3NSBMIDYuMTA5Mzc1IDEuNzY5NTMxIEMgNi42MDE1NjIgMS4yNzczNDQgNy4zOTg0MzggMS4yNzczNDQgNy44OTA2MjUgMS43Njk1MzEgTCAxMi4yMzA0NjkgNi4xMDkzNzUgQyAxMi43MjI2NTYgNi42MDE1NjIgMTIuNzIyNjU2IDcuMzk4NDM4IDEyLjIzMDQ2OSA3Ljg5MDYyNSBMIDcuODkwNjI1IDEyLjIzMDQ2OSBDIDcuMzk4NDM4IDEyLjcyMjY1NiA2LjYwMTU2MiAxMi43MjI2NTYgNi4xMDkzNzUgMTIuMjMwNDY5IFogTSAyLjM2MzI4MSA2LjcwMzEyNSBDIDIuMTk5MjE5IDYuODY3MTg4IDIuMTk5MjE5IDcuMTMyODEyIDIuMzYzMjgxIDcuMjk2ODc1IEwgNi43MDMxMjUgMTEuNjM2NzE5IEMgNi44NjcxODggMTEuODAwNzgxIDcuMTMyODEyIDExLjgwMDc4MSA3LjI5Njg3NSAxMS42MzY3MTkgTCAxMS42MzY3MTkgNy4yOTY4NzUgQyAxMS44MDA3ODEgNy4xMzI4MTIgMTEuODAwNzgxIDYuODY3MTg4IDExLjYzNjcxOSA2LjcwMzEyNSBMIDcuMjk2ODc1IDIuMzYzMjgxIEMgNy4xMzI4MTIgMi4xOTkyMTkgNi44NjcxODggMi4xOTkyMTkgNi43MDMxMjUgMi4zNjMyODEgWiBNIDIuMzYzMjgxIDYuNzAzMTI1ICIvPgo8L2c+Cjwvc3ZnPgo=',
            },
          },
          {
            name: 'Cube 2',
            toolbar: { width: 20, height: 20 },
            value: {
              src: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0icHgiIGhlaWdodD0iMTRweCIgdmlld0JveD0iMCAwIDE0IDE0IiB2ZXJzaW9uPSIxLjEiPgo8ZyBpZD0ic3VyZmFjZTEiPgo8cGF0aCBzdHlsZT0iIHN0cm9rZTpub25lO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6cmdiKDAlLDAlLDAlKTtmaWxsLW9wYWNpdHk6MTsiIGQ9Ik0gMy42Njc5NjkgNC43NSBDIDMuNzUgNC41MzUxNTYgMy45OTIxODggNC40MjU3ODEgNC4yMDcwMzEgNC41MDc4MTIgTCA3IDUuNTY2NDA2IEwgOS43ODkwNjIgNC41MDc4MTIgQyAxMC4wMDc4MTIgNC40MjU3ODEgMTAuMjUgNC41MzUxNTYgMTAuMzMyMDMxIDQuNzUgQyAxMC40MTQwNjIgNC45Njg3NSAxMC4zMDQ2ODggNS4yMTA5MzggMTAuMDg5ODQ0IDUuMjkyOTY5IEwgNy40MjE4NzUgNi4zMDQ2ODggTCA3LjQyMTg3NSA5LjM3ODkwNiBDIDcuNDIxODc1IDkuNjEzMjgxIDcuMjMwNDY5IDkuODAwNzgxIDcgOS44MDA3ODEgQyA2Ljc2OTUzMSA5LjgwMDc4MSA2LjU3ODEyNSA5LjYxMzI4MSA2LjU3ODEyNSA5LjM3ODkwNiBMIDYuNTc4MTI1IDYuMzA0Njg4IEwgMy45MTAxNTYgNS4yOTI5NjkgQyAzLjY5NTMxMiA1LjIxMDkzOCAzLjU4NTkzOCA0Ljk2ODc1IDMuNjY3OTY5IDQuNzUgWiBNIDYuMjEwOTM4IDEuNjg3NSBDIDYuNzE4NzUgMS40ODA0NjkgNy4yODEyNSAxLjQ4MDQ2OSA3Ljc4OTA2MiAxLjY4NzUgTCAxMS45ODgyODEgMy4zOTA2MjUgQyAxMi4zNTkzNzUgMy41MzkwNjIgMTIuNjAxNTYyIDMuODk4NDM4IDEyLjYwMTU2MiA0LjI5Njg3NSBMIDEyLjYwMTU2MiA5LjcwMzEyNSBDIDEyLjYwMTU2MiAxMC4xMDE1NjIgMTIuMzU5Mzc1IDEwLjQ2MDkzOCAxMS45ODgyODEgMTAuNjA5Mzc1IEwgNy43ODkwNjIgMTIuMzEyNSBDIDcuMjgxMjUgMTIuNTE5NTMxIDYuNzE4NzUgMTIuNTE5NTMxIDYuMjEwOTM4IDEyLjMxMjUgTCAyLjAxMTcxOSAxMC42MDkzNzUgQyAxLjY0MDYyNSAxMC40NjA5MzggMS4zOTg0MzggMTAuMTAxNTYyIDEuMzk4NDM4IDkuNzAzMTI1IEwgMS4zOTg0MzggNC4yOTY4NzUgQyAxLjM5ODQzOCAzLjg5ODQzOCAxLjY0MDYyNSAzLjUzOTA2MiAyLjAxMTcxOSAzLjM5MDYyNSBaIE0gNy40NzI2NTYgMi40NjQ4NDQgQyA3LjE2Nzk2OSAyLjM0Mzc1IDYuODMyMDMxIDIuMzQzNzUgNi41MjczNDQgMi40NjQ4NDQgTCAyLjMyODEyNSA0LjE2Nzk2OSBDIDIuMjczNDM4IDQuMTg3NSAyLjIzODI4MSA0LjI0MjE4OCAyLjIzODI4MSA0LjI5Njg3NSBMIDIuMjM4MjgxIDkuNzAzMTI1IEMgMi4yMzgyODEgOS43NjE3MTkgMi4yNzM0MzggOS44MTI1IDIuMzI4MTI1IDkuODMyMDMxIEwgNi41MjczNDQgMTEuNTM1MTU2IEMgNi44MzIwMzEgMTEuNjU2MjUgNy4xNjc5NjkgMTEuNjU2MjUgNy40NzI2NTYgMTEuNTM1MTU2IEwgMTEuNjcxODc1IDkuODMyMDMxIEMgMTEuNzI2NTYyIDkuODEyNSAxMS43NjE3MTkgOS43NjE3MTkgMTEuNzYxNzE5IDkuNzAzMTI1IEwgMTEuNzYxNzE5IDQuMjk2ODc1IEMgMTEuNzYxNzE5IDQuMjQyMTg4IDExLjcyNjU2MiA0LjE4NzUgMTEuNjcxODc1IDQuMTY3OTY5IFogTSA3LjQ3MjY1NiAyLjQ2NDg0NCAiLz4KPC9nPgo8L3N2Zz4K',
            },
          },
          {
            name: 'Circle 2',
            toolbar: { width: 20, height: 20 },
            value: {
              src: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0icHgiIGhlaWdodD0iMTRweCIgdmlld0JveD0iMCAwIDE0IDE0IiB2ZXJzaW9uPSIxLjEiPgo8ZyBpZD0ic3VyZmFjZTEiPgo8cGF0aCBzdHlsZT0iIHN0cm9rZTpub25lO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6cmdiKDAlLDAlLDAlKTtmaWxsLW9wYWNpdHk6MTsiIGQ9Ik0gNyAyLjIzODI4MSBDIDQuMzcxMDk0IDIuMjM4MjgxIDIuMjM4MjgxIDQuMzcxMDk0IDIuMjM4MjgxIDcgQyAyLjIzODI4MSA5LjYyODkwNiA0LjM3MTA5NCAxMS43NjE3MTkgNyAxMS43NjE3MTkgQyA5LjYyODkwNiAxMS43NjE3MTkgMTEuNzYxNzE5IDkuNjI4OTA2IDExLjc2MTcxOSA3IEMgMTEuNzYxNzE5IDQuMzcxMDk0IDkuNjI4OTA2IDIuMjM4MjgxIDcgMi4yMzgyODEgWiBNIDEuMzk4NDM4IDcgQyAxLjM5ODQzOCAzLjkwNjI1IDMuOTA2MjUgMS4zOTg0MzggNyAxLjM5ODQzOCBDIDEwLjA5Mzc1IDEuMzk4NDM4IDEyLjYwMTU2MiAzLjkwNjI1IDEyLjYwMTU2MiA3IEMgMTIuNjAxNTYyIDEwLjA5Mzc1IDEwLjA5Mzc1IDEyLjYwMTU2MiA3IDEyLjYwMTU2MiBDIDMuOTA2MjUgMTIuNjAxNTYyIDEuMzk4NDM4IDEwLjA5Mzc1IDEuMzk4NDM4IDcgWiBNIDEuMzk4NDM4IDcgIi8+CjwvZz4KPC9zdmc+Cg==',
            },
          },
        ],
      },
    ],
  },
});
Editor.argTypes = {
  format: {
    options: Object.values(formats),
    control: { type: 'select' },
  },
  messageType: {
    options: [undefined, 'warning', 'error'],
    control: { type: 'select' },
  },
  charactersLimit: {
    type: 'number',
  },
};
Editor.args = {
  name: 'content',
  placeholder: 'Insert text here...',
  preserveWhitespace: false,
  format: formats.markdown,
  debug: debugLevels.warn,
  modules,
  disabled: false,
  required: false,
  labelConfig: {
    icon: '',
    text: 'Content',
    description: '',
    locales: {
      optional: 'Optional',
    },
  },
  message: '',
  messageType: undefined,
  autoFocus: false,
  charactersLimit: 0,
  warningThreshold: 0,
};
