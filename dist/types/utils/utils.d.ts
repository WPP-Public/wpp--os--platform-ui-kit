import { AriaProps } from '../components';
export declare function format(first?: string, middle?: string, last?: string): string;
export declare const hasShadowDom: (el: HTMLElement) => boolean;
export declare const getSlotEmptyStates: <T extends string>(nodes?: Node[] | NodeListOf<Node>, slotSelectors?: Record<T, string> | undefined) => Record<T | "main", boolean>;
export declare const debounce: <T extends (...args: any[]) => ReturnType<T>>(callback: T, timeout: number) => (...args: Parameters<T>) => void;
export declare const uuidv4: () => string;
export declare const areSetsEqual: <T = any>(a: Set<T>, b: Set<T>) => boolean;
export declare const isEventTargetContained: (containerEl: HTMLElement, event: Event) => boolean;
export declare const hasParentWithId: (target: HTMLElement, id: string) => boolean;
export declare const truncate: (value: string | undefined, maxLength: number, evenly?: boolean) => string;
export declare const toKebabCase: (str: string) => string;
export declare const isObject: (val: any) => boolean;
export declare const recursiveObjectMap: <T>(initObj: T, mapFunction: (a: string | number) => string | number) => T;
export declare const getHighlightData: (initString?: string, initSearch?: string) => {
  firstPart: string;
  highlight: string;
  secondPart: string;
};
export declare const transformToVersionedTag: (tag: string) => string;
export declare function closestElement(selector: string, base: Window | Document | Element): Element | null;
export declare const applyBodyStylesIfNeeded: (action: 'remove' | 'add') => void;
export declare const autoFocusElement: (shouldFocus: boolean, el?: HTMLInputElement | HTMLTextAreaElement | HTMLElement) => void;
type FormObjectType = Record<string, string | string[]>;
export declare const form2object: (form: HTMLFormElement) => FormObjectType;
export declare const getDurationValues: (duration?: number | [number, number], componentDefaultValues?: [number, number]) => [number, number];
export declare const selectDropdownWidth: (dropdownWidth: string, triggerEl: HTMLElement | null | undefined, host: HTMLElement) => string;
export declare function getHasFocused(): boolean;
export declare function setHasFocused(value: boolean): void;
export declare function getHighestContainerInDOM(): HTMLElement;
/**
 * Returns the height of the OS bar in pixels.
 * Queries for the first header child of the container with the `.wpp` class,
 * which is the standard structure of the OS bar in first-party applications.
 * Falls back to a default of 64px if the OS bar cannot be found.
 */
export declare function getOsBarOffsetHeight(): number;
export declare const getAriaProps: (ariaProps: AriaProps) => Record<string, string>;
export declare const isWppElement: (element: HTMLElement) => boolean;
export {};
