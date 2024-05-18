'use client';

import { Button } from '@/components/button';
import { getStatus, updateStatus } from '@/util/fetcher';
import { useEffect, useState } from 'react';

type Emoji = {
  label: string;
  text: string;
  path: string;
};

const emojis: Emoji[] = [
  {
    label: '🙅‍♀️',
    text: '質問対応中',
    path: 'x',
  },
  {
    label: '🙆‍♀️',
    text: '待機中',
    path: 'o',
  },
];

export function StatusButtons() {
  const [status, setStatus] = useState<Emoji | null>({
    label: '🙅‍♀️',
    text: '質問対応中',
    path: 'x',
  });
  const changeStatus = async (emoji: Emoji) => {
    const res = await updateStatus(emoji.path);
    if (res) {
      setStatus(emoji);
    }
  };

  useEffect(() => {
    getStatus().then((res) => {
      const emoji = emojis.find((emoji) => emoji.text === res.status);
      if (emoji) setStatus(emoji || null);
    });
  }, []);

  return (
    <div>
      <h2 className='text-2xl'>現在のステータス</h2>
      <div className='flex gap-2'>
        {emojis.map((emoji) => (
          <Button
            className={
              status?.path === emoji.path
                ? 'bg-indigo-100 hover:bg-indigo-200 border-indigo-400'
                : ''
            }
            key={emoji.text}
            onClick={() => changeStatus(emoji)}
          >
            {emoji.label}
            {emoji.text}
          </Button>
        ))}
      </div>
    </div>
  );
}
