export type SpeechRecognitionStartOptions = {
  onTranscript: (text: string) => void;
  baseText?: string;
  onStop?: (event?: Event) => void;
};
export declare class SpeechRecognitionService {
  private recognition;
  private baseText;
  private lastEmittedText;
  private hasStopped;
  private getSpeechRecognitionAPI;
  get isSupported(): boolean;
  setupRecognition: (lang?: string) => boolean;
  startRecognition: ({ baseText, onTranscript, onStop }: SpeechRecognitionStartOptions) => void;
  stopRecognition: () => void;
  private mergeTranscript;
  private extractTranscript;
}
