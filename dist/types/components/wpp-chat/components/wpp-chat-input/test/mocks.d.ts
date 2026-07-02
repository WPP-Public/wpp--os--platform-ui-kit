/// <reference types="jest" />
export declare class MockSpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
  start: jest.Mock<any, any>;
  stop: jest.Mock<any, any>;
  abort: jest.Mock<any, any>;
}
