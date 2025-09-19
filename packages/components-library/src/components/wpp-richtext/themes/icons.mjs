import { transformToVersionedTag } from '../../../utils/utils'

import { WppIconAttach } from '../../wpp-icon/components/actions/content actions/wpp-icon-attach/wpp-icon-attach'
import { WppIconBlockquote } from '../../wpp-icon/components/tools/text-formatting/wpp-icon-blockquote/wpp-icon-blockquote'
import { WppIconBold } from '../../wpp-icon/components/tools/text-formatting/wpp-icon-bold/wpp-icon-bold'
import { WppIconCodeView } from '../../wpp-icon/components/tools/text-formatting/wpp-icon-code-view/wpp-icon-code-view'
import { WppIconFloatCenter } from '../../wpp-icon/components/tools/text-formatting/wpp-icon-float-center/wpp-icon-float-center'
import { WppIconFloatLeft } from '../../wpp-icon/components/tools/text-formatting/wpp-icon-float-left/wpp-icon-float-left'
import { WppIconFloatRight } from '../../wpp-icon/components/tools/text-formatting/wpp-icon-float-right/wpp-icon-float-right'
import { WppIconH1 } from '../../wpp-icon/components/tools/text-formatting/wpp-icon-h1/wpp-icon-h1'
import { WppIconH2 } from '../../wpp-icon/components/tools/text-formatting/wpp-icon-h2/wpp-icon-h2'
import { WppIconImage } from '../../wpp-icon/components/media/media/wpp-icon-image/wpp-icon-image'
import { WppIconIndentDecrease } from '../../wpp-icon/components/tools/text-formatting/wpp-icon-indent-decrease/wpp-icon-indent-decrease'
import { WppIconIndentIncrease } from '../../wpp-icon/components/tools/text-formatting/wpp-icon-indent-increase/wpp-icon-indent-increase'
import { WppIconItalic } from '../../wpp-icon/components/tools/text-formatting/wpp-icon-italic/wpp-icon-italic'
import { WppIconLink } from '../../wpp-icon/components/actions/content actions/wpp-icon-link/wpp-icon-link'
import { WppIconOrderedList } from '../../wpp-icon/components/tools/text-formatting/wpp-icon-ordered-list/wpp-icon-ordered-list'
import { WppIconRedo } from '../../wpp-icon/components/actions/content actions/wpp-icon-redo/wpp-icon-redo'
import { WppIconStrikeThrough } from '../../wpp-icon/components/tools/text-formatting/wpp-icon-strike-through/wpp-icon-strike-through'
import { WppIconTextAlignmentCenter } from '../../wpp-icon/components/tools/align/wpp-icon-text-alignment-center/wpp-icon-text-alignment-center'
import { WppIconTextAlignmentJustify } from '../../wpp-icon/components/tools/align/wpp-icon-text-alignment-justify/wpp-icon-text-alignment-justify'
import { WppIconTextAlignmentLeft } from '../../wpp-icon/components/tools/align/wpp-icon-text-alignment-left/wpp-icon-text-alignment-left'
import { WppIconTextAlignmentRight } from '../../wpp-icon/components/tools/align/wpp-icon-text-alignment-right/wpp-icon-text-alignment-right'
import { WppIconUnderline } from '../../wpp-icon/components/tools/text-formatting/wpp-icon-underline/wpp-icon-underline'
import { WppIconUndo } from '../../wpp-icon/components/actions/content actions/wpp-icon-undo/wpp-icon-undo'
import { WppIconUnorderedList } from '../../wpp-icon/components/tools/text-formatting/wpp-icon-unordered-list/wpp-icon-unordered-list'
import { WppIconVideoClip } from '../../wpp-icon/components/media/media/wpp-icon-video-clip/wpp-icon-video-clip'

const icon = name => `<${transformToVersionedTag(name)} size="m" color='inherit' />`
export const icons = {
  align: {
    '': icon(WppIconTextAlignmentLeft.is),
    center: icon(WppIconTextAlignmentCenter.is),
    right: icon(WppIconTextAlignmentRight.is),
    justify: icon(WppIconTextAlignmentJustify.is),
  },
  background: 'Bg',
  blockquote: icon(WppIconBlockquote.is),
  bold: icon(WppIconBold.is),
  clean: 'Cl',
  code: 'Co',
  'code-block': icon(WppIconCodeView.is),
  color: 'Cc',
  direction: {
    '': 'ltr',
    rtl: 'rtl',
  },
  float: {
    center: icon(WppIconFloatCenter.is),
    full: 'F',
    left: icon(WppIconFloatLeft.is),
    right: icon(WppIconFloatRight.is),
  },
  formula: 'F',
  header: {
    1: icon(WppIconH1.is),
    2: icon(WppIconH2.is),
  },
  italic: icon(WppIconItalic.is),
  image: icon(WppIconImage.is),
  indent: {
    '+1': icon(WppIconIndentIncrease.is),
    '-1': icon(WppIconIndentDecrease.is),
  },
  link: icon(WppIconLink.is),
  list: {
    ordered: icon(WppIconOrderedList.is),
    bullet: icon(WppIconUnorderedList.is),
    check: 'check',
  },
  script: {
    sub: 'Su',
    super: 'Sp',
  },
  strike: icon(WppIconStrikeThrough.is),
  underline: icon(WppIconUnderline.is),
  video: icon(WppIconVideoClip.is),
  undo: icon(WppIconUndo.is),
  redo: icon(WppIconRedo.is),
  attachment: icon(WppIconAttach.is),
}
