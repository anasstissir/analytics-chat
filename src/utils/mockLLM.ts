import type { Message } from '@/types/message'

let messageIdCounter = 100

function generateId(): string {
  return `msg_${++messageIdCounter}`
}

function getCurrentTimestamp(): string {
  return new Date().toISOString()
}

export function mockLLM(userMessage: string): Promise<Message[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: generateId(),
          role: 'assistant',
          thinking: 'Processing user request...',
          timestamp: getCurrentTimestamp()
        },
        {
          id: generateId(),
          role: 'assistant',
          content: {
            type: 'text',
            value: `Response to: ${userMessage}`
          },
          timestamp: getCurrentTimestamp()
        },
        {
          id: generateId(),
          role: 'assistant',
          content: {
            type: 'table',
            headers: ['Metric', 'Value'],
            rows: [['Response', 'Mocked']]
          },
          timestamp: getCurrentTimestamp()
        }
      ])
    }, 1500)
  })
}

