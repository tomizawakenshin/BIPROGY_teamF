'use client';

import { Button } from '@/components/button';
import { getStatus, updateStatus } from '@/utils/fetcher';
import { useEffect, useState } from 'react';
import { Tooltip } from '@/components/tooltip';
import clsx from 'clsx';
import { Emoji, emojis } from '@/utils/assets';

export function StatusButtons() {
  const [status, setStatus] = useState<Emoji | null>({
    label: '😶',
    text: 'フリー',
  });
  const changeStatus = async (emoji: Emoji) => {
    const res = await updateStatus(emoji.label);
    if (res) {
      setStatus(emoji);
    }
  };

  useEffect(() => {
    getStatus().then((res) => {
      const emoji = emojis.find((emoji) => emoji.label === res);
      if (emoji) setStatus(emoji || null);
    });
  }, []);

  return (
    <div className='space-y-2'>
      <h2 className='text-2xl'>現在のステータス</h2>
      <div className='flex gap-2'>
        {emojis.map((emoji) => (
          <Button
            className={clsx(
              'p-0',
              status?.text === emoji.text
                ? 'bg-indigo-100 hover:bg-indigo-200 border-indigo-400'
                : 'border-zinc-400 hover:bg-zinc-100'
            )}
            key={emoji.text}
            onClick={() => changeStatus(emoji)}
          >
            <Tooltip className='p-2' title={emoji.text}>
              <span className='text-6xl'>{emoji.label}</span>
            </Tooltip>
          </Button>
        ))}
      </div>
    </div>
  );
}
