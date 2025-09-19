import { WppRichtext } from '@platform-ui-kit/components-library-react'
import { useCallback, useState } from 'react'
import {
  RichtextChangeEventDetail,
  RichtextSelectionChangeEventDetail,
  RichtextUploadRequestEventDetail,
  WppRichtextCustomEvent,
} from '@platform-ui-kit/components-library/dist/types/components'

const markdownDemoText = `

\`\`\`js
Code block
\`\`\`

part*italic*regular

# Header 1
`

const userIssue = `
1. ~~Strikethrough Text~~ has a wrong formatting in output ~Strikethrough Text~ one tilde
symbol instead of double even if I manually pasting double ~~ it becomes ~ automatically

2. Similar issue with code block
\`\`\`
Code block
\`\`\`
which becomes just a regular string 'Code block' in the output

3. Headings don’t work When I am trying to insert heading formatting manually (for example, type # Header 1 in editor manually)

4. Italic text is not properly formatted for the part of the word if formatting happens from saved value
I am able to apply italic formatting to the word “on the fly” in editor, component returns
part_itallic_regular and format it to the partitallicregular
But if I provide initial value to the component, formatting is not applied and component shows unformatted text with underscores
part_itallic_regular and shows just part_itallic_regular
If I manually provide initial value as  part*itallic*regular it works ok
`

const modules = JSON.stringify({
  toolbar: {
    aliases: {
      embed: ['link', 'image', 'video', 'attachment'],
    },
  },
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

export const RichtextMarkdownFix = () => {
  const [value, setValue] = useState(markdownDemoText)
  const [changeValue, setChangeValue] = useState('')
  const [changePlainValue, setChangePlainValue] = useState('')

  const handleMarkdownChange = useCallback((e: WppRichtextCustomEvent<RichtextChangeEventDetail>) => {
    console.log('wppChange', e.detail)
    setChangeValue(e.detail.value)
    setChangePlainValue(e.detail.plainText ?? '')
    setValue(e.detail.value)
  }, [])

  const handleMarkdownSelectionChange = useCallback((e: WppRichtextCustomEvent<RichtextSelectionChangeEventDetail>) => {
    console.log('wppSelectionChange', { ...e.detail.range }, e.detail)
  }, [])

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

  return (
    <>
      <h2>User reported issue</h2>
      <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', background: '#f0f0f0', padding: '10px' }}>
        <p>{userIssue}</p>
      </pre>

      <h3>Markdown Editor</h3>
      <WppRichtext
        name="content"
        value={value}
        format="markdown"
        modules={modules}
        onWppChange={handleMarkdownChange}
        onWppSelectionChange={handleMarkdownSelectionChange}
        onWppUploadRequest={handleUploadRequest}
        required
        charactersLimit={500}
        warningThreshold={480}
        labelConfig={{ text: 'Content:' }}
        message="Markdown editor demo"
        placeholder="Type your Markdown here..."
        auto-focus
      />

      <h3>Emitted value</h3>
      <pre>{changeValue}</pre>

      <h3>Emitted plain value</h3>
      <pre>{changePlainValue}</pre>
    </>
  )
}
