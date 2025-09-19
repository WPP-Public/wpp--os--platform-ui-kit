import { Component, Prop, h, Host, State, EventEmitter, Event } from '@stencil/core'

import { truncate } from '../../../utils/utils'

import { FileItemType, FileUploadItemEventDetail, FileUploadResultFormaType, FileUploadItemLocales } from '../types'

import { sizeFormat, maxSize } from './types'
import { getExtension } from '../utils'
import { returnIconFromExtension } from '../constants'

/**
 * @part file-item - file item wrapper.
 * @part wrapper - component wrapper element
 * @part content - content wrapper element
 * @part file-name - file name text element
 * @part tooltip - tooltip wrapper content
 * @part loading - loading text element
 * @part percentage - percentage text element
 * @part cross-icon - cross icon element
 */
@Component({
  tag: 'wpp-file-upload-item',
  styleUrl: 'wpp-file-upload-item.scss',
  shadow: true,
})
export class WppFileUploadItem {
  @State() thumbnailUrl: string | null = null

  @State() percentage: number = 0

  @State() total: number = 0

  @State() loaded: number = 0

  @State() isLoadingFinished: boolean = false

  @State() measurementUnit: string = sizeFormat.MB

  /**
   * Current file
   */
  @Prop({ mutable: true }) file: FileItemType

  /**
   * Represent what result format datepicker return, it can be base64, arrayBuffer, binaryString, by default it returns base64
   */
  @Prop() readonly format: FileUploadResultFormaType = 'base64'

  /**
   * Maximum label length (in characters) of single loading item
   */
  @Prop() readonly maxLabelLength: number = 30

  /**
   * Represent current index in files list
   */
  @Prop() readonly currentIndex: number

  /**
   * Indicates locales for file upload component
   */
  @Prop() readonly locales: FileUploadItemLocales

  /**
   * Indicates if the file has been uploaded.
   *
   * @internal - This prop is controlled by wpp-chat-input
   */
  @Prop() readonly uploaded?: boolean

  /** @internal */
  @Event({ bubbles: false, composed: false }) wppDelete: EventEmitter<FileUploadItemEventDetail>

  /** @internal */
  @Event({ bubbles: false, composed: false }) wppClick: EventEmitter<FileUploadItemEventDetail>

  /** @internal */
  @Event() fileLoaded: EventEmitter<{ name: string; size: number }>

  private convertToAppropriateFormat = (size: number) => {
    if (size < maxSize.Bytes) {
      this.measurementUnit = sizeFormat.Bytes

      return size.toFixed(1)
    }

    if (size < maxSize.KB) {
      this.measurementUnit = sizeFormat.KB

      return Math.floor(size / 1000).toFixed(1)
    }

    if (size < maxSize.MB) {
      this.measurementUnit = sizeFormat.MB

      return (size / 1000000).toFixed(1)
    }

    this.measurementUnit = sizeFormat.GB

    return (size / 1000000000).toFixed(1)
  }

  private setReaderFormat = (reader: FileReader) => {
    switch (this.format) {
      case 'arrayBuffer': {
        return reader.readAsArrayBuffer(this.file as File)
      }

      case 'binaryString': {
        return reader.readAsBinaryString(this.file as File)
      }

      default: {
        return reader.readAsDataURL(this.file as File)
      }
    }
  }

  componentWillLoad() {
    const { size, name } = this.file

    if (this.isFileWithError()) {
      this.isLoadingFinished = true
      this.total = +this.convertToAppropriateFormat(size)

      return
    }

    if ('url' in this.file) {
      this.isLoadingFinished = true
      this.total = +this.convertToAppropriateFormat(size)

      return
    }

    const fileExtension = getExtension(name).toLowerCase()

    if (['.jpg', '.png', '.jpeg', '.gif', '.svg'].includes(fileExtension)) {
      this.generateThumbnail()
    } else {
      this.handleFileReading()
    }
  }

  private handleFileReading() {
    const reader = new FileReader()

    reader.onload = (event: ProgressEvent) => {
      const currentTarget = event.currentTarget as FileReader

      this.file.result = currentTarget.result
    }
    reader.onprogress = (event: ProgressEvent) => {
      this.loaded = +this.convertToAppropriateFormat(event.loaded)
      this.total = +this.convertToAppropriateFormat(event.total)
      const currentPercent = (event.loaded / event.total) * 100

      this.percentage = +currentPercent.toFixed(1)
    }
    reader.onloadend = () => {
      this.isLoadingFinished = true
      this.fileLoaded.emit({ name: this.file.name, size: this.file.size })
    }
    this.setReaderFormat(reader)
  }

