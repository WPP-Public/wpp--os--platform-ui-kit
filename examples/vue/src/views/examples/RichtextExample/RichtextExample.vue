<script setup lang="ts">
import { WppRichtext, WppRichtextView, WppRichtextHtml, WppRichtextMarkdown } from '@platform-ui-kit/components-library-vue'
import { ref } from 'vue'
import { marked } from 'marked'
import { defaultTextValue, markdownDemoText } from './consts'

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

const value = ref(defaultTextValue)
const markdownValue = ref(markdownDemoText)

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

const handleMarkdownChange = (e: CustomEvent) => {
  console.log('wppMarkdownChange', e.detail)
  setMarkdownValue(e.detail.value)
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

const htmlOutput = marked(markdownValue.value) as string

</script>

<template>
  <div class="richText">
    <h3>Rich text</h3>
    <WppRichtext :name="'content'" :value="value" :modules="modules" @wppChange="handleChange"
      @wppSelectionChange="handleSelectionChange" @wppUploadRequest="handleUploadRequest" required
      :charactersLimit="500" :warningThreshold="480" :labelConfig="{ text: 'Content:' }"
      :message="'Some component message'" :placeholder="'Insert text here...'" auto-focus />

    <h3>Rich text view</h3>
    <WppRichtextView :value="value" />

    <h3>Rich text HTML view</h3>
    <WppRichtextHtml :value="value" />

    <h3>Rich text Markdown view</h3>
    <WppRichtextMarkdown :value="value" />

    <h2>Markdown</h2>
    <p>This demo shows the new Markdown features. Simply copy and paste or type Markdown into the editor.</p>
    <pre style="background-color: #f7f7f7; padding: 1rem">{{ markdownValue }}</pre>

    <h3>Markdown Editor</h3>
    <WppRichtext :name="'markdownContent'" :value="markdownValue" :format="'markdown'" :modules="modules"
      @wppChange="handleMarkdownChange" @wppSelectionChange="handleSelectionChange"
      @wppUploadRequest="handleUploadRequest" required :charactersLimit="500" :warningThreshold="480"
      :labelConfig="{ text: 'Markdown Content:' }" :message="'Markdown editor demo'"
      :placeholder="'Type your Markdown here...'" auto-focus />

    <h3>Output as HTML</h3>
    <WppRichtextHtml :value="htmlOutput" />
  </div>
</template>

<style></style>
