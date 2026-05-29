export type ThemeAttributeValues = 'light' | 'dark';
type SubscriberCallback = (theme: ThemeAttributeValues) => void;
export declare class ThemeObserverService {
  private observer;
  private subscribers;
  private attribute;
  configure: (attribute: string) => void;
  getThemeAttribute: () => ThemeAttributeValues;
  subscribe: (cb: SubscriberCallback) => () => void;
  private notifySubscribers;
  private restartObserver;
  private startObserving;
  private stopObserving;
}
export declare const themeObserver: ThemeObserverService;
export {};
