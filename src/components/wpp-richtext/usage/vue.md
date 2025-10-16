```vue
<script setup lang="ts">
  import {
    WppRichtext,
    WppRichtextView,
    WppRichtextHtml,
  } from '@platform-ui-kit/components-library-vue'
  import { ref } from "vue"
  import { marked } from 'marked'
  import { defaultTextValue, markdownDemoText, modulesJSON } from './consts'

  function upload(file: File): Promise<string> {
    return new Promise(resolve => {
      const delay = Math.floor(Math.random() * 10000)

      setTimeout(() => resolve(URL.createObjectURL(file)), delay)
    })
  }

  const value = ref(defaultTextValue)
  const markdownValue = ref(markdownDemoText)
  const htmlOutput = marked(markdownValue.value) as string

  const setValue = (val: string) => {
    value.value = val
  }

const setMarkdownValue = (val: string) => {
    markdownValue.value = val
  }

  const handleChange = (e: CustomEvent) => {
    console.log('wppChange', e, e.detail)
    setValue(e.detail.value)
  }

  const handleSelectionChange = (e: CustomEvent) => {
    console.log('wppSelectionChange', { ...e.detail.range }, e)
  }

  const handleUploadRequest = (e: CustomEvent) => {
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
  }
</script>

<template>
  <div class="richText">
    <h3>Rich text</h3>
    <WppRichtext
      :name="'content'"
      :value="value"
      :modules="modulesJSON"
      @wppChange="handleChange"
      @wppSelectionChange="handleSelectionChange"
      @wppUploadRequest="handleUploadRequest"
      required
      :charactersLimit="500"
      :warningThreshold="480"
    />

    <h3>Rich text view</h3>
    <WppRichtextView :value="value" />

    <h3>Rich text HTML view</h3>
    <WppRichtextHtml :value="value" />

    <hr />

    <h2>Markdown Demo</h2>
    <p>This demo shows the new Markdown features. Simply copy and paste or type Markdown into the editor. The snippet below is pre-configured:</p>
    <pre style="background-color: #f7f7f7; padding: 1rem;">{{ markdownValue }}</pre>

    <h3>Markdown Editor</h3>
    <WppRichtext
      :name="'markdownContent'"
      :value="markdownValue"
      :format="'markdown'"
      :modules="modulesJSON"
      @wppChange="(e) => setMarkdownValue(e.detail.value)"
      @wppSelectionChange="handleSelectionChange"
      @wppUploadRequest="handleUploadRequest"
      required
      :charactersLimit="500"
      :warningThreshold="480"
      :labelConfig="{ text: 'Markdown Content:' }"
      :message="'Markdown editor demo'"
      :placeholder="'Type your Markdown here...'"
      auto-focus
    />

    <h3>Output as HTML</h3>
    <WppRichtextHtml :value="htmlOutput" />
  </div>
</template>

<style></style>

```

```ts
export const defaultTextValue = ''

export const modulesJSON = JSON.stringify({
  toolbar: {
    aliases: {
      embed: ['link', 'image', 'video', 'attachment'],
    },
  },
  imageUpload: true,
  videoUpload: true,
  attachmentUpload: true,
})

export const markdownDemoText = `
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
```