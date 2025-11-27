import type { Message } from '@/types/message'

export const initialMessages: Message[] = [
  {
    id: 'msg_1',
    role: 'user',
    content: {
      type: 'text',
      value: 'Show me sales data for Q4'
    },
    timestamp: '2025-10-22T10:30:00Z'
  },
  {
    id: 'msg_2',
    role: 'assistant',
    thinking: 'User wants quarterly sales analysis. Should show table and trend.',
    timestamp: '2025-10-22T10:30:05Z'
  },
  {
    id: 'msg_3',
    role: 'assistant',
    content: {
      type: 'text',
      value: "Here's the Q4 sales breakdown:"
    },
    timestamp: '2025-10-22T10:30:06Z'
  },
  {
    id: 'msg_4',
    role: 'assistant',
    content: {
      type: 'histogram',
      values: [120, 150, 180, 200],
      labels: ['Oct', 'Nov', 'Dec', 'Jan']
    },
    timestamp: '2025-10-22T10:30:07Z'
  },
  {
    id: 'msg_5',
    role: 'assistant',
    content: {
      type: 'table',
      headers: ['Month', 'Revenue', 'Growth'],
      rows: [
        ['Oct', '$120K', '-'],
        ['Nov', '$150K', '+25%'],
        ['Dec', '$180K', '+20%'],
        ['Jan', '$200K', '+11%']
      ]
    },
    timestamp: '2025-10-22T10:30:08Z'
  },
  {
    id: 'msg_6',
    role: 'user',
    content: {
      type: 'text',
      value: 'What about compared to last year?'
    },
    timestamp: '2025-10-22T10:31:00Z'
  }
]

