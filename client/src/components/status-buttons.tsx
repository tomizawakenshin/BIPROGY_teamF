'use client';

import { Button } from '@/components/button';
import { changeStatus } from '@/util/fetcher';

type Emoji = {
  label: string;
  text: string;
  path: string;
};

const emojis: Emoji[] = [
  {
    label: '🙅‍♀️',
    text: '質問対応中',
    path: '',
  },
  {
    label: '🙆‍♀️',
    text: '待機中',
    path: '',
  },
];

export function StatusButtons() {
  const setStatus = (emoji: Emoji) => {
    const res = changeStatus(emoji.path);
  };

  return (
    <div>
      <h2 className='text-2xl'>現在のステータス</h2>
      <div className='flex gap-2'>
        {emojis.map((emoji) => (
          <Button key={emoji.text} onClick={() => setStatus(emoji)}>
            {emoji.label}
            {emoji.text}
          </Button>
        ))}
      </div>
    </div>
  );
}
