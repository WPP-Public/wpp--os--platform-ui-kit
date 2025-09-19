export const modulesJSON = JSON.stringify({
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

export const markdownDemoText = `
Welcome to the **Markdown** demo! Type some _Markdown_ here...

atx-style:
# Header 1 #
## Header 2
###### Header 6

Headers Setext-style:

 Header 2
 --------

Emphasis: **bold** *italic*

Intra-word emphasis:
Use single asterisks for intra-word emphasis, like this: t*es*t becomes t<em>es</em>t.

Use \`inline code\` for snippets.

Write blockquotes:
> This is a blockquote!

Create [links](http://example.com).

An [example][id]. Then, anywhere
else in the doc, define the link: [id]: http://example.com/  "Title"

Display an image: ![Sample Image](https://via.placeholder.com/150)

This is a list:
- Item 1
- Item 2
- Item 3

Ordered, without paragraphs:
1.  Foo
2.  Bar

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
