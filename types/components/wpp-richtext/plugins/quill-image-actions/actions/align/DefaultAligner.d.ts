import type { Quill as IQuill } from 'quill';
import { Aligner } from './Aligner';
import { Alignment } from './Alignment';
import DefaultOptions from '../../Options';
export default class DefaultAligner implements Aligner {
  alignments: {
    [key: string]: Alignment;
  };
  alignAttribute: string;
  applyStyle: boolean;
  quill: IQuill;
  constructor(quill: IQuill, options: (typeof DefaultOptions)['align']);
  getContext(el: HTMLElement): {
    blot: any;
    index: number;
    precedesNewline: boolean | undefined;
  } | null;
  getAlignments(): Alignment[];
  clear(el: HTMLElement): void;
  isAligned(el: HTMLElement, alignment: Alignment): boolean;
}
