'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const index$1 = require('./index-10e1072f.js');
const tiptapConfig = require('./tiptap-config-0e2d155a.js');
require('./_commonjsHelpers-bcc1208a.js');
require('./utils-2231f97a.js');
require('./consts-d8f5ef98.js');
require('./wpp-icon-attach-5abd3b6f.js');
require('./WppIcon-55327707.js');
require('./wpp-icon-unordered-list-d75328da.js');
require('./wpp-icon-video-clip-4873468d.js');
require('./const-09fdf30a.js');
require('./marked.umd-e1074c94.js');
require('./wpp-progress-indicator-5bccf9fe.js');
require('./wpp-icon-chevron-01139742.js');
require('./wpp-icon-gallery-5c2897b9.js');
require('./lodash-6b012aab.js');
require('./wpp-action-button-0241aba7.js');
require('./common-ee802540.js');
require('./WrappedSlot-4a4ef805.js');
require('./wpp-input-533c8118.js');
require('./turndown.browser.es-eb372b89.js');

const wppRichtextViewCss = "@charset \"UTF-8\";.ProseMirror{position:relative;outline:none;word-wrap:break-word;white-space:pre-wrap;white-space:break-spaces;-webkit-font-variant-ligatures:none;font-variant-ligatures:none;-webkit-font-feature-settings:\"liga\" 0;font-feature-settings:\"liga\" 0;min-height:var(--richtext-editor-min-height, 136px);padding:var(--richtext-padding, 12px 15px);overflow-y:auto;-moz-tab-size:4;-o-tab-size:4;tab-size:4;}.ProseMirror:focus{outline:none}.ProseMirror p.is-editor-empty:first-child::before{content:attr(data-placeholder);float:left;color:var(--richtext-placeholder-color, var(--wpp-grey-color-700));pointer-events:none;height:0}.ProseMirror p{margin:0}.ProseMirror p+p{margin-top:0}.ProseMirror strong,.ProseMirror b{font-weight:bold}.ProseMirror em,.ProseMirror i{font-style:italic}.ProseMirror h1,.ProseMirror h2,.ProseMirror h3,.ProseMirror h4,.ProseMirror h5,.ProseMirror h6{margin-top:0.5em;margin-bottom:0.25em;font-weight:bold}.ProseMirror h1:first-child,.ProseMirror h2:first-child,.ProseMirror h3:first-child,.ProseMirror h4:first-child,.ProseMirror h5:first-child,.ProseMirror h6:first-child{margin-top:0}.ProseMirror h1{font-size:2em}.ProseMirror h2{font-size:1.5em}.ProseMirror h3{font-size:1.17em}.ProseMirror blockquote{border-left:4px solid var(--wpp-grey-color-400);margin:0.5em 0;padding:0.5em 1em}.ProseMirror pre{background:var(--wpp-grey-color-100);border-radius:var(--wpp-border-radius-s);padding:0.75em 1em;overflow-x:auto}.ProseMirror pre code{background:none;padding:0;font-size:0.9em}.ProseMirror code{background:var(--wpp-grey-color-100);border-radius:3px;padding:0.15em 0.3em;font-size:0.9em}.ProseMirror .ql-size-2xs{font-size:var(--wpp-typography-2xs-strong-font-size, 10px);line-height:var(--wpp-typography-2xs-strong-line-height, 20px);letter-spacing:var(--wpp-typography-2xs-strong-letter-spacing, 0.5px);text-transform:var(--wpp-typography-2xs-strong-text-transform, uppercase);font-weight:var(--wpp-typography-2xs-strong-font-weight, 700);color:var(--wpp-typography-2xs-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-2xs-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-2xs-strong-letter-spacing, 0)}.ProseMirror .ql-size-xs{font-size:var(--wpp-typography-xs-body-font-size, 12px);line-height:var(--wpp-typography-xs-body-line-height, 20px);font-weight:var(--wpp-typography-xs-body-font-weight, 400);color:var(--wpp-typography-xs-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-xs-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-xs-body-letter-spacing, 0)}.ProseMirror .ql-size-m{font-size:var(--wpp-typography-m-body-font-size, 16px);line-height:var(--wpp-typography-m-body-line-height, 24px);font-weight:var(--wpp-typography-m-body-font-weight, 400);color:var(--wpp-typography-m-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-m-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-m-body-letter-spacing, 0)}.ProseMirror .ql-size-l{font-size:var(--wpp-typography-l-body-font-size, 18px);line-height:var(--wpp-typography-l-body-line-height, 28px);font-weight:var(--wpp-typography-l-body-font-weight, 400);color:var(--wpp-typography-l-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-l-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-l-body-letter-spacing, 0)}.ProseMirror .ql-size-xl{font-size:var(--wpp-typography-xl-heading-font-size, 20px);line-height:var(--wpp-typography-xl-heading-line-height, 32px);font-weight:var(--wpp-typography-xl-heading-font-weight, 400);color:var(--wpp-typography-xl-heading-color, var(--wpp-text-color));font-family:var(--wpp-typography-xl-heading-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-xl-heading-letter-spacing, 0)}.ProseMirror .ql-size-2xl{font-size:var(--wpp-typography-2xl-heading-font-size, 24px);line-height:var(--wpp-typography-2xl-heading-line-height, 32px);font-weight:var(--wpp-typography-2xl-heading-font-weight, 400);color:var(--wpp-typography-2xl-heading-color, var(--wpp-text-color));font-family:var(--wpp-typography-2xl-heading-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-2xl-heading-letter-spacing, 0)}.ProseMirror .ql-size-3xl{font-size:var(--wpp-typography-3xl-heading-font-size, 28px);line-height:var(--wpp-typography-3xl-heading-line-height, 40px);font-weight:var(--wpp-typography-3xl-heading-font-weight, 400);color:var(--wpp-typography-3xl-heading-color, var(--wpp-text-color));font-family:var(--wpp-typography-3xl-heading-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-3xl-heading-letter-spacing, 0)}.ProseMirror .ql-size-4xl{font-size:var(--wpp-typography-4xl-display-font-size, 36px);line-height:var(--wpp-typography-4xl-display-line-height, 48px);font-weight:var(--wpp-typography-4xl-display-font-weight, 400);color:var(--wpp-typography-4xl-display-color, var(--wpp-text-color));font-family:var(--wpp-typography-4xl-display-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-4xl-display-letter-spacing, 0)}.ProseMirror .ql-size-5xl{font-size:var(--wpp-typography-5xl-display-font-size, 48px);line-height:var(--wpp-typography-5xl-display-line-height, 62px);font-weight:var(--wpp-typography-5xl-display-font-weight, 400);color:var(--wpp-typography-5xl-display-color, var(--wpp-text-color));font-family:var(--wpp-typography-5xl-display-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-5xl-display-letter-spacing, 0)}.ProseMirror li{margin:0;}.ProseMirror li>p{margin:0}.ProseMirror li:has(*.ql-size-2xs)::before{font-size:var(--wpp-typography-2xs-strong-font-size, 10px);line-height:var(--wpp-typography-2xs-strong-line-height, 20px);letter-spacing:var(--wpp-typography-2xs-strong-letter-spacing, 0.5px);text-transform:var(--wpp-typography-2xs-strong-text-transform, uppercase);font-weight:var(--wpp-typography-2xs-strong-font-weight, 700);color:var(--wpp-typography-2xs-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-2xs-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-2xs-strong-letter-spacing, 0)}.ProseMirror li:has(*.ql-size-xs)::before{font-size:var(--wpp-typography-xs-body-font-size, 12px);line-height:var(--wpp-typography-xs-body-line-height, 20px);font-weight:var(--wpp-typography-xs-body-font-weight, 400);color:var(--wpp-typography-xs-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-xs-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-xs-body-letter-spacing, 0)}.ProseMirror li:has(*.ql-size-m)::before{font-size:var(--wpp-typography-m-body-font-size, 16px);line-height:var(--wpp-typography-m-body-line-height, 24px);font-weight:var(--wpp-typography-m-body-font-weight, 400);color:var(--wpp-typography-m-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-m-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-m-body-letter-spacing, 0)}.ProseMirror li:has(*.ql-size-l)::before{font-size:var(--wpp-typography-l-body-font-size, 18px);line-height:var(--wpp-typography-l-body-line-height, 28px);font-weight:var(--wpp-typography-l-body-font-weight, 400);color:var(--wpp-typography-l-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-l-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-l-body-letter-spacing, 0)}.ProseMirror li:has(*.ql-size-xl)::before{font-size:var(--wpp-typography-xl-heading-font-size, 20px);line-height:var(--wpp-typography-xl-heading-line-height, 32px);font-weight:var(--wpp-typography-xl-heading-font-weight, 400);color:var(--wpp-typography-xl-heading-color, var(--wpp-text-color));font-family:var(--wpp-typography-xl-heading-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-xl-heading-letter-spacing, 0)}.ProseMirror li:has(*.ql-size-2xl)::before{font-size:var(--wpp-typography-2xl-heading-font-size, 24px);line-height:var(--wpp-typography-2xl-heading-line-height, 32px);font-weight:var(--wpp-typography-2xl-heading-font-weight, 400);color:var(--wpp-typography-2xl-heading-color, var(--wpp-text-color));font-family:var(--wpp-typography-2xl-heading-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-2xl-heading-letter-spacing, 0)}.ProseMirror li:has(*.ql-size-3xl)::before{font-size:var(--wpp-typography-3xl-heading-font-size, 28px);line-height:var(--wpp-typography-3xl-heading-line-height, 40px);font-weight:var(--wpp-typography-3xl-heading-font-weight, 400);color:var(--wpp-typography-3xl-heading-color, var(--wpp-text-color));font-family:var(--wpp-typography-3xl-heading-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-3xl-heading-letter-spacing, 0)}.ProseMirror li:has(*.ql-size-4xl)::before{font-size:var(--wpp-typography-4xl-display-font-size, 36px);line-height:var(--wpp-typography-4xl-display-line-height, 48px);font-weight:var(--wpp-typography-4xl-display-font-weight, 400);color:var(--wpp-typography-4xl-display-color, var(--wpp-text-color));font-family:var(--wpp-typography-4xl-display-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-4xl-display-letter-spacing, 0)}.ProseMirror li:has(*.ql-size-5xl)::before{font-size:var(--wpp-typography-5xl-display-font-size, 48px);line-height:var(--wpp-typography-5xl-display-line-height, 62px);font-weight:var(--wpp-typography-5xl-display-font-weight, 400);color:var(--wpp-typography-5xl-display-color, var(--wpp-text-color));font-family:var(--wpp-typography-5xl-display-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-5xl-display-letter-spacing, 0)}.ProseMirror ul,.ProseMirror ol{padding-left:1.5em;margin:0.25em 0;list-style:none;}.ProseMirror ul[data-type=taskList],.ProseMirror ol[data-type=taskList]{padding-left:0}.ProseMirror ul:not([data-type=taskList])>li,.ProseMirror ol>li{position:relative;list-style-type:none;padding-left:1.5em}.ProseMirror ul:not([data-type=taskList])>li::before,.ProseMirror ol>li::before{position:absolute;left:0;width:1.2em;text-align:right;white-space:nowrap}.ProseMirror ul:not([data-type=taskList])>li::before{content:\"•\"}.ProseMirror ol{counter-reset:list-0}.ProseMirror ol>li{counter-increment:list-0}.ProseMirror ol>li::before{content:counter(list-0, decimal) \".\"}.ProseMirror ol ol{counter-reset:list-1}.ProseMirror ol ol>li{counter-increment:list-1}.ProseMirror ol ol>li::before{content:counter(list-1, lower-alpha) \".\"}.ProseMirror ol ol ol{counter-reset:list-2}.ProseMirror ol ol ol>li{counter-increment:list-2}.ProseMirror ol ol ol>li::before{content:counter(list-2, lower-roman) \".\"}.ProseMirror ul[data-type=taskList]{list-style:none;padding-left:0;margin:0.25em 0}.ProseMirror ul[data-type=taskList]>li{display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start;gap:0.5em;margin:0}.ProseMirror ul[data-type=taskList]>li>label{-ms-flex:0 0 auto;flex:0 0 auto;margin-top:0.2em;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ProseMirror ul[data-type=taskList]>li>label input[type=checkbox]{cursor:pointer;accent-color:var(--wpp-primary-color-500)}.ProseMirror ul[data-type=taskList]>li>div{-ms-flex:1 1 auto;flex:1 1 auto;min-width:0}.ProseMirror ul[data-type=taskList]>li>div>p{margin:0}.ProseMirror a{color:var(--wpp-primary-color-500);text-decoration:underline;cursor:pointer}.ProseMirror img{display:inline;vertical-align:middle;max-width:100%;height:auto}.ProseMirror img.ProseMirror-selectednode{outline:2px solid var(--wpp-brand-color)}.ProseMirror .richtext-image{display:inline;vertical-align:middle;max-width:100%}.ProseMirror hr{border:none;border-top:2px solid var(--wpp-grey-color-300);margin:1em 0}.ProseMirror hr.ProseMirror-selectednode{border-top-color:var(--wpp-brand-color)}.ProseMirror table{border-collapse:collapse;width:100%;margin:0.5em 0;overflow:hidden}.ProseMirror table td,.ProseMirror table th{border:1px solid var(--wpp-grey-color-400);padding:0.5em;min-width:100px;vertical-align:top;position:relative}.ProseMirror table th{background:var(--wpp-grey-color-100);font-weight:bold}.ProseMirror table .selectedCell::after{z-index:2;position:absolute;content:\"\";inset:0;background:rgba(200, 200, 255, 0.4);pointer-events:none}.ProseMirror .text-align-left{text-align:left}.ProseMirror .text-align-center{text-align:center}.ProseMirror .text-align-right{text-align:right}.ProseMirror .text-align-justify{text-align:justify}.ProseMirror .ProseMirror-dropcursor{position:absolute;height:2px;background:var(--wpp-brand-color)}.ProseMirror .ProseMirror-gapcursor{display:none;pointer-events:none;position:absolute}.ProseMirror .ProseMirror-gapcursor::after{content:\"\";display:block;position:absolute;top:-2px;width:20px;border-top:1px solid black;-webkit-animation:ProseMirror-cursor-blink 1.1s steps(2) infinite;animation:ProseMirror-cursor-blink 1.1s steps(2) infinite}.ProseMirror.ProseMirror-focused .ProseMirror-gapcursor{display:block}.ProseMirror img[style*=\"float: left\"],.ProseMirror img[data-align=left],.ProseMirror img.ql-float-left{float:left;margin-right:var(--richtext-float-gap, 1em);margin-bottom:0.5em}.ProseMirror img[style*=\"float: right\"],.ProseMirror img[data-align=right],.ProseMirror img.ql-float-right{float:right;margin-left:var(--richtext-float-gap, 1em);margin-bottom:0.5em}.ProseMirror img[data-align=center],.ProseMirror img.ql-float-center{display:block;margin-left:auto;margin-right:auto}.ProseMirror .richtext-video-wrapper{position:relative;max-width:100%;margin:0.5em 0;line-height:0}.ProseMirror .richtext-video-wrapper video{max-width:100%;min-width:200px;min-height:150px;height:auto;display:block;pointer-events:auto}.ProseMirror .richtext-video-wrapper.ProseMirror-selectednode{outline:2px solid var(--wpp-primary-color-500);outline-offset:2px;border-radius:2px}.ProseMirror video:not(.richtext-video-wrapper video){max-width:100%;min-width:200px;min-height:150px;height:auto;display:block;margin:0.5em 0;pointer-events:auto}.ProseMirror a.ql-attachment{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;gap:4px;padding:4px 8px;margin:2px 0;border:1px solid var(--wpp-grey-color-300);border-radius:var(--wpp-border-radius-s);background:var(--wpp-grey-color-100);color:var(--wpp-primary-color-500);text-decoration:none;font-size:0.9em;cursor:pointer}.ProseMirror a.ql-attachment:hover{background:var(--wpp-grey-color-200)}.ProseMirror a.ql-attachment::before{content:\"📎\";font-size:1em}@-webkit-keyframes ProseMirror-cursor-blink{to{visibility:hidden}}@keyframes ProseMirror-cursor-blink{to{visibility:hidden}}.richtext-uploading-image{position:relative;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;min-height:60px;background:var(--wpp-grey-color-100);border:1px dashed var(--wpp-grey-color-400);border-radius:var(--wpp-border-radius-s);margin:0.5em 0}.richtext-uploading-image .richtext-upload-content{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:8px;padding:12px}.richtext-uploading-image .richtext-upload-spinner{width:20px;height:20px;border:2px solid var(--wpp-grey-color-300);border-top-color:var(--wpp-brand-color);border-radius:50%;-webkit-animation:richtext-spin 0.8s linear infinite;animation:richtext-spin 0.8s linear infinite}.richtext-uploading-image .richtext-upload-error-icon{color:var(--wpp-danger-color-500);font-size:20px}.richtext-uploading-image .richtext-upload-filename{font-size:0.85em;color:var(--wpp-grey-color-700)}.richtext-uploading-image.richtext-upload-error{border-color:var(--wpp-danger-color-400);background:var(--wpp-danger-color-50)}@-webkit-keyframes richtext-spin{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes richtext-spin{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.richtext-image-overlay{position:absolute;z-index:10;border:2px solid var(--wpp-brand-color);pointer-events:none}.richtext-image-overlay .richtext-resize-handle{position:absolute;width:10px;height:10px;background:var(--wpp-brand-color);border:1px solid white;pointer-events:auto;z-index:11}.richtext-image-overlay .richtext-resize-handle.richtext-resize-nw{top:-5px;left:-5px;cursor:nw-resize}.richtext-image-overlay .richtext-resize-handle.richtext-resize-ne{top:-5px;right:-5px;cursor:ne-resize}.richtext-image-overlay .richtext-resize-handle.richtext-resize-sw{bottom:-5px;left:-5px;cursor:sw-resize}.richtext-image-overlay .richtext-resize-handle.richtext-resize-se{bottom:-5px;right:-5px;cursor:se-resize}.richtext-image-overlay .richtext-image-toolbar{position:absolute;top:-40px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);display:-ms-flexbox;display:flex;gap:2px;padding:4px;background:var(--wpp-grey-color-000);border-radius:var(--wpp-border-radius-s);-webkit-box-shadow:var(--wpp-box-shadow-m);box-shadow:var(--wpp-box-shadow-m);pointer-events:auto;white-space:nowrap}.richtext-image-overlay .richtext-image-toolbar .richtext-image-toolbar-btn{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:28px;height:28px;border:none;background:transparent;border-radius:var(--wpp-border-radius-s);cursor:pointer;font-size:14px;color:var(--wpp-grey-color-600)}.richtext-image-overlay .richtext-image-toolbar .richtext-image-toolbar-btn:hover{background:var(--wpp-grey-color-200);color:var(--wpp-grey-color-800)}.richtext-image-overlay .richtext-image-toolbar .richtext-image-toolbar-btn.richtext-image-delete-btn{color:var(--wpp-danger-color-500)}.richtext-image-overlay .richtext-image-toolbar .richtext-image-toolbar-btn.richtext-image-delete-btn:hover{background:var(--wpp-danger-color-50)}.ql-toolbar.ql-wpp{-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-ms-flex-align:center;align-items:center;gap:4px;height:32px;padding:4px 12px;-webkit-box-shadow:inset 0 -1px 0 var(--richtext-border-color, var(--wpp-grey-color-500));box-shadow:inset 0 -1px 0 var(--richtext-border-color, var(--wpp-grey-color-500))}.ql-toolbar.ql-wpp::after{clear:both;content:\"\";display:table}.ql-toolbar.ql-wpp .ql-formats{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;gap:4px;position:relative;padding:0}.ql-toolbar.ql-wpp .ql-formats:not(:last-of-type){padding-right:12px}.ql-toolbar.ql-wpp .ql-formats:not(:last-of-type)::after{content:\" \";display:block;position:absolute;right:4px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);width:1px;height:20px;background:var(--wpp-grey-color-300)}.ql-toolbar.ql-wpp button{background:none;border:none;cursor:pointer;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:24px;height:24px;padding:2px;border-radius:var(--wpp-border-radius-s);font-family:inherit;font-size:14px;color:var(--richtext-button-inactive-color, var(--wpp-grey-color-600));-webkit-transition:color 0.15s;transition:color 0.15s}.ql-toolbar.ql-wpp button:hover{color:var(--richtext-button-inactive-hover-color, var(--wpp-grey-color-700))}.ql-toolbar.ql-wpp button:active:hover{color:var(--richtext-button-inactive-click-color, var(--wpp-grey-color-800));outline:none}.ql-toolbar.ql-wpp button.ql-active{color:var(--richtext-button-active-color, var(--wpp-primary-color-500))}.ql-toolbar.ql-wpp button.ql-active:hover{color:var(--richtext-button-active-hover-color, var(--wpp-primary-color-400))}.ql-toolbar.ql-wpp button.ql-active:active{color:var(--richtext-button-active-click-color, var(--wpp-primary-color-600))}.ql-toolbar.ql-wpp button:disabled{cursor:not-allowed;opacity:0.4}.ql-toolbar.ql-wpp button svg{float:left;height:100%}.image-actions__proxy-image{display:none}.ql-toolbar.ql-wpp .ql-size-menu{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;vertical-align:middle}.ql-toolbar.ql-wpp .ql-size-menu .ql-size-trigger{--wpp-action-button-secondary-bg-color:transparent;--wpp-action-button-secondary-border-color:transparent;--wpp-action-button-opacity-hover:0;--wpp-action-button-opacity-active:0;width:56px;min-width:56px;font-size:13px;font-weight:500}.ql-toolbar.ql-wpp .ql-size-menu .ql-size-trigger::part(button){width:100%}.ql-toolbar.ql-wpp .ql-size-menu .ql-size-trigger::part(body){width:100%;-ms-flex-pack:justify;justify-content:space-between}.ql-tooltip{position:absolute;z-index:5;min-width:250px;padding:var(--richtext-tooltip-padding);border-radius:var(--wpp-border-radius-s);-webkit-box-shadow:var(--wpp-box-shadow-m);box-shadow:var(--wpp-box-shadow-m);background-color:var(--richtext-tooltip-bg-color);color:var(--richtext-tooltip-color);font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);-webkit-transform:translateY(10px);transform:translateY(10px);}.ql-tooltip.ql-flip{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.ql-tooltip .ql-tooltip-wrapper{display:-ms-flexbox;display:flex;-ms-flex-flow:column nowrap;flex-flow:column nowrap}.ql-tooltip .ql-tooltip-wrapper::before{content:\"Visit URL:\";line-height:32px;white-space:nowrap}.ql-tooltip .ql-tooltip-wrapper a.ql-preview{max-width:100%;word-break:break-all;overflow-wrap:anywhere;line-height:32px;color:var(--wpp-primary-color-500);text-decoration:none;cursor:pointer}.ql-tooltip .ql-tooltip-wrapper a.ql-preview:hover{text-decoration:underline}.ql-tooltip .ql-tooltip-wrapper .ql-action-buttons{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;gap:8px}.ql-tooltip .ql-tooltip-wrapper .ql-action-buttons .wpp-action-button{white-space:nowrap}.ql-tooltip.ql-editing .ql-tooltip-wrapper{-ms-flex-direction:row;flex-direction:row;gap:8px}.ql-tooltip.ql-editing .ql-tooltip-wrapper::before{content:\"Enter link:\"}.ql-tooltip.ql-editing .ql-tooltip-wrapper a.ql-preview,.ql-tooltip.ql-editing .ql-tooltip-wrapper .ql-action-buttons,.ql-tooltip.ql-editing .ql-tooltip-wrapper .ql-delete,.ql-tooltip.ql-editing .ql-tooltip-wrapper .ql-edit{display:none}.ql-tooltip.ql-editing .ql-tooltip-wrapper wpp-input{min-width:180px;-ms-flex:1;flex:1}.ql-tooltip.ql-editing .ql-tooltip-wrapper .ql-action.ql-save{white-space:nowrap}.ql-tooltip:not(.ql-editing) .ql-tooltip-wrapper wpp-input,.ql-tooltip:not(.ql-editing) .ql-tooltip-wrapper .ql-save{display:none}";

