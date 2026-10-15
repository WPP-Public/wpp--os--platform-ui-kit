import { h, Host } from '@stencil/core';
import { FOCUS_TYPE } from '../../types/common';
import { acceptsAnyFile, convertMBToBytes, getExtension, getAcceptLabels, getAcceptTokens, getBaseName, inferTypeFromName, isFileAccepted, renameFile, modifyPropertiesOnFile, getFileKey, normaliseProgress, } from './utils';
import { ScrollState, } from './types';
import { LOCALES_DEFAULTS } from './const';
import { mergeLocales } from '../../utils/utils';
import { themeSubscriptionController } from '../../utils/subscribe-to-theme';
const getInitFocusInfo = () => ({
  wrapper: FOCUS_TYPE.NONE,
  item: FOCUS_TYPE.NONE,
});
// Monotonic counter used for per-instance element ids (deterministic, unlike Math.random(),
// so snapshot tests stay stable).
let fileUploadInstanceId = 0;
/**
 * @slot - Should contain label and description of file upload.
 *
 * @part list-wrapper - file list wrapper
 * @part file-list - file list element.
 * @part file-upload-container - file upload wrapper.
 * @part file-item - file item element
 * @part slot-label - slot label element
 * @part slot-description - slot label element
 * @part icon-file - icon file element
 * @part content - main content wrapper
 * @part label - label text element
 * @part text - main text element
 * @part text-info - text info wrapper element
 * @part input - input element
 * @part message - message element
 */
