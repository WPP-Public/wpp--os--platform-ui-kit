export declare class WppRichtextHtml {
  /**
   * Editor value
   */
  value: string;
  /**
   * Ensure every `<img>` in the raw HTML carries an `alt` attribute. Author
   * content frequently ships images without one, which fails WCAG 1.1.1 (AXE
   * `image-alt`) once injected verbatim. Missing alts default to `""`
   * (decorative); author-provided alt text is left untouched. Parsing happens
   * in an inert `<template>`, so no scripts run and no resources load.
   */
  private withImageAlts;
  render(): any;
}
