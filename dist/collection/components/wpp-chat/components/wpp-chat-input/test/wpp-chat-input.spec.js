import { newSpecPage } from '@stencil/core/testing';
import { WppChatInput } from '../wpp-chat-input';
describe('wpp-chat-input', () => {
  it('should render chat input with attachments enabled', async () => {
    const page = await newSpecPage({
      components: [WppChatInput],
      html: `<wpp-chat-input enableAttach="true"></wpp-chat-input>`,
    });
    expect(page.root).toMatchSnapshot();
    expect(page.root).toHaveAttribute('enableAttach');
  });
  it('should apply custom file upload configuration', async () => {
    const page = await newSpecPage({
      components: [WppChatInput],
      html: `<wpp-chat-input fileUploadConfig='{"maxFiles": 3, "size": 100, "accept": [".jpg", ".png"]}'></wpp-chat-input>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should trigger wppSend event when sending a message', async () => {
    const page = await newSpecPage({
      components: [WppChatInput],
      html: `<wpp-chat-input></wpp-chat-input>`,
    });
    const chatInput = page.rootInstance;
    const sendSpy = jest.fn();
    chatInput.wppSend = { emit: sendSpy };
    chatInput.textValue = 'Hello, World!';
    chatInput.handleSend();
    expect(sendSpy).toHaveBeenCalledWith({
      message: 'Hello, World!',
      attachments: [],
    });
  });
});
