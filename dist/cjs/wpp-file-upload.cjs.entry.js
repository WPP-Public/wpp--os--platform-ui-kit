'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7d205426.js');
const common = require('./common-ee802540.js');
const utils = require('./utils-76c38b27.js');
const types = require('./types-332b969c.js');
const utils$1 = require('./utils-a3ab9816.js');
const subscribeToTheme = require('./subscribe-to-theme-f2fa6289.js');
require('./consts-d8f5ef98.js');
require('./theme-observer-4179316e.js');

const wppFileUploadCss = ":host{--fu-width:var(--wpp-file-upload-width, 100%);--fu-bg-color:var(--wpp-file-upload-bg-color, var(--wpp-grey-color-000));--fu-bg-color-hover:var(--wpp-file-upload-bg-color-hover, var(--wpp-grey-color-200));--fu-bg-color-disabled:var(--wpp-file-upload-bg-color-disabled, var(--wpp-grey-color-200));--fu-border-color:var(--wpp-file-upload-border-color, var(--wpp-grey-color-500));--fu-border-color-hover:var(--wpp-file-upload-border-color-hover, var(--wpp-grey-color-600));--fu-border-style:var(--wpp-file-upload-border-style, dashed);--fu-border-error-style:var(--wpp-file-upload-border-error-style, solid);--fu-border-error-color:var(--wpp-file-upload-border-error-color, var(--wpp-danger-color-500));--fu-border-width:var(--wpp-file-upload-border-width, 1px);--fu-border-radius:var(--wpp-file-upload-border-radius, var(--wpp-border-radius-m));--fu-first-border-color-focus:var(--wpp-file-upload-first-border-color-focus, var(--wpp-grey-color-000));--fu-second-border-color-focus:var(--wpp-file-upload-second-border-color-focus, var(--wpp-brand-color));--fu-text-info-color:var(--wpp-file-upload-text-info-color, var(--wpp-text-color-info));--fu-text-info-margin:var(--wpp-file-upload-text-info-margin, 4px 20px 0 20px);--fu-text-color:var(--wpp-file-upload-text-color, var(--wpp-grey-color-900));--fu-text-color-disabled:var(--wpp-file-upload-text-color-disabled, var(--wpp-text-color-disabled));--fu-label-color-hover:var(--wpp-file-upload-label-color-hover, var(--wpp-primary-color-400));--fu-label-color-active:var(--wpp-file-upload-label-color-active, var(--wpp-primary-color-600));--fu-icon-margin:var(--wpp-file-upload-icon-margin, 0 0 12px 0);--fu-icon-color-disabled:var(--wpp-file-upload-icon-color-disabled, var(--wpp-grey-color-400));--fu-icon-bg-color-disabled:var(--wpp-file-upload-icon-bg-color-disabled, var(--wpp-grey-color-300));--fu-icon-bg-color-hover:var(--wpp-file-upload-icon-bg-color-hover, var(--wpp-grey-color-300));--fu-item-max-width:var(--wpp-file-upload-item-max-width, 100%);--fu-item-gradient:var(\n    --wpp-file-upload-item-gradient,\n    linear-gradient(180deg, rgb(255 255 255 / 0%) 0%, rgb(255 255 255 / 75%) 100%)\n  );--fu-item-gradient-height:var(--wpp-file-upload-item-gradient-height, 32px);--fu-content-margin:var(--wpp-file-upload-content-margin, 0px 20px 0 20px);--fu-upload-wrapper-padding:var(--wpp-file-upload-wrapper-padding, 28px 0 28px 0);outline:none}:host([disabled]:not([disabled=false])){cursor:not-allowed}:host([disabled]:not([disabled=false])) .wpp-inline-message{cursor:text}:host .file-upload-label{margin-bottom:8px}.upload-wrapper{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;width:var(--fu-width);border:var(--fu-border-width) var(--fu-border-style) var(--fu-border-color);border-radius:var(--fu-border-radius);background-color:var(--fu-bg-color);-webkit-transition:0.2s ease-in-out;transition:0.2s ease-in-out;padding:var(--fu-upload-wrapper-padding)}.upload-wrapper.tab-focus.tab-focus{border-radius:var(--fu-border-radius);outline:none;-webkit-box-shadow:0 0 0 1px var(--fu-first-border-color-focus), 0 0 0 3px var(--fu-second-border-color-focus);box-shadow:0 0 0 1px var(--fu-first-border-color-focus), 0 0 0 3px var(--fu-second-border-color-focus)}.upload-wrapper .icon-file{margin:var(--fu-icon-margin)}.upload-wrapper .icon-file::part(content){-webkit-transition:0.2s ease-in-out;transition:0.2s ease-in-out}.upload-wrapper:hover,.upload-wrapper.label-hovered,.upload-wrapper.tab-focus{background-color:var(--fu-bg-color-hover);border-color:var(--fu-border-color-hover)}.upload-wrapper:hover .icon-file::part(content),.upload-wrapper.label-hovered .icon-file::part(content),.upload-wrapper.tab-focus .icon-file::part(content){background-color:var(--fu-icon-bg-color-hover)}.upload-wrapper.message{margin-bottom:8px}.upload-wrapper.error{border:var(--fu-border-width) var(--fu-border-error-style) var(--fu-border-error-color)}.upload-wrapper.error.tab-focus.tab-focus{border-radius:var(--fu-border-radius);outline:none;-webkit-box-shadow:0 0 0 1px var(--fu-first-border-color-focus), 0 0 0 3px var(--fu-second-border-color-focus);box-shadow:0 0 0 1px var(--fu-first-border-color-focus), 0 0 0 3px var(--fu-second-border-color-focus)}.upload-wrapper.disabled{pointer-events:none;background-color:var(--fu-bg-color-disabled);border:none}.upload-wrapper.disabled .icon-file{color:var(--fu-icon-color-disabled)}.upload-wrapper.disabled .icon-file::part(content){background-color:var(--fu-icon-bg-color-disabled)}.upload-wrapper.disabled .label{color:var(--fu-text-color-disabled);text-decoration:none}.upload-wrapper.disabled .text{color:var(--fu-text-color-disabled)}.upload-wrapper.disabled .text-info{color:var(--fu-text-color-disabled)}.upload-wrapper.file-drag{background-color:var(--fu-bg-color-hover)}.upload-wrapper.file-drag:not(.error){border-color:var(--fu-border-color-hover)}.wpp-inline-message{margin-top:8px;display:block}.label{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);color:var(--wpp-brand-color);text-decoration:underline;margin-right:4px}.label:hover{color:var(--fu-label-color-hover)}.label:active{color:var(--fu-label-color-active)}.text{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);color:var(--fu-text-color);white-space:normal}.content{display:-ms-flexbox;display:flex}.content>p{margin:var(--fu-content-margin);white-space:normal;text-align:center}.file-loader{width:100%;height:100%;position:absolute;cursor:pointer;opacity:0}.file-list{scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent;width:var(--fu-item-max-width);max-height:400px;overflow:hidden auto;margin:8px 0 0;padding:0;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;gap:8px}.file-list::-webkit-scrollbar{width:4px;height:4px}.file-list::-webkit-scrollbar-thumb{border:2px solid transparent;border-radius:4px;-webkit-box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400);box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400)}.file-list-wrapper{position:relative}.file-list-wrapper::before{content:\"\";position:absolute;left:0;right:0;height:var(--fu-item-gradient-height);top:0;z-index:1;pointer-events:none;-webkit-transition:0.3s ease-in-out;transition:0.3s ease-in-out;background:var(--fu-item-gradient);opacity:0;-webkit-transform:rotate(-180deg);transform:rotate(-180deg)}.file-list-wrapper::after{content:\"\";position:absolute;left:0;right:0;height:var(--fu-item-gradient-height);bottom:0;z-index:1;pointer-events:none;-webkit-transition:0.3s ease-in-out;transition:0.3s ease-in-out;background:var(--fu-item-gradient);opacity:0}.file-list-wrapper.scroll::before{opacity:1}.file-list-wrapper.scroll::after{opacity:1}.text-info{font-size:var(--wpp-typography-xs-body-font-size, 12px);line-height:var(--wpp-typography-xs-body-line-height, 20px);font-weight:var(--wpp-typography-xs-body-font-weight, 400);color:var(--wpp-typography-xs-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-xs-body-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-xs-body-letter-spacing, 0);text-align:center;color:var(--fu-text-info-color);margin:var(--fu-text-info-margin)}::slotted([slot=label]){font-size:var(--wpp-typography-m-strong-font-size, 16px);line-height:var(--wpp-typography-m-strong-line-height, 24px);font-weight:var(--wpp-typography-m-strong-font-weight, 700);color:var(--wpp-typography-m-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-m-strong-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-m-strong-letter-spacing, 0)}::slotted([slot=description]){font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0)}@supports (-moz-appearance: none){.file-list{padding-right:10px}}:host([data-wpp-theme=dark]) .upload-wrapper{background-color:var(--wpp-grey-color-100)}.sr-only{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;-webkit-clip-path:inset(50%) !important;clip-path:inset(50%) !important;border:0 !important;white-space:nowrap !important}";

