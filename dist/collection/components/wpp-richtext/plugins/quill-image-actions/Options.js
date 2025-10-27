import ImageSpec from './specs/ImageSpec';
import VideoSpec from './specs/VideoSpec';
//@ts-ignore No module declaration
import { icons } from '../../themes/icons.mjs';
const DefaultOptions = {
  specs: [ImageSpec, VideoSpec],
  overlay: {
    className: 'ql-image-actions__overlay',
    style: {},
  },
  align: {
    attribute: 'data-align',
    aligner: {
      applyStyle: true,
    },
    icons: {
      left: icons.float.left,
      center: icons.float.center,
      right: icons.float.right,
    },
    toolbar: {
      allowDeselect: true,
      mainClassName: 'ql-image-actions__toolbar',
      mainStyle: {},
      buttonClassName: 'ql-image-actions__toolbar-button',
      addButtonSelectStyle: false,
      buttonStyle: {},
      svgStyle: {},
    },
  },
  resize: {
    handleClassName: 'ql-image-actions__resize-handle',
    handleStyle: {
      height: '10px',
      width: '10px',
    },
  },
};
export default DefaultOptions;
