import { html, render } from 'lit-html';
import { transformToVersionedTag } from '../../../../utils/utils';
// Brand model logos, inlined as data URIs so the stories render the same icons
// as the React example app without depending on external assets.
const toDataUri = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
const AI_GEMINI_LOGO = toDataUri(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#g0)"><path d="M22 12.02C19.4052 12.1792 16.9583 13.2818 15.12 15.12C13.2818 16.9583 12.1792 19.4052 12.02 22H11.98C11.821 19.4051 10.7185 16.958 8.88025 15.1197C7.04198 13.2815 4.59485 12.179 2 12.02L2 11.98C4.59485 11.821 7.04198 10.7185 8.88025 8.88025C10.7185 7.04198 11.821 4.59485 11.98 2L12.02 2C12.1792 4.59476 13.2818 7.04173 15.12 8.87996C16.9583 10.7182 19.4052 11.8208 22 11.98V12.02Z" fill="url(#gp)"/></g><defs><radialGradient id="gp" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(3.985 10.1287) rotate(18.6832) scale(21.2875 170.526)"><stop offset="0.067" stop-color="#9168C0"/><stop offset="0.343" stop-color="#5684D1"/><stop offset="0.672" stop-color="#1BA1E3"/></radialGradient><clipPath id="g0"><rect width="20" height="20" fill="white" transform="translate(2 2)"/></clipPath></defs></svg>`);
const AI_CLAUDE_LOGO = toDataUri(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#c0)"><path d="M5.92091 15.3L9.85396 13.0933L9.9201 12.9016L9.85396 12.795H9.6623L9.00499 12.7545L6.75773 12.6938L4.80875 12.6128L2.9205 12.5115L2.4454 12.4103L2 11.8232L2.04589 11.5303L2.4454 11.2617L3.01768 11.3116L4.28236 11.398L6.18005 11.529L7.55676 11.6099L9.59617 11.8218H9.9201L9.96599 11.6909L9.85531 11.6099L9.76893 11.529L7.8051 10.1981L5.67931 8.79174L4.5658 7.98192L3.96383 7.5716L3.66014 7.18693L3.52922 6.34742L4.07585 5.74545L4.8101 5.79538L4.99771 5.84532L5.7414 6.4176L7.33 7.64719L9.40451 9.17506L9.70819 9.42745L9.82967 9.34107L9.84451 9.28034L9.70819 9.05223L8.57984 7.01282L7.3759 4.93832L6.84006 4.07855L6.69834 3.56296C6.6484 3.35106 6.61196 3.1729 6.61196 2.95559L7.23417 2.11068L7.57835 2L8.40842 2.11068L8.758 2.41436L9.27359 3.59401L10.1091 5.45121L11.4048 7.97652L11.784 8.7256L11.9865 9.41936L12.0621 9.63126H12.193V9.50979L12.2996 8.08719L12.4967 6.34067L12.6884 4.0934L12.7545 3.46039L13.0676 2.70185L13.6898 2.29154L14.1757 2.52369L14.5752 3.09596L14.5199 3.46579L14.2824 5.00985L13.8167 7.42853L13.513 9.04819H13.6898L13.8923 8.84573L14.7116 7.75786L16.0883 6.03698L16.6956 5.35403L17.4042 4.59954L17.8591 4.24052H18.7189L19.3519 5.18127L19.0684 6.15306L18.183 7.27602L17.4488 8.22756L16.396 9.64476L15.7387 10.7785L15.7994 10.8689L15.956 10.8541L18.3342 10.348L19.6191 10.1158L21.1524 9.85261L21.8461 10.1765L21.9217 10.5059L21.6491 11.1794L20.0092 11.5843L18.0858 11.969L15.2218 12.6465L15.1867 12.6722L15.2272 12.7221L16.5175 12.8436L17.0695 12.8733H18.4206L20.9364 13.0609L21.5937 13.4955L21.9879 14.0273L21.9217 14.4322L20.9094 14.9478L19.5435 14.6238L16.3555 13.8653L15.2622 13.5927H15.1111V13.6831L16.0221 14.5739L17.6917 16.0815L19.7824 18.0251L19.8891 18.5056L19.6205 18.8849L19.337 18.8444L17.5001 17.4623L16.7915 16.8401L15.1867 15.489H15.08V15.6307L15.4499 16.172L17.4029 19.1076L17.5041 20.0078L17.3624 20.3007L16.8563 20.4775L16.3002 20.3763L15.157 18.7715L13.9773 16.9642L13.0258 15.3446L12.9097 15.4107L12.3482 21.4588L12.085 21.7679L11.4777 22L10.9715 21.6153L10.7029 20.9931L10.9715 19.7635L11.2955 18.1587L11.5586 16.8833L11.7962 15.2987L11.9379 14.7723L11.9285 14.7372L11.8124 14.7521L10.6179 16.392L8.80119 18.8471L7.36375 20.3857L7.01957 20.5221L6.423 20.213L6.47834 19.661L6.81172 19.1697L8.80119 16.639L10.0011 15.0706L10.7758 14.1649L10.7704 14.034H10.7245L5.44041 17.465L4.49966 17.5865L4.09475 17.2072L4.14469 16.585L4.33635 16.3825L5.92496 15.2892L5.91956 15.2946L5.92091 15.3Z" fill="#D97757"/></g><defs><clipPath id="c0"><rect width="20" height="20" fill="white" transform="translate(2 2)"/></clipPath></defs></svg>`);
const AI_OPENAI_LOGO = toDataUri(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#o0)"><path d="M20.5662 10.1856C21.0199 8.82372 20.8637 7.33185 20.1381 6.0931C19.0468 4.1931 16.8531 3.2156 14.7106 3.6756C13.7574 2.60185 12.3881 1.99122 10.9524 1.99997C8.76244 1.99497 6.81932 3.40497 6.14557 5.48872C4.73869 5.77685 3.52432 6.65747 2.81369 7.9056C1.71432 9.8006 1.96494 12.1893 3.43369 13.8143C2.97994 15.1762 3.13619 16.6681 3.86182 17.9068C4.95307 19.8068 7.14682 20.7843 9.28932 20.3243C10.2418 21.3981 11.6118 22.0087 13.0474 21.9993C15.2387 22.005 17.1824 20.5937 17.8562 18.5081C19.2631 18.22 20.4774 17.3393 21.1881 16.0912C22.2862 14.1962 22.0349 11.8093 20.5668 10.1843L20.5662 10.1856ZM13.0487 20.6925C12.1718 20.6937 11.3224 20.3868 10.6493 19.825C10.6799 19.8087 10.7331 19.7793 10.7674 19.7581L14.7499 17.4581C14.9537 17.3425 15.0787 17.1256 15.0774 16.8912V11.2768L16.7606 12.2487C16.7787 12.2575 16.7906 12.275 16.7931 12.295V16.9443C16.7906 19.0118 15.1162 20.6881 13.0487 20.6925ZM4.99619 17.2531C4.55682 16.4943 4.39869 15.605 4.54932 14.7418C4.57869 14.7593 4.63057 14.7912 4.66744 14.8125L8.64994 17.1125C8.85182 17.2306 9.10182 17.2306 9.30432 17.1125L14.1662 14.305V16.2487C14.1674 16.2687 14.1581 16.2881 14.1424 16.3006L10.1168 18.625C8.32369 19.6575 6.03369 19.0437 4.99682 17.2531H4.99619ZM3.94807 8.55997C4.38557 7.79997 5.07619 7.21872 5.89869 6.91685C5.89869 6.95122 5.89682 7.01185 5.89682 7.05435V11.655C5.89557 11.8887 6.02057 12.1056 6.22369 12.2212L11.0856 15.0281L9.40244 16C9.38557 16.0112 9.36432 16.0131 9.34557 16.005L5.31932 13.6787C3.52994 12.6425 2.91619 10.3531 3.94744 8.5606L3.94807 8.55997ZM17.7768 11.7781L12.9149 8.9706L14.5981 7.99935C14.6149 7.9881 14.6362 7.98622 14.6549 7.99435L18.6812 10.3187C20.4737 11.3543 21.0881 13.6475 20.0524 15.44C19.6143 16.1987 18.9243 16.78 18.1024 17.0825V12.3443C18.1043 12.1106 17.9799 11.8943 17.7774 11.7781H17.7768ZM19.4518 9.25685C19.4224 9.23872 19.3706 9.20747 19.3337 9.18622L15.3512 6.88622C15.1493 6.7681 14.8993 6.7681 14.6968 6.88622L9.83494 9.69372V7.74997C9.83369 7.72997 9.84307 7.7106 9.85869 7.6981L13.8843 5.3756C15.6774 4.34122 17.9699 4.95685 19.0037 6.7506C19.4406 7.5081 19.5987 8.39497 19.4506 9.25685H19.4518ZM8.91994 12.7212L7.23619 11.7493C7.21807 11.7406 7.20619 11.7231 7.20369 11.7031V7.05372C7.20494 4.98372 8.88432 3.30622 10.9543 3.30747C11.8299 3.30747 12.6774 3.61497 13.3506 4.17497C13.3199 4.19122 13.2674 4.2206 13.2324 4.24185L9.24994 6.54185C9.04619 6.65747 8.92119 6.87372 8.92244 7.1081L8.91994 12.72V12.7212ZM9.83432 10.75L11.9999 9.49935L14.1656 10.7493V13.25L11.9999 14.5L9.83432 13.25V10.75Z" fill="black"/></g><defs><clipPath id="o0"><rect width="20" height="20" fill="white" transform="translate(2 2)"/></clipPath></defs></svg>`);
export default {
  title: 'Design System/Components/Selection and input/Chat Input',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
  },
  argTypes: {
    enableAttach: { control: { type: 'boolean' }, defaultValue: false },
    actions: { control: { type: 'object' } },
    // enableMic: { control: { type: 'boolean' }, defaultValue: false },
    disabled: { control: { type: 'boolean' }, defaultValue: false },
    isGenerating: { control: { type: 'boolean' }, defaultValue: false },
    fileUploadConfig: { control: { type: 'object' } },
    size: {
      control: { type: 'select' },
      options: ['s', 'm'],
      defaultValue: 'm',
    },
    textValue: { control: { type: 'text' }, defaultValue: '' },
    debounceEnabled: { control: { type: 'boolean' }, defaultValue: true },
    debounceDelay: { control: { type: 'number' }, defaultValue: 300 },
    locales: { control: { type: 'object' } },
    ariaProps: { control: { type: 'object' } },
    htmlAttributes: { control: { type: 'object' } },
  },
};
// Inline SVG preview so the image thumbnail renders without external assets.
const IMAGE_PREVIEW = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'>" +
  "<rect width='80' height='80' fill='%234C9AFF'/><circle cx='40' cy='40' r='18' fill='%23FFFFFF'/></svg>";
// Pre-populated attachments showcasing the chat thumbnail cards across an image
// preview, file-type icons, a loading state and an error state.
const THUMBNAIL_ATTACHMENTS = [
  { url: IMAGE_PREVIEW, name: 'campaign-hero.png', size: 245678, type: 'image/png' },
  { url: 'https://fake-url/creative-brief.pdf', name: 'creative-brief.pdf', size: 184320, type: 'application/pdf' },
  {
    url: 'https://fake-url/quarterly-budget.xlsx',
    name: 'quarterly-budget.xlsx',
    size: 982135,
    type: 'application/vnd.ms-excel',
  },
  { url: 'https://fake-url/brand-assets.zip', name: 'brand-assets.zip', size: 10485760, type: 'application/zip' },
  {
    url: 'https://fake-url/uploading.png',
    name: 'uploading-asset.png',
    size: 245678,
    type: 'image/png',
    isLoading: true,
  },
  {
    url: 'https://fake-url/too-big.mp4',
    name: 'oversized-clip.mp4',
    size: 90000000,
    type: 'video/mp4',
    sizeError: true,
  },
];
const MODEL_OPTIONS = [
  { label: 'Gemini 3.5 Flash', value: 'gemini', logo: AI_GEMINI_LOGO },
  { label: 'Claude 4.6 Sonnet', value: 'claude', logo: AI_CLAUDE_LOGO },
  { label: 'GPT 5.4 mini', value: 'openai', logo: AI_OPENAI_LOGO },
];
// Sample references (quotes) slotted above the textarea via slot="references".
// One file chip and one text/quote chip exercise both reference variants.
const REFERENCES = [
  { id: 1, type: 'file', name: 'campaign-hero.png', fileType: 'PNG image', src: IMAGE_PREVIEW },
  {
    id: 2,
    type: 'text',
    text: 'The new campaign should emphasise sustainability and local sourcing, keeping the tone optimistic while staying grounded in measurable outcomes for the regional launch.',
  },
  { id: 3, type: 'file', name: 'creative-brief.pdf', fileType: 'PDF document', fileExtension: '.pdf' },
];
export const ChatInput = {
  render: args => {
    let textValue = args.textValue || '';
    let messageHistory = [];
    let isGenerating = args.isGenerating || false;
    let isSelectOpen = false;
    let selectedModel = MODEL_OPTIONS[0].label;
    let selectedLogo = MODEL_OPTIONS[0].logo;
    // Toolbar toggles let a single story demonstrate the alert, thumbnail
    // attachments and references/quotes without separate stories.
    let showAlert = false;
    let showAttachments = false;
    let showReferences = false;
    let references = [...REFERENCES];
    let renderChatInput = (messages) => {
      console.log(messages);
    };
    const dropdownConfig = {
      placement: 'bottom-end',
      // The trigger sits at the bottom of the chat input, so the dropdown usually flips
      // upward. Override the default flip fallback ('top-start') with 'top-end' so the
      // flipped menu stays right-aligned with the trigger, matching the 'bottom-end' intent.
      popperOptions: {
        modifiers: [{ name: 'flip', options: { fallbackPlacements: ['top-end'] } }],
      },
      onShow: () => {
        isSelectOpen = true;
        renderChatInput(messageHistory);
      },
      onHide: () => {
        isSelectOpen = false;
        renderChatInput(messageHistory);
      },
    };
    const handleModelSelect = (model) => {
      selectedModel = model.label;
      selectedLogo = model.logo;
      renderChatInput(messageHistory);
    };
    const handleSendMessage = (event) => {
      const { message, attachments } = event.detail;
      console.log('Message Sent:', message, 'Attachments:', attachments);
      messageHistory = [...messageHistory, message];
      isGenerating = true;
      renderChatInput(messageHistory);
      const chatHtmlTag = transformToVersionedTag('wpp-chat-input');
      const el = document.querySelector(chatHtmlTag);
      textValue = '';
      if (el)
        el.textValue = '';
    };
    const handleStop = () => {
      isGenerating = false;
      renderChatInput(messageHistory);
    };
    const handleMessageChanged = (event) => {
      const chatHtmlTag = transformToVersionedTag('wpp-chat-input');
      const el = document.querySelector(chatHtmlTag);
      textValue = event.detail.value;
      if (el)
        el.textValue = event.detail.value;
    };
    // The alert is slotted into slot="alert" so the component always renders it
    // at the very top of the input frame — it can never appear below the textarea.
    const handleAlertClose = () => {
      showAlert = false;
      renderChatInput(messageHistory);
    };
    const toggleAlert = () => {
      showAlert = !showAlert;
      renderChatInput(messageHistory);
    };
    const toggleAttachments = () => {
      showAttachments = !showAttachments;
      renderChatInput(messageHistory);
    };
    const toggleReferences = () => {
      showReferences = !showReferences;
      if (showReferences)
        references = [...REFERENCES];
      renderChatInput(messageHistory);
    };
    const handleRemoveReference = (id) => {
      references = references.filter(reference => reference.id !== id);
      renderChatInput(messageHistory);
    };
    renderChatInput = (updatedMessages) => {
      const container = document.getElementById('chat-input-story');
      if (!container) {
        console.error('Could not find container element with id "chat-input-story"');
        return;
      }
      render(html `
          <div style=${'display: flex; flex-direction: column; height: 100vh; padding: 20px; box-sizing: border-box;'}>
            <div style=${'display: flex; gap: 8px; margin-bottom: 12px;'}>
              <wpp-action-button-v4-2-0 variant=${showAlert ? 'primary' : 'secondary'} @click=${toggleAlert}>
                ${showAlert ? 'Hide alert' : 'Show alert'}
              </wpp-action-button-v4-2-0>
              <wpp-action-button-v4-2-0
                variant=${showAttachments ? 'primary' : 'secondary'}
                @click=${toggleAttachments}
              >
                ${showAttachments ? 'Hide thumbnails' : 'Show thumbnails'}
              </wpp-action-button-v4-2-0>
              <wpp-action-button-v4-2-0 variant=${showReferences ? 'primary' : 'secondary'} @click=${toggleReferences}>
                ${showReferences ? 'Hide references' : 'Show references'}
              </wpp-action-button-v4-2-0>
            </div>

            <div style=${'display: flex;'}>
              <wpp-typography-v4-2-0>Message History:</wpp-typography-v4-2-0>
              <ul style="margin:0;">
                ${updatedMessages.map(msg => html `<li><wpp-typography-v4-2-0>${msg}</wpp-typography-v4-2-0></li>`)}
              </ul>
            </div>

            <div style=${'display: flex; align-items: flex-end; height: 100vh;'}>
              <wpp-chat-input-v4-2-0
                .enableAttach=${args.enableAttach}
                .actions=${args.actions}
                .disabled=${args.disabled}
                .isGenerating=${isGenerating}
                .fileUploadConfig=${args.fileUploadConfig}
                .attachments=${showAttachments ? THUMBNAIL_ATTACHMENTS : []}
                .size=${args.size}
                .textValue=${textValue}
                .debounceEnabled=${args.debounceEnabled}
                .debounceDelay=${args.debounceDelay}
                .locales=${args.locales}
                .ariaProps=${args.ariaProps}
                .htmlAttributes=${args.htmlAttributes}
                .withSelect=${args.withSelect}
                @wppSend=${handleSendMessage}
                @wppStop=${handleStop}
                @wppMessageChanged=${handleMessageChanged}
                @wppActionsMenuToggle=${(e) => console.log('actions menu toggle', e.detail)}
                @wppActionsMenuItemClick=${(e) => console.log('actions menu item click', e.detail)}
              >
                ${showAlert
        ? html `
                      <wpp-chat-alert-v4-2-0
                        slot="alert"
                        type="error"
                        message="Connection lost. Please try again."
                        @wppClose=${handleAlertClose}
                      ></wpp-chat-alert-v4-2-0>
                    `
        : null}
                ${showReferences
        ? references.map(reference => html `
                        <wpp-chat-reference-v4-2-0
                          slot="references"
                          .type=${reference.type}
                          .name=${reference.name}
                          .fileType=${reference.fileType}
                          .src=${reference.src}
                          .fileExtension=${reference.fileExtension}
                          .text=${reference.text}
                          @wppClose=${() => handleRemoveReference(reference.id)}
                        ></wpp-chat-reference-v4-2-0>
                      `)
        : null}
                <wpp-menu-context-v4-2-0 .slot=${'select'} .dropdownConfig=${dropdownConfig}>
                  <wpp-action-button-v4-2-0
                    slot="trigger-element"
                    variant="secondary"
                    .disabled=${args.disabled}
                    style="height: 32px; --wpp-action-button-font-weight: 400; --wpp-action-button-secondary-icon-color: var(--wpp-grey-color-600);"
                  >
                    ${selectedLogo
        ? html `<wpp-avatar-v4-2-0 slot="icon-start" size="xs" .src=${selectedLogo}></wpp-avatar-v4-2-0>`
        : null}
                    ${selectedModel}
                    <wpp-icon-chevron-v4-2-0
                      slot="icon-end"
                      direction=${isSelectOpen ? 'up' : 'down'}
                    ></wpp-icon-chevron-v4-2-0>
                  </wpp-action-button-v4-2-0>
                  <div>
                    ${MODEL_OPTIONS.map(model => html `
                        <wpp-list-item-v4-2-0
                          .checked=${selectedModel === model.label}
                          @wppChangeListItem=${() => handleModelSelect(model)}
                        >
                          <wpp-avatar-v4-2-0 slot="left" size="xs" .src=${model.logo}></wpp-avatar-v4-2-0>
                          <span slot="label">${model.label}</span>
                        </wpp-list-item-v4-2-0>
                      `)}
                  </div>
                </wpp-menu-context-v4-2-0>
              </wpp-chat-input-v4-2-0>
            </div>
          </div>
        `, container);
    };
    setTimeout(() => {
      renderChatInput(messageHistory);
    }, 0);
    return html `<div id="chat-input-story"></div>`;
  },
  args: {
    // The default story showcases the consolidated actions menu. The reserved
    // `upload` entry already opens the file picker, so we leave the standalone
    // `enableAttach` button off here to avoid two controls that do the same thing.
    enableAttach: false,
    actions: [
      { id: 'upload', icon: 'wpp-icon-attach', label: 'Upload file' },
      { id: 'pinboard', icon: 'wpp-icon-pinned', label: 'Pinboard' },
      { id: 'translate', icon: 'wpp-icon-translate', label: 'Translate' },
    ],
    size: 's',
    disabled: false,
    isGenerating: false,
    debounceEnabled: true,
    debounceDelay: 300,
    // Use locales for visible strings (including placeholder)
    locales: {
      placeholder: 'Type your message...',
      minimizedDescription: 'Expand message input',
      actionsToolbarLabel: 'Message actions',
      attachmentsLabel: 'Attachments',
      sendLabel: 'Send message',
      stopLabel: 'Stop response',
      attachLabel: 'Attach file',
      rightActionsGroupLabel: 'Send and character counter',
      leftActionsGroupLabel: 'Attachments and tools',
      messageInputLabel: 'Message input',
    },
    // ARIA overrides (scoped Pick of AriaProps in the component)
    ariaProps: {
      minimizedTrigger: { label: 'Type your message...' },
      textarea: { label: 'Message input' },
      actionsToolbar: { label: 'Message actions' },
      leftActionsGroup: { label: 'Attachments and tools' },
      rightActionsGroup: { label: 'Send and character counter' },
      sendButton: { label: 'Send message' },
      stopButton: { label: 'Stop response' },
      attachButton: { label: 'Attach file' },
    },
    // Grouped native attributes; DO NOT set maxLength here to allow typing beyond charactersLimit
    htmlAttributes: {
      textarea: { id: 'message', name: 'message', autocomplete: 'off' },
      attachmentsInput: { id: 'ci-files', name: 'attachments', accept: '.jpg,.png,.pdf', multiple: true },
    },
    fileUploadConfig: {
      format: 'base64',
      // Controlled mode makes `attachments` the source of truth, so toggling the
      // prop (Show/Hide thumbnails) re-runs the @Watch and updates the rendered
      // cards. Without it the watch only fires for uncontrolled internal uploads.
      controlled: true,
      multiple: true,
      maxFiles: 5,
      size: 50,
      acceptConfig: {
        'image/png': ['.png'],
        'image/jpeg': ['.jpg', '.jpeg'],
        'application/pdf': ['.pdf'],
      },
      locales: {
        sizeError: 'File too large!',
        formatError: 'Invalid file format!',
        limitError: 'Files limit reached',
      },
    },
    withSelect: true,
  },
};
