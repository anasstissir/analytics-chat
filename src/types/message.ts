export interface TextContent {
  type: 'text'
  value: string
}

export interface HistogramContent {
  type: 'histogram'
  values: number[]
  labels: string[]
}

export interface TableContent {
  type: 'table'
  headers: string[]
  rows: string[][]
}

export type MessageContent = TextContent | HistogramContent | TableContent

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content?: MessageContent
  thinking?: string
  timestamp: string
}

