class SpeechRecognitionService {
  constructor() {
    this.recognition = null;
    this.baseText = '';
    this.lastEmittedText = null;
    this.hasStopped = false;
    this.getSpeechRecognitionAPI = () => window.SpeechRecognition || window.webkitSpeechRecognition;
    this.setupRecognition = (lang) => {
      const SpeechRecognitionAPI = this.getSpeechRecognitionAPI();
      if (!SpeechRecognitionAPI)
        return false;
      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = true;
      recognition.interimResults = true;
      if (lang) {
        recognition.lang = lang;
      }
      this.recognition = recognition;
      return true;
    };
    this.startRecognition = ({ baseText = '', onTranscript, onStop }) => {
      if (!this.recognition)
        return;
      this.baseText = baseText.trim();
      this.lastEmittedText = null;
      this.hasStopped = false;
      this.recognition.onresult = (event) => {
        const text = this.mergeTranscript(this.extractTranscript(event));
        if (text === this.lastEmittedText)
          return;
        this.lastEmittedText = text;
        onTranscript(text);
      };
      const handleStop = (event) => {
        if (this.hasStopped)
          return;
        this.hasStopped = true;
        onStop?.(event);
      };
      this.recognition.onerror = handleStop;
      this.recognition.onend = () => handleStop();
      this.recognition.start();
    };
    this.stopRecognition = () => {
      if (!this.recognition)
        return;
      this.recognition.onresult = null;
      this.recognition.onend = null;
      this.recognition.onerror = null;
      this.recognition.stop();
    };
    this.mergeTranscript = (transcript) => this.baseText ? `${this.baseText} ${transcript}` : transcript;
    this.extractTranscript = (event) => {
      let text = '';
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      return text;
    };
  }
  get isSupported() {
    return Boolean(this.getSpeechRecognitionAPI());
  }
}

export { SpeechRecognitionService as S };
