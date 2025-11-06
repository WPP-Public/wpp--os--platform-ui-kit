import { AcceptConfig } from './types';
export declare const convertMBToBytes: (size: number) => number;
export declare const getExtension: (filename?: string) => string;
export declare const getExtensionsList: (acceptConfig: AcceptConfig) => string[];
export declare const getBaseName: (fileName?: string) => string;
export declare const renameFile: (file: File, newFileName: string) => File;
export declare const modifyPropertiesOnFile: (file: File, properties: Partial<File>) => File;
export declare const getIconNames: () => string[];
export declare const renderIcons: () => import("@stencil/core").VNode[];