const WppRichtextView = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.tiptapEditor = null;
    this.value = undefined;
    this.format = index$1.formats.html;
    this.formats = undefined;
    this.modules = undefined;
    this.strict = true;
    this.styles = '{}';
    this.preserveWhitespace = true;
    this.name = undefined;
  }
  setValue(value) {
    if (!this.tiptapEditor)
      return;
    const noEmitOpts = { emitUpdate: false };
    const noEmitPreserveOpts = { ...noEmitOpts, parseOptions: { preserveWhitespace: 'full' } };
    if (this.format === index$1.formats.html) {
      this.tiptapEditor.commands.setContent(tiptapConfig.normalizeEmptyParagraphs(String(value || '')), noEmitPreserveOpts);
    }
    else if (this.format === index$1.formats.markdown) {
      const md = String(value || '');
      // `MarkdownManager.parse('')` returns `{ type: 'doc', content: [] }`,
      // which violates the ProseMirror doc schema (one block-child minimum)
      // and causes `setContent` to silently no-op — the previously-rendered
      // content stays on screen, so a fully cleared editor's value (e.g.
      // after the user deletes the last character) never propagates here.
      // Route empties through the plain HTML path which DOES clear the doc.
      if (!md) {
        this.tiptapEditor.commands.setContent('', noEmitOpts);
      }
      else {
        this.tiptapEditor.commands.setContent(md, { ...noEmitPreserveOpts, contentType: 'markdown' });
      }
    }
    else if (this.format === index$1.formats.text) {
      const escaped = (value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      this.tiptapEditor.commands.setContent(`<p>${escaped}</p>`, noEmitOpts);
    }
    else if (this.format === index$1.formats.json) {
      try {
        const content = JSON.parse(value);
        this.tiptapEditor.commands.setContent(content, noEmitOpts);
      }
      catch {
        const escaped = (value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        this.tiptapEditor.commands.setContent(`<p>${escaped}</p>`, noEmitOpts);
      }
    }
    else {
      const escaped = (value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      this.tiptapEditor.commands.setContent(`<p>${escaped}</p>`, noEmitOpts);
    }
  }
  getValue() {
    if (!this.tiptapEditor)
      return '';
    const html = this.tiptapEditor.getHTML();
    const text = this.tiptapEditor.state.doc.textContent;
    if (this.tiptapEditor.isEmpty)
      return '';
    if (this.format === 'html') {
      return tiptapConfig.normalizeListHtml(html);
    }
    else if (this.format === 'markdown') {
      return this.tiptapEditor.getMarkdown();
    }
    else if (this.format === 'text') {
      return text;
    }
    else if (this.format === 'json') {
      try {
        return JSON.stringify(this.tiptapEditor.getJSON());
      }
      catch {
        return text;
      }
    }
    else {
      return text;
    }
  }
  componentDidLoad() {
    const extensions = tiptapConfig.buildTiptapExtensions({
      formats: this.formats,
    });
    this.tiptapEditor = new index$1.Editor({
      element: this.containerElement,
      extensions,
      content: '',
      editable: false,
      injectCSS: false,
    });
    if (this.styles) {
      try {
        const styles = JSON.parse(this.styles);
        Object.keys(styles).forEach((key) => {
          this.containerElement?.style.setProperty(key, styles[key]);
        });
      }
      catch {
        // ignore invalid JSON styles
      }
    }
    this.containerElement?.classList.add('tiptap-view');
    if (this.value) {
      this.setValue(this.value);
    }
  }
  disconnectedCallback() {
    this.tiptapEditor?.destroy();
    this.tiptapEditor = null;
  }
  updateStyle(newValue, oldValue) {
    if (!this.containerElement) {
      return;
    }
    // Tolerate invalid JSON in either value (matches componentDidLoad behaviour);
    // a malformed `styles` prop must not throw and break the component for
    // consumers that may pass dynamic / partially-built JSON.
    if (oldValue) {
      try {
        const old = JSON.parse(oldValue);
        Object.keys(old).forEach((key) => {
          this.containerElement?.style.setProperty(key, '');
        });
      }
      catch {
        // ignore invalid previous JSON styles
      }
    }
    if (newValue) {
      try {
        const value = JSON.parse(newValue);
        Object.keys(value).forEach((key) => {
          this.containerElement?.style.setProperty(key, value[key]);
        });
      }
      catch {
        // ignore invalid new JSON styles
      }
    }
  }
  updateContent(newValue) {
    const value = this.getValue();
    if (Object.values(index$1.formats).indexOf(this.format) > -1 && newValue === value) {
      return null;
    }
    else {
      let changed = false;
      try {
        const newContentString = JSON.stringify(newValue);
        changed = JSON.stringify(value) !== newContentString;
      }
      catch {
        return null;
      }
      if (!changed) {
        return null;
      }
    }
    this.setValue(newValue);
  }
  render() {
    return (index.h(index.Host, null, index.h("wpp-richtext-common-styles-v4-1-0", null), index.h("div", { ref: (el) => (this.containerElement = el) })));
  }
  static get registryIs() { return "wpp-richtext-view-v4-1-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "styles": ["updateStyle"],
    "value": ["updateContent"]
  }; }
};
WppRichtextView.style = wppRichtextViewCss;

exports.wpp_richtext_view = WppRichtextView;
