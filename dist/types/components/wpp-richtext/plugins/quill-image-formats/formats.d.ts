import type { Quill as IQuill } from 'quill';
export declare function createFormats(Quill: typeof IQuill): {
  Float: import("parchment/dist/src/attributor/class").default;
  Height: import("parchment/dist/src/attributor/attributor").default;
  Width: import("parchment/dist/src/attributor/attributor").default;
};
