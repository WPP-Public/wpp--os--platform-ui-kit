import { ChangeDetectionStrategy, Component } from '@angular/core'
import { modulesJSON, markdownDemoText } from './consts'
import { marked } from 'marked'

/* eslint-disable import/no-webpack-loader-syntax */

// @ts-ignore Can't find file

import initialValue from '!raw-loader!@platform-ui-kit/components-library/src/components/wpp-richtext/test/test-value.html'

import { WppRichtextCustomEvent } from '@platform-ui-kit/components-library/dist/types/components'
import {
  RichtextChangeEventDetail,
  RichtextSelectionChangeEventDetail,
  RichtextUploadRequestEventDetail,
} from '@platform-ui-kit/components-library'

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
  public value = initialValue
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
    const event = e as WppRichtextCustomEvent<RichtextChangeEventDetail>

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
