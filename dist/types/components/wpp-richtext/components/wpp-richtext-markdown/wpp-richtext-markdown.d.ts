export declare class WppRichtextMarkdown {
  /**
   * Editor value
   */
  value: string;
  private turndownService;
  private markdown;
  handleValueChange(newValue: string): void;
  connectedCallback(): void;
  render(): any;
}
