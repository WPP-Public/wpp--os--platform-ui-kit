import { AcceptConfig, AcceptFamilyLabels, FileItemType } from './types';
export declare const convertMBToBytes: (size: number) => number;
export declare const getExtension: (filename?: string) => string;
export declare const getExtensionsList: (acceptConfig: AcceptConfig) => string[];
/**
 * MIME type implied by a file's extension, or '' when the extension is unknown.
 *
 * `EXTENSION_TO_TYPE` is keyed without the leading dot, while `getExtension` returns one, so the
 * dot is stripped here. Doing it in a single helper keeps file-upload and chat-input from drifting
 * apart on the lookup again.
 */
export declare const inferTypeFromName: (fileName?: string) => string;
/**
 * Tokens for the native `accept` attribute, one entry at a time.
 *
 * An entry that lists extensions contributes those extensions, because they are the narrower
 * filter and the picker has to agree with validation. An entry with no extensions contributes its
 * own key, which is the only way a wildcard family can reach the picker at all.
 */
export declare const getAcceptTokens: (acceptConfig: AcceptConfig) => string[];
/**
 * Human-readable version of the accept tokens for the dropzone hint.
 *
 * Wildcard families have no extension to show, so they resolve through the locale map. The lookup
 * falls back per key rather than through `mergeLocales`, which is a shallow spread and would drop
 * the untouched families the moment a consumer overrides one of them.
 */
export declare const getAcceptLabels: (acceptConfig: AcceptConfig, familyLabels?: AcceptFamilyLabels, defaultFamilyLabels?: AcceptFamilyLabels) => string[];
/**
 * Whether the configuration puts no restriction on the file at all.
 *
 * True for an absent or empty config, and for a match-everything entry that lists no extensions.
 * A match-everything entry that DOES list extensions is not unrestricted - they still narrow it.
 */
export declare const acceptsAnyFile: (acceptConfig: AcceptConfig | undefined) => boolean;
/**
 * Whether a file satisfies the accept configuration.
 *
 * Entries are a union - the file only has to satisfy one of them - while a single entry is an
 * intersection: a file must match the entry's type AND carry one of its extensions, which is what
 * the exact-MIME entries have always meant.
 *
 * A file the browser gave no type for is additionally matched against the union of every listed
 * extension. That fallback predates wildcard support and is keyed off the browser's silence rather
 * than off inference failing, because inference can succeed and still not help: `.jpg` resolves to
 * `image/jpg`, which matches neither `image/png` nor `image/jpeg`. Dropping the fallback in that
 * case would reject files that are accepted today.
 *
 * The fallback deliberately does NOT apply to a file the browser did type, so a typed `image/jpeg`
 * named `report.pdf` stays rejected under a config that lists `.pdf` for `application/pdf`.
 */
export declare const isFileAccepted: (file: Pick<FileItemType, 'name' | 'type'>, acceptConfig: AcceptConfig) => boolean;
export declare const getBaseName: (fileName?: string) => string;
export declare const renameFile: (file: File, newFileName: string) => File;
export declare const modifyPropertiesOnFile: (file: File, properties: Partial<File>) => File;
export declare const getIconNames: () => string[];
/**
 * Stable identity for a file item.
 *
 * A consumer-supplied `uid` always wins. Otherwise the key is derived from the
 * file's content so that it survives both a status change and a controlled
 * consumer handing back a freshly-built object with the same contents. It
 * deliberately does NOT include the file's position in the list, because a
 * position-derived key remounts the item whenever the list reorders.
 */
export declare const getFileKey: (file: FileItemType) => string;
/** Clamps a progress value to 0-100 and rounds it to a whole number. */
export declare const normaliseProgress: (progress: number) => number;
