export interface InlineMessage {
  readonly message?: string
  readonly messageType?: 'error' | 'warning'
  readonly maxMessageLength?: number | 'auto'
}
