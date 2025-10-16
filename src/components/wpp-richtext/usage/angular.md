**richtext-example.page.html**

```html
<h3>Rich text</h3>
<wpp-richtext
  [value]="value"
  [modules]="modules"
  (wppChange)='handleChange($event)'
  (wppSelectionChange)='handleSelectionChange($event)'
  (wppUploadRequest)='handleUploadRequest($event)'
  required="true"
  [charactersLimit]="500"
  [warningThreshold]="480"
></wpp-richtext>
<h3>Rich text view</h3>
<wpp-richtext-view [value]="value"></wpp-richtext-view>
<h3>Rich text HTML view</h3>
<wpp-richtext-html [value]="value"></wpp-richtext-html>
<hr />

<h2>Markdown Demo</h2>
<p>This demo shows the new Markdown features. Simply copy and paste or type Markdown into the editor. Below is a demo snippet:</p>
<pre style="background-color: #f7f7f7; padding: 1rem;">
{{ markdownValue }}
</pre>

<h3>Markdown Editor</h3>
<wpp-richtext
  [value]="markdownValue"
  [format]="'markdown'"
  [modules]="modules"
  (wppChange)="handleMarkdownChange($event)"
  (wppSelectionChange)="handleSelectionChange($event)"
  (wppUploadRequest)="handleUploadRequest($event)"
  required="true"
  [charactersLimit]="500"
  [warningThreshold]="480"
  auto-focus="true"
></wpp-richtext>

<h3>Output as HTML</h3>
<wpp-richtext-html [value]="htmlOutput"></wpp-richtext-html>
```

**richtext-example.page.ts**

```tsx
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { marked } from 'marked'
import { modulesJSON, markdownDemoText } from './consts'

function upload(file: File): Promise<string> {
  return new Promise(resolve => {
    const delay = Math.floor(Math.random() * 10000)

    setTimeout(() => resolve(URL.createObjectURL(file)), delay)
  })
}

@Component({
  selector: 'richtext-example',
  templateUrl: './richtext-example.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RichtextExamplePage {
  public value = ''
  public markdownValue = markdownDemoText
  public modules = modulesJSON
  public htmlOutput = marked(this.markdownValue) as string

  public handleChange = (e: Event) => {
    console.log('wppChange', e)
    const event = e as WppRichtextCustomEvent<RichtextChangeEventDetail>

    this.value = event.detail.value
  }

  public handleMarkdownChange = (e: Event) => {
    console.log('wppMarkdownChange', e)
    const event = e as any
    this.markdownValue = event.detail.value
    this.htmlOutput = marked(this.markdownValue) as string
  }

  public handleSelectionChange = (e: Event) => {
    const event = e as WppRichtextCustomEvent<RichtextSelectionChangeEventDetail>

    console.log('wppSelectionChange', { ...event.detail.range }, e)
  }

  public handleUploadRequest = (e: Event) => {
    console.log('wppUploadRequest', e)
    const event = e as WppRichtextCustomEvent<RichtextUploadRequestEventDetail>

    const type = event.detail.type
    const callback = event.detail.callback
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
}
```

```ts
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