const getInitFocusInfo = () => ({
  wrapper: common.FOCUS_TYPE.NONE,
  item: common.FOCUS_TYPE.NONE,
});
// Monotonic counter used for per-instance element ids (deterministic, unlike Math.random(),
// so snapshot tests stay stable).
let fileUploadInstanceId = 0;
const WppFileUpload = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppChange = index.createEvent(this, "wppChange", 1);
    this.wppFocus = index.createEvent(this, "wppFocus", 1);
    this.wppBlur = index.createEvent(this, "wppBlur", 1);
    this.wppFileUploadItemDelete = index.createEvent(this, "wppFileUploadItemDelete", 1);
    this.wppFileUploadItemClick = index.createEvent(this, "wppFileUploadItemClick", 1);
    this.wppError = index.createEvent(this, "wppError", 1);
    this.wppFileProcessingStart = index.createEvent(this, "wppFileProcessingStart", 1);
    this.wppFileProcessingEnd = index.createEvent(this, "wppFileProcessingEnd", 1);
    this.itemRefs = [];
    this.inputId = this.name || `wpp-file-upload-${++fileUploadInstanceId}`;
    this.labelId = `${this.inputId}-label`;
    // Ids wiring the native input's accessible name/description to the visible dropzone text
    // (all in the same shadow tree, so id references are valid).
    this.ctaId = `${this.inputId}-cta`;
    this.hintId = `${this.inputId}-hint`;
    this.messageId = `${this.inputId}-message`;
    this.lastKeyWasTab = false; // Track keyboard modality and wrapper focus state
    this.themeSubscription = subscribeToTheme.themeSubscriptionController(() => this.host);
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
      const byKey = new Map(retained.map(file => [utils.getFileKey(file), file]));
      const ordered = [];
      const take = (candidate) => {
        const key = utils.getFileKey(candidate);
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
        const key = utils.getFileKey(file);
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
      this.focusType = this.getUpdatedFocusInfo('wrapper', common.FOCUS_TYPE.NONE);
      this.focusType = this.getUpdatedFocusInfo('item', common.FOCUS_TYPE.NONE);
      this.wppBlur.emit(event);
    };
    this.onMouseDown = () => {
      this.focusType = this.getUpdatedFocusInfo('wrapper', common.FOCUS_TYPE.MOUSE);
      this.focusType = this.getUpdatedFocusInfo('item', common.FOCUS_TYPE.MOUSE);
    };
    this.onKeyUp = (event, type) => {
      if (this.disabled)
        return;
      if (event.key === 'Tab') {
        this.focusType = this.getUpdatedFocusInfo(type, common.FOCUS_TYPE.TAB);
      }
    };
    this.getUpdatedFocusInfo = (type, updateValue) => ({
      ...this.focusType,
      [type]: updateValue,
    });
    this.handleDeleteItem = (event) => {
      const isDeleted = ({ name, size }) => name + size === event.detail.name + event.detail.size;
      (this.orderedFiles || []).filter(isDeleted).forEach(file => this.abortFile(utils.getFileKey(file)));
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
      if (file.size > utils.convertMBToBytes(this.size)) {
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
        file.formatError = !utils.isFileAccepted(file, this.acceptConfig);
        return file;
      }
      // An explicit empty config means "accept everything", and the file is left exactly as it came in.
      if (this.acceptConfig !== undefined)
        return file;
      // With no configuration at all there is nothing to validate against, but a file the browser
      // left untyped still gets a type from its extension so the item's icon can resolve.
      if (!file.type) {
        return utils.modifyPropertiesOnFile(file, { type: utils.inferTypeFromName(file.name) });
      }
      return file;
    };
    this.isFileWithError = (file) => !!(file.formatError || file.sizeError || file.validatorError || file.processingError || file.status === 'error');
    this.generateUniqueName = (fileName, fileList) => {
      const baseName = utils.getBaseName(fileName);
      const extension = utils.getExtension(fileName);
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
          ? utils.renameFile(newFile, this.generateUniqueName(newFile.name, seen))
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
    this.isFileStillPresent = (key) => (this.orderedFiles || []).some(file => utils.getFileKey(file) === key);
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
      const key = utils.getFileKey(file);
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
          file.progress = utils.normaliseProgress(progress);
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
      index: (this.orderedFiles || []).findIndex(item => utils.getFileKey(item) === key),
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
        this.scrollState = types.ScrollState.scroll;
        return;
      }
      this.scrollState = false;
    };
    this.getAcceptTokens = () => (this.isAcceptConfigFilled() ? utils.getAcceptTokens(this.acceptConfig) : []);
    this.getAcceptLabels = () => this.isAcceptConfigFilled()
      ? utils.getAcceptLabels(this.acceptConfig, this._locales.acceptFamilyLabels, utils.LOCALES_DEFAULTS.acceptFamilyLabels)
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
    return utils$1.mergeLocales(utils.LOCALES_DEFAULTS, this.locales);
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
    return (index.h(index.Host, { class: this.hostCssClasses(), exportparts: "file-item, wrapper, content, file-name, tooltip, loading, percentage, cross-icon", onFocus: this.onFocus, onBlur: this.onBlur, onKeyDown: this.onGlobalKeyDown, onPointerDown: this.onPointerDown, onMouseDown: this.onMouseDown, "aria-disabled": this.disabled ? 'true' : undefined }, index.h("slot", { name: "label", part: "slot-label" }), this.labelConfig?.text && (index.h("wpp-label-v4-6-0", { class: "file-upload-label", id: this.labelId, htmlFor: this.inputId, optional: !this.required, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label", onMouseEnter: () => (this.isLabelHovered = !this.disabled), onMouseLeave: () => (this.isLabelHovered = false) })), index.h("slot", { name: "description", part: "slot-description" }), index.h("div", { class: this.uploadWrapperCssClasses(), onDrop: this.handleDrop, onDragEnter: this.handleDragEnter, onDragLeave: this.handleDragLeave, onDragOver: this.handleDragOver, part: "file-upload-container" }, index.h("wpp-avatar-v4-6-0", { class: "icon-file", icon: "wpp-icon-file", size: "l", role: "presentation", tabindex: "-1", "aria-hidden": "true" }), index.h("div", { class: "content", part: "content" }, index.h("p", { id: this.ctaId }, index.h("span", { class: "label", part: "label" }, this._locales.label), ' ', index.h("span", { class: "text", part: "text" }, this._locales.text))), index.h("p", { class: "text-info", part: "text-info", id: this.hintId }, utils.acceptsAnyFile(this.acceptConfig)
      ? this._locales.infoAnyFormat(this.size)
      : this._locales.info(this.getAcceptLabels().join(', '), this.size)), index.h("input", { class: "file-loader", type: "file", id: this.inputId, name: this.name, onChange: this.handleChange, onFocus: this.onInputFocus, onBlur: this.onInputBlur, ref: inputRef => (this.inputRef = inputRef), multiple: this.multiple, accept: this.getAcceptTokens().join(), part: "input", "aria-labelledby": this.labelConfig?.text ? `${this.labelId} ${this.ctaId}` : this.ctaId, "aria-describedby": this.message || this.isLimitReached ? `${this.hintId} ${this.messageId}` : this.hintId, "aria-invalid": this.isLimitReached || this.messageType === 'error' ? 'true' : undefined, disabled: this.disabled })), index.h("span", { class: "sr-only", "aria-live": "polite" }, this.liveAnnouncement), (this.message || this.isLimitReached) && (index.h("wpp-inline-message-v4-6-0", { id: this.messageId, message: this.getMessageText(), type: this.isLimitReached ? 'error' : this.messageType, showTooltipFrom: this.maxMessageLength, tooltipConfig: this.tooltipConfig, part: "message" })), allFiles?.length ? (index.h("div", { class: this.listWrapperCssClasses(), part: "list-wrapper" }, index.h("ul", { role: "list", class: "file-list", part: "file-list", onScroll: this.handleListScroll }, allFiles.map((file, index$1) => (index.h("wpp-file-upload-item-v4-6-0", { ref: el => el && (this.itemRefs[index$1] = el), key: utils.getFileKey(file), format: this.format, parentDisabled: this.disabled, currentIndex: index$1, onWppDelete: this.handleDeleteItem, onWppClick: this.handleClickItem, file: file, locales: {
        sizeError: this._locales.sizeError,
        formatError: this._locales.formatError,
        removeFile: this._locales.removeFile,
        uploadProgress: this._locales.uploadProgress,
      }, part: "file-item", onBlur: this.onBlur, onKeyUp: (event) => this.onKeyUp(event, 'item') })))))) : null));
  }
  static get registryIs() { return "wpp-file-upload-v4-6-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "disabled": ["onDisabledChange"],
    "value": ["onValueChange"]
  }; }
};
WppFileUpload.style = wppFileUploadCss;

exports.wpp_file_upload = WppFileUpload;
