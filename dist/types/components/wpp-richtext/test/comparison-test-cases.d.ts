/**
 * @file Comparison test cases for Quill→Tiptap migration validation
 * @description Predefined HTML test cases with frozen Quill reference output used to compare
 *   side-by-side with live Tiptap editor output. Covers formatting, lists, links, images,
 *   mixed content, edge cases, and XSS safety.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
export interface ComparisonTestCase {
  /** Human-readable label */
  id: string;
  /** Descriptive name */
  name: string;
  /** The HTML input value to feed into both editors */
  inputHtml: string;
  /** Frozen Quill reference output (captured from old implementation) */
  quillReferenceHtml: string;
  /** Category tag */
  category: 'formatting' | 'lists' | 'blocks' | 'links' | 'images' | 'mixed' | 'edge' | 'xss' | 'markdown';
}
export declare const COMPARISON_TEST_CASES: ComparisonTestCase[];
/**
 * Normalize HTML for comparison — strips insignificant whitespace,
 * class attributes, self-closing tag differences.
 */
export declare function normalizeHtml(html: string): string;
/**
 * Run a single comparison test.
 * Returns match status and diff details.
 */
export declare function runComparison(testCase: ComparisonTestCase, tiptapOutput: string): {
  match: boolean;
  normalized: {
    expected: string;
    actual: string;
  };
};
