```tsx
import {
  WppRichtext,
  WppRichtextHtml,
  WppRichtextView,
} from '@platform-ui-kit/components-library-react'
import { useCallback, useState } from 'react'
import {
  RichtextChangeEventDetail,
  RichtextSelectionChangeEventDetail,
  RichtextUploadRequestEventDetail,
  WppRichtextCustomEvent,
} from '@platform-ui-kit/components-library/dist/types/components'
import { marked } from 'marked'

const markdownDemoText = `
Welcome to the **Markdown** demo! Type some _Markdown_ here...

# Header 1
## Header 2
###### Header 6

Headers Setext-style:

 Header 2
 --------

Emphasis: **bold** *italic*

Intra-word emphasis: t*es*t becomes t<em>es</em>t.

Use \`inline code\` for snippets.

Create [links](http://example.com).

An [example][id]. Then, anywhere
else in the doc, define the link: [id]: http://example.com/  "Title"

Display an image: ![Sample Image](https://via.placeholder.com/150)

This is a list:
- Item 1
- Item 2
- Item 3

Ordered, without paragraphs:
1. Foo
2. Bar

This is a code block:
\`\`\`js
function hello() {
  console.log('Hello, world!');
}
\`\`\`

This is a task list:
- [x] Task 1
- [ ] Task 2
- [ ] Task 3

Manual Line Breaks - End a line with two or more spaces:
 Roses are red,
 Violets are blue.
`

const modules = JSON.stringify({
  toolbar: {
    aliases: {
      // Add image, video and attachments buttons to the embed section of toolbar
      embed: ['link', 'image', 'video', 'attachment'],
    },
  },
  // Enable custom upload handler for image, video and attachment
  imageUpload: true,
  videoUpload: true,
  attachmentUpload: true,
})

function upload(file: File): Promise<string> {
  return new Promise(resolve => {
    const delay = Math.floor(Math.random() * 10000)

    setTimeout(() => resolve(URL.createObjectURL(file)), delay)
  })
}

export const RichTextPage = () => {
  const [value, setValue] = useState('')
  const [markdownValue, setMarkdownValue] = useState(markdownDemoText)

  const handleChange = useCallback((e: WppRichtextCustomEvent<RichtextChangeEventDetail>) => {
    console.log('wppChange', e)
    setValue(e.detail.value)
  }, [])

  const handleMarkdownChange = useCallback((e: WppRichtextCustomEvent<RichtextChangeEventDetail>) => {
    console.log('wppMarkdownChange', e)
    setMarkdownValue(e.detail.value)
  }, [])

  const handleSelectionChange = useCallback((e: WppRichtextCustomEvent<RichtextSelectionChangeEventDetail>) => {
    console.log('wppSelectionChange', { ...e.detail.range }, e)
  }, [])

  // There is also need to enable respective embed button in toolbar (image, video and attachment)
  // and respective upload modules (imageUpload, videoUpload and attachmentUpload)
  const handleUploadRequest = useCallback((e: WppRichtextCustomEvent<RichtextUploadRequestEventDetail>) => {
    console.log('wppUploadRequest', e)

    const type = e.detail.type
    const callback = e.detail.callback
    const input = document.createElement('input')

    input.type = 'file'
    input.accept = type === 'attachment' ? '*' : `${type}/*`
    input.multiple = true
    input.onchange = () => {
      const uploadItems = Array.from(input.files!).map(file => ({
        file,
        promise: upload(file),
      }))

      callback(uploadItems)
    }
    input.click()
  }, [])

  const htmlOutput = marked(markdownValue) as string

  return (
    <>
      <h3>Rich text</h3>
      <WppRichtext
        name="content"
        value="<h1>Hello world!</h1>This is test value"
        modules={modules}
        onWppChange={handleChange}
        onWppSelectionChange={handleSelectionChange}
        onWppUploadRequest={handleUploadRequest}
        required
        charactersLimit={500}
        warningThreshold={480}
      />
      <h3>Rich text view</h3>
      <WppRichtextView value={value} />
      <h3>Rich text HTML view</h3>
      <WppRichtextHtml value={value} />

      <h2>Markdown Demo</h2>
      <p>This demo shows the new Markdown features. Simply copy and paste or type Markdown into the editor. The snippet below is pre-configured:</p>
      <pre style={{ backgroundColor: '#f7f7f7', padding: '1rem' }}>{markdownValue}</pre>

      <h3>Markdown Editor</h3>
      <WppRichtext
        name="markdownContent"
        value={markdownValue}
        format="markdown"
        modules={modules}
        onWppChange={handleMarkdownChange}
        onWppSelectionChange={handleSelectionChange}
        onWppUploadRequest={handleUploadRequest}
        required
        charactersLimit={500}
        warningThreshold={480}
        labelConfig={{ text: 'Markdown Content:' }}
        message="Markdown editor demo"
        placeholder="Type your Markdown here..."
        auto-focus
        style={{ height: '600px' }}
      />

      <h3>Output as HTML</h3>
      <WppRichtextHtml value={htmlOutput} />
    </>
  )
}
```
