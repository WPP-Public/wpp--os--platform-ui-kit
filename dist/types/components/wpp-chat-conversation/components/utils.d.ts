import { Token } from 'marked';
import { ChatImageData } from './types';
export declare const extractImageData: (t: Token) => ChatImageData | null;
export declare const transformImageGroups: (token: Token) => void;
export declare const getMarkdownTokens: (text: string) => import("marked").TokensList;
export declare const findSafeBoundary: (text: string) => number;
export declare const handleDownload: (href: string, alt?: string) => Promise<void>;
