export declare class WppRichtextMarkdown {
  /**
   * Editor value
   */
  value: string;
  private markdown;
  private turndown;
  handleValueChange(newValue: string): void;
  connectedCallback(): void;
  render(): any;
}
