import Quill from 'quill'

const QuillToolbar = Quill.import('modules/toolbar')

type QuillToolbarConfigItem = string[] | Array<string | Record<string, unknown>>
type QuillToolbarConfig = QuillToolbarConfigItem[]
type WppToolbarConfig = (string | QuillToolbarConfigItem)[]

type Handler = (value: any) => void

export interface ToolbarProps {
  container?: HTMLElement | WppToolbarConfig | null
  aliases?: Record<string, QuillToolbarConfig>
  handlers?: Record<string, Handler>
  option?: number
  module?: boolean
  theme?: boolean
}

export class WppQuillToolbar extends QuillToolbar {
  constructor(quill: Quill, options: Partial<ToolbarProps>) {
    if (!options.aliases || !Array.isArray(options.container)) {
      super(quill, options)
    } else {
      // substitute options by aliases if present
      options.container = options.container.map(option => {
        const alias = typeof option === 'string' && options.aliases![option]

        return (alias || option) as QuillToolbarConfigItem
      })

      delete options.aliases

      super(quill, options)
    }
  }
}
