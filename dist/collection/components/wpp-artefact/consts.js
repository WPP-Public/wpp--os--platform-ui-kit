export const getArtefactActions = (locales) => [
  { icon: 'wpp-icon-copy', label: locales.duplicateAction },
  { icon: 'wpp-icon-download', label: locales.downloadAction },
  { icon: 'wpp-icon-trash', label: locales.deleteAction },
];
export const MAXIMUM_ARTEFACT_HEIGHT = 1200;
export const LOCALES_DEFAULTS = {
  duplicateAction: 'Copy',
  downloadAction: 'Download',
  deleteAction: 'Delete',
  pinAction: 'Pin',
};
