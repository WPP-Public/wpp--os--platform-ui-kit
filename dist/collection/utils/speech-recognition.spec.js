import { SpeechRecognitionService } from './speech-recognition';
describe('SpeechRecognitionService', () => {
  let service;
  let testWindow;
  beforeEach(() => {
    testWindow = window;
    testWindow.SpeechRecognition = undefined;
    testWindow.webkitSpeechRecognition = undefined;
    service = new SpeechRecognitionService();
  });
  afterEach(() => {
    testWindow.SpeechRecognition = undefined;
    testWindow.webkitSpeechRecognition = undefined;
    jest.restoreAllMocks();
  });
  it('should report unsupported when SpeechRecognition API is not available', () => {
    expect(service.isSupported).toBe(false);
  });
  it('should return false from setupRecognition when SpeechRecognition API is not available', () => {
    expect(service.setupRecognition('en-US')).toBe(false);
  });
  it('should create and configure recognition using SpeechRecognition', () => {
    const recognition = {
      continuous: false,
      interimResults: false,
      lang: '',
      onresult: null,
      onerror: null,
      onend: null,
      start: jest.fn(),
      stop: jest.fn(),
    };
    const speechRecognitionCtor = jest.fn().mockImplementation(() => recognition);
    testWindow.SpeechRecognition = speechRecognitionCtor;
    expect(service.isSupported).toBe(true);
    expect(service.setupRecognition('pt-BR')).toBe(true);
    expect(recognition.continuous).toBe(true);
    expect(recognition.interimResults).toBe(true);
    expect(recognition.lang).toBe('pt-BR');
    expect(speechRecognitionCtor).toHaveBeenCalledTimes(1);
  });
  it('should use webkitSpeechRecognition as fallback', () => {
    const recognition = {
      continuous: false,
      interimResults: false,
      lang: '',
      onresult: null,
      onerror: null,
      onend: null,
      start: jest.fn(),
      stop: jest.fn(),
    };
    const webkitCtor = jest.fn().mockImplementation(() => recognition);
    testWindow.webkitSpeechRecognition = webkitCtor;
    expect(service.setupRecognition('es-ES')).toBe(true);
    expect(recognition.lang).toBe('es-ES');
    expect(webkitCtor).toHaveBeenCalledTimes(1);
  });
  it('should no-op when startRecognition is called before setupRecognition', () => {
    const onTranscript = jest.fn();
    expect(() => service.startRecognition({
      onTranscript,
    })).not.toThrow();
    expect(onTranscript).not.toHaveBeenCalled();
  });
  it('should emit transcript with baseText and suppress duplicates', () => {
    const recognition = {
      continuous: false,
      interimResults: false,
      lang: '',
      onresult: null,
      onerror: null,
      onend: null,
      start: jest.fn(),
      stop: jest.fn(),
    };
    testWindow.SpeechRecognition = jest
      .fn()
      .mockImplementation(() => recognition);
    service.setupRecognition('en-US');
    const onTranscript = jest.fn();
    service.startRecognition({
      baseText: 'Hello',
      onTranscript,
    });
    expect(recognition.start).toHaveBeenCalledTimes(1);
    const resultEvent = {
      results: [[{ transcript: 'world' }]],
    };
    recognition.onresult?.call(recognition, resultEvent);
    recognition.onresult?.call(recognition, resultEvent);
    expect(onTranscript).toHaveBeenCalledTimes(1);
    expect(onTranscript).toHaveBeenCalledWith('Hello world');
  });
  it('should call onStop once even when both error and end fire', () => {
    const recognition = {
      continuous: false,
      interimResults: false,
      lang: '',
      onresult: null,
      onerror: null,
      onend: null,
      start: jest.fn(),
      stop: jest.fn(),
    };
    testWindow.SpeechRecognition = jest
      .fn()
      .mockImplementation(() => recognition);
    service.setupRecognition('en-US');
    const onStop = jest.fn();
    const errorEvent = { error: 'not-allowed' };
    service.startRecognition({
      onTranscript: jest.fn(),
      onStop,
    });
    recognition.onerror?.call(recognition, errorEvent);
    recognition.onend?.call(recognition, new Event('end'));
    expect(onStop).toHaveBeenCalledTimes(1);
    expect(onStop).toHaveBeenCalledWith(errorEvent);
  });
  it('should clear handlers and stop recognition', () => {
    const recognition = {
      continuous: false,
      interimResults: false,
      lang: '',
      onresult: null,
      onerror: null,
      onend: null,
      start: jest.fn(),
      stop: jest.fn(),
    };
    testWindow.SpeechRecognition = jest
      .fn()
      .mockImplementation(() => recognition);
    service.setupRecognition('en-US');
    service.startRecognition({
      onTranscript: jest.fn(),
    });
    service.stopRecognition();
    expect(recognition.onresult).toBeNull();
    expect(recognition.onerror).toBeNull();
    expect(recognition.onend).toBeNull();
    expect(recognition.stop).toHaveBeenCalledTimes(1);
  });
  it('should no-op when stopRecognition is called before setupRecognition', () => {
    expect(() => service.stopRecognition()).not.toThrow();
  });
});