  private generateThumbnail() {
    const reader = new FileReader()

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const result = e.target?.result as string

      // Check if the file is a GIF and create a static thumbnail using a canvas
      if (this.file?.name?.toLowerCase().endsWith('.gif')) {
        const img = new Image()

        img.src = result
        img.onload = () => {
          // Create a canvas element to capture the first frame
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')

          canvas.width = img.width
          canvas.height = img.height

          // Draw the first frame of the GIF onto the canvas
          context?.drawImage(img, 0, 0, img.width, img.height)

          // Use the canvas content as the static thumbnail
          this.thumbnailUrl = canvas.toDataURL('image/png') // Convert to PNG for a static thumbnail
          this.isLoadingFinished = true
        }
      } else {
        this.thumbnailUrl = result
        this.isLoadingFinished = true
      }

      this.fileLoaded.emit({ name: this.file.name, size: this.file.size })
    }

    reader.onprogress = (event: ProgressEvent) => {
      this.loaded = +this.convertToAppropriateFormat(event.loaded)
      this.total = +this.convertToAppropriateFormat(event.total)
      const currentPercent = (event.loaded / event.total) * 100

      this.percentage = +currentPercent.toFixed(1)
    }

    reader.readAsDataURL(this.file as File)
  }

  private isFileLoading = (): boolean => !this.uploaded && (this.file.isLoading || !this.isLoadingFinished)

  private setCurrentIcon = () => {
    if (this.isFileLoading()) return <wpp-spinner />
    const { name } = this.file

    if (this.isFileWithError()) return null

    const fileExtension = getExtension(name)

    return returnIconFromExtension(fileExtension, this.thumbnailUrl)
  }

  private getErrorMessage = (): string => {
    if (this.file.sizeError) return this.locales.sizeError
    if (this.file.formatError) return this.locales.formatError

    return this.file.validatorError || ''
  }

  private isFileWithError = (): boolean => !!(this.file.sizeError || this.file.formatError || this.file.validatorError)

  private setCurrentError = () => {
    if (this.isFileWithError()) {
      const currentError = this.getErrorMessage()

      return (
        <div class="error-wrapper">
          <wpp-inline-message
            class="inline-message-error"
            message={currentError}
            type="error"
            showTooltipFrom={140}
            tooltipConfig={{ popperOptions: { strategy: 'fixed' } }}
          />
          {this.file.deletable !== false && (
            <wpp-icon-cross class="cross-icon" part="cross-icon" onClick={this.handleCloseClick} />
          )}
        </div>
      )
    }

    return null
  }

  private getEventData = (): FileUploadItemEventDetail => ({
    index: this.currentIndex,
    name: this.file?.name,
    size: this.file?.size,
  })

  private handleCloseClick = (event: Event) => {
    event.preventDefault()
    event.stopPropagation()

    if (this.file.disabled) return

    this.wppDelete.emit(this.getEventData())
  }

  private handleClick = () => {
    if (this.file.disabled) return

    this.wppClick.emit(this.getEventData())
  }

  private blockCssClasses = () => ({
    block: true,
  })

  private fileNameCssClasses = () => ({
    name: true,
    'name-error': this.isFileWithError(),
  })

  private hostCssClasses = () => ({
    'wpp-file-upload-item': true,
    'file-upload-item': true,
  })

  private itemCssClasses = () => ({
    'item-wrapper': true,
    disabled: !!this.file.disabled,
  })

  render() {
    return (
      <Host
        class={this.hostCssClasses()}
        exportparts="file-item, wrapper, content, file-name, tooltip, loading, percentage, cross-icon"
        onClick={this.handleClick}
      >
        <li class={this.itemCssClasses()} part="file-item">
          {this.setCurrentError()}
          <div class="content-wrapper" part="wrapper">
            <div class={this.blockCssClasses()} part="content">
              {this.setCurrentIcon()}
              <wpp-tooltip
                text={this.file.name}
                config={{
                  popperOptions: { strategy: 'fixed' },
                  onShow: () => {
                    if (!(this.file?.name?.length > this.maxLabelLength)) return false
                  },
                }}
                part="tooltip"
              >
                <p class={this.fileNameCssClasses()} part="file-name">
                  {truncate(this.file.name, this.maxLabelLength, true)}
                </p>
              </wpp-tooltip>
              {this.isFileWithError() ? null : (
                <p class="loading" part="loading">
                  {this.isFileLoading()
                    ? `${this.loaded}/${this.total} ${this.measurementUnit}`
                    : `${this.total} ${this.measurementUnit}`}
                </p>
              )}
            </div>
            <div class="controls-wrapper" part="controls">
              {this.isFileLoading() && (
                <p class="percentage" part="percentage">
                  {this.percentage}%
                </p>
              )}
              {this.file.deletable !== false && !this.isFileWithError() && (
                <wpp-icon-cross class="cross-icon" part="cross-icon" onClick={this.handleCloseClick} />
              )}
            </div>
          </div>
        </li>
      </Host>
    )
  }
}
