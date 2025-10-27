import Quill from 'quill';
const QuillToolbar = Quill.import('modules/toolbar');
export class WppQuillToolbar extends QuillToolbar {
  constructor(quill, options) {
    if (!options.aliases || !Array.isArray(options.container)) {
      super(quill, options);
    }
    else {
      // substitute options by aliases if present
      options.container = options.container.map(option => {
        const alias = typeof option === 'string' && options.aliases[option];
        return (alias || option);
      });
      delete options.aliases;
      super(quill, options);
    }
  }
}
