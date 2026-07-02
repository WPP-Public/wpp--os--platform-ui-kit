export class MockSpeechRecognition {
  constructor() {
    this.continuous = false;
    this.interimResults = false;
    this.lang = '';
    this.onresult = null;
    this.onerror = null;
    this.onend = null;
    this.start = jest.fn();
    this.stop = jest.fn();
    this.abort = jest.fn();
  }
}
