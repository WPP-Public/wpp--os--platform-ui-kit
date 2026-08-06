import { html, render } from 'lit-html';
import { transformToVersionedTag } from '../../../../utils/utils';
export default {
  title: 'Design System/Components/Selection and input/Chat Input',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
  },
  argTypes: {
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
// Mock list of additional AI models used to showcase the model selector via the
// "Show/Hide models" toggle. By default the story renders with no extra models.
const MOCK_MODELS = [
  { id: '1', label: 'Gemini 3.5 Flash', logo: 'https://public-assets.os.wpp.com/logos/ai-gemini.svg' },
  { id: '2', label: 'Claude 4.6 Sonnet', logo: 'https://public-assets.os.wpp.com/logos/ai-claude.svg' },
  { id: '3', label: 'GPT 5.4 mini', logo: 'https://public-assets.os.wpp.com/logos/ai-openai.svg' },
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
    // Toolbar toggles let a single story demonstrate the alert, thumbnail
    // attachments and references/quotes without separate stories.
    let showAlert = false;
    let showAttachments = false;
    let showReferences = false;
    let showModels = false;
    let references = [...REFERENCES];
    let renderChatInput = (messages) => {
      console.log(messages);
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
    const toggleModels = () => {
      showModels = !showModels;
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
              <wpp-action-button-v4-3-0 variant=${showAlert ? 'primary' : 'secondary'} @click=${toggleAlert}>
                ${showAlert ? 'Hide alert' : 'Show alert'}
              </wpp-action-button-v4-3-0>
              <wpp-action-button-v4-3-0
                variant=${showAttachments ? 'primary' : 'secondary'}
                @click=${toggleAttachments}
              >
                ${showAttachments ? 'Hide thumbnails' : 'Show thumbnails'}
              </wpp-action-button-v4-3-0>
              <wpp-action-button-v4-3-0 variant=${showReferences ? 'primary' : 'secondary'} @click=${toggleReferences}>
                ${showReferences ? 'Hide references' : 'Show references'}
              </wpp-action-button-v4-3-0>
              <wpp-action-button-v4-3-0 variant=${showModels ? 'primary' : 'secondary'} @click=${toggleModels}>
                ${showModels ? 'Hide models' : 'Show models'}
              </wpp-action-button-v4-3-0>
            </div>

            <div style=${'display: flex;'}>
              <wpp-typography-v4-3-0>Message History:</wpp-typography-v4-3-0>
              <ul style="margin:0;">
                ${updatedMessages.map(msg => html `<li><wpp-typography-v4-3-0>${msg}</wpp-typography-v4-3-0></li>`)}
              </ul>
            </div>

            <div style=${'display: flex; align-items: flex-end; height: 100vh;'}>
              <wpp-chat-input-v4-3-0
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
                .models=${showModels ? MOCK_MODELS : []}
                @wppSend=${handleSendMessage}
                @wppStop=${handleStop}
                @wppMessageChanged=${handleMessageChanged}
                @wppActionsMenuToggle=${(e) => console.log('actions menu toggle', e.detail)}
                @wppActionsMenuItemClick=${(e) => console.log('actions menu item click', e.detail)}
                @wppModelBrowse=${(e) => console.log('Browse model event', e)}
                @wppModelSelect=${(e) => console.log('Select model event', e)}
              >
                ${showAlert
        ? html `
                      <wpp-chat-alert-v4-3-0
                        slot="alert"
                        type="error"
                        message="Connection lost. Please try again."
                        @wppClose=${handleAlertClose}
                      ></wpp-chat-alert-v4-3-0>
                    `
        : null}
                ${showReferences
        ? references.map(reference => html `
                        <wpp-chat-reference-v4-3-0
                          slot="references"
                          .type=${reference.type}
                          .name=${reference.name}
                          .fileType=${reference.fileType}
                          .src=${reference.src}
                          .fileExtension=${reference.fileExtension}
                          .text=${reference.text}
                          @wppClose=${() => handleRemoveReference(reference.id)}
                        ></wpp-chat-reference-v4-3-0>
                      `)
        : null}
              </wpp-chat-input-v4-3-0>
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
  },
};
