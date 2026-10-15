import { iconsList } from '../wpp-icon/const';
import { isMimeAccepted } from '../../utils/utils';
import { EXTENSION_TO_TYPE } from './const';
export const convertMBToBytes = (size) => size * 1024 ** 2;
export const getExtension = (filename = '') => `.${filename.split('.').pop()}`;
export const getExtensionsList = (acceptConfig) => Object.entries(acceptConfig).reduce((acc, [_, extensions]) => [...acc, ...extensions], []);
/**
 * MIME type implied by a file's extension, or '' when the extension is unknown.
 *
 * `EXTENSION_TO_TYPE` is keyed without the leading dot, while `getExtension` returns one, so the
 * dot is stripped here. Doing it in a single helper keeps file-upload and chat-input from drifting
 * apart on the lookup again.
 */
export const inferTypeFromName = (fileName = '') => EXTENSION_TO_TYPE[getExtension(fileName).slice(1).toLowerCase()] ?? '';
/**
 * Tokens for the native `accept` attribute, one entry at a time.
 *
 * An entry that lists extensions contributes those extensions, because they are the narrower
 * filter and the picker has to agree with validation. An entry with no extensions contributes its
 * own key, which is the only way a wildcard family can reach the picker at all.
 */
export const getAcceptTokens = (acceptConfig) => Object.entries(acceptConfig).flatMap(([mimeType, extensions]) => (extensions?.length ? extensions : [mimeType]));
/**
 * Human-readable version of the accept tokens for the dropzone hint.
 *
 * Wildcard families have no extension to show, so they resolve through the locale map. The lookup
 * falls back per key rather than through `mergeLocales`, which is a shallow spread and would drop
 * the untouched families the moment a consumer overrides one of them.
 */
export const getAcceptLabels = (acceptConfig, familyLabels = {}, defaultFamilyLabels = {}) => getAcceptTokens(acceptConfig).map(token => {
  if (!token.endsWith('/*'))
    return token;
  const key = token.toLowerCase();
  return familyLabels[key] ?? defaultFamilyLabels[key] ?? token;
});
/**
 * Whether the configuration puts no restriction on the file at all.
 *
 * True for an absent or empty config, and for a match-everything entry that lists no extensions.
 * A match-everything entry that DOES list extensions is not unrestricted - they still narrow it.
 */
export const acceptsAnyFile = (acceptConfig) => {
  if (!acceptConfig || !Object.keys(acceptConfig).length)
    return true;
  return Object.entries(acceptConfig).some(([pattern, extensions]) => pattern.trim() === '*/*' && !extensions?.length);
};
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
export const isFileAccepted = (file, acceptConfig) => {
  const entries = Object.entries(acceptConfig);
  if (!entries.length)
    return true;
  const extension = getExtension(file.name).toLowerCase();
  const mimeType = (file.type || inferTypeFromName(file.name)).toLowerCase();
  // Deliberately not short-circuited on an empty type: the match-everything pattern accepts a file
  // the browser could not type, and only isMimeAccepted knows that.
  const matchesConfiguredType = entries.some(([pattern, extensions]) => {
    if (!isMimeAccepted(mimeType, [pattern]))
      return false;
    return extensions?.length ? extensions.map(value => value.toLowerCase()).includes(extension) : true;
  });
  if (matchesConfiguredType)
    return true;
  if (file.type)
    return false;
  return getExtensionsList(acceptConfig)
    .map(value => value.toLowerCase())
    .includes(extension);
};
export const getBaseName = (fileName = '') => fileName.split('.')[0];
export const renameFile = (file, newFileName) => new File([file], newFileName, { type: file.type });
export const modifyPropertiesOnFile = (file, properties) => new File([file], file.name, { ...properties });
//  * WPPOPENDS-512 WPPOPENDS-311
// Extracting all the icon names from iconsList, to force register and prevent tree shaking during build
export const getIconNames = () => {
  const iconNames = [];
  iconsList.forEach(category => {
    category.groups.forEach(group => {
      group.icons.forEach(icon => {
        iconNames.push(`wpp-icon-${icon.name}`);
      });
    });
  });
  return iconNames;
};
/**
 * Stable identity for a file item.
 *
 * A consumer-supplied `uid` always wins. Otherwise the key is derived from the
 * file's content so that it survives both a status change and a controlled
 * consumer handing back a freshly-built object with the same contents. It
 * deliberately does NOT include the file's position in the list, because a
 * position-derived key remounts the item whenever the list reorders.
 */
export const getFileKey = (file) => {
  if (file.uid)
    return file.uid;
  // Deliberately derived only from fields nothing can rewrite mid-flight. `url`
  // is excluded on purpose: a processor may set it, which would change the key
  // of a file while its own processor is still running and orphan it.
  return `${file.name}|${file.size}|${file.lastModified ?? ''}`;
};
/** Clamps a progress value to 0-100 and rounds it to a whole number. */
export const normaliseProgress = (progress) => Math.round(Math.min(100, Math.max(0, progress)));