export class WppFileUpload {
  constructor() {
    this.itemRefs = [];
    this.inputId = this.name || `wpp-file-upload-${++fileUploadInstanceId}`;
    this.labelId = `${this.inputId}-label`;
    // Ids wiring the native input's accessible name/description to the visible dropzone text
    // (all in the same shadow tree, so id references are valid).
    this.ctaId = `${this.inputId}-cta`;
    this.hintId = `${this.inputId}-hint`;
    this.messageId = `${this.inputId}-message`;
    this.lastKeyWasTab = false; // Track keyboard modality and wrapper focus state
    this.themeSubscription = themeSubscriptionController(() => this.host);
    this.fileStatuses = new Map();
    this.controllers = new Map();
    this.hasWarnedAboutControlledProcessor = false;
    this.isChangeFlushScheduled = false;
    // Index of the item whose delete control should receive focus after the list re-renders.
    // Deleting an item removes the focused element from the DOM, which would silently drop
    // keyboard focus to the page body (WCAG 2.4.3).
    this.focusItemAfterDelete = null;
    this.clearInputValue = () => {
      if (this.inputRef?.value) {
        this.inputRef.value = '';
      }
    };
    this.reInitValue = (list) => {
      this.successList = list.filter(file => !this.isFileWithError(file));
      this.errorList = list.filter(this.isFileWithError);
      this.orderedFiles = list;
      this.announceSettledFiles(list);
      this.isMaximumFilesReached();
    };
    /**
     * Keeps files in the order they were first seen and appends anything new,
     * so an async status change never reorders the list.
     */
    this.buildOrderedFiles = (retained, appendOrder = []) => {
      const byKey = new Map(retained.map(file => [getFileKey(file), file]));
      const ordered = [];
      const take = (candidate) => {
        const key = getFileKey(candidate);
        const current = byKey.get(key);
        if (current) {
          ordered.push(current);
          byKey.delete(key);
        }
      };
      (this.orderedFiles || []).forEach(take);
      appendOrder.forEach(take);
      return [...ordered, ...byKey.values()];
    };
    this.getFileStatus = (file) => {
      if (this.isFileWithError(file))
        return 'error';
      if (file.status)
        return file.status;
      if (file.isLoading)
        return 'uploading';
      return 'done';
    };
    /**
     * Announces only terminal transitions. Progress updates are intentionally not
     * announced - they are exposed on a progressbar instead, so a screen reader
     * is not flooded on every percent.
     */
    this.announceSettledFiles = (list) => {
      const next = new Map();
      const messages = [];
      list.forEach(file => {
        const key = getFileKey(file);
        const status = this.getFileStatus(file);
        next.set(key, status);
        const previous = this.fileStatuses.get(key);
        if (!previous || previous === status || status === 'uploading')
          return;
        if (status === 'error') {
          messages.push(this._locales.processingFailed(file.name, this.getFileErrorText(file)));
        }
        else {
          messages.push(this._locales.processingComplete(file.name));
        }
      });
      this.fileStatuses = next;
      if (messages.length)
        this.liveAnnouncement = messages.join('. ');
    };
    this.onGlobalKeyDown = (e) => {
      this.lastKeyWasTab = e.key === 'Tab';
    };
    this.onPointerDown = () => {
      // Any pointer interaction cancels keyboard modality
      this.lastKeyWasTab = false;
    };
    this.onInputFocus = () => {
      if (this.disabled)
        return;
      // Prefer :focus-visible if available; fall back to lastKeyWasTab
      const focusVisible = typeof this.inputRef?.matches === 'function' && this.inputRef.matches(':focus-visible');
      this.hasTabFocus = !!focusVisible || this.lastKeyWasTab;
    };
    this.onInputBlur = () => {
      this.hasTabFocus = false;
    };
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.focusType = this.getUpdatedFocusInfo('wrapper', FOCUS_TYPE.NONE);
      this.focusType = this.getUpdatedFocusInfo('item', FOCUS_TYPE.NONE);
      this.wppBlur.emit(event);
    };
    this.onMouseDown = () => {
      this.focusType = this.getUpdatedFocusInfo('wrapper', FOCUS_TYPE.MOUSE);
      this.focusType = this.getUpdatedFocusInfo('item', FOCUS_TYPE.MOUSE);
    };
    this.onKeyUp = (event, type) => {
      if (this.disabled)
        return;
      if (event.key === 'Tab') {
        this.focusType = this.getUpdatedFocusInfo(type, FOCUS_TYPE.TAB);
      }
    };
    this.getUpdatedFocusInfo = (type, updateValue) => ({
      ...this.focusType,
      [type]: updateValue,
    });
    this.handleDeleteItem = (event) => {
      const isDeleted = ({ name, size }) => name + size === event.detail.name + event.detail.size;
      (this.orderedFiles || []).filter(isDeleted).forEach(file => this.abortFile(getFileKey(file)));
      const updatedFilesList = (this.orderedFiles || []).filter(file => !isDeleted(file));
      const successList = updatedFilesList.filter(file => !this.isFileWithError(file));
      const errorFileList = updatedFilesList.filter(this.isFileWithError);
      this.clearInputValue();
      this.value = updatedFilesList;
      this.errorList = errorFileList;
      this.successList = successList;
      this.orderedFiles = updatedFilesList;
      // The focused delete control disappears with the item, so the ring is handed to the delete
      // control that takes its place (or back to the input when the list empties).
      this.focusItemAfterDelete = event.detail.index;
      this.liveAnnouncement = this._locales.fileRemoved(event.detail.name);
      this.wppChange.emit({
        value: successList,
        hasError: !!errorFileList?.length || this.isLimitReached,
        errorFiles: errorFileList,
        files: updatedFilesList,
        name: this.name,
      });
      this.wppFileUploadItemDelete.emit(event.detail);
    };
    this.handleClickItem = (event) => this.wppFileUploadItemClick.emit(event.detail);
    this.validateFileSize = (file) => {
      if (file.size > convertMBToBytes(this.size)) {
        file.sizeError = true;
      }
      return file;
    };
    this.customValidation = (file) => {
      const validationResult = this.validator(file);
      if (validationResult) {
        file.validatorError = validationResult;
      }
      return file;
    };
    this.isAcceptConfigFilled = () => !this.acceptConfig ? false : Object.keys(this.acceptConfig)?.length > 0;
    this.validateFileType = (file) => {
      if (this.isAcceptConfigFilled()) {
        file.formatError = !isFileAccepted(file, this.acceptConfig);
        return file;
      }
      // An explicit empty config means "accept everything", and the file is left exactly as it came in.
      if (this.acceptConfig !== undefined)
        return file;
      // With no configuration at all there is nothing to validate against, but a file the browser
      // left untyped still gets a type from its extension so the item's icon can resolve.
      if (!file.type) {
        return modifyPropertiesOnFile(file, { type: inferTypeFromName(file.name) });
      }
      return file;
    };
    this.isFileWithError = (file) => !!(file.formatError || file.sizeError || file.validatorError || file.processingError || file.status === 'error');
    this.generateUniqueName = (fileName, fileList) => {
      const baseName = getBaseName(fileName);
      const extension = getExtension(fileName);
      let counter = 1;
      const generateNewName = () => `${baseName}-${counter}${extension}`;
      const isNameTaken = (name) => fileList.some(item => item.name === name);
      let uniqueName = generateNewName();
      while (isNameTaken(uniqueName)) {
        counter++;
        uniqueName = generateNewName();
      }
      return uniqueName;
    };
    this.displayErrorListByShowingOption = (newFilesWithErrors) => this.showOnlyNewErrors ? newFilesWithErrors : [...new Set([...this.errorList, ...newFilesWithErrors])];
    this.handleFileLoad = async (filesList) => {
      // `seen` grows as we go so two identically-named files in ONE batch also get
      // distinct names - `list` alone only covers files already in the component.
      const seen = [...(this.orderedFiles || [])];
      const filteredFileList = filesList.filter(Boolean).map(newFile => {
        const isFileWithSameNameExists = !!seen.find(item => item.name === newFile.name);
        const resolved = isFileWithSameNameExists
          ? renameFile(newFile, this.generateUniqueName(newFile.name, seen))
          : newFile;
        seen.push(resolved);
        return resolved;
      });
      if (!filteredFileList?.length)
        return;
      const validatedFileList = filteredFileList.map((file) => {
        if ('url' in file) {
          return file;
        }
        this.validateFileSize(file);
        file = this.validateFileType(file);
        this.customValidation(file);
        return file;
      });
      if (!this.multiple && this.value?.length) {
        this.value = validatedFileList.some(this.isFileWithError) ? this.value : [...this.value, ...filteredFileList];
      }
      else {
        this.value = [...(this.orderedFiles || []), ...validatedFileList];
      }
      const successFileList = this.value.filter(file => !this.isFileWithError(file));
      const newFilesWithErrors = validatedFileList.filter((fileItem) => this.isFileWithError(fileItem));
      const errorFileList = this.displayErrorListByShowingOption(newFilesWithErrors);
      this.errorList = errorFileList;
      this.successList = successFileList;
      this.orderedFiles = this.buildOrderedFiles([...successFileList, ...errorFileList], validatedFileList);
      // Start processing first: it marks files as uploading synchronously, so the snapshot
      // below records that rather than treating them as already settled - otherwise a file
      // that completes successfully is never announced.
      this.processFiles(validatedFileList);
      this.announceSettledFiles(this.orderedFiles);
      // Announce each processed file's outcome — success is otherwise silent and validation
      // errors are conveyed only visually (WCAG 3.3.1 / 4.1.3). The file-limit error is raised on
      // the component rather than on any one file, so append it: without this, hitting the limit
      // announces every file as added and never mentions the error that is on screen.
      const outcomes = validatedFileList.map(file => this.isFileWithError(file) ? `${file.name}: ${this.getFileErrorText(file)}` : this._locales.fileAdded(file.name));
      this.liveAnnouncement = [...outcomes, this.isLimitReached ? this.getMessageText() : null].filter(Boolean).join('. ');
      this.wppChange.emit({
        value: successFileList,
        hasError: !!errorFileList?.length || this.isLimitReached,
        errorFiles: errorFileList,
        files: this.orderedFiles || [],
        name: this.name,
      });
    };
    this.getFileErrorText = (file) => {
      if (file.sizeError)
        return this._locales.sizeError;
      if (file.formatError)
        return this._locales.formatError;
      return file.validatorError || file.processingError || '';
    };
    this.getProcessors = () => {
      if (!this.processor)
        return [];
      return Array.isArray(this.processor) ? this.processor : [this.processor];
    };
    /**
     * A file already carrying a terminal status is passed through untouched, the
     * same convention the shared upload pipeline uses between its own stages.
     */
    this.shouldProcessFile = (file) => !this.isFileWithError(file) && file.status !== 'done' && file.status !== 'error';
    this.isFileStillPresent = (key) => (this.orderedFiles || []).some(file => getFileKey(file) === key);
    /** Re-assigns the list so Stencil re-renders after a file object was mutated. */
    this.refreshFiles = () => {
      this.orderedFiles = [...(this.orderedFiles || [])];
    };
    this.abortFile = (key) => {
      this.controllers.get(key)?.abort();
      this.controllers.delete(key);
    };
    this.abortAllFiles = () => {
      this.controllers.forEach(controller => controller.abort());
      this.controllers.clear();
    };
    this.processFiles = (files) => {
      const processors = this.getProcessors();
      if (!processors.length)
        return;
      if (this.controlled) {
        if (!this.hasWarnedAboutControlledProcessor) {
          this.hasWarnedAboutControlledProcessor = true;
          console.warn('[wpp-file-upload] `processor` is ignored while `controlled` is true. Drive `status`, `progress` and `processingError` through `value` instead.');
        }
        return;
      }
      // In single-file mode a new selection supersedes whatever was still running.
      if (!this.multiple)
        this.abortAllFiles();
      files.filter(this.shouldProcessFile).forEach(file => this.runProcessors(file, processors));
    };
    this.runProcessors = async (file, processors) => {
      const key = getFileKey(file);
      const controller = new AbortController();
      this.abortFile(key);
      this.controllers.set(key, controller);
      file.status = 'uploading';
      this.refreshFiles();
      this.wppFileProcessingStart.emit(this.getProcessingEventData(file, key));
      const context = {
        signal: controller.signal,
        onProgress: (progress) => {
          if (controller.signal.aborted || !this.isFileStillPresent(key))
            return;
          file.progress = normaliseProgress(progress);
          this.refreshFiles();
        },
      };
      let error;
      try {
        for (const processor of processors) {
          if (controller.signal.aborted)
            return;
          const result = await processor(file, context);
          if (controller.signal.aborted)
            return;
          if (result?.error) {
            error = result.error;
            break;
          }
          this.applyProcessorResult(file, result);
        }
      }
      catch (processorError) {
        if (controller.signal.aborted)
          return;
        error = processorError instanceof Error ? processorError.message : String(processorError);
      }
      if (controller.signal.aborted)
        return;
      this.controllers.delete(key);
      // The file may have been removed while its processor was in flight.
      if (!this.isFileStillPresent(key))
        return;
      file.status = error ? 'error' : 'done';
      if (error)
        file.processingError = error;
      this.wppFileProcessingEnd.emit({
        ...this.getProcessingEventData(file, key),
        status: file.status,
        ...(error ? { processingError: error } : {}),
      });
      this.scheduleChangeFlush();
    };
    /**
     * Only the fields a processor is allowed to return are copied across. A real
     * `File` exposes name/size/type as getters, so assigning them would throw.
     */
    this.applyProcessorResult = (file, result) => {
      if (!result)
        return;
      if (result.url !== undefined)
        file.url = result.url;
      if (result.result !== undefined)
        file.result = result.result;
    };
    this.getProcessingEventData = (file, key) => ({
      name: file.name,
      size: file.size,
      index: (this.orderedFiles || []).findIndex(item => getFileKey(item) === key),
      uid: key,
    });
    /**
     * Files that settle in the same tick produce a single `wppChange`, so a
     * consumer bound to `hasError` is not re-rendered once per file.
     */
    this.scheduleChangeFlush = () => {
      if (this.isChangeFlushScheduled)
        return;
      this.isChangeFlushScheduled = true;
      queueMicrotask(() => {
        this.isChangeFlushScheduled = false;
        const allFiles = this.orderedFiles || [];
        const successFileList = allFiles.filter(file => !this.isFileWithError(file));
        const errorFileList = allFiles.filter(this.isFileWithError);
        this.successList = successFileList;
        this.errorList = errorFileList;
        this.value = allFiles;
        this.refreshFiles();
        this.announceSettledFiles(allFiles);
        this.wppChange.emit({
          value: successFileList,
          hasError: !!errorFileList.length || this.isLimitReached,
          errorFiles: errorFileList,
          files: allFiles,
          name: this.name,
        });
      });
    };
    this.handleDrop = (event) => {
      event.preventDefault();
      const currentFiles = event?.dataTransfer?.files || [];
      this.isFileDrag = false;
      if (!this.multiple && this.value?.length) {
        return this.handleFileLoad([currentFiles[0]]);
      }
      if (!this.multiple && currentFiles?.length > 1) {
        return this.handleFileLoad([currentFiles[0]]);
      }
      this.handleFileLoad(Array.from(currentFiles));
    };
    this.handleDragOver = (event) => {
      event.preventDefault();
    };
    this.handleDragEnter = () => {
      this.isFileDrag = true;
    };
    this.handleDragLeave = () => {
      this.isFileDrag = false;
    };
    this.handleChange = async () => {
      const currentFiles = this.inputRef?.files || [];
      if (!this.multiple && this.value?.length) {
        return this.handleFileLoad([currentFiles[0]]);
      }
      await this.handleFileLoad(Array.from(currentFiles));
      this.clearInputValue();
    };
    this.handleListScroll = (event) => {
      const target = event.target;
      if (target.scrollTop && target.scrollHeight - target.scrollTop !== target.clientHeight) {
        this.scrollState = ScrollState.scroll;
        return;
      }
      this.scrollState = false;
    };
    this.getAcceptTokens = () => (this.isAcceptConfigFilled() ? getAcceptTokens(this.acceptConfig) : []);
    this.getAcceptLabels = () => this.isAcceptConfigFilled()
      ? getAcceptLabels(this.acceptConfig, this._locales.acceptFamilyLabels, LOCALES_DEFAULTS.acceptFamilyLabels)
      : [];
    this.isMaximumFilesSet = () => this.maxFiles > 0;
    this.isMaximumFilesReached = () => {
      if (!this.multiple) {
        this.isLimitReached = this.value?.length > 1;
        return this.isLimitReached;
      }
      if (this.isMaximumFilesSet()) {
        this.isLimitReached = this.value?.length > this.maxFiles;
        return this.isLimitReached;
      }
      this.isLimitReached = false;
      return false;
    };
    this.getMessageText = () => {
      if (this.isLimitReached) {
        return this.multiple ? this._locales.multipleFileLimitError : this._locales.singleFileLimitError;
      }
      return this.message;
    };
    this.uploadWrapperCssClasses = () => ({
      'upload-wrapper': true,
      message: !!this.message,
      [`${this.messageType}`]: !!this.messageType,
      'tab-focus': !this.disabled && this.hasTabFocus,
      disabled: this.disabled,
      'file-drag': this.isFileDrag,
      'label-hovered': this.isLabelHovered,
      ...(!this.messageType && this.isLimitReached ? { error: true } : {}),
    });
    this.listWrapperCssClasses = () => ({
      'file-list-wrapper': true,
      [`${this.scrollState}`]: !!this.scrollState,
    });
    this.hostCssClasses = () => ({
      'wpp-file-upload': true,
    });
    this.hasTabFocus = false;
    this.scrollState = false;
    this.focusType = getInitFocusInfo();
    this.isFileDrag = false;
    this.isLabelHovered = false;
    this.errorList = undefined;
    this.successList = undefined;
    this.orderedFiles = [];
    this.isLimitReached = false;
    this.liveAnnouncement = '';
    this.name = undefined;
    this.value = [];
    this.disabled = false;
    this.multiple = true;
    this.format = 'base64';
    this.acceptConfig = undefined;
    this.messageType = undefined;
    this.message = undefined;
    this.maxMessageLength = undefined;
    this.tooltipConfig = {};
    this.size = 50;
    this.locales = {};
    this.validator = () => null;
    this.controlled = false;
    this.maxFiles = 0;
    this.required = false;
    this.labelConfig = undefined;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'absolute' },
    };
    this.showOnlyNewErrors = false;
    this.processor = undefined;
  }
  /**
   * Method to reset FileUpload. Should be called only when the component is uncontrolled.
   */
  async reset() {
    this.reInitValue([]);
    this.abortAllFiles();
    this.value = [];
    this.orderedFiles = [];
    this.fileStatuses.clear();
    this.liveAnnouncement = '';
    this.scrollState = false;
    this.clearInputValue();
  }
  onDisabledChange(disabled) {
    if (disabled)
      this.hasTabFocus = false;
  }
  onValueChange(newValue) {
    const updatedValue = newValue || [];
    if (this.controlled) {
      this.reInitValue(updatedValue);
      if (!updatedValue.length) {
        this.scrollState = false;
        this.clearInputValue();
      }
    }
    if (this.isMaximumFilesReached()) {
      this.wppError.emit({
        errorFiles: this.value.slice(this.maxFiles),
        errorMessage: this.multiple ? this._locales.multipleFileLimitError : this._locales.singleFileLimitError,
        name: this.name,
      });
    }
  }
  componentDidLoad() {
    const list = [...(this.value || []), ...(this.successList || []), ...(this.errorList || [])];
    this.reInitValue(list);
  }
  componentDidRender() {
    if (this.focusItemAfterDelete === null)
      return;
    // Item tags are renamed by the versioned build, so the refs collected during render are the
    // only reliable way to reach the remaining items.
    const items = this.itemRefs.filter(Boolean);
    const index = this.focusItemAfterDelete;
    this.focusItemAfterDelete = null;
    // Not every remaining item has a delete control — `deletable: false` renders none — so search
    // outwards from the deleted position for the nearest one that does, rather than assuming the
    // item that took its place is focusable. Falls back to the input, which always exists.
    const deleteControlAt = (i) => items[i]?.shadowRoot?.querySelector('[part="cross-icon"]');
    const nextControl = items
      .map((_, i) => i)
      .sort((a, b) => Math.abs(a - index) - Math.abs(b - index) || a - b)
      .map(deleteControlAt)
      .find(Boolean);
    if (nextControl) {
      nextControl.focus();
    }
    else {
      // Nothing left to delete — hand focus back to the uploader input.
      this.inputRef?.focus();
    }
  }
  get _locales() {
    return mergeLocales(LOCALES_DEFAULTS, this.locales);
  }
  connectedCallback() {
    this.themeSubscription.start();
    if (this.disconnectTimeout) {
      clearTimeout(this.disconnectTimeout);
      this.disconnectTimeout = undefined;
    }
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    // Stencil also calls this when the host is merely MOVED in the DOM, and an
    // abort cannot be undone - so only abort if it is still detached next tick.
    // The element is captured now: reading `this.host` later throws once Stencil
    // has torn the component down.
    const host = this.host;
    this.disconnectTimeout = setTimeout(() => {
      if (!host?.isConnected)
        this.abortAllFiles();
    }, 0);
  }
  render() {
    const allFiles = this.orderedFiles || [];
    this.itemRefs = [];
    return (h(Host, { class: this.hostCssClasses(), exportparts: "file-item, wrapper, content, file-name, tooltip, loading, percentage, cross-icon", onFocus: this.onFocus, onBlur: this.onBlur, onKeyDown: this.onGlobalKeyDown, onPointerDown: this.onPointerDown, onMouseDown: this.onMouseDown, "aria-disabled": this.disabled ? 'true' : undefined }, h("slot", { name: "label", part: "slot-label" }), this.labelConfig?.text && (h("wpp-label-v4-5-0", { class: "file-upload-label", id: this.labelId, htmlFor: this.inputId, optional: !this.required, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label", onMouseEnter: () => (this.isLabelHovered = !this.disabled), onMouseLeave: () => (this.isLabelHovered = false) })), h("slot", { name: "description", part: "slot-description" }), h("div", { class: this.uploadWrapperCssClasses(), onDrop: this.handleDrop, onDragEnter: this.handleDragEnter, onDragLeave: this.handleDragLeave, onDragOver: this.handleDragOver, part: "file-upload-container" }, h("wpp-avatar-v4-5-0", { class: "icon-file", icon: "wpp-icon-file", size: "l", role: "presentation", tabindex: "-1", "aria-hidden": "true" }), h("div", { class: "content", part: "content" }, h("p", { id: this.ctaId }, h("span", { class: "label", part: "label" }, this._locales.label), ' ', h("span", { class: "text", part: "text" }, this._locales.text))), h("p", { class: "text-info", part: "text-info", id: this.hintId }, acceptsAnyFile(this.acceptConfig)
      ? this._locales.infoAnyFormat(this.size)
      : this._locales.info(this.getAcceptLabels().join(', '), this.size)), h("input", { class: "file-loader", type: "file", id: this.inputId, name: this.name, onChange: this.handleChange, onFocus: this.onInputFocus, onBlur: this.onInputBlur, ref: inputRef => (this.inputRef = inputRef), multiple: this.multiple, accept: this.getAcceptTokens().join(), part: "input", "aria-labelledby": this.labelConfig?.text ? `${this.labelId} ${this.ctaId}` : this.ctaId, "aria-describedby": this.message || this.isLimitReached ? `${this.hintId} ${this.messageId}` : this.hintId, "aria-invalid": this.isLimitReached || this.messageType === 'error' ? 'true' : undefined, disabled: this.disabled })), h("span", { class: "sr-only", "aria-live": "polite" }, this.liveAnnouncement), (this.message || this.isLimitReached) && (h("wpp-inline-message-v4-5-0", { id: this.messageId, message: this.getMessageText(), type: this.isLimitReached ? 'error' : this.messageType, showTooltipFrom: this.maxMessageLength, tooltipConfig: this.tooltipConfig, part: "message" })), allFiles?.length ? (h("div", { class: this.listWrapperCssClasses(), part: "list-wrapper" }, h("ul", { role: "list", class: "file-list", part: "file-list", onScroll: this.handleListScroll }, allFiles.map((file, index) => (h("wpp-file-upload-item-v4-5-0", { ref: el => el && (this.itemRefs[index] = el), key: getFileKey(file), format: this.format, parentDisabled: this.disabled, currentIndex: index, onWppDelete: this.handleDeleteItem, onWppClick: this.handleClickItem, file: file, locales: {
        sizeError: this._locales.sizeError,
        formatError: this._locales.formatError,
        removeFile: this._locales.removeFile,
        uploadProgress: this._locales.uploadProgress,
      }, part: "file-item", onBlur: this.onBlur, onKeyUp: (event) => this.onKeyUp(event, 'item') })))))) : null));
  }
  static get is() { return "wpp-file-upload"; }
  static get registryIs() { return "wpp-file-upload-v4-5-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-file-upload.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-file-upload.css"]
    };
  }
  static get properties() {
    return {
      "name": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the input name."
        },
        "attribute": "name",
        "reflect": false
      },
      "value": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "FileItemType[]",
          "resolved": "FileItemType[]",
          "references": {
            "FileItemType": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-file-upload/types.ts::FileItemType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the files list"
        },
        "defaultValue": "[]"
      },
      "disabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true`, the component is disabled"
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
      },
      "multiple": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true`, the component can take multiple files"
        },
        "attribute": "multiple",
        "reflect": false,
        "defaultValue": "true"
      },
      "format": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "FileUploadResultFormaType",
          "resolved": "\"arrayBuffer\" | \"base64\" | \"binaryString\"",
          "references": {
            "FileUploadResultFormaType": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-file-upload/types.ts::FileUploadResultFormaType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Represent what result format datepicker return, it can be base64, arrayBuffer, binaryString, by default it returns base64"
        },
        "attribute": "format",
        "reflect": false,
        "defaultValue": "'base64'"
      },
      "acceptConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "AcceptConfig",
          "resolved": "{ [x: string]: string[]; }",
          "references": {
            "AcceptConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-file-upload/types.ts::AcceptConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Configuration for accepted file formats: an object whose key is a MIME type and whose value is\nan array of file extensions.\n\nExample:\n{\n  'image/png': ['.png'],\n  'text/html': ['.htm', '.html']\n}\n\nA key may also be a wildcard family such as `image/*`, which accepts the whole family the way\nthe native `accept` attribute does:\n{\n  'image/*': []\n}\n\nEntries are combined as a union - a file only has to satisfy one of them. A single entry is an\nintersection: when it lists extensions, a file must match the entry's type AND carry one of\nthose extensions. An entry with an empty array puts no extension restriction on the type, so\nit matches on the MIME type alone.\n\nMatching ignores casing. A file the browser reports with no type is typed from its extension\nwhere possible, and otherwise matched against the extensions the configuration lists.\n\nTo allow all file types, pass an empty object (`{}`) or leave the property undefined."
        }
      },
      "messageType": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "FileUploadMessageType",
          "resolved": "\"error\" | undefined",
          "references": {
            "FileUploadMessageType": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-file-upload/types.ts::FileUploadMessageType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates file upload message type"
        },
        "attribute": "message-type",
        "reflect": false
      },
      "message": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates file upload message"
        },
        "attribute": "message",
        "reflect": false
      },
      "maxMessageLength": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates file upload message maximum length"
        },
        "attribute": "max-message-length",
        "reflect": false
      },
      "tooltipConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "DropdownConfig",
          "resolved": "DropdownConfig",
          "references": {
            "DropdownConfig": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::DropdownConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the dropdown configuration. Under the hood dropdown using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{}"
      },
      "size": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The max size of file that user can download, by default it`s 50 MB"
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "50"
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<FileUploadLocales>",
          "resolved": "{ label?: string | undefined; text?: string | undefined; info?: ((accept: string, size: number) => string) | undefined; acceptFamilyLabels?: AcceptFamilyLabels | undefined; infoAnyFormat?: ((size: number) => string) | undefined; sizeError?: string | undefined; formatError?: string | undefined; singleFileLimitError?: string | undefined; multipleFileLimitError?: string | undefined; fileAdded?: ((fileName: string) => string) | undefined; fileRemoved?: ((fileName: string) => string) | undefined; removeFile?: ((fileName: string) => string) | undefined; uploadProgress?: ((fileName: string) => string) | undefined; processingComplete?: ((fileName: string) => string) | undefined; processingFailed?: ((fileName: string, error: string) => string) | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "FileUploadLocales": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-file-upload/types.ts::FileUploadLocales"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates locales for file upload component"
        },
        "defaultValue": "{}"
      },
      "validator": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "FileValidatorHandler",
          "resolved": "(file: FileItemType) => string | null",
          "references": {
            "FileValidatorHandler": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-file-upload/types.ts::FileValidatorHandler"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines custom validation function. It must return null if there's no errors, and string in case of any error"
        },
        "defaultValue": "() => null"
      },
      "controlled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true`, the file upload works as controlled component."
        },
        "attribute": "controlled",
        "reflect": false,
        "defaultValue": "false"
      },
      "maxFiles": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Maximum accepted number of files The default value is 0 which means there is no limitation to how many files are accepted."
        },
        "attribute": "max-files",
        "reflect": false,
        "defaultValue": "0"
      },
      "required": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the input is required."
        },
        "attribute": "required",
        "reflect": true,
        "defaultValue": "false"
      },
      "labelConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "LabelConfig",
          "resolved": "LabelConfig | undefined",
          "references": {
            "LabelConfig": {
              "location": "import",
              "path": "../wpp-label/types",
              "id": "src/components/wpp-label/types.ts::LabelConfig"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates label config"
        }
      },
      "labelTooltipConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "DropdownConfig",
          "resolved": "DropdownConfig",
          "references": {
            "DropdownConfig": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::DropdownConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the dropdown configuration. Under the hood dropdown using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{\n    popperOptions: { strategy: 'absolute' },\n  }"
      },
      "showOnlyNewErrors": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true`, the new errors (from a new unsuccessful upload) will replace the already existing ones in the list\nBy default, the new errors will be added to the error list"
        },
        "attribute": "show-only-new-errors",
        "reflect": false,
        "defaultValue": "false"
      },
      "processor": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "FileProcessorHandler | FileProcessorHandler[]",
          "resolved": "((file: FileItemType, context: FileProcessorContext) => Promise<void | FileProcessorResult>) | FileProcessorHandler[] | undefined",
          "references": {
            "FileProcessorHandler": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-file-upload/types.ts::FileProcessorHandler"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Asynchronous processing applied to each newly added file - typically a call\nto your backend to upload, scan or validate it.\n\nWhile a processor runs the file is shown in the loading state. Resolve with\nnothing to mark the file done, resolve `{ error }` to fail it with a\nmessage, or reject to fail it using the error's `message`. Report progress\nwith `context.onProgress(0-100)` and honour `context.signal` so work is\ncancelled when the file is removed.\n\nPass an array to run several steps in sequence over the same file. They\nshare one abort signal and stop at the first one that fails.\n\nIgnored when `controlled` is `true` - a controlled consumer already owns\nthe file state and should drive `status`, `progress` and `processingError`\nthrough `value` instead."
        }
      }
    };
  }
  static get states() {
    return {
      "hasTabFocus": {},
      "scrollState": {},
      "focusType": {},
      "isFileDrag": {},
      "isLabelHovered": {},
      "errorList": {},
      "successList": {},
      "orderedFiles": {},
      "isLimitReached": {},
      "liveAnnouncement": {}
    };
  }
  static get events() {
    return [{
        "method": "wppChange",
        "name": "wppChange",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when file downloads, returns only those files, that not have any error"
        },
        "complexType": {
          "original": "FileUploadEventDetail",
          "resolved": "FileUploadEventDetail",
          "references": {
            "FileUploadEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-file-upload/types.ts::FileUploadEventDetail"
            }
          }
        }
      }, {
        "method": "wppFocus",
        "name": "wppFocus",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the input is in focus."
        },
        "complexType": {
          "original": "FocusEvent",
          "resolved": "FocusEvent",
          "references": {
            "FocusEvent": {
              "location": "global",
              "id": "global::FocusEvent"
            }
          }
        }
      }, {
        "method": "wppBlur",
        "name": "wppBlur",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the input loses focus."
        },
        "complexType": {
          "original": "FocusEvent",
          "resolved": "FocusEvent",
          "references": {
            "FocusEvent": {
              "location": "global",
              "id": "global::FocusEvent"
            }
          }
        }
      }, {
        "method": "wppFileUploadItemDelete",
        "name": "wppFileUploadItemDelete",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the file-upload item was deleted."
        },
        "complexType": {
          "original": "FileUploadItemEventDetail",
          "resolved": "FileUploadItemEventDetail",
          "references": {
            "FileUploadItemEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-file-upload/types.ts::FileUploadItemEventDetail"
            }
          }
        }
      }, {
        "method": "wppFileUploadItemClick",
        "name": "wppFileUploadItemClick",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the file-upload item was clicked."
        },
        "complexType": {
          "original": "FileUploadItemEventDetail",
          "resolved": "FileUploadItemEventDetail",
          "references": {
            "FileUploadItemEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-file-upload/types.ts::FileUploadItemEventDetail"
            }
          }
        }
      }, {
        "method": "wppError",
        "name": "wppError",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the file upload enters an error state. Triggered when the maximum number of files is exceeded."
        },
        "complexType": {
          "original": "FileUploadErrorEventDetails",
          "resolved": "FileUploadErrorEventDetails",
          "references": {
            "FileUploadErrorEventDetails": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-file-upload/types.ts::FileUploadErrorEventDetails"
            }
          }
        }
      }, {
        "method": "wppFileProcessingStart",
        "name": "wppFileProcessingStart",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when a file starts being processed by `processor`."
        },
        "complexType": {
          "original": "FileUploadProcessingEventDetail",
          "resolved": "FileUploadProcessingEventDetail",
          "references": {
            "FileUploadProcessingEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-file-upload/types.ts::FileUploadProcessingEventDetail"
            }
          }
        }
      }, {
        "method": "wppFileProcessingEnd",
        "name": "wppFileProcessingEnd",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when a file finishes being processed by `processor`, successfully or not."
        },
        "complexType": {
          "original": "FileUploadProcessingEventDetail",
          "resolved": "FileUploadProcessingEventDetail",
          "references": {
            "FileUploadProcessingEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-file-upload/types.ts::FileUploadProcessingEventDetail"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "reset": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Method to reset FileUpload. Should be called only when the component is uncontrolled.",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "disabled",
        "methodName": "onDisabledChange"
      }, {
        "propName": "value",
        "methodName": "onValueChange"
      }];
  }
}
