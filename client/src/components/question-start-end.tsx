'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/button';
import { endQuestion, startQuestion } from '@/utils/fetcher';

export function QuestionStartEnd() {
  const router = useRouter();

  const onStart = async () => {
    const res = await startQuestion();
    // スマホならLINE(https://line.me/R)に遷移
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      router.push('https://line.me/R');
    }
  };

  const onEnd = async () => {
    const res = await endQuestion();
  };

  return (
    <div className='flex justify-between gap-2'>
      <Button className='border-zinc-400 hover:bg-zinc-100' onClick={onStart}>
        質問開始
      </Button>
      <Button className='border-zinc-400 hover:bg-zinc-100' onClick={onEnd}>
        質問終了
      </Button>
    </div>
  );
}